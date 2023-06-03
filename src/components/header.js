import React, { useState } from 'react';

const Header = (props) => {

  return (
    <header style={headerStyle}>
      <nav style={navStyle}>
        <div style={logoStyle}>Your Logo</div>
        <form onSubmit={props.handleSearchSubmit} style={formStyle}>
          <input
            type="text"
            placeholder="Search..."
            value={props.searchValue}
            onChange={props.handleSearchChange}
            style={inputStyle}
          />
          <button type="submit" style={buttonStyle}>Search</button>
        </form>
      </nav>
    </header>
  );
};

// Styles
const headerStyle = {
  backgroundColor: '#333',
  padding: '10px 0',
};

const navStyle = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  maxWidth: '900px',
  margin: '0 auto',
  color: '#fff',
};

const logoStyle = {
  fontSize: '1.5rem',
  fontWeight: 'bold',
};

const formStyle = {
  display: 'flex',
};

const inputStyle = {
  padding: '5px',
  marginRight: '10px',
};

const buttonStyle = {
  padding: '5px 10px',
  backgroundColor: '#777',
  color: '#fff',
  border: 'none',
  cursor: 'pointer',
};

export default Header;