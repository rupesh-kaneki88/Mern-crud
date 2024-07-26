import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { useEffect } from 'react';

function Edit() {

    const [formData, setFormData] = useState({
        sid: '',
        name: '',
        dep: '',
        address: '',
    });
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`http://localhost:8080/edit/${id}`)
            .then(res => {
                setFormData(res.data);
            })
            .catch(err => {
                console.error(err);
            });
            
    }, [id]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.put(`http://localhost:8080/edit/${id}`, formData)
            .then(res => {
                console.log(res.data);
                navigate('/'); // Redirect to the main page or wherever you want
            })
            .catch(err => {
                console.error(err);
            });
    };


  return (
    <form onSubmit={handleSubmit}>
                <br/>
                <InputGroup className="mb-3">
                    <InputGroup.Text id="basic-addon1">Id</InputGroup.Text>
                    <Form.Control
                        name='sid'
                        required
                        placeholder="Id"
                        aria-label="Id"
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
                        aria-label="Username"
                        aria-describedby="basic-addon2"
                        value={formData.name}
                        onChange={handleChange}
                    />
                </InputGroup>

                <InputGroup className="mb-3">
                    <InputGroup.Text id="basic-addon3">Department</InputGroup.Text>
                    <Form.Control
                        name='dep'
                        placeholder="Department"
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
                        aria-label="Address"
                        aria-describedby="basic-addon4"
                        value={formData.address}
                        onChange={handleChange}
                    />
                </InputGroup>

                <Button type="submit">Submit</Button>
            </form>
  )
}

export default Edit