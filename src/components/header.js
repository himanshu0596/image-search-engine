import React from 'react';
import '../styles/header.css'

const Header = (props) => {

  return (
    <header className="headerStyle">
      <nav className="navStyle">
        <div className="logoStyle">Your Logo</div>
        <form onSubmit={props.handleSearchSubmit} className="formStyle">
          <input
            type="text"
            placeholder="Search..."
            value={props.searchValue}
            onChange={props.handleSearchChange}
            className="inputStyle"
          />
          <button type="submit" className="buttonStyle">Search</button>
        </form>
      </nav>
    </header>
  );
};

export default Header;