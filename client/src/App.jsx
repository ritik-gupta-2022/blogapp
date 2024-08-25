import React from 'react'
import {BrowserRouter, Routes , Route} from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import Dashboard from './pages/Dashboard'
import Projects from './pages/Projects'
import Header from './components/Header'
import FooterComp from './components/Footer'
import PrivateRoutes from './components/PrivateRoutes'
import OnlyAdminPrivateRoute from './components/OnlyAdminPrivateRoute'
import CreatePost from './pages/CreatePost'
import UpdatePost from './pages/UpdatePost'
import PostPage from './pages/PostPage'
import ScrollToTop from './components/ScrollToTop'

function App() {
  return (
    // browser router wraps the whole app to enable routing capability
    <BrowserRouter>
      {/* when page navigates this will make page open from top  */}
      <ScrollToTop/> 
      <Header/>
      {/* Routes renders the first route which matches with given path */}
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/about' element={<About/>}/>
        <Route path='/signin' element={<SignIn/>}/>
        <Route path='/signup' element={<SignUp/>}/>

        {/* dashboard route is protetced by PrivateRoutes component first it goes to PrivateRoutes if user is logged in it will render children component i.e Dashboard */}
        <Route path='' element={<PrivateRoutes/>}>
          <Route path='/dashboard' element={<Dashboard/>}/>
        </Route>

        {/* create-post route is proteced by OnlyAdminPrivateRoute component first it goes to OnlyAdminPrivateRoute if user is admin in it will render children component i.e CreatePost */}
        <Route path='' element={<OnlyAdminPrivateRoute/>}>
          <Route path='/create-post' element={<CreatePost/>}/>
          <Route path='/update-post/:postId' element={<UpdatePost/>} />
        </Route>

        <Route path='/projects' element={<Projects/>}/>
        <Route path='/post/:postSlug' element={<PostPage/>}/>
      </Routes>
      <FooterComp/>
    </BrowserRouter>
  )
}

export default App