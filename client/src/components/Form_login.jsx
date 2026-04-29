import React from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';
import { loginUser, getErrorMessage } from '../API/ProductApi';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function FormP() {
  const navigation = useNavigate();
  const [User, setUser] = useState({
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
    try {
        setError('');
        setLoading(true);
        const res = await loginUser(User);
        const token = res?.data?.token;
        if (!token) throw new Error('Missing token from server response');
        localStorage.setItem('token', token);
        navigation('/Events');
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
        {error ? <Alert variant="danger">{error}</Alert> : null}
    
        <Form.Group className="mb-3">
          <Form.Label>Your email address</Form.Label>
          <Form.Control type="email" placeholder="mo3ali@hotmail.com" name='email' value={User.email} onChange={changeHandler} required />
        </Form.Group>

        <Form.Group className="mb-3" >
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Enter an 8-charcter password" name='password' value={User.password} onChange={changeHandler} required />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicCheckbox">

        </Form.Group>
        <div className="d-flex w-100 justify-content-center gap-3 flex-rap" >
          <Button variant="primary" type="submit" className="fs-5 p-3 px-5" disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
          </Button>
          <Button variant="success" type="button" onClick={()=>{navigation('/')}} className="fs-5 p-2 px-4">
            I don't have an acount - Regist
          </Button>
        </div>
      </Form>
    </div>
  );
}
