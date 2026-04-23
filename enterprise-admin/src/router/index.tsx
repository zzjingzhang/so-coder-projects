import React, { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import MainLayout from '../layouts/MainLayout';
import Loading from '../components/common/Loading';

const Login = lazy(() => import('../pages/Login'));
const Dashboard = lazy(() => import('../pages/Dashboard'));
const Users = lazy(() => import('../pages/Users'));
const Roles = lazy(() => import('../pages/Roles'));
const Products = lazy(() => import('../pages/Products'));
const Orders = lazy(() => import('../pages/Orders'));
const Content = lazy(() => import('../pages/Content'));
const Settings = lazy(() => import('../pages/Settings'));
const NotFound = lazy(() => import('../pages/NotFound'));

const PrivateRoute: React.FC<{ children: React.ReactNode; requiredPermission?: string }> = ({ 
  children, 
  requiredPermission 
}) => {
  const { isAuthenticated, hasMenuPermission } = useAuth();
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  if (requiredPermission && !hasMenuPermission(requiredPermission)) {
    return <Navigate to="/404" replace />;
  }
  
  return <>{children}</>;
};

const AppRouter: React.FC = () => {
  const { isAuthenticated } = useAuth();

  return (
    <BrowserRouter>
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route 
            path="/login" 
            element={isAuthenticated ? <Navigate to="/" replace /> : <Login />} 
          />
          
          <Route path="/" element={<MainLayout />}>
            <Route 
              index 
              element={
                <PrivateRoute requiredPermission="dashboard">
                  <Dashboard />
                </PrivateRoute>
              } 
            />
            
            <Route 
              path="users" 
              element={
                <PrivateRoute requiredPermission="users">
                  <Users />
                </PrivateRoute>
              } 
            />
            
            <Route 
              path="roles" 
              element={
                <PrivateRoute requiredPermission="roles">
                  <Roles />
                </PrivateRoute>
              } 
            />
            
            <Route 
              path="products" 
              element={
                <PrivateRoute requiredPermission="products">
                  <Products />
                </PrivateRoute>
              } 
            />
            
            <Route 
              path="orders" 
              element={
                <PrivateRoute requiredPermission="orders">
                  <Orders />
                </PrivateRoute>
              } 
            />
            
            <Route 
              path="content" 
              element={
                <PrivateRoute requiredPermission="content">
                  <Content />
                </PrivateRoute>
              } 
            />
            
            <Route 
              path="settings" 
              element={
                <PrivateRoute requiredPermission="settings">
                  <Settings />
                </PrivateRoute>
              } 
            />
            
            <Route path="404" element={<NotFound />} />
            <Route path="*" element={<Navigate to="/404" replace />} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default AppRouter;
