import React, { useRef, useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const FileInput = React.forwardRef((props, ref) => (
 <Form.Control type="file" {...props} ref={ref} />
));

function FormFileExample() {

 const history=useNavigate()

 const fileInputRef = useRef(null);
 const [fileData, setFileData] = useState(null); // Store file data

 const handleFileChange = (event) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      const reader = new FileReader();
      reader.onload = (e) => {
        setFileData(e.target.result); // Store the file data
      };
      reader.readAsText(file);
    } else {
      console.error('No file selected');
    }
 };

 const handleButtonClick = () => {
    if (fileData) {
      parseCsvData(fileData); // Process and upload the stored file data
    } else {
      console.error('No file data to upload');
    }
 };

 const parseCsvData = (csvData) => {
  try {
      const lines = csvData.split('\n');
      const records = lines.map(line => {
          const values = line.split(',');
          return {
              sid: values[0],
              name: values[1],
              dep: values[2],
              address: values[3],
          };
      });
      uploadDataToServer(records);
  } catch (error) {
      console.error('Error parsing CSV data:', error);
  }
};


const uploadDataToServer = (records) => {
  axios.post('http://localhost:8080/insert', records, {
      headers: {
          'Content-Type': 'application/json',
      },
  })
  .then(response => {
      try {
          console.log('Data uploaded successfully:', response.data);
          history('/');
      } catch (error) {
          console.error('Error processing response:', error);
      }
  })
  .catch(error => {
      console.error('Error uploading data:', error);
  });
};


 return (
    <>
      <Form.Group controlId="formFile" className="mb-3">
        <Form.Label>Insert a csv file</Form.Label>
        <FileInput onChange={handleFileChange} ref={fileInputRef} />
      </Form.Group>
      <Button variant="primary" size="lg" onClick={handleButtonClick}>
        Upload
      </Button>
    </>
 );
}

export default FormFileExample;
