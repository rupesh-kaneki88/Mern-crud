import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function BasicExample() {

    const history=useNavigate()

    const [formData, setFormData] = useState({
        sid: '',
        name: '',
        department: '',
        address: '',
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:8080/api/create', formData, {
            headers: {
                'Content-Type': 'application/json',
            },
        })
        .then(response => {
            console.log(response.data);
            history('/');
        })
        .catch(error => {
            console.error('Error:', error);
        });
    };

    return (
        <>
            <form onSubmit={handleSubmit}>
                <br/>
                <InputGroup className="mb-3">
                    <InputGroup.Text id="basic-addon1">Id</InputGroup.Text>
                    <Form.Control
                        name='sid'
                        placeholder="Id"
                        aria-label="Id"
                        required
                        aria-describedby="basic-addon1"
                        value={formData.sid}
                        onChange={handleChange}
                    />
                </InputGroup>

                <InputGroup className="mb-3">
                    <InputGroup.Text id="basic-addon2">Name</InputGroup.Text>
                    <Form.Control
                        name='name'
                        placeholder="Username"
                        required
                        aria-label="Username"
                        aria-describedby="basic-addon2"
                        value={formData.name}
                        onChange={handleChange}
                    />
                </InputGroup>

                <InputGroup className="mb-3">
                    <InputGroup.Text id="basic-addon3">Department</InputGroup.Text>
                    <Form.Control
                        name='department'
                        placeholder="Department"
                        required
                        aria-label="Department"
                        aria-describedby="basic-addon3"
                        value={formData.department}
                        onChange={handleChange}
                    />
                </InputGroup>

                <InputGroup className="mb-3">
                    <InputGroup.Text id="basic-addon4">Address</InputGroup.Text>
                    <Form.Control
                        name='address'
                        placeholder="Address"
                        required
                        aria-label="Address"
                        aria-describedby="basic-addon4"
                        value={formData.address}
                        onChange={handleChange}
                    />
                </InputGroup>

                <Button type="submit">Submit</Button>
            </form>
        </>
    );
}

export default BasicExample;
