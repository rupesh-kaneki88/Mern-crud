import React from 'react';
import {
  MDBFooter
 
} from 'mdb-react-ui-kit';

export default function App() {
  return (
    <MDBFooter className='text-center' color='white' bgColor='dark'>
      
      <div className='text-center p-3' style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}>
        Made with ❤️ 
        <a className='text-white' href='https://www.linkedin.com/in/rupesh-chavan-926409154/'>
          Rupesh Chavan
        </a>
      </div>
    </MDBFooter>
  );
}