import React, { useState } from 'react';
import { GridComponent, ColumnsDirective, ColumnDirective, Page, Selection, Inject, Edit, Toolbar, Sort, Filter } from '@syncfusion/ej2-react-grids';

const initialCustomersData = [
  {
    CustomerID: 1,
    Name: 'Acme Corp',
    Email: 'contact@acme.com',
    Country: 'USA',
    Status: 'Active',
    Image: ''
  },
  {
    CustomerID: 2,
    Name: 'Globex Inc',
    Email: 'info@globex.com',
    Country: 'Canada',
    Status: 'Inactive',
    Image: ''
  }
];

const Customers = () => {
  const [customersData, setCustomersData] = useState(initialCustomersData);
  const [formData, setFormData] = useState({
    CustomerID: '',
    Name: '',
    Email: '',
    Country: '',
    Status: '',
    Image: ''
  });
  const [isEditing, setIsEditing] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setFormData({ ...formData, Image: reader.result });
    };
    if (file) reader.readAsDataURL(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEditing) {
      setCustomersData(customersData.map(c =>
        c.CustomerID === formData.CustomerID ? formData : c
      ));
    } else {
      setCustomersData([
        ...customersData,
        { ...formData, CustomerID: customersData.length + 1 }
      ]);
    }
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      CustomerID: '',
      Name: '',
      Email: '',
      Country: '',
      Status: '',
      Image: ''
    });
    setIsEditing(false);
  };

  const handleEdit = (customer) => {
    setFormData(customer);
    setIsEditing(true);
  };

  const handleDelete = (CustomerID) => {
    setCustomersData(customersData.filter(c => c.CustomerID !== CustomerID));
    if (formData.CustomerID === CustomerID) resetForm();
  };

  const imageTemplate = (props) => (
    <div className="flex justify-center items-center">
      {props.Image ? (
        <img src={props.Image} alt={props.Name} className="w-10 h-10 rounded-full object-cover" />
      ) : (
        <div className="w-10 h-10 bg-gray-200 rounded-full" />
      )}
    </div>
  );

  const actionTemplate = (props) => (
    <div className="flex gap-2 justify-center">
      <button
        onClick={() => handleEdit(props)}
        className="text-blue-500 hover:underline text-sm"
      >
        Edit
      </button>
      <button
        onClick={() => handleDelete(props.CustomerID)}
        className="text-red-500 hover:underline text-sm"
      >
        Delete
      </button>
    </div>
  );

  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Customers</h1>
        <p className="text-gray-600 dark:text-gray-400">Manage your customer data and details</p>
      </div>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="grid md:grid-cols-2 gap-6 bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm mb-10"
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Name</label>
            <input
              type="text"
              name="Name"
              value={formData.Name}
              onChange={handleChange}
              className="mt-1 w-full p-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:text-white"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
            <input
              type="email"
              name="Email"
              value={formData.Email}
              onChange={handleChange}
              className="mt-1 w-full p-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:text-white"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Country</label>
            <input
              type="text"
              name="Country"
              value={formData.Country}
              onChange={handleChange}
              className="mt-1 w-full p-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:text-white"
              required
            />
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Status</label>
            <select
              name="Status"
              value={formData.Status}
              onChange={handleChange}
              className="mt-1 w-full p-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:text-white"
              required
            >
              <option value="">Select Status</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Upload Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="mt-1 w-full p-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:text-white"
              required={!isEditing && !formData.Image}
            />
          </div>

          <div className="flex gap-4">
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md">
              {isEditing ? 'Update Customer' : 'Add Customer'}
            </button>
            <button type="button" onClick={resetForm} className="bg-gray-500 text-white px-4 py-2 rounded-md">
              Cancel
            </button>
          </div>
        </div>
      </form>

      {/* Grid */}
      <GridComponent
        dataSource={customersData}
        enableHover={true}
        allowPaging
        pageSettings={{ pageCount: 5 }}
        selectionSettings={{ persistSelection: true }}
        editSettings={{ allowDeleting: true, allowEditing: true }}
        allowSorting
      >
        <ColumnsDirective>
          <ColumnDirective headerText="Photo" width="120" textAlign="Center" template={imageTemplate} />
          <ColumnDirective field="Name" headerText="Name" width="150" textAlign="Left" />
          <ColumnDirective field="Email" headerText="Email" width="180" textAlign="Left" />
          <ColumnDirective field="Country" headerText="Country" width="130" textAlign="Left" />
          <ColumnDirective field="Status" headerText="Status" width="100" textAlign="Center" />
          <ColumnDirective headerText="Actions" width="120" textAlign="Center" template={actionTemplate} />
        </ColumnsDirective>
        <Inject services={[Page, Selection, Toolbar, Edit, Sort, Filter]} />
      </GridComponent>
    </div>
  );
};

export default Customers;
