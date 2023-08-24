// Header.js

import React from 'react';
import { Jumbotron } from 'react-bootstrap';

const Header = ({ title }) => {
    return (
      <div className="header">
        <h1>{title}</h1>
      </div>
    );
  };
  
export default Header;
