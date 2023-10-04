import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import request from '../../server/Server';

const RegisterPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    username: '',
    password: '',
    confirmPassword: '',
  });

  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const validateForm = () => {
    if (formData.first_name.trim() === '') {
      setError('Please enter your first name.');
      return false;
    }
    if (formData.last_name.trim() === '') {
      setError('Please enter your last name.');
      return false;
    }
    if (formData.username.trim() === '') {
      setError('Please enter a username.');
      return false;
    }
    if (formData.password.trim() === '') {
      setError('Please enter a password.');
      return false;
    }
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match.');
      return false;
    }
    setError('');
    return true;
  };

  const register = async () => {
    if (validateForm()) {
      try {
        let res = await request.post('/auth/register', formData);
        navigate('/login')
        console.log(res);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    register();
  };

  return (
    <section className="register">
      <h1 className="register__title">Register</h1>
      <form className="register__form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="first_name"
          className="register__input"
          placeholder="Name"
          value={formData.first_name}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="last_name"
          className="register__input"
          placeholder="Surname"
          value={formData.last_name}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="username"
          className="register__input"
          placeholder="Username"
          value={formData.username}
          onChange={handleInputChange}
        />
        <input
          type="password"
          name="password"
          className="register__input"
          placeholder="Password"
          value={formData.password}
          onChange={handleInputChange}
        />
        <input
          type="password"
          name="confirmPassword"
          className="register__input"
          placeholder="Confirm password"
          value={formData.confirmPassword}
          onChange={handleInputChange}
        />
        {error && <p className="register__error">{error}</p>}
        <button type="submit" className="register__button">
          Register
        </button>
      </form>
    </section>
  );
};

export default RegisterPage;