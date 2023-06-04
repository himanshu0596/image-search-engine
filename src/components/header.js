import React from 'react';
import '../styles/header.css'

const Header = (props) => {

  return (
    <header className={ `${props.paddingClass} headerStyle`} data-testid="header">
      <nav className="navStyle">
        <div className="logoStyle">Lowe's</div>
        <form onSubmit={props.handleSearchSubmit} className="formStyle">
          <input
            type="text"
            placeholder="Search..."
            value={props.searchValue}
            onChange={props.handleSearchChange}
            className="inputStyle"
            data-testid="search-input"
          />
          <button type="submit" className="buttonStyle" data-testid="search-button">Search</button>
        </form>
      </nav>
    </header>
  );
};

export default Header;