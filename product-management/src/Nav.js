import React from 'react';
import {Link} from 'react-router-dom';
import './App.css';

function Nav() {
  return (
    <div>
        <nav>
          <ul className="nav-links">
              <Link to="/"><li>Home</li></Link>
              <Link to="/photolist"><li>Photo List</li></Link>
              <Link to="/postphoto"><li>Add New Photo</li></Link>
          </ul>
          </nav>
    </div>
  );
}

export default Nav;
