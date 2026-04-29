import { BiSearchAlt } from "react-icons/bi"; 
import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useState } from "react";

export default function SearchBar({ onSearch }) {
    const [searchTerm, setSearch] = useState("");
    const searchHandler = (e) => {
        if (searchTerm){
            onSearch(searchTerm);
        }
    }
  return (
     <Form inline>
        <Row>
          <Col xs="auto">
            <Form.Control
              type="text"
              placeholder="......"
              value={searchTerm}
              onChange={(e) => setSearch(e.target.value)}
              className=" mr-sm-2"
            />
          </Col>
          <Col xs="auto">
            <Button type="button" onClick={searchHandler}>Search <BiSearchAlt /></Button>
          </Col>
        </Row>
      </Form>
  );
}
