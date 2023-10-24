import React from 'react'
import "./App.css"
// import Post from './Post'
// import Header from './Header'
import Login from './pages/Login'
import {Routes,Route} from 'react-router-dom'
import Layout from './Layout'
import IndexPage from './pages/IndexPage'
import Register from './pages/Register'
import { UserContextProvider } from './UserContext'
import CreatePost from './pages/CreatePost'
import PostPage from './pages/PostPage'
import EditPost from './pages/EditPost'
import ProfilePage from './pages/ProfilePage'
const App = () => {
  return (
    <UserContextProvider>
    <Routes>
      <Route path='/' element={<Layout/>}>
      <Route index element={
        <IndexPage/>
      } />
      <Route path='/login' element={<Login/>} />
      <Route path='/register' element={<Register/>} />
      <Route path='/create' element={<CreatePost/>} />
      <Route path='/post/:id' element={<PostPage/>} />
      <Route path='/edit/:id' element={<EditPost/>} />
      <Route path='/profile/:id' element={<ProfilePage/>} ></Route>

      </Route>
    </Routes>
    </UserContextProvider>
  )
}

export default App