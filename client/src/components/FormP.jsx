import React from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';
import { createProduct, updateProduct, getProductById, getErrorMessage,getCategories } from '../API/ProductApi';
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';


export default function FormP() {
  const navigation = useNavigate();
  //? Category
  const [categories, setCategories] = useState([]);
  useEffect(() => {
  const fetchCategories = async () => {
    try {
      const res = await getCategories();
      setCategories(res.data.categories);
    } catch (err) {
      console.log(err);
    }
  };

  fetchCategories();
}, []);
  const { id } = useParams();
  const [event, setEvent] = useState({
    title: '',
    description: '',
    date: '',
    category: '',
    Limit: 1
  });

  //? Fetching old data if needed
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  useEffect(() => {
    if (id && id !== "0") {
      const fetchEvent = async () => {
        try {
          setError('');
          const res = await getProductById(id);
          const data = res.data.event;
          setEvent({
            title: data?.title ?? '',
            description: data?.description ?? '',
            date: data?.date ? new Date(data.date).toISOString().slice(0, 16) : '',
            category: data?.category?._id ?? data?.category ?? '',
            Limit: data?.Limit ?? 1
          });
        } catch (err) {
          setError(getErrorMessage(err));
        }
      };
      fetchEvent();
    } else {
      setEvent({ title: '', description: '', date: '', category: '', Limit: 1 });
    }
  }, [id]);
  const changeHandler = (e) => {
    const { name, value } = e.target;
    setEvent({ ...event, [name]: value });
  }

  const submittionHandler = async (e) => {
    e.preventDefault();
    try {
      setError('');
      setLoading(true);
      if (id && id !== "0") {
        await updateProduct(id, {
          ...event,
          Limit: Number(event.Limit)
        });
        alert("Updated Successfully!");
      }
      else {
        await createProduct({
          ...event,
          Limit: Number(event.Limit)
        });
        alert("Added Successfully!");
      }
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
          <Form.Label>Event title</Form.Label>
          <Form.Control type="text" placeholder="Enter event title" name='title' value={event.title} onChange={changeHandler} required />

        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Description</Form.Label>
          <Form.Control as="textarea" rows={3} placeholder="Optional description" name='description' value={event.description} onChange={changeHandler} />
        </Form.Group>

        <Form.Group className="mb-3" >
          <Form.Label>Date</Form.Label>
          <Form.Control type="datetime-local" name='date' value={event.date} onChange={changeHandler} required />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Category</Form.Label>
          <Form.Select
            name="category"
            value={event.category}
            onChange={changeHandler}
            required
          >
            <option value="">Select category</option>
            {categories.map((cat) => (
              <option key={cat._id} value={cat._id}>
                {cat.name}
              </option>
            ))}
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-3" >
          <Form.Label>Limit</Form.Label>
          <Form.Control type="number" min={1} name='Limit' value={event.Limit} onChange={changeHandler} required />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicCheckbox">

        </Form.Group>
        <div className="d-flex w-100 justify-content-center" >
          <Button variant="success" type="submit" className="fs-5 p-2 px-5" disabled={loading}>
            {loading ? 'Saving...' : 'Save'}
          </Button>
        </div>
      </Form>
    </div>
  );
}
