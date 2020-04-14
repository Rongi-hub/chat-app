import React from 'react';
import './Chatbox.css';

const Chatbox = props => (
  <ul>
    {
      props.items.map((item, index) => <li key={index}>{item}</li>)
    }
  </ul>
);

export default Chatbox;