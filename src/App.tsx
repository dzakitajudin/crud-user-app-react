import React from 'react';
// import logo from './logo.svg';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/home';
import AddUser from './pages/addUser';
import EditUser from './pages/editUser';
import ViewUser from './pages/viewUser';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/addUser" element={<AddUser/>} />
        <Route path="/editUser/:id" element={<EditUser/>} />
        <Route path="/viewUser/:id" element={<ViewUser/>} />
      </Routes>
    </div>
  );
}

export default App;
