import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PageInsights = ({ pages, accessToken }) => {
  const [selectedPage, setSelectedPage] = useState(null);
  const [insights, setInsights] = useState(null);
  const [pageAccessToken, setPageAccessToken] = useState(null);
  const [since, setSince] = useState('');
  const [until, setUntil] = useState('');

  useEffect(() => {
    if (selectedPage) {
      getPageAccessToken(selectedPage);
    }
  }, [selectedPage]);

  const handlePageSelect = (event) => {
    setSelectedPage(event.target.value);
  };

  const handleSinceChange = (event) => {
    setSince(event.target.value);
  };

  const handleUntilChange = (event) => {
    setUntil(event.target.value);
  };

  const getPageAccessToken = async (pageId) => {
    try {
      const response = await axios.get(
        `https://graph.facebook.com/${pageId}?fields=access_token&access_token=${accessToken}`
      );
      setPageAccessToken(response.data.access_token);
    } catch (error) {
      console.error('Error fetching page access token from Facebook:', error);
    }
  };

  const fetchInsights = async () => {
    if (!selectedPage || !pageAccessToken) return;
    const sinceParam = since ? `&since=${since}` : '';
    const untilParam = until ? `&until=${until}` : '';

    try {
      const insightsResponse = await axios.get(
        `https://graph.facebook.com/${selectedPage}/insights?access_token=${pageAccessToken}&metric=page_impressions,page_follows,page_fans,page_post_engagements&period=total_over_range${sinceParam}${untilParam}`
      );
      setInsights(insightsResponse.data);
    } catch (error) {
      console.error('Error fetching insights from Facebook:', error);
    }
  };

  return (
    <div className="page-insights">
      <div className="date-range">
        <label>
          Since:
          <input type="date" value={since} onChange={handleSinceChange} />
        </label>
        <label>
          Until:
          <input type="date" value={until} onChange={handleUntilChange} />
        </label>
      </div>
      <select className="page-select" onChange={handlePageSelect}>
        <option value="">Select a Page</option>
        {pages.map((page) => (
          <option key={page.id} value={page.id}>
            {page.name}
          </option>
        ))}
      </select>
      <button className="fetch-insights-button" onClick={fetchInsights} disabled={!selectedPage || !pageAccessToken || !(since && until)}>
        Get Insights
      </button>
      {insights && (
        <div className="insights">
          <div className="card">
            <h2>Total Followers/Fans</h2>
            <p>{insights.data.find(insight => insight.name === 'page_fans')?.values[0].value}</p>
          </div>
          <div className="card">
            <h2>Total Engagement</h2>
            <p>{insights.data.find(insight => insight.name === 'page_post_engagements')?.values[0].value}</p>
          </div>
          <div className="card">
            <h2>Total Impressions</h2>
            <p>{insights.data.find(insight => insight.name === 'page_impressions')?.values[0].value}</p>
          </div>
          <div className="card">
            <h2>Total Reactions</h2>
            <p>{insights.data.find(insight => insight.name === 'page_post_engagements')?.values[0].value}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default PageInsights;
