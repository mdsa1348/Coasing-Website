import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './pages/Navbar';
import Home from './pages/home/Home';
import Blogs from './pages/blogs/blogs';
import Contact from './pages/home/footer/contact';
import Footer from './pages/home/footer/footer';
import AdminComments from './pages/UsersComents/usercoments';
import Comments from './pages/home/footer/userComent';
import MyCarousel from './pages/home/carosols/Carousel';
import Auth from './pages/Authentication/AuthPage';
import { AuthProvider, useAuth } from './pages/Authentication/AuthContext';
import About from './pages/home/about/body';
import AuthDemo from './pages/home/about/AuthDemo';
import GoogleLoginButton from './pages/home/about/GoogleLoginButton';

const ProtectedRoute = ({ element }) => {
  const { isAuthenticated } = useAuth();
  const userInfo = JSON.parse(localStorage.getItem('userInfo'));

  if (isAuthenticated || userInfo) {
    return element;
  }

  return <Navigate to="/auth" />;
};

function App() {
  const userInfo = JSON.parse(localStorage.getItem('userInfo'));

  if (!userInfo) {
    return (
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/auth" element={<Auth />} />
            <Route path="*" element={<Navigate to="/auth" />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    );
  }

  return (
    <AuthProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/blogs" element={<ProtectedRoute element={<Blogs />} />} />
          <Route path="/contact" element={<ProtectedRoute element={<Contact />} />} />
          <Route path="/comments" element={<ProtectedRoute element={<Comments />} />} />
          <Route path="/admincomments" element={<ProtectedRoute element={<AdminComments />} />} />
          <Route path="/mycarousel" element={<ProtectedRoute element={<MyCarousel />} />} />
          <Route path="/about" element={<ProtectedRoute element={<About />} />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/authDemo" element={<AuthDemo />} />
          <Route path="/googlelogin" element={<GoogleLoginButton  />} />

          <Route path="*" element={<Home />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
