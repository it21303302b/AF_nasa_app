import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div id="home" className="home d-flex flex-column min-vh-100">
      <div className="black-bar">
        <img src="nasa.png" alt="NASA Logo" className="nasa-logo" />
      </div>
      <img className="bgImgHome" src="astro.jpg" alt="Astronomy"></img>
      <div className="container text-center mt-5">
        <h1 className="homeH1">Welcome to APOD Project</h1>
        <p className="lead">Explore the wonders of the cosmos with Astronomy Picture of the Day (APOD). Discover stunning images and fascinating information about the earth and mars.</p>
        <div className="row mt-5"> {/* Increased margin here */}
          <div className="col">
            <Link to="/apod">
              <div className="image-container zoom-hover">
                <img src="apod.png" alt="APOD" className="img-thumbnail" style={{ width: "400px", height: "400px" }} />
                <div className="image-text">Click to view APOD</div>
              </div>
            </Link>
          </div>
          <div className="col">
            <Link to="/mars">
              <div className="image-container zoom-hover">
                <img src="mars.png" alt="Mars" className="img-thumbnail" style={{ width: "400px", height: "400px" }} />
                <div className="image-text">Click to explore Mars</div>
              </div>
            </Link>
          </div>
          <div className="col">
            <Link to="/earth">
              <div className="image-container zoom-hover">
                <img src="earth.jpg" alt="Earth" className="img-thumbnail" style={{ width: "400px", height: "400px" }} />
                <div className="image-text">Click to explore Earth</div>
              </div>
            </Link>
          </div>
        </div>
      </div>
      {/* Footer */}
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
    </div>
  );
};

export default Home;
