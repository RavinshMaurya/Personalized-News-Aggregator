import React, { useState, useEffect } from 'react';
import { Container, Grid, Typography, AppBar, Toolbar, TextField, Button } from '@mui/material';
import axios from 'axios';

function App() {
  const [news, setNews] = useState([]);
  const [category, setCategory] = useState('general');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchNews();
  }, [category]);

  const fetchNews = async () => {
    try {
      // Replace with your actual API key from newsapi.org
      const API_KEY = "b236e9a317284feeaa98dfba8f287312"
      const response = await axios.get(
        `https://newsapi.org/v2/top-headlines?country=us&category=${category}&apiKey=${API_KEY}`
      );
      setNews(response.data.articles);
    } catch (error) {
      console.error('Error fetching news:', error);
    }
  };

  // And update handleSearch:
  const handleSearch = async () => {
    try {
      const API_KEY = "b236e9a317284feeaa98dfba8f287312";
      const response = await axios.get(
        `https://newsapi.org/v2/everything?q=${searchQuery}&apiKey=${API_KEY}`
      );
      setNews(response.data.articles);
    } catch (error) {
      console.error('Error searching news:', error);
    }
  };

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">Personalized News Aggregator</Typography>
        </Toolbar>
      </AppBar>

      <Container maxWidth="lg" style={{ marginTop: '2rem' }}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              variant="outlined"
              label="Search News"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleSearch();
              }}
            />
            <Button
              variant="contained"
              color="primary"
              onClick={handleSearch}
              style={{ marginTop: '1rem' }}
            >
              Search
            </Button>
          </Grid>

          <Grid item xs={12}>
            <Grid container spacing={2}>
              {['general', 'business', 'technology', 'sports', 'entertainment', 'health'].map(
                (cat) => (
                  <Grid item key={cat}>
                    <Button
                      variant={category === cat ? 'contained' : 'outlined'}
                      color="primary"
                      onClick={() => setCategory(cat)}
                    >
                      {cat.charAt(0).toUpperCase() + cat.slice(1)}
                    </Button>
                  </Grid>
                )
              )}
            </Grid>
          </Grid>

          {news.map((article, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <div style={{ border: '1px solid #ddd', padding: '1rem', height: '100%' }}>
                {article.urlToImage && (
                  <img
                    src={article.urlToImage}
                    alt={article.title}
                    style={{ width: '100%', height: '200px', objectFit: 'cover' }}
                  />
                )}
                <Typography variant="h6">{article.title}</Typography>
                <Typography variant="body2" color="textSecondary">
                  {article.description}
                </Typography>
                <Button
                  href={article.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  color="primary"
                  style={{ marginTop: '1rem' }}
                >
                  Read More
                </Button>
              </div>
            </Grid>
          ))}
        </Grid>
      </Container>
    </div>
  );
}

export default App;