import React from 'react';
import TableP from '../components/TableP';
import CustButton from '../components/CustButton';
import { Link } from 'react-router-dom';

export default function  Events() {
  
  return (
    <div>
        <div className="container mt-5 d-flex justify-content-center ">
            <Link to="/Events/0/edit">
                <CustButton name="Add Event"/>
            </Link>
        </div>
        
      
      <TableP/>
      
    </div>
  );
}
