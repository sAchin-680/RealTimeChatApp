import { useState } from 'react';
import axios from 'axios';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/auth/login', { email, password });
    } catch (error) {
      console.error(('Login Error : ', error.response.data));
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <input
        type='email'
        placeholder='Email'
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        type='password'
        placeholder='Password'
        value={email}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button type='submit'>Login</button>
    </form>
  );
};

export default Login;
