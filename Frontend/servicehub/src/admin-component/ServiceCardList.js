import React, { useEffect, useState } from 'react';

export default function ServiceCardList() {
  const [categories, setCategories] = useState([]);

  const fetchCategories = async () => {
    const res = await fetch("http://localhost:8080/services"); 
    const result = await res.json();
    setCategories(result.data || []);
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div className='container mt-4'>
      <div className='row'>
        {categories.length === 0 ? (
          <p className='text-center'>No categories available.</p>
        ) : (
          categories.map((category) => (
            <div className='col-md-4 mb-3' key={category.id}>
              <div className='card h-100 shadow'>
                <div className='card-body text-center'>
                  <div style={{ fontSize: '2rem' }}>{category.icon}</div>
                  <h5 className='card-title mt-2'>{category.name}</h5>
                  <p className='card-text'>{category.description}</p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}