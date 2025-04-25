import React, { useEffect, useState } from 'react';
import {
  GridComponent,
  ColumnsDirective,
  ColumnDirective,
  Resize,
  Sort,
  ContextMenu,
  Filter,
  Page,
  ExcelExport,
  PdfExport,
  Edit,
  Inject,
} from '@syncfusion/ej2-react-grids';
import { Header } from '../components';

const Task = () => {
  const [tasks, setTasks] = useState(() => {
    try {
      const storedTasks = JSON.parse(localStorage.getItem('tasks'));
      return Array.isArray(storedTasks) ? storedTasks : [];
    } catch (error) {
      console.error('Error loading tasks from localStorage:', error);
      return [];
    }
  });

  const [taskInput, setTaskInput] = useState({ title: '', description: '', priority: 'High' });
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [priorityFilter, setPriorityFilter] = useState('All');

  useEffect(() => {
    try {
      localStorage.setItem('tasks', JSON.stringify(tasks));
    } catch (error) {
      console.error('Error saving tasks to localStorage:', error);
    }
  }, [tasks]);

  const addOrUpdateTask = () => {
    if (!taskInput.title || !taskInput.priority) {
      alert('Title and Priority are required!');
      return;
    }

    if (editingTaskId !== null) {
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === editingTaskId ? { ...task, ...taskInput } : task
        )
      );
      setEditingTaskId(null);
    } else {
      const newTask = {
        ...taskInput,
        id: Date.now(),
        status: 'Pending',
      };
      setTasks([...tasks, newTask]);
    }

    setTaskInput({ title: '', description: '', priority: 'High' });
  };

  const toggleTaskStatus = (id) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id
          ? { ...task, status: task.status === 'Completed' ? 'Pending' : 'Completed' }
          : task
      )
    );
  };

  const deleteTask = (id) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
  };

  const filteredTasks =
    priorityFilter === 'All'
      ? tasks
      : tasks.filter((task) => task.priority === priorityFilter);

  const columns = [
    { field: 'title', headerText: 'Title', width: '150', textAlign: 'Center' },
    { field: 'description', headerText: 'Description', width: '200', textAlign: 'Center' },
    { field: 'priority', headerText: 'Priority', width: '100', textAlign: 'Center' },
    { field: 'status', headerText: 'Status', width: '100', textAlign: 'Center' },
    {
      field: 'actions',
      headerText: 'Actions',
      width: '180',
      textAlign: 'Center',
      template: (props) => (
        <div className="flex flex-col gap-2 items-center">
          <button
            className="w-full py-2 px-4 bg-yellow-400 text-white rounded-md hover:bg-yellow-300 transition-all duration-300"
            onClick={() => toggleTaskStatus(props.id)}
          >
            {props.status === 'Completed' ? 'Mark Pending' : 'Mark Completed'}
          </button>
          <button
            className="w-full py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-400 transition-all duration-300"
            onClick={() => {
              setTaskInput({
                title: props.title,
                description: props.description,
                priority: props.priority,
              });
              setEditingTaskId(props.id);
            }}
          >
            Edit
          </button>
          <button
            className="w-full py-2 px-4 bg-red-500 text-white rounded-md hover:bg-red-400 transition-all duration-300"
            onClick={() => deleteTask(props.id)}
          >
            Delete
          </button>
        </div>
      ),
    },
  ];

  const editing = { allowDeleting: true, allowEditing: true };

  return (
    <div className="m-6 bg-white rounded-xl p-8 shadow-lg">
      <Header category="Page" title="Task Management" />


      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-center text-gray-700 mb-4">
          {editingTaskId !== null ? 'Edit Task' : 'Add New Task'}
        </h2>
        <div className="space-y-4">
          <input
            className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            type="text"
            placeholder="Task Title"
            value={taskInput.title}
            onChange={(e) => setTaskInput({ ...taskInput, title: e.target.value })}
          />
          <textarea
            className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Task Description"
            value={taskInput.description}
            onChange={(e) => setTaskInput({ ...taskInput, description: e.target.value })}
          />
          <select
            className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={taskInput.priority}
            onChange={(e) => setTaskInput({ ...taskInput, priority: e.target.value })}
          >
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
          <button
            className="w-full p-4 bg-green-500 text-white rounded-lg hover:bg-green-400 transition-all duration-300"
            onClick={addOrUpdateTask}
          >
            {editingTaskId !== null ? 'Update Task' : 'Add Task'}
          </button>
        </div>
      </div>


      <div className="mb-6">
        <label className="block mb-2 font-semibold text-gray-700">Filter by Priority:</label>
        <select
          className="w-[20%] p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          value={priorityFilter}
          onChange={(e) => setPriorityFilter(e.target.value)}
        >
          <option value="All">All</option>
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>
      </div>


      <GridComponent
        id="taskGrid"
        dataSource={filteredTasks}
        allowPaging
        allowSorting
        allowExcelExport
        allowPdfExport
        contextMenuItems={['SortAscending', 'SortDescending', 'Copy']}
        editSettings={editing}
      >
        <ColumnsDirective>
          {columns.map((col, index) => (
            <ColumnDirective key={index} {...col} />
          ))}
        </ColumnsDirective>
        <Inject
          services={[Resize, Sort, ContextMenu, Filter, Page, ExcelExport, Edit, PdfExport]}
        />
      </GridComponent>
    </div>
  );
};

export default Task;
