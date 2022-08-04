import { Routes, Route } from 'react-router-dom';
import './App.scss';
import React from 'react';
import { Users } from './components/Users';
import { User } from './components/User';
import { EditUser } from './components/EditUser';

export function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Users />} />
        <Route path="/users" element={<Users />} />
        <Route path="/user" element={<User />} />
        <Route path="/addedituser" element={<EditUser />} />
      </Routes>
    </div>
  );
}
