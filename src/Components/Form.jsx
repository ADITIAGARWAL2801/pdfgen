import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Form = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    RollNo: "",
    MobileNo: "",
    Address: ""
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: "" }); // Clear errors on change
  }

  const validate = () => {
    let formErrors = {};

    // Name Validation - Required and Alphabet Only
    if (!formData.name.trim()) {
      formErrors.name = "Name is required";
    } else if (!/^[A-Za-z\s]+$/.test(formData.name)) {
      formErrors.name = "Name can only contain alphabets";
    }

    // Email Validation
    if (!formData.email) {
      formErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      formErrors.email = "Email is invalid";
    }

    // Roll No. Validation
    if (!formData.RollNo) {
      formErrors.RollNo = "Roll No. is required";
    } else if (isNaN(formData.RollNo)) {
      formErrors.RollNo = "Roll No. must be a number";
    }

    // Mobile No. Validation
    if (!formData.MobileNo) {
      formErrors.MobileNo = "Mobile No. is required";
    } else if (!/^\d{10}$/.test(formData.MobileNo)) {
      formErrors.MobileNo = "Mobile No. must be a 10-digit number";
    }

    // Address Validation
    if (!formData.Address.trim()) {
      formErrors.Address = "Address is required";
    }

    return formErrors;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formErrors = validate();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    try {
      await fetch("http://localhost:5000/forms", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      navigate('/data');
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-md">
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">Fill in Your Details</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="text"
              name="name"
              placeholder="Name"
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
              onChange={handleChange}
            />
            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
          </div>
          <div>
            <input
              type="email"
              name="email"
              placeholder="Email"
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
              onChange={handleChange}
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
          </div>
          <div>
            <input
              type="number"
              name="RollNo"
              placeholder="Roll No."
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
              onChange={handleChange}
            />
            {errors.RollNo && <p className="text-red-500 text-sm mt-1">{errors.RollNo}</p>}
          </div>
          <div>
            <input
              type="number"
              name="MobileNo"
              placeholder="Mobile No."
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
              onChange={handleChange}
            />
            {errors.MobileNo && <p className="text-red-500 text-sm mt-1">{errors.MobileNo}</p>}
          </div>
          <div>
            <input
              type="text"
              name="Address"
              placeholder="Address"
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
              onChange={handleChange}
            />
            {errors.Address && <p className="text-red-500 text-sm mt-1">{errors.Address}</p>}
          </div>
          <input
            type="submit"
            value="Submit"
            className="w-full py-3 bg-orange-500 text-white rounded-md hover:bg-orange-600 cursor-pointer transition duration-300"
          />
        </form>
        <button
          onClick={() => navigate('/data')}
          className="mt-4 w-full py-3 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition duration-300"
        >
          View Table
        </button>
      </div>
    </div>
  )
}

export default Form;

