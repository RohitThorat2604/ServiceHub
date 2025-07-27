import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../UserHome.css';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import FaqAccordion from './FaqAccordion';



const UserHome = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  const imageMap = {
    "carpentry": "/Images/Carpentry.jpg",
    "ac repair": "/Images/Acrepair.jpg",
    "plumbing": "/Images/Plumbing.jpg",
    "computer repair": "/Images/Computerrepair.jpg",
    "home cleaning": "/Images/Cleaning.jpg"
  };

  const fetchServices = async () => {
    try {
      const res = await fetch("http://localhost:8080/services");
      const result = await res.json();
      setServices(result.data || []);
    } catch (err) {
      console.error("Failed to fetch services:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);


  const carouselSettings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000, 
    fade: true, 
    cssEase: "linear",
    pauseOnHover: true,
    arrows: false
  };


  let content;

  if (loading) {
    content = <p className="loading-text">Loading amazing services for you...</p>;
  } else if (services.length === 0) {
    content = <p className="no-services-text">No services available at the moment. Please check back later!</p>;
  } else {
    content = (
      <div className="services-grid">
        {services.slice(0, 3).map((service) => {
          const key = service.name.toLowerCase();
          const imagePath = imageMap[key] || "/Images/default.jpg";

          return (
            <div className="service-card" key={service.id}>
              <div className="service-card-image-wrapper">
                <img
                  src={imagePath}
                  alt={service.name}
                  className="service-card-image"
                />
              </div>
              <div className="service-card-content">
                <h3 className="service-card-title">{service.name}</h3>
                <p className="service-card-description">{service.description}</p>
                <Link
                  to={`/user/providers/${service.id}`}
                  className="service-card-link"
                >
                  View Providers <span className="arrow-icon">&rarr;</span>
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    );
  }

  return (

 <div className="user-home-container">
    <section className="hero-section">
      <Slider {...carouselSettings}>
        <div className="hero-slide">
          
          <img src="/Images/Bgimage1.jpg" alt="Welcome to our services" className="hero-slide-image" />
          <div className="hero-content">
            <h1>Your Trusted Home Service Partner</h1>
            <p>Experience hassle-free home services with just a few clicks. Quality guaranteed!</p>
            {/* <div className="hero-cta-buttons">
              <Link to="/user/services" className="btn-primary-cta">Explore Services</Link>
              <Link to="/contact" className="btn-secondary-cta">Contact Us</Link>
            </div> */}
          </div>
        </div>
        <div className="hero-slide">
        
          <img src="/Images/Bgimage2.jpg" alt="Skilled professionals" className="hero-slide-image" />
          <div className="hero-content">
            <h1>Connecting You with Top Professionals</h1>
            <p>Find verified and skilled workers for every need, right at your doorstep.</p>
            {/* <div className="hero-cta-buttons">
              <Link to="/user/services" className="btn-primary-cta">Find a Pro</Link>
              <Link to="/about" className="btn-secondary-cta">Learn More</Link>
            </div> */}
          </div>
        </div>
        <div className="hero-slide">
       
          <img src="/Images/Bgimage3.jpg" alt="Easy booking, reliable service" className="hero-slide-image" />
          <div className="hero-content">
            <h1>Book Services with Ease</h1>
            <p>Simple booking process, reliable service, and transparent pricing. Your satisfaction is our priority.</p>
            {/* <div className="hero-cta-buttons">
              <Link to="/user/services" className="btn-primary-cta">Book Now</Link>
              <Link to="/faq" className="btn-secondary-cta">FAQs</Link>
            </div> */}
          </div>
        </div>
      </Slider>
    </section>
   

      <section className="services-section">
        <div className="section-header">
          <h2>Popular Services</h2>
          <p>Get this  Services By Our Workers.</p>
        </div>

        {content}
      </section>


      <FaqAccordion/>
    </div>
  );
};

export default UserHome;
