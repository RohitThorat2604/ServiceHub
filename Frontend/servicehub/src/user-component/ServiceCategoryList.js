import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap-icons/font/bootstrap-icons.css';

export default function ServiceCategoryList() {
  const [categories, setCategories] = useState([]);

  const fetchCategories = async () => {
    try {
      const res = await fetch("http://localhost:8080/services");
      const data = await res.json();
      setCategories(data.data || []);
    } catch (err) {
      console.error("Failed to fetch categories", err);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);


  const iconMap = {
    plumbing: "bi-tools",
    electrician: "bi-lightning-charge",
    carpentry: "bi-hammer",
    homecleaning: "bi-bucket",
    acrepair: "bi-wind",
    computerrepair: "bi-laptop"
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Available Services</h2>
      <div className="row">
        {categories.map((cat) => {
        
          const normalizedKey = cat.name.replace(/\s+/g, "").toLowerCase();
          const iconClass = iconMap[normalizedKey] || "bi-gear"; 

          return (
            <div className="col-md-4 mb-4" key={cat.id}>
              <div className="card shadow-sm h-100">
                <div className="card-body text-center">
                  <i className={`bi ${iconClass} display-4 text-primary mb-3`}></i>
                  <h5>{cat.name}</h5>
                  <p>{cat.description}</p>
                  <Link to={`/user/providers/${cat.id}`} className="btn btn-outline-primary">
                    View Providers
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
