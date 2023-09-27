import { useContext } from "react"
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"

import FrontLayout from "./components/layout/front"

import HomePage from "./pages/public/HomePage"
import CategoryPage from "./pages/public/CategoryPage"
import AllPostsPage from "./pages/public/AllPostsPage"
import BlogPostsPage from "./pages/public/BlogPostsPage"
import AboutUsPage from "./pages/public/AboutUsPage"
import RegisterPage from "./pages/public/RegisterPage"
import LoginPage from "./pages/public/LoginPage"
import NoutFound from "./pages/public/NoutFound"

import MyPostsPage from "./pages/users/MyPostsPage"

import AccountPage from "./pages/common/AccountPage"

import DashboardPage from "./pages/admin/dashboard"
import UsersPage from "./pages/admin/users"
import CategoriesPage from "./pages/admin/category/CategoriesPage"
import AdminLayout from "./components/layout/admin"

import { AuthContext } from "./context/AuthContext";

import 'react-toastify/dist/ReactToastify.css';


import './App.css'

function App() {
  const { isAuthenticated, role } = useContext(AuthContext);


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

        {isAuthenticated && role === "admin" ? (
          <Route path="/" element={<AdminLayout />}>
            <Route path="dashboard" element={<DashboardPage />} />
            <Route path="categories" element={<CategoriesPage />} />
            <Route path="users" element={<UsersPage />} />
          </Route>
        ) : null}
      </Routes>
    </BrowserRouter>
  )
}

export default App
