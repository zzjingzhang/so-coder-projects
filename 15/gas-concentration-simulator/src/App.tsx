import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import ConstantVolumePage from './pages/ConstantVolumePage';
import ConstantPressurePage from './pages/ConstantPressurePage';

const App: React.FC = () => {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/constant-volume" element={<ConstantVolumePage />} />
        <Route path="/constant-pressure" element={<ConstantPressurePage />} />
      </Routes>
    </Layout>
  );
};

export default App;
