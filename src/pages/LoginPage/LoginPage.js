// LoginPage.js
import React, { useState } from 'react';
import './LoginPage.scss';
import { useDispatch } from 'react-redux';
import { loginStart } from '../../store/authSlice'; // Correct import statement

const LoginPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      loginStart({
        name: name,
        email: email,
        password: password,
        loggedIn: true,
      })
    );
  };

  return (
    <div className="login">
      <form className="login_form" onSubmit={(e) => handleSubmit(e)}>
        <h1>Login</h1>
        <input type="name" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button type="submit" className="submit_btn">
          Submit
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
