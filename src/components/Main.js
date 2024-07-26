import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';

function Main() {
    const [data, setData] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = () => {
        axios.get('http://localhost:8080/')
            .then(res => {
                setData(res.data);
            })
            .catch(err => {
                console.log(err);
            });
    };

    const deleteRecord = (id) => {
        axios.delete(`http://localhost:8080/delete/${id}`)
            .then(res => {
                console.log(res.data);
                fetchData();
            })
            .catch(err => {
                console.error(err);
            });
    };

    const convertToCSV = (data) => {
        const headers = ['ID', 'Name', 'Department', 'Address','Project_Name'];
        const csvRows = data.map(d => `${d.sid},${d.name},${d.dep},${d.address},${d.proj_name}`);
        return [headers.join(','), ...csvRows].join('\n');
       };

       
       const downloadCSV = (csv, fileName) => {
        const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.setAttribute('href', url);
        link.setAttribute('download', fileName);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
       };

       const handleDownloadCSV = () => {
        const csv = convertToCSV(data);
        downloadCSV(csv, 'data.csv');
     };

    return (
        <Table striped bordered hover>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Department</th>
                    <th>Address</th>
                    <th colSpan={2}>Options</th>
                </tr>
            </thead>
            <tbody>
                {data.map((d, i) => (
                    <tr key={i}>
                        <td>{d.sid}</td>
                        <td>{d.name}</td>
                        <td>{d.dep}</td>
                        <td>{d.address}</td>
                        <td><Link to={`/edit/${d.sid}`}><Button as="input" type="button" name='edit' value="Edit" /></Link></td>

                        <td><Button as="input" type="button" name='delete' value="Delete" onClick={() => deleteRecord(d.sid)} />{' '}</td>
                    </tr>
                ))}
            </tbody>
            
            <td colSpan={4} ><Link to={'/create'}> <Button as="Input" type="button" name='create' value="create" /></Link> </td>
            <td > <Button as="Input" type="button" name='download' value="Download CSV" onClick={handleDownloadCSV}/> </td>
            
        </Table>
    );
}

export default Main;
