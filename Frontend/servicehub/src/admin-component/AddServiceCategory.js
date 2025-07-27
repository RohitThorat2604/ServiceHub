import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

export default function AddServiceCategoryForm() {
  const { register, handleSubmit, formState } = useForm();
  const navigateTo = useNavigate();

  const onSubmit = async (formData) => {
    try {
      const response = await fetch("http://localhost:8080/services/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        alert("Service category added!");
        navigateTo("/admin/services"); 
      } else {
        const msg = await response.text();
        console.error("Server error:", msg);
        alert("Failed to add service: " + msg);
      }
    } catch (err) {
      console.error("Network error:", err);
      alert("Something went wrong");
    }
  };

  return (
    <div className="mt-4 d-flex flex-column align-items-center">
      <h3>Add New Service Category</h3>
      <form className="w-50 mt-3 bg-light p-4 rounded" onSubmit={handleSubmit(onSubmit)}>

        <div className="mb-3">
          <input type="text" className="form-control" placeholder="Category Name"
            {...register('name', { required: true, minLength: 3 })}
          />
          <div className="form-text text-danger text-center">
            {formState.errors.name?.type === 'required' && 'Name is required'}
            {formState.errors.name?.type === 'minLength' && 'Minimum 3 characters required'}
          </div>
        </div>

        <div className="mb-3">
          <textarea className="form-control" placeholder="Description"
            {...register('description', { required: true, minLength: 5 })}
          ></textarea>
          <div className="form-text text-danger text-center">
            {formState.errors.description?.type === 'required' && 'Description is required'}
            {formState.errors.description?.type === 'minLength' && 'Minimum 5 characters required'}
          </div>
        </div>

        <button type="submit" className="btn btn-success w-100">Submit</button>
      </form>
    </div>
  );
}
