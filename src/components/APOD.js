import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const APOD = () => {
  const [apodData, setApodData] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedApodIndex, setSelectedApodIndex] = useState(-1); // Track selected APOD index
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [loading, setLoading] = useState(true); // Track loading status
  const apiKey = process.env.REACT_APP_NASA_API_KEY;

  useEffect(() => {
    const fetchApodData = async () => {
      try {
        setLoading(true); // Set loading to true before fetching data
        const formattedDate = selectedDate.toISOString().split('T')[0];
        const currentDateResponse = await fetch(`https://api.nasa.gov/planetary/apod?date=${formattedDate}&api_key=${apiKey}`);
        if (!currentDateResponse.ok) {
          throw new Error('Failed to fetch data from NASA API');
        }
        const currentDateData = await currentDateResponse.json();

        const previousDates = [1, 2, 3].map(days => {
          const date = new Date(selectedDate);
          date.setDate(date.getDate() - days);
          const formattedPrevDate = date.toISOString().split('T')[0];
          return fetch(`https://api.nasa.gov/planetary/apod?date=${formattedPrevDate}&api_key=${apiKey}`);
        });

        const previousDatesResponses = await Promise.all(previousDates);
        const previousDatesData = await Promise.all(previousDatesResponses.map(response => response.json()));

        const allApodData = [currentDateData, ...previousDatesData];
        setApodData(allApodData);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false); // Set loading to false after data fetching is completed
      }
    };

    fetchApodData();
  }, [apiKey, selectedDate]);

  // Function to handle click on previous APOD image
  const handleApodClick = (index) => {
    setSelectedApodIndex(index);
  };

  // Function to close the popup card
  const handleClosePopup = () => {
    setSelectedApodIndex(-1);
  };

  // Function to handle choosing a date
  const handleChooseDate = () => {
    setShowDatePicker(true);
  };

  // Function to handle date selection
  const handleDateSelect = (date) => {
    setSelectedDate(date);
  };

  // Function to confirm selected date
  const handleConfirmDate = () => {
    setShowDatePicker(false);
  };

  // Function to reset date to today
  const handleResetToToday = () => {
    setSelectedDate(new Date());
  };

  return (
    <>
      <div className="black-bar">
        <img src="nasa.png" alt="NASA Logo" className="nasa-logo" />
      </div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">Home</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav me-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/apod">APOD</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/mars">Mars</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/earth">Earth</Link>
              </li>
            </ul>
          </div>
          <span className="navbar-text">NASA</span> {/* "NASA" text in far right corner */}
        </div>
      </nav>
      <img className="bgImgHome" src="astro.jpg" alt="Astronomy"></img>
      <div className="container mt-5">
        <h1 className="homeH1">Astronomy Picture of the Day</h1>
        <div className="row">
          <div className="col-md-6 offset-md-3">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <div>
                <button className="btn btn-primary me-2" onClick={handleChooseDate}>Choose Date</button>
                <button className="btn btn-secondary" onClick={handleResetToToday}>Reset to Today</button>
              </div>
              {showDatePicker && (
                <div className="date-picker-popup">
                  <DatePicker 
                    selected={selectedDate} 
                    onChange={handleDateSelect} 
                    className="form-control"
                  />
                  <button className="btn btn-primary mt-2" onClick={handleConfirmDate}>Confirm Date</button>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-6 offset-md-3">
            <div className="card mb-3">
              {loading ? ( // Conditionally render loading spinner
                <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "200px" }}>
                  <div className="spinner-border" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                </div>
              ) : (
                <>
                  <img src={apodData[0]?.hdurl || "astro.jpg"} className="card-img-top zoom-hover" alt={apodData[0]?.title || 'bg-img'} />
                  <div className="card-body">
                    <h5 className="card-title">{apodData[0]?.title}</h5>
                    <p className="card-text">{apodData[0]?.explanation}</p>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
        <h2 className="apodh2">Previous APOD images</h2>
        <div className="row">
          {apodData.slice(1, 4).map((apod, index) => ( // Only show previous 3 APOD images
            <div key={index} className="col-md-4">
              <div className="card mb-3 zoom-hover" onClick={() => handleApodClick(index)}>
                <div className="image-container">
                  <div className="crop">
                    {loading ? ( // Conditionally render loading spinner
                      <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "200px" }}>
                        <div className="spinner-border" role="status">
                          <span className="visually-hidden">Loading...</span>
                        </div>
                      </div>
                    ) : (
                      <img src={apod.hdurl || "astro.jpg"} className="card-img-top img-fluid" alt={apod.title || 'bg-img'} />
                    )}
                  </div>
                </div>
                <div className="card-body">
                  <h5 className="card-title">{apod.title}</h5>
                  <p className="card-text">{apod.explanation}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Popup card */}
      {selectedApodIndex !== -1 && (
        <div className="popup">
          <div className="popup-content">
            <span className="close" onClick={handleClosePopup}>&times;</span>
            <div className="card mb-3">
              <img src={apodData[selectedApodIndex + 1]?.hdurl || "astro.jpg"} className="card-img-top" alt={apodData[selectedApodIndex + 1]?.title || 'bg-img'} />
              <div className="card-body">
                <h5 className="card-title">{apodData[selectedApodIndex + 1]?.title}</h5>
                <p className="card-text">{apodData[selectedApodIndex + 1]?.explanation}</p>
              </div>
            </div>
          </div>
        </div>
      )}
      <footer className="footer mt-5 py-3 bg-black text-white">
        <div className="container text-center d-flex justify-content-between align-items-center">
          <div>
            <img src="nasa.png" alt="NASA Logo" className="nasa-logoft" />
          </div>
          <div>
            <h2>The National Aeronautics and <br></br>Space Administration<br></br> </h2>
            <p><br></br>NASA explores the unknown in air and space,<br></br> innovates for the benefit of humanity, and <br></br> inspires the world through discovery.</p>
          </div>
          <div>
            <h3>Follow us on</h3>
            <span className="footer-icons">
              <a href="https://web.facebook.com/NASA?_rdc=1&_rdr" target="_blank" rel="noopener noreferrer"><img src="facebook.png" alt="Facebook" className="footericon"/></a>
              <a href="https://www.instagram.com/nasa/" target="_blank" rel="noopener noreferrer"><img src="instagram.png" alt="Instagram" className="footericon"/></a>
              <a href="https://x.com/NASA" target="_blank" rel="noopener noreferrer"><img src="twitter.png" alt="Twitter" className="footericon"/></a>
              <a href="https://www.youtube.com/@NASA" target="_blank" rel="noopener noreferrer"><img src="youtube.png" alt="YouTube" className="footericon"/></a>
            </span>
            <p>Developed by Bimsara Weerakoon</p>
          </div>
        </div>
      </footer>
    </>
  );
};

export default APOD;
