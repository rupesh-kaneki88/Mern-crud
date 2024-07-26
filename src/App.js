import logo from './logo.svg';
import './App.css';
import Nav from './components/Nav'
import 'bootstrap/dist/css/bootstrap.min.css';
import Main from './components/Main';
import Import from './components/Import'
import Create from './components/Create'
import Edit from './components/Edit';
import Project from './components/Project'
import Footer from './components/Footer'


import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'



function App() {
  return (
    <div className="App">
                <Nav/>
      <Router>
        <Routes>
          <Route path='/' element={<Main/>}></Route>
          <Route path='/insert' element={<Import/>}></Route>
          <Route path='/create' element={<Create/>}></Route>
          <Route path='/edit/:id' element={<Edit />} /> 
          <Route path='/project' element={<Project />} /> 

          
        </Routes>
      </Router>
      <Footer/>
    </div>
  );
}

export default App;
