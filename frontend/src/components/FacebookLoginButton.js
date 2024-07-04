import React from 'react';

const FacebookLoginButton = ({ onLogin }) => (
  <button className="login-button" onClick={onLogin}>
    Login with Facebook
  </button>
);

export default FacebookLoginButton;
