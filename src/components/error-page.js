import React from 'react';
import '../styles/error-page.css'

const ErrorPage = () => {
  return (
    <div className="error-page">
      <h1 className="error-page__title">Oops! Something went wrong.</h1>
      <p className="error-page__message">We apologize, but an error occurred.</p>
      <p className="error-page__message">Please try again later.</p>
    </div>
  );
};

export default ErrorPage;
