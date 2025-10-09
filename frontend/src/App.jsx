import React from 'react'
import {Routes,Route} from 'react-router-dom';
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
const App = () => {
  return (
    <div>
   <Navbar/>
   <Routes>
    <Route path='/' element={<HomePage/>}></Route>
    <Route path='/document' element={<Document/>}></Route>
    <Route path='/login' element={<Login/>}></Route>
    <Route path='/signup' element={<SignUp/>}></Route>
    <Route path='/addDoc'element={<AddDoc/>}></Route>
    <Route path="/document/:id" element={<DocumentDetailPage />} />
    <Route path="/editDoc/:id" element={<EditDoc />} />


   </Routes>
   <Footer/>
   <ToastContainer/>
    </div>
  )
}

export default App
