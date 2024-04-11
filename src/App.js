import React from 'react';
import { Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Employeetask from './pages/Employeetask';
import Signin from './pages/Auth/Signin';
import Signup from './pages/Auth/Signup';
import Emplyeedata from './pages/Employeedata'
function App() {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Employeetask />}></Route>
        <Route path='/signin' element={<Signin />}></Route>
        <Route path='/signup' element={<Signup />}></Route>
        <Route path='/empdetails' element={<Emplyeedata />}></Route>
      </Routes>
    </div>
  );
}

export default App;