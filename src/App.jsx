import { useContext } from "react"
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"

import FrontLayout from "./components/layout/front"
import HomePage from "./pages/HomePage"
import CategoryPage from "./pages/CategoryPage"
import AllPostsPage from "./pages/AllPostsPage"
import BlogPostsPage from "./pages/BlogPostsPage"
import AboutUsPage from "./pages/AboutUsPage"
import RegisterPage from "./pages/RegisterPage"
import LoginPage from "./pages/LoginPage"
import MyPostsPage from "./pages/MyPostsPage"
import AccountPage from "./pages/AccountPage"

import { AuthContext } from "./context/AuthContext";


import './App.css'
import 'react-toastify/dist/ReactToastify.css';
import NoutFound from "./pages/NoutFound"

function App() {
  const { isAuthenticated } = useContext(AuthContext);


  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<FrontLayout />}>
          <Route index element={<HomePage />} />
          <Route path="category/:categoryId" element={<CategoryPage />} />
          <Route path="posts" element={<AllPostsPage />} />
          <Route path="post/:postId" element={<BlogPostsPage />} />
          <Route path="about" element={<AboutUsPage />} />
          <Route path="register" element={<RegisterPage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="my-posts" element={isAuthenticated ? <MyPostsPage /> : <Navigate to='/login' />} />
          <Route path="account" element={isAuthenticated ? <AccountPage /> : <Navigate to='/login' />} />
          <Route path="*" element={<NoutFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
