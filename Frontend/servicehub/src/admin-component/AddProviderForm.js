import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

export default function AddProviderForm() {
  const { register, handleSubmit, formState } = useForm();
  const navigateTo = useNavigate();
  const [categories, setCategories] = useState([]);


  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch("http://localhost:8080/services");
        const result = await res.json();
        setCategories(result.data || []);
      } catch (err) {
        console.error("Failed to fetch categories", err);
        alert("Failed to load categories");
      }
    };
    fetchCategories();
  }, []);

 
  const collectFormData = async (formData) => {
    const { categoryId, ...provider } = formData;

    try {
      const response = await fetch(`http://localhost:8080/providers/add/${categoryId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(provider)
      });

      if (response.ok) {
        alert("Provider added successfully!");
        navigateTo("/admin/providers/All"); 
      } else {
        const errorMessage = await response.text();
        console.error("Server Error:", errorMessage);
        alert("Failed to add provider. Server said: " + errorMessage);
      }
    } catch (err) {
      console.error("Network error submitting provider", err);
      alert("Something went wrong while submitting. Check console for details.");
    }
  };

  return (
    <div className="mt-4 d-flex flex-column align-items-center">
      <h3>Add New Provider</h3>
      <form className="w-50 mt-3 bg-light p-4 rounded" onSubmit={handleSubmit(collectFormData)}>

  
        <div className="mb-3">
          <input type="text" className="form-control" placeholder="Provider Name"
            {...register('name', { required: true, minLength: 3, maxLength: 30 })} />
          <div className="form-text text-danger text-center">
            {formState.errors.name?.type === 'required' && "Provider name is required"}
            {formState.errors.name?.type === 'minLength' && "Minimum 3 characters required"}
            {formState.errors.name?.type === 'maxLength' && "Maximum 30 characters allowed"}
          </div>
        </div>

     
        <div className="mb-3">
          <input type="text" className="form-control" placeholder="Contact"
            {...register('contact', { required: true, minLength: 5 })} />
          <div className="form-text text-danger text-center">
            {formState.errors.contact?.type === 'required' && "Contact is required"}
            {formState.errors.contact?.type === 'minLength' && "At least 5 characters required"}
          </div>
        </div>

        
        <div className='mb-3'>
          <input type="number" className='form-control' placeholder="ServiceCharges"
          {...register('serviceCharges', {required: true, min: 600, max: 5000})}/>
            <div className="form-text text-danger text-center">
            {formState.errors.serviceCharges?.type === 'required' && "Contact is required"}
            {formState.errors.serviceCharges?.type === 'min' && "At least 600 Charges "}
            {formState.errors.serviceCharges?.type === 'max' && "Maximum 5000 Charges"}
          </div>

        </div>

       
   

        
        <div className="mb-3">
          <select className="form-select"
            {...register('categoryId', { required: true })}>
            <option value=""> Select Service Category </option>
            {categories.map(cat => (
              <option key={cat.id} value={cat.id}>{cat.name}</option>
            ))}
          </select>
          <div className="form-text text-danger text-center">
            {formState.errors.categoryId?.type === 'required' && "Category is required"}
          </div>
        </div>

        <button type="submit" className="btn btn-success w-100">Submit</button>
      </form>
    </div>
  );
}
