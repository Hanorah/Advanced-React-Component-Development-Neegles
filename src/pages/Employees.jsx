import React, { useState } from 'react';
import { GridComponent, ColumnsDirective, ColumnDirective, Page, Selection, Inject, Edit, Toolbar, Sort, Filter } from '@syncfusion/ej2-react-grids';

const initialEmployeesData = [
  {
    EmployeeID: 1,
    Name: 'John Doe',
    Designation: 'Software Engineer',

    HireDate: new Date('2020-01-15'),
    ReportsTo: 'Jane Smith',
    Image: ''
  },
  {
    EmployeeID: 2,
    Name: 'Emily Clark',
    Designation: 'UI/UX Designer',

    HireDate: new Date('2019-05-23'),
    ReportsTo: 'Jane Smith',
    Image: ''
  }
];

const Employees = () => {
  const [employeesData, setEmployeesData] = useState(initialEmployeesData);
  const [formData, setFormData] = useState({
    EmployeeID: '',
    Name: '',
    Designation: '',

    HireDate: '',
    ReportsTo: '',
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
      setEmployeesData(employeesData.map(emp =>
        emp.EmployeeID === formData.EmployeeID ? formData : emp
      ));
    } else {
      setEmployeesData([
        ...employeesData,
        { ...formData, EmployeeID: employeesData.length + 1 }
      ]);
    }
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      EmployeeID: '',
      Name: '',
      Designation: '',

      HireDate: '',
      ReportsTo: '',
      Image: ''
    });
    setIsEditing(false);
  };

  const handleEdit = (employee) => {
    setFormData(employee);
    setIsEditing(true);
  };

  const handleDelete = (EmployeeID) => {
    setEmployeesData(employeesData.filter(emp => emp.EmployeeID !== EmployeeID));
    if (formData.EmployeeID === EmployeeID) resetForm();
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
        onClick={() => handleDelete(props.EmployeeID)}
        className="text-red-500 hover:underline text-sm"
      >
        Delete
      </button>
    </div>
  );

  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Employees</h1>
        <p className="text-gray-600 dark:text-gray-400">Manage your employee data and details</p>
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
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Designation</label>
            <input
              type="text"
              name="Designation"
              value={formData.Designation}
              onChange={handleChange}
              className="mt-1 w-full p-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:text-white"
              required
            />
          </div>
          <div>

          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Reports To</label>
            <input
              type="text"
              name="ReportsTo"
              value={formData.ReportsTo}
              onChange={handleChange}
              className="mt-1 w-full p-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:text-white"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Hire Date</label>
            <input
              type="date"
              name="HireDate"
              value={formData.HireDate}
              onChange={handleChange}
              className="mt-1 w-full p-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:text-white"
              required
            />
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
              {isEditing ? 'Update Employee' : 'Add Employee'}
            </button>
            <button type="button" onClick={resetForm} className="bg-gray-500 text-white px-4 py-2 rounded-md">
              Cancel
            </button>
          </div>
        </div>
      </form>

      {/* Grid */}
      <GridComponent
        dataSource={employeesData}
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
          <ColumnDirective field="Designation" headerText="Designation" width="150" textAlign="Left" />
          <ColumnDirective field="HireDate" headerText="Hired Date" width="130" textAlign="Center" format="yMd" type="date" />
          <ColumnDirective field="ReportsTo" headerText="Reports To" width="150" textAlign="Left" />
          <ColumnDirective headerText="Actions" width="120" textAlign="Center" template={actionTemplate} />
        </ColumnsDirective>
        <Inject services={[Page, Selection, Toolbar, Edit, Sort, Filter]} />
      </GridComponent>
    </div>
  );
};

export default Employees;
