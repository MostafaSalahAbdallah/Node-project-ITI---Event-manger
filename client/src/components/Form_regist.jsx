import React from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';
import { registerUser, getErrorMessage } from '../API/ProductApi';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from 'react-bootstrap/Card';

export default function FormP() {
  const navigation = useNavigate();
  const [User, setUser] = useState({
    name: '',
    email: '',
    password: ''
  })
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const changeHandler = (e) => {
    const { name, value } = e.target;
    setUser({ ...User, [name]: value });
  }

  const submittionHandler = async (e) => {
    e.preventDefault();

    // ✅ Password validation
    if (User.password.length < 8) {
      return setError("Password must be at least 8 characters.");
    }

    // ✅ Email validation
    const emailRegex = /^[a-zA-Z]+[a-zA-Z0-9._]*@[a-zA-Z]+\.(com)$/;
    if (!emailRegex.test(User.email)) {
      return setError("Email must contain letters and end with .com");
    }

    try {
      setError('');
      setLoading(true);

      await registerUser(User);

      alert("Registration Successfully!");
      navigation('/login');

    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Form data-bs-theme="dark" className="bg-dark text-light p-4 rounded shadow-sm border border-secondary"
        onSubmit={submittionHandler}>
        <Card.Title className="text-center info">Regist</Card.Title>
        {error ? <Alert variant="danger">{error}</Alert> : null}

        <Form.Group className="mb-3">
          <Form.Label>Your full name</Form.Label>
          <Form.Control type="text" placeholder="Mohamed Ali ...." name='name' value={User.name} onChange={changeHandler} required />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Your email address</Form.Label>
          <Form.Control type="email" placeholder="mo3ali@hotmail.com" name='email' value={User.email} onChange={changeHandler} required
            pattern="^[a-zA-Z]+[a-zA-Z0-9._]*@[a-zA-Z]+\.(com)$" />
        </Form.Group>

        <Form.Group className="mb-3" >
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Enter an 8-charcter password" name='password' value={User.password} onChange={changeHandler} required />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicCheckbox">

        </Form.Group>
        <div className="d-flex w-100 justify-content-center gap-3 flex-rap" >
          <Button variant="primary" type="submit" className="fs-5 p-3 px-5" disabled={loading}>
            {loading ? 'Registering...' : 'Regist'}
          </Button>
          <Button variant="success" type="button" onClick={() => { navigation('/login') }} className="fs-5 p-2 px-4">
            Already have an account - Login
          </Button>
        </div>
      </Form>
    </div>
  );
}
