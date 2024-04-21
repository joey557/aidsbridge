import { useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Article } from '../models/article';

export default function MediaCard() {
  const [articles, setArticles] = useState<Array<Article>>([]);
  const [images, setImages] = useState<{[key: string]: string}>({});

  useEffect(() => {
    // Fetch articles
    fetch('http://localhost:3000/aidsbridge/articles')
      .then(response => response.json())
      .then(data => setArticles(data))
      .catch(error => console.error('Error fetching articles:', error));

    // Fetch images and map them by imageId
    fetch("http://localhost:3000/aidsbridge/upload")
      .then((response) => response.json())
      .then((data) => {
        const imageMap = data.reduce((acc: {[key: string]: string}, img: {_id: string, img: {data: {data: Iterable<number>}}} ) => {
          const byteArray = new Uint8Array(img.img.data.data);
          let binary = '';
          for (let i = 0; i < byteArray.byteLength; i++) {
            binary += String.fromCharCode(byteArray[i]);
          }
          acc[img._id] = `data:image/jpeg;base64,${btoa(binary)}`;
          return acc;
        }, {});
        setImages(imageMap);
      })
      .catch((err) => console.error('Error fetching images:', err));
  }, []);

  return (
    <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', marginTop: '100px'}}>
      {articles.map((article) => (
        <Card key={article._id} sx={{ maxWidth: 345 }}>
          <CardMedia
            sx={{ height: 140 }}
            image={images[article.imageId] || "/static/images/default.jpg"}
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
