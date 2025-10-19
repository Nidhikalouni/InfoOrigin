import React from 'react'
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar.jsx'
import HomePage from './Pages/HomePage.jsx'
import Login from './Pages/Login.jsx'
import SignUp from './Pages/Signup.jsx'
import Document from './Pages/Document.jsx'
import Footer from './components/Footer.jsx';
import { ToastContainer } from 'react-toastify';
import AddDoc from './Pages/AddDoc.jsx';
import DocumentDetailPage from './Pages/DocumentDetailPage.jsx';
import EditDoc from './Pages/EditDoc.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx'
import ReviewerPage from './Pages/ReviewerPage.jsx';
import AdminDashboard from './Pages/admin/AdminDashboard.jsx';
import AdminDocDetail from './Pages/admin/AdminDocDetail.jsx'
import AdminProtectedRoute from './components/admin/AdminProtectedRoute.jsx';
import ReviewerProtectedRoute from './components/ReviewerProtectedRoute.jsx';
import UserPage from './Pages/admin/UsersPage.jsx';
import DocumentPage from './Pages/admin/DocumentsPage.jsx';
const App = () => {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route
          path='/document'
          element={
            <ProtectedRoute>
              <Document />
            </ProtectedRoute>
          }
        />
        {/* <Route path='review' element={<ReviewerPage />} /> */}
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<SignUp />} />

<Route
  path="/admin"
  element={
    <AdminProtectedRoute roles = {['admin']}>
      <AdminDashboard />
    </AdminProtectedRoute>
  }
/>

<Route
  path="/admin/users"
  element={
    <AdminProtectedRoute roles = {['admin']}>
      <UserPage/>
    </AdminProtectedRoute>
  }
/>

<Route
  path="/admin/documents"
  element={
    <AdminProtectedRoute roles = {['admin']}>
      <DocumentPage/>
    </AdminProtectedRoute>
  }
/>
<Route
  path="/admin/documents/:id"
  element={
    <AdminProtectedRoute roles = {['admin']}>
      <AdminDocDetail/>
    </AdminProtectedRoute>
  }
/>

<Route
  path="/review"
  element={
    <ReviewerProtectedRoute>
      <ReviewerPage />
    </ReviewerProtectedRoute>
  }
/>


        
         {/* <Route path="/admin/users" element={<UsersPage />} /> */}
        {/* <Route path="/admin/documents" element={<DocumentsPage />} />
        <Route path="/admin/documents/:id" element={<AdminDocDetail />} /> */}
        <Route
          path='/addDoc'
          element={
            <ProtectedRoute>
              <AddDoc />
            </ProtectedRoute>
          }
        />
        <Route
          path="/document/:id"
          element={
            <ProtectedRoute>
              <DocumentDetailPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/editDoc/:id"
          element={
            <ProtectedRoute>
              <EditDoc />
            </ProtectedRoute>
          }
        />
      </Routes>
      <Footer />
      <ToastContainer />
    </div>
  )
}

export default App
