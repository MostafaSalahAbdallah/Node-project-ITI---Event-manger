import { TiArrowBackOutline } from "react-icons/ti";
import React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Link, NavLink, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Alert from 'react-bootstrap/Alert';
import { getEventById, getErrorMessage, joinEvent } from "../API/ProductApi";

export default function DetailedProduct() {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [error, setError] = useState("");
  const [joining, setJoining] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      try {
        setError("");
        const res = await getEventById(id);
        console.log(res);
        setEvent(res.data.event);
      } catch (err) {
        setError(getErrorMessage(err));
      }
    }
    fetchData();
  }, [id])

  const onJoin = async () => {
    try {
      setJoining(true);
      await joinEvent(id);
      alert("Joined event successfully!");
    } catch (err) {
      alert(getErrorMessage(err));
    } finally {
      setJoining(false);
    }
  };
  return (
    <div className="container m-4">
      <Card className="shadow-sm mt-5 p-2 text-center" bg="dark" data-bs-theme="dark">
        <Card.Header className="text-center text-info fs-3">{event?.title || 'Event details'}</Card.Header>
        <Card.Body>
          {error ? <Alert variant="danger">{error}</Alert> : null}
          <Card.Title>Date: {event?.date ? new Date(event.date).toLocaleString() : '-'}</Card.Title>
          <Card.Text>{event?.description || '-'}</Card.Text>
          <div className="d-flex justify-content-center gap-2">
            <Button variant="success" onClick={onJoin} disabled={joining}>
              {joining ? 'Joining...' : 'Join Event'}
            </Button>
            <Link to="/Events">
              <Button variant="warning">
                <TiArrowBackOutline className="fs-4" /> Back to events
              </Button>
            </Link>
          </div>
        </Card.Body>
        <Card.Footer className="text-muted">Event</Card.Footer>

      </Card>
    </div>
  );
}
