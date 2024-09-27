import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Link, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import About from './Components/About';
import Contact from './Components/Contacts';
import NotFound from './Components/NotFound';
import Depts from './Components/Depts';

// const routing = (
//   <Router>
//     <h3 style={{ textAlign: "center" }}>Routing Implementation using React JS Applications</h3>
//     <hr />
//     <div style={{ textAlign: "center" }}>
//       <Link to="/">Home</Link> |
//       <Link to="/Depts">Departments</Link> |
//       <Link to="/About">About Us</Link> |
//       <Link to="/Contact">Contact Us</Link> |
//       <Link to="/Hello">Invalid</Link>
//     </div>
//   <hr/>

//     <Routes>
//       <Route path="/" element={<App />} />
//       <Route path="/About" element={<About />} />
//       <Route path="/Contact" element={<Contact />} />
//       <Route path="/Depts" element={<Depts />} />
//       <Route path="*" element={<NotFound />} />
//     </Routes>
//   </Router>

// );

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* {routing} */}
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();