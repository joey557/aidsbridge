import React, { useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Article } from '../models/article';

export default function MediaCard() {
  const [articles, setArticles] = useState<Array<Article>>([]);

  useEffect(() => {
    // Fetch articles from the backend server
    fetch('http://localhost:3000/aidsbridge/articles')
      .then(response => response.json())
      .then(data => setArticles(data))
      .catch(error => console.error('Error fetching articles:', error));
  }, []);

  return (
    <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
      {articles.map((article, index) => (
        <Card key={index} sx={{ maxWidth: 345 }}>
          <CardMedia
            sx={{ height: 140 }}
            image={article.image || "/static/images/default.jpg"}
            title="Article Image"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {article.title}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {article.content.substring(0, 150) + '...'}
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small">Share</Button>
            <Button size="small">Learn More</Button>
          </CardActions>
        </Card>
      ))}
    </div>
  );
}
