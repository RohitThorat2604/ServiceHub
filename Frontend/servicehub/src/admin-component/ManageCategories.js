import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

export default function ManageCategories() {
  const [categories, setCategories] = useState([]);
  const [isDeleted, setIsDeleted] = useState(false);
   const navigate = useNavigate();

  const fetchCategories = async () => {
    try {
      const res = await fetch("http://localhost:8080/services");
      const result = await res.json();
      setCategories(result.data || []);
    } catch (err) {
      console.error("Error fetching categories", err);
      Swal.fire("Error", "Failed to load categories");
    }
  };

    const handleEdit = (id) => {
    navigate(`/admin/services/edit/${id}`);
  };

  const deleteCategory = async (categoryId) => {
    try {
      const res = await fetch(`http://localhost:8080/services/${categoryId}`, {
        method: "DELETE"
      });
      const result = await res.json();
      setIsDeleted(!isDeleted);

      Swal.fire({
        title: 'Deleted!',
        text: result.message,
        icon: 'success',
        confirmButtonText: 'OK'
      });
    } catch (err) {
      console.error("Error deleting category", err);
      Swal.fire("Error", "Failed to delete category", "error");
    }
  };

  useEffect(() => {
    fetchCategories();
  }, [isDeleted]);

  return (
    <div className="container mt-4">
      <div className="text-center mb-3">
        <Link to="/admin/services/add" className="btn btn-success">
          Add New Category
        </Link>
      </div>

      <h2 className="text-center">Manage Service Categories</h2>
      <table className="table table-bordered table-light text-center table-hover">
        <thead>
          <tr>
            <th>ID</th>
            <th>Category Name</th>
            <th>Description</th>
            <th colSpan={3}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {categories.length === 0 ? (
            <tr>
              <td colSpan="5">No categories found</td>
            </tr>
          ) : (
            categories.map(cat => (
              <tr key={cat.id}>
                <td>{cat.id}</td>
                <td>{cat.name}</td>
                <td>{cat.description}</td>
                <td><Link className="btn btn-warning btn-sm me-2" to={`/admin/providers/${cat.id}`}>
                    View </Link>
                </td>
                <td>
                  <button className="btn btn-danger" onClick={() => deleteCategory(cat.id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
