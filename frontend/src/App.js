import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './services/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import HomePage from './pages/HomePage';
import Services from './pages/Services';
import About from './pages/About';
import ContactPage from './pages/ContactPage';
import Login from './pages/Login';
import Signup from './pages/Signup';
import ForgotPassword from './pages/ForgotPassword';
import Dashboard from './pages/Dashboard';
import DashboardOverview from './pages/DashboardOverview';
import Leads from './pages/Leads';
import Clients from './pages/Clients';
import Tasks from './pages/Tasks';
import Attendance from './pages/Attendance';
import Notifications from './pages/Notifications';
import UserManagement from './pages/UserManagement';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/services" element={<Services />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          >
            <Route index element={<Navigate to="overview" />} />
            <Route path="overview" element={<DashboardOverview />} />
            <Route path="leads" element={<ProtectedRoute adminOnly><Leads /></ProtectedRoute>} />
            <Route path="clients" element={<Clients />} />
            <Route path="tasks" element={<Tasks />} />
            <Route path="attendance" element={<Attendance />} />
            <Route path="notifications" element={<Notifications />} />
            <Route path="users" element={<UserManagement />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
