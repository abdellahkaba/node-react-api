import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import App from './App';
import './index.css';
import reportWebVitals from './reportWebVitals';
import ShowComponent from './components/ShowComponent';

export default function Index (){
  return (
      <BrowserRouter basename='/'>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/show" element={<ShowComponent />} />
        </Routes>
      </BrowserRouter>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Index />
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
