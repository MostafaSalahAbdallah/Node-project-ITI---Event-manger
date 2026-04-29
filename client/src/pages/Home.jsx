import React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';
import Form_regist from '../components/Form_regist';
export default function Home() {
    return (
        <div className="p-5">
            <Form_regist/>
        </div>
    );
}
