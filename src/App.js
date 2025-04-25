import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { FiSettings } from 'react-icons/fi';
import { TooltipComponent } from '@syncfusion/ej2-react-popups';
import Login from './pages/Login';
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './ProtectedRoute';

import { Navbar, Footer, Sidebar, ThemeSettings } from './components';
import { Home, Task, Calendar, Employees, Stacked, Pyramid, Customers, Line, Area, Bar, Pie, ColorPicker, ColorMapping, Editor } from './pages';
import './App.css';

import { useStateContext } from './contexts/ContextProvider';

const App = () => {
  const { setCurrentColor, setCurrentMode, currentMode, activeMenu, currentColor, themeSettings, setThemeSettings } = useStateContext();

  useEffect(() => {
    const currentThemeColor = localStorage.getItem('colorMode');
    const currentThemeMode = localStorage.getItem('themeMode');
    if (currentThemeColor && currentThemeMode) {
      setCurrentColor(currentThemeColor);
      setCurrentMode(currentThemeMode);
    }
  },);

  return (
    <div className={currentMode === 'Dark' ? 'dark' : ''}>
      <AuthProvider>
        <BrowserRouter>
          <div className="flex relative dark:bg-main-dark-bg">
            <div className="fixed right-4 bottom-4" style={{ zIndex: '1000' }}>
              <TooltipComponent content="Settings" position="Top">
                <button
                  type="button"
                  onClick={() => setThemeSettings(true)}
                  style={{ background: currentColor, borderRadius: '50%' }}
                  className="text-3xl text-white p-3 hover:drop-shadow-xl hover:bg-light-gray"
                >
                  <FiSettings />
                </button>
              </TooltipComponent>
            </div>

            {activeMenu ? (
              <div className="w-72 fixed sidebar dark:bg-secondary-dark-bg bg-white">
                <Sidebar />
              </div>
            ) : (
              <div className="w-0 dark:bg-secondary-dark-bg">
                <Sidebar />
              </div>
            )}

            <div
              className={
                activeMenu
                  ? 'dark:bg-main-dark-bg bg-main-bg min-h-screen md:ml-72 w-full'
                  : 'bg-main-bg dark:bg-main-dark-bg w-full min-h-screen flex-2'
              }
            >
              <div className="fixed md:static bg-main-bg dark:bg-main-dark-bg navbar w-full">
                <Navbar />
              </div>
              <div>
                {themeSettings && <ThemeSettings />}

                <Routes>
                  {/* Public Route */}
                  <Route path="/Login" element={<Login />} />

                  {/* Protected Routes */}
                  <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
                  <Route path="/home" element={<ProtectedRoute><Home /></ProtectedRoute>} />
                  <Route path="/Task" element={<ProtectedRoute><Task /></ProtectedRoute>} />
                  <Route path="/employees" element={<ProtectedRoute><Employees /></ProtectedRoute>} />
                  <Route path="/customers" element={<ProtectedRoute><Customers /></ProtectedRoute>} />

                  <Route path="/editor" element={<ProtectedRoute><Editor /></ProtectedRoute>} />
                  <Route path="/calendar" element={<ProtectedRoute><Calendar /></ProtectedRoute>} />
                  <Route path="/color-picker" element={<ProtectedRoute><ColorPicker /></ProtectedRoute>} />
                  <Route path="/line" element={<ProtectedRoute><Line /></ProtectedRoute>} />
                  <Route path="/area" element={<ProtectedRoute><Area /></ProtectedRoute>} />
                  <Route path="/bar" element={<ProtectedRoute><Bar /></ProtectedRoute>} />
                  <Route path="/pie" element={<ProtectedRoute><Pie /></ProtectedRoute>} />
                  <Route path="/color-mapping" element={<ProtectedRoute><ColorMapping /></ProtectedRoute>} />
                  <Route path="/pyramid" element={<ProtectedRoute><Pyramid /></ProtectedRoute>} />
                  <Route path="/stacked" element={<ProtectedRoute><Stacked /></ProtectedRoute>} />
                </Routes>

              </div>

              <Footer />
            </div>
          </div>
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
};

export default App;
