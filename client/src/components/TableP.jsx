import { GoInfo } from "react-icons/go";
import { AiFillDelete } from "react-icons/ai";
import { AiOutlineEdit } from "react-icons/ai";
import React, { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import { Link } from 'react-router-dom';
import { deleteEvent, getAllEvents, joinEvent, getErrorMessage, getCategories } from "../API/ProductApi";
import SearchBar from '../components/SearchBar';

export default function TableP() {
  const [events, setEvents] = useState([]);
  const [searchTerm, setSearchData] = useState("");
  const [error, setError] = useState("");
  const [joiningId, setJoiningId] = useState(null);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");

  // ✅ fetch events (بدون loop)
  useEffect(() => {
    const fetchData = async () => {
      try {
        setError("");
        const res = await getAllEvents();
        const data = Array.isArray(res.data)
          ? res.data
          : (res.data?.events ?? []);
        setEvents(data);
      } catch (error) {
        setError(getErrorMessage(error));
      }
    };
    fetchData();
  }, []);

  // ✅ fetch categories
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

  //! Delete
  const Remove = async (id) => {
    try {
      alert('Event deleted!');
      await deleteEvent(id);
      setEvents(events.filter(e => e._id !== id)); // تحديث UI
    } catch (err) {
      alert(getErrorMessage(err));
    }
  };

  const onJoin = async (id) => {
    try {
      setError("");
      setJoiningId(id);
      await joinEvent(id);
      alert("Joined event successfully!");
    } catch (err) {
      alert(getErrorMessage(err));
    } finally {
      setJoiningId(null);
    }
  };

  // 🔍 Search
  const searchData = (data) => {
    setSearchData(data);
  };

  // 🎯 Category select
  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  // ✅ الفلترة النهائية (category → search)
  const eventFilter = events
    .filter((event) => {
      if (!selectedCategory) return true;
      return event?.category?._id === selectedCategory;
    })
    .filter((event) => {
      if (!searchTerm) return true;
      return (event.title || "")
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
    });

  return (
    <div className="Container p-5">

      <div className="mt-5 d-flex justify-content-center alert alert-info flex-column align-items-center">

        <SearchBar onSearch={searchData} />

        <select
          className="form-select w-50 mt-3"
          value={selectedCategory}
          onChange={handleCategoryChange}
        >
          <option value="">All Categories</option>
          {categories.map((cat) => (
            <option key={cat._id} value={cat._id}>
              {cat.name}
            </option>
          ))}
        </select>

      </div>

      {error ? <Alert variant="danger">{error}</Alert> : null}

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Event Title</th>
            <th>Date</th>
            <th>Category</th>
            <th>Options</th>
          </tr>
        </thead>

        <tbody>
          {eventFilter.map((event, num) => (
            <tr key={event._id}>
              <td>{num + 1}</td>
              <td>{event.title}</td>
              <td>{event.date ? new Date(event.date).toLocaleDateString() : '-'}</td>
              <td>{event?.category?.name || '-'}</td>

              <td>
                <Link to={`/events/${event._id}/edit`}>
                  <AiOutlineEdit className="text-primary fs-3 mr-2" />
                </Link>

                <Link onClick={() => Remove(event._id)}>
                  <AiFillDelete className="text-danger fs-3 mr-5" />
                </Link>

                <Link to={`/events/${event._id}`}>
                  <GoInfo className="text-success fs-3 mr-5" />
                </Link>

                <Button
                  size="sm"
                  className="ms-2"
                  variant="success"
                  disabled={joiningId === event._id}
                  onClick={() => onJoin(event._id)}
                >
                  {joiningId === event._id ? 'Joining...' : 'Join Event'}
                </Button>
              </td>
            </tr>
          ))}
        </tbody>

      </Table>
    </div>
  );
}