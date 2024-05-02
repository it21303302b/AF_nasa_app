import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import Modal from 'react-bootstrap/Modal';

const Earth = () => {
  const [earthPhotos, setEarthPhotos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const apiKey = process.env.REACT_APP_NASA_API_KEY;
  const imagesPerPage = 9;

  useEffect(() => {
    const fetchEarthPhotos = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `https://api.nasa.gov/EPIC/api/natural/images?api_key=${apiKey}`
        );

        if (!response.ok) {
          const errorMessage = await response.text();
          throw new Error(`Failed to fetch data from NASA API: ${response.status} - ${errorMessage}`);
        }

        const data = await response.json();
        setEarthPhotos(data); // Set all images
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEarthPhotos();
  }, [apiKey]);

  // Get the current page images
  const indexOfLastImage = currentPage * imagesPerPage;
  const indexOfFirstImage = indexOfLastImage - imagesPerPage;
  const currentImages = earthPhotos.slice(indexOfFirstImage, indexOfLastImage);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handlePhotoClick = (photo) => {
    setSelectedPhoto(photo);
  };

  const handleCloseModal = () => {
    setSelectedPhoto(null);
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
        <h1 className="homeH1">Earth Photos</h1>
        <div className="row">
          {loading ? (
            <div className="col text-center">
              <div className="spinner-border text-white" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          ) : (
            currentImages.map((photo, index) => (
              <div key={index} className="col-md-4">
                <div className="card mb-4" onClick={() => handlePhotoClick(photo)} style={{ cursor: 'pointer' }}>
                  <img src={`https://api.nasa.gov/EPIC/archive/natural/${photo.date.substring(0, 4)}/${photo.date.substring(5, 7)}/${photo.date.substring(8, 10)}/png/${photo.image}.png?api_key=${apiKey}`} className="card-img-top zoom-hover" alt="Earth" />
                  <div className="card-body">
                    <p className="card-text">{photo.date}</p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
        <div className="row">
          <div className="col-md-12 d-flex justify-content-center">
            <ul className="pagination">
              {Array.from({ length: Math.ceil(earthPhotos.length / imagesPerPage) }).map((_, index) => (
                <li key={index} onClick={() => paginate(index + 1)} className={`page-item ${currentPage === index + 1 ? "active" : ""}`}>
                  <span className="page-link">{index + 1}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      {selectedPhoto && (
        <Modal show={selectedPhoto !== null} onHide={handleCloseModal} size="lg">
          <Modal.Header closeButton>
            <Modal.Title>Earth Photo</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <img src={`https://api.nasa.gov/EPIC/archive/natural/${selectedPhoto.date.substring(0, 4)}/${selectedPhoto.date.substring(5, 7)}/${selectedPhoto.date.substring(8, 10)}/png/${selectedPhoto.image}.png?api_key=${apiKey}`} className="img-fluid" alt="Earth" />
            <p>{selectedPhoto.date}</p>
          </Modal.Body>
        </Modal>
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

export default Earth;
