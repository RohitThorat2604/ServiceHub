import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';

export default function ManageProviders() {
  const [providers, setProviders] = useState([]);
  const navigate = useNavigate(); 

  let urlValue=useParams()
  

  const fetchProviders = async () => {    
    if(urlValue.categoryId ==="All"){
    try {
      const res = await fetch("http://localhost:8080/providers");
      const result = await res.json();
      setProviders(result.data || []);
      console.log(result.data);
      
    } catch (err) {
      console.error("Error fetching providers", err);
      Swal.fire("Error", "Failed to load providers", "error");
    }
    }
    else{
      try {
      const res = await fetch(`http://localhost:8080/providers/category/${urlValue.categoryId}`);
      const result = await res.json();
      setProviders(result.data || []);
    } catch (err) {
      console.error("Error fetching providers", err);
      Swal.fire("Error", "Failed to load providers", "error");
    }
    }
  };

  useEffect(() => {
    fetchProviders();
  }, [urlValue.categoryId]);

  const deleteProvider = async (id) => {
    const confirm = await Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this provider!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!'
    });

    if (confirm.isConfirmed) {
      try {
        const res = await fetch(`http://localhost:8080/providers/${id}`, {
          method: 'DELETE'
        });
        const result = await res.json();
        Swal.fire("Deleted!", result.message || "Provider deleted successfully", "success");
        fetchProviders();
      } catch (err) {
        console.error("Error deleting provider", err);
        Swal.fire("Error", "Failed to delete provider", "error");
      }
    }
  };

  // const handleEdit = (id) => {
  //   navigate(`/admin/providers/edit/${id}`); 
  // };

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">All Service Providers</h2>

      <div className="text-center mb-3">
        <Link to="/admin/providers/add" className="btn btn-primary">
          Add New Provider
        </Link>
      </div>

      <table className="table table-bordered text-center">
        <thead className="table-dark">
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Contact</th>
            <th>serviceCharges</th>
            <th>Category</th>
            <th colSpan={2}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {providers.length === 0 ? (
            <tr>
              <td colSpan="6">No providers found</td>
            </tr>
          ) : (
            providers.map(p => (
              <tr key={p.id}>
                <td>{p.id}</td>
                <td>{p.name}</td>
                <td>{p.contact}</td>
                <td>{p.serviceCharges}</td>
                <td>{p.serviceCategory?.name}</td>
                <td>  
                   
                    <Link to={`/admin/edit-provider/${p.id}`} className="btn btn-sm btn-warning">
                       Edit
                     </Link>

                 </td>
                 <td>
                   <button onClick={() => deleteProvider(p.id)} className="btn btn-danger btn-sm">
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
