import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const EditProvider = () => {
  const { providerId } = useParams();
  const navigate = useNavigate();

  const [provider, setProvider] = useState({
    name: '',
    contact: '',
    serviceCharges: '',
    serviceCategory: { id: '' }, 
  });

  const [categories, setCategories] = useState([]);

  // Fetch provider by ID
  useEffect(() => {
    fetch(`http://localhost:8080/providers/${providerId}`)
      .then(res => res.json())
      .then(data => {
        if (data.data) {
          setProvider(data.data);
        }
      })
      .catch(err => console.error('Error fetching provider:', err));
  }, [providerId]);

  // Fetch categories
  useEffect(() => {
    fetch("http://localhost:8080/categories")
      .then(res => res.json())
      .then(data => {
        setCategories(data.data || []);
      })
      .catch(err => console.error('Error fetching categories:', err));
  }, []);

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProvider({ ...provider, [name]: value });
  };

  // Handle category change
  const handleCategoryChange = (e) => {
    setProvider({
      ...provider,
      serviceCategory: { id: parseInt(e.target.value) },
    });
  };

  // Submit update
  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(`http://localhost:8080/providers/${providerId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(provider),
    })
      .then(res => res.json())
      .then(() => {
        alert("Provider updated!");
        navigate("/admin/providers/All");
      })
      .catch(err => {
        console.error("Update error:", err);
        alert("Update failed!");
      });
  };

  return (
    <div className="container mt-4">
      <h2>Edit Provider</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Name:</label>
          <input
            name="name"
            value={provider.name}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>

        <div className="mb-3">
          <label>Contact:</label>
          <input
            name="contact"
            value={provider.contact}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>

        <div className="mb-3">
          <label>Service Charges:</label>
          <input
            type="number"
            name="serviceCharges"
            value={provider.serviceCharges}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>

        {/* <div className="mb-3">
          <label>Category:</label>
          <select
            className="form-select"
            value={provider.serviceCategory?.id || ""}
            onChange={handleCategoryChange}
            required
          >
            <option value="">-- Select Category --</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div> */}

        <button type="submit" className="btn btn-primary">Update</button>
      </form>
    </div>
  );
};

export default EditProvider;
