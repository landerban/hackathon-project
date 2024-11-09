import React from 'react';
import '../css/footer.css'; // Import the CSS file for styling

const Footer = (props) => {
  return (
    <footer className={`${props.isDark ? 'footer dark' : 'footer'} text-light py-4`}>
      <div className="container">
        <div className="row">
          <div className="col-md-6 text-center text-md-start mb-3 mb-md-0">
            <p className="mb-0">&copy; {new Date().getFullYear()} Alexander The Great. All Rights Reserved.</p>
          </div>
          <div className="col-md-6 text-center text-md-end">
            <ul className="list-unstyled footer-links d-flex justify-content-center justify-content-md-end mb-0">
              <li className="ms-3">
                <a href="#privacy" className="text-light">Privacy Policy</a>
              </li>
              <li className="ms-3">
                <a href="#terms" className="text-light">Terms of Service</a>
              </li>
              <li className="ms-3">
                <a href="#contact" className="text-light">Contact Us</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
