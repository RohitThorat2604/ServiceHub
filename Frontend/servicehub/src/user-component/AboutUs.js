import React, { useEffect, useState } from 'react'; 
import { Link } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';
import 'bootstrap-icons/font/bootstrap-icons.css';


export default function AboutUs() {
  const [clickedCardId, setClickedCardId] = useState(null); 

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      easing: 'ease-in-out',
    });
  }, []);

  const handleCardClick = (id) => {
    setClickedCardId(id);
 
    setTimeout(() => {
      setClickedCardId(null);
    }, 200); 
  };

  return (
    <> 
      <div className="container mt-5 py-5"> 
      
        <div className="row align-items-center mb-5 py-4"> 
          <div className="col-md-6 order-md-2" data-aos="fade-left">
            <img
              src="https://img.freepik.com/free-photo/standard-quality-control-concept-m_23-2150041863.jpg?semt=ais_hybrid&w=740"
              alt="About Us"
              className="img-fluid rounded shadow-lg"
              style={{ borderRadius: '15px' }}
            />
          </div>

          <div className="col-md-6 order-md-1" data-aos="fade-right">
            <h1 className="display-4 mb-4 fw-bold text-primary">
              About <span className="text-dark">ServiceHub</span>
            </h1>
            <p className="lead fs-5 text-secondary">
              <strong>ServiceHub</strong> is your one-stop destination for finding reliable service providers.
              Whether you need a plumber, electrician, technician, or home cleaning — we connect you with verified professionals.
            </p>
            <p className="text-muted mb-4">
              Our mission is to make booking services simple, affordable, and secure for everyone.
              We bridge the gap between users and professionals through technology, ensuring quality and convenience at every step.
            </p>
          </div>
        </div>
      </div>

     
      <div className="text-center py-5 bg-dark text-white features-full-width">
        <div className="container">
          <h2 className="mb-5 display-5 fw-bold" data-aos="fade-up">Platform <span className="text-white">Features</span></h2>
          <div className="row justify-content-center">
            {[
              { id: 'trusted-pros', icon: "bi-person-check", label: "Trusted Professionals", description: "Verified and skilled experts at your service." },
              { id: 'quick-booking', icon: "bi-clock", label: "Quick Booking", description: "Schedule appointments in just a few clicks." },
              { id: 'affordable-pricing', icon: "bi-currency-rupee", label: "Affordable Pricing", description: "Transparent and competitive rates." },
            ].map((item, idx) => (
              <div
                className="col-lg-4 col-md-6 mb-4"
                key={item.id} 
                data-aos="zoom-in"
                data-aos-delay={idx * 150}
              >
                <div
                  className={`card h-100 shadow-sm border-0 feature-card bg-light ${clickedCardId === item.id ? 'card-clicked' : ''}`} // Changed to bg-light, added clicked class
                  style={{ borderRadius: '10px' }} 
                  onMouseEnter={e => {
                    e.currentTarget.style.transform = 'translateY(-5px)';
                    e.currentTarget.style.boxShadow = '0 10px 20px rgba(0, 0, 0, 0.15)';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 2px 5px rgba(0, 0, 0, 0.08)';
                  }}
                  onClick={() => handleCardClick(item.id)} 
                >
                  <div className="card-body text-center p-4">
                    <div className="icon-circle  d-inline-flex align-items-center justify-content-center mb-3">
                      <i className={`bi ${item.icon} fs-2 text-dark`}></i> 
                    </div>
                    <h5 className="card-title fw-bold mb-2 text-dark">{item.label}</h5> 
                    <p className="card-text text-secondary">{item.description}</p> 
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
