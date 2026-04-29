import React from 'react';
import Button from 'react-bootstrap/Button';
export default function CustButton(props) {
  return (
    <Button className="fs-3" style={{background:"linear-gradient(90deg, #1CB5E0 0%, #000851 100%)"
        ,border:"none"
        }}>
      {props.name}
    </Button>
  );
}
