import './App.css';
import { Route, Routes, NavLink } from 'react-router-dom'
import Home from './Pages/Home';
import Chat from './Pages/Chat';
import Register from './Pages/Register';
import Login from './Pages/Login';
import { useState } from 'react';


function App() {
  const [loading, setLoading] = useState(false)
  const selectedHome = <Home/> ? true : false
  const selectedChat = <Chat/> ? true : false
  const selectedLogin = <Login/> ? true : false
  const selectedRegister = <Register/> ? true : false
  if (loading === true) {
    return (
      <div className="h-screen flex items-center justify-center bg-gray-100">
        <div className="spinner">
          <div className="bounce1"></div>
          <div className="bounce2"></div>
          <div className="bounce3"></div>
        </div>
      </div>
    )
  }
    return (
      <div className="bg-gray-100 h-screen font-sans">
        <nav className="bg-white flex items-center justify-between px-4 py-3 shadow-md">
          <NavLink className={ selectedHome ? "text-xl font-bold" : "px-4 py-2" } to="/">Home</NavLink>
          <NavLink className={ selectedChat ? "text-xl font-bold" : "px-4 py-2" } to="/Chat">Chat</NavLink>
          <NavLink className={ selectedLogin ? "text-xl font-bold" : "px-4 py-2" } to="/Login">Log In</NavLink>
          <NavLink className={ selectedRegister ? "text-xl font-bold" : "px-4 py-2" } to="/Register">Register</NavLink>
        </nav>
        <Routes>
          <Route path='/' element={<Home setLoading={setLoading} />} />
          <Route path='/Chat' element={<Chat setLoading={setLoading} />} />
          <Route path='/Register' element={<Register setLoading={setLoading} />} />
          <Route path='/LogIn' element={<Login setLoading={setLoading} />} />
        </Routes>
      </div>
    );
}

export default App;

