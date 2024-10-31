import { Route, BrowserRouter, Routes } from 'react-router-dom'
import HomePage from './components/Home/HomePage'
import './App.css'
import PublicNavbar from './components/NavBar/PublicNavBar'
import Login from './components/Users/Login'
import Register from './components/Users/Register'
import PrivateNavbar from './components/NavBar/PrivateNavBar'
import { useSelector } from 'react-redux'
import AddCategory from './components/Category/AddCategory'
import CategoriesList from './components/Category/CategoryList'
import UpdateCategory from './components/Category/UpdateCategory'
import TransactionForm from './components/Transactions/TransactionForm'
import TransactionList from './components/Transactions/TransactionList'
import UserProfile from './components/Users/UserProfile'
import { AuthRoute } from './components/Auth/AuthRoute'

function App() {
  const user = useSelector((state) => state?.auth?.user)
  return (
    <BrowserRouter>
      {user ? <PrivateNavbar /> : <PublicNavbar />}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/add-category" element={
          <AuthRoute>
            <AddCategory />
          </AuthRoute>
        } />
        <Route path="/update-category/:id" element={
          <AuthRoute>
            <UpdateCategory />
          </AuthRoute>
        } />
        <Route path="/categories" element={
          <CategoriesList />
        } />
        <Route path="/add-transaction" element={
          <AuthRoute>
            <TransactionForm />
          </AuthRoute>
        } />
        <Route path="/dashboard" element={
          <AuthRoute>
            <TransactionList />
          </AuthRoute>
        } />
        <Route path="/profile" element={
          <AuthRoute>
            <UserProfile />
          </AuthRoute>
        } />
      </Routes>
    </BrowserRouter>
  )
}

export default App
