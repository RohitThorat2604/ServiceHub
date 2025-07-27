import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import 'bootstrap-icons/font/bootstrap-icons.css';

export default function AllProviders() {
  const [providers, setProviders] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");

  const categoryId = useParams();

  useEffect(() => {
    const fetchProviders = async () => {
      try {
        const url = categoryId.id === "All"
          ? "http://localhost:8080/providers"
          : `http://localhost:8080/providers/category/${categoryId.id}`;
        const res = await fetch(url);
        const data = await res.json();
        setProviders(data.data || []);
      } catch (err) {
        console.error("Failed to fetch providers:", err);
      }
    };

    fetchProviders();
  }, [categoryId.id]);

  const filtered = providers
    .filter((p) =>
      p.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) =>
      sortOrder === "asc"
        ? a.serviceCharges - b.serviceCharges
        : b.serviceCharges - a.serviceCharges
    );

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">All Service Providers</h2>

      <div className="row mb-4 justify-content-center">
        <div className="col-md-6 mb-2">
          <input
            type="text"
            placeholder="Search providers" 
            className="form-control shadow-sm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="col-md-4">
          <select
            className="form-select shadow-sm"
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
          >
            <option value="asc">Sort by Charges: Low to High</option>
            <option value="desc">Sort by Charges: High to Low</option>
          </select>
        </div>
      </div>

      <div className="row">
        {filtered.map((p) => (
          <div className="col-md-4 mb-4" key={p.id}>
            <div className="card h-100 shadow-sm border-0 hover-shadow">
              <div className="card-body text-center d-flex flex-column justify-content-between">
                <div>
                  <i className="bi bi-person-circle fs-1 text-primary mb-2"></i>
                  <h5 className="card-title fw-bold">{p.name}</h5>
                  <p className="card-text mb-1">
                    <i className="bi bi-telephone-fill me-2"></i> {p.contact}
                  </p>
                  <p className="card-text mb-1">
                    <i className="bi bi-cash-coin me-2"></i> ₹{p.serviceCharges}
                  </p>
                  <span className="badge bg-info text-dark">
                    {p.serviceCategory?.name || "N/A"}
                  </span>
                </div>

                <Link
                  to={`/user/book/${p.serviceCategory?.id}/${p.id}`}
                  className="btn btn-outline-success mt-3"
                >
                  Book Now
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
