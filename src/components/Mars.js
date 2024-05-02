import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import Modal from 'react-bootstrap/Modal';

const Mars = () => {
  const [roverPhotos, setRoverPhotos] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const apiKey = process.env.REACT_APP_NASA_API_KEY;

  useEffect(() => {
    const fetchRoverPhotos = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=2&page=${page}&api_key=${apiKey}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch data from NASA API");
        }
        const data = await response.json();
        setRoverPhotos(data.photos.slice(0, 6));
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRoverPhotos();
  }, [apiKey, page]);

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
        <h1 className="homeH1">Mars Rover Photos</h1>
        <div className="row">
          {loading ? (
            <div className="col text-center">
              <div className="spinner-border text-white" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          ) : (
            roverPhotos.map((photo) => (
              <div key={photo.id} className="col-md-4">
                <div className="card mb-4">
                  <img src={photo.img_src} className="card-img-top zoom-hover" alt={photo.id} onClick={() => handlePhotoClick(photo)} />
                </div>
              </div>
            ))
          )}
        </div>
        <div className="row">
          <div className="col-md-12 d-flex justify-content-center">
            <button className="btn btn-primary me-2" onClick={() => setPage(page - 1)} disabled={page === 1}>Previous</button>
            <span className="pgind">Page {page}</span>
            <button className="btn btn-primary ms-2" onClick={() => setPage(page + 1)}>Next</button>
          </div>
        </div>
      </div>
      {selectedPhoto && (
        <Modal show={selectedPhoto !== null} onHide={handleCloseModal} size="lg">
          <Modal.Header closeButton>
            <Modal.Title>Image Details</Modal.Title>
          </Modal.Header>
          <Modal.Body style={{ maxHeight: 'calc(100vh - 130px)', overflowY: 'auto' }}>
            <div className="card mb-4 text-center">
              <img src={selectedPhoto.img_src} className="card-img-top mx-auto" alt={selectedPhoto.id} style={{ maxWidth: '80%' }} />
              <div className="card-body">
                <p className="camera-name">{selectedPhoto.camera.full_name}</p>
                <p className="earth-date">{selectedPhoto.earth_date}</p>
              </div>
            </div>
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

export default Mars;
