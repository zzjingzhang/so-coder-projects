import { Routes, Route } from 'react-router-dom';
import { MainLayout } from '@/components/layout/MainLayout';
import { HomePage } from '@/pages/HomePage';
import { AppointmentPage } from '@/pages/AppointmentPage';
import { ConsultationPage } from '@/pages/ConsultationPage';
import { MedicalRecordsPage } from '@/pages/MedicalRecordsPage';
import { MedicinesPage } from '@/pages/MedicinesPage';
import { HealthRecordsPage } from '@/pages/HealthRecordsPage';
import { EmergencyPage } from '@/pages/EmergencyPage';

function App() {
  return (
    <MainLayout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/appointment" element={<AppointmentPage />} />
        <Route path="/consultation" element={<ConsultationPage />} />
        <Route path="/medical-records" element={<MedicalRecordsPage />} />
        <Route path="/medicines" element={<MedicinesPage />} />
        <Route path="/health-records" element={<HealthRecordsPage />} />
        <Route path="/emergency" element={<EmergencyPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </MainLayout>
  );
}

function NotFoundPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
      <h1 className="text-6xl font-bold text-primary mb-4">404</h1>
      <h2 className="text-2xl font-semibold text-text mb-2">页面未找到</h2>
      <p className="text-text-secondary mb-6">
        抱歉，您访问的页面不存在或已被移除。
      </p>
      <div className="flex gap-3">
        <a href="/" className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors">
          返回首页
        </a>
      </div>
    </div>
  );
}

export default App;
