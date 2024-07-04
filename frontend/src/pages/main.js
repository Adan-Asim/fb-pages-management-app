import React, { useState, useEffect } from 'react';
import axios from 'axios';
import FacebookLoginButton from '../components/FacebookLoginButton';
import Profile from '../components/Profile';
import PageInsights from '../components/PageInsights';

const Main = () => {
  const [profile, setProfile] = useState(null);
  const [pages, setPages] = useState([]);
  const [accessToken, setAccessToken] = useState('');
  const [isFBInitialized, setIsFBInitialized] = useState(false);

  useEffect(() => {
    window.fbAsyncInit = () => {
      window.FB.init({
        appId: '1784772108715011',
        cookie: true,
        xfbml: true,
        version: 'v10.0',
        status: true,
      });

      window.FB.Event.subscribe('auth.statusChange', (response) => {
        if (response.status === 'connected') {
          const authResponse = response.authResponse;
          setAccessToken(authResponse.accessToken);
          fetchFacebookData(authResponse.accessToken);
        }
      });

      setIsFBInitialized(true);
    };

    (function (d, s, id) {
      var js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) { return; }
      js = d.createElement(s); js.id = id;
      js.src = 'https://connect.facebook.net/en_US/sdk.js';
      fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));
  }, []);

  const handleLogin = () => {
    if (!isFBInitialized) {
      console.error('FB SDK not initialized yet.');
      return;
    }

    window.FB.login((response) => {
      if (response.authResponse) {
        const authResponse = response.authResponse;
        setAccessToken(authResponse.accessToken);
        fetchFacebookData(authResponse.accessToken);
      } else {
        console.error("User not authenticated");
      }
    }, { scope: 'pages_read_engagement, read_insights' });
  };

  const fetchFacebookData = async (token) => {
    try {
      const profileResponse = await axios.get(`https://graph.facebook.com/me?access_token=${token}&fields=id,name,picture`);
      setProfile(profileResponse.data);

      const pagesResponse = await axios.get(`https://graph.facebook.com/me/accounts?access_token=${token}`);
      setPages(pagesResponse.data.data);
    } catch (error) {
      console.error('Error fetching data from Facebook:', error);
    }
  };

  return (
    <div className="container">
      {!profile ? (
        <div className="login-container">
          <h1>Welcome</h1>
          <p>Please log in with Facebook to continue</p>
          <FacebookLoginButton onLogin={handleLogin} />
        </div>
      ) : (
        <div className="dashboard">
          <Profile profile={profile} />
          <PageInsights pages={pages} accessToken={accessToken} />
        </div>
      )}
    </div>
  );
};

export default Main;
