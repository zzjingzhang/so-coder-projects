import { createBrowserRouter } from 'react-router-dom';
import Layout from '../components/Layout';
import CompanyProfile from '../pages/CompanyProfile';
import DepartmentManagement from '../pages/DepartmentManagement';
import EmployeeManagement from '../pages/EmployeeManagement';
import SalaryManagement from '../pages/SalaryManagement';
import Settings from '../pages/Settings';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <CompanyProfile />,
      },
      {
        path: 'company-profile',
        element: <CompanyProfile />,
      },
      {
        path: 'departments',
        element: <DepartmentManagement />,
      },
      {
        path: 'employees',
        element: <EmployeeManagement />,
      },
      {
        path: 'salary',
        element: <SalaryManagement />,
      },
      {
        path: 'settings',
        element: <Settings />,
      },
    ],
  },
]);

export default router;
