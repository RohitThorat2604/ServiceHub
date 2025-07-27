import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

export default function ProvidersByCategory() {
  const { categoryId } = useParams();
  const [providers, setProviders] = useState([]);
  const [categoryName, setCategoryName] = useState("");


  const fetchCategoryName = async () => {
    try {
      const res = await fetch(`http://localhost:8080/categories/${categoryId}`);
      const data = await res.json();
      setCategoryName(data.data?.name || "Unknown Category");
    } catch (err) {
      console.error("Failed to fetch category name", err);
    }
  };

 
  const fetchProvidersByCategory = async () => {
    try {
      const res = await fetch(`http://localhost:8080/providers/by-category/${categoryId}`);
      const data = await res.json();
      setProviders(data.data || []);
    } catch (err) {
      console.error("Failed to fetch providers", err);
    }
  };


  useEffect(() => {
    fetchCategoryName();
    fetchProvidersByCategory();
  }, [categoryId]);

  return (
    <div className="container mt-4">
      <h2>{categoryName} Providers</h2>
      <div className="row">
        {providers.map((p) => (
          <div className="col-md-4" key={p.id}>
            <div className="card shadow mb-4">
              <div className="card-body text-center">
                <h5>{p.name}</h5>
                <p>{p.contact}</p>
                <p>Charges: ₹{p.serviceCharges}</p>
                <Link
                  to={`/user/book/${categoryId}/${p.id}`}
                  className="btn btn-success"
                >
                  Book
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
