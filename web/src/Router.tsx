import { createBrowserRouter } from 'react-router-dom';
import AnnouncementsPage from './pages/Announcements/AnnouncementsPage';
import BookingsPage from './pages/Bookings/BookingsPage';

import AnnouncementsManagementPage from './pages/Admin/Announcements/AnnouncementsManagement';
import UsersManagementPage from './pages/Admin/Users/UsersManagement';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import Layout from './components/Layout/Layout';
import AddBookingsPage from './pages/Admin/AddBookingsPage/AddBookingsPage';
import LoginPage from './pages/LoginPage/LoginPage';
import ClassroomsPage from './pages/ClassroomsPage/ClassroomsPage';
import CoursesPage from './pages/CoursesPage/CoursesPage';
import BookingSwapsManagementPage from './pages/BookingSwapsManagementPage/BookingSwapsManagementPage';
import HomePage from './pages/Home/HomePage';
import AdminProtectedRoute from './components/AdminProtectedRoute/AdminProtectedRoute';
import ProfessorProtectedRoute from './components/ProfessorProtectedRoute.tsx/ProfessorProtectedRoute';
import SignUpPage from './pages/SignUpPage/SignUp/SignUp';

 const Router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/avisos",
        element: <AnnouncementsPage />,
      },
      {
        path: "/signin",
        element: <LoginPage />,
      },
      {
        path: "/signup",
        element: <SignUpPage />,
      },
      {
        element: <AdminProtectedRoute />,
        children: [
          {
            path: "/gerenciar-salas",
            element: <ClassroomsPage />,
          },
        ]
      },
      {
        element: <ProfessorProtectedRoute />,
        children: [
          {
            path: "/reservas",
            element: <BookingsPage />
          },
        ]
      },
      {
        element: <ProtectedRoute />,
        children: [
        {
          path: "/reservas",
          element: <BookingsPage />
        },
        {
          path: "/gerenciar-salas",
          element: <ClassroomsPage />,
        },
        {
          path: "/gerenciar-cursos",
          element: <CoursesPage />,
        },
        {
          path: "/gerenciar-anuncios",
          element: <AnnouncementsManagementPage />,
        },
        {
          path: "/gerenciar-usuarios",
          element: <UsersManagementPage />,
        },
        {
          path: "/cadastrar-horarios",
          element: <AddBookingsPage />,
        },
        {
          path: "/solicitacoes",
          element: <BookingSwapsManagementPage />,
        },
        {
          path: "/avisosl",
          element: <AnnouncementsPage />,
        },
        {
          path: "/users",
          element: <UsersManagementPage />,
        },
        ]
      }
    ]
  },
], {
  basename: "/IFCE",
});

export default Router;