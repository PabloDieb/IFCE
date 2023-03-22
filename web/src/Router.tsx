import { createBrowserRouter } from 'react-router-dom';
import AnnouncementsPage from './pages/Announcements/AnnouncementsPage';
import BookingsPage from './pages/Bookings/BookingsPage';

import AnnouncementsManagementPage from './pages/Admin/Announcements/AnnouncementsManagement';
import UsersManagementPage from './pages/Admin/Users/UsersManagement';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import HomePage from './pages/Home/Home';
import Layout from './components/Layout/Layout';
import AddBookingsPage from './pages/AddBookingsPage/AddBookingsPage';
import LoginPage from './pages/LoginPage/LoginPage';
import SemesterManagementPage from './pages/ManagementSemesterPage/ManagementSemesterPage';
import ClassroomsPage from './pages/ClassroomsPage/ClassroomsPage';
import CoursesPage from './pages/CoursesPage/CoursesPage';
import BookingSwapsManagementPage from './pages/BookingSwapsManagementPage/BookingSwapsManagementPage';

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
        path: "/login",
        element: <LoginPage />,
      },
      {
        element: <ProtectedRoute />,
        children: [
          {
            path: "/reservas",
            element: <BookingsPage />
          },
          {
            path: "/gerenciar-semestres",
            element: <SemesterManagementPage />
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
        ]
      }
    ]
  },
]);
//  const Router = (user: User | null | undefined) => createBrowserRouter([
//   {
//     path: "/",
//     element: <HomePage />,
//   },
//   {
//     path: "/avisos",
//     element: <AnnouncementsPage />,
//   },
//   {
//     path: "/signin",
//     element: <SignInPage />,
//   },
//   {
//     element: <ProtectedRoute user={user} />,
//     children: [
//       {
//         path: "/reservas",
//         element: <BookingsPage />
//       },
//       {
//         path: "/gerenciar-semestres",
//         element: <SemesterManagementPage />
//       },
//       {
//         path: "/gerenciar-salas",
//         element: <ClassroomsPage />,
//       },
//       {
//         path: "/gerenciar-cursos",
//         element: <CoursesPage />,
//       },
//       {
//         path: "/gerenciar-anuncios",
//         element: <AnnouncementsManagementPage />,
//       },
//       {
//         path: "/gerenciar-usuarios",
//         element: <UsersManagementPage />,
//       },
//       {
//         path: "/solicitacoes",
//         element: <BookingSwapsManagementPage />,
//       },
//       {
//         path: "/avisosl",
//         element: <AnnouncementsPage />,
//       },
//     ]
//   }
// ]);

export default Router;