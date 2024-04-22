import { useEffect} from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
//import { Article } from '../models/article';
import { getBackgroundStyle } from '../components/BackgroundStyle';
import readingImage from '../assets/reading.jpg';

import { AppDispatch } from '../store';
import { useDispatch, useSelector } from 'react-redux';
import { loadArticles, getAllArticles } from '../store/articles-slice';
import { getArticles } from '../services/articles-service';



export default function MediaCard() {
  //const [articles, setArticles] = useState<Array<Article>>([]);
  //const [images, setImages] = useState<{[key: string]: string}>({});
  const backgroundStyle = getBackgroundStyle(readingImage);
  
  const dispatch = useDispatch<AppDispatch>();
  const aidsArticles = useSelector(getAllArticles());

  useEffect(() => {
    getArticles().then((articles) => {
      dispatch(loadArticles(articles));
    })
  })

  // useEffect(() => {
  //   // Fetch articles
  //   fetch('http://localhost:3000/aidsbridge/articles')
  //     .then(response => response.json())
  //     .then(data => setArticles(data))
  //     .catch(error => console.error('Error fetching articles:', error));

  //   // Fetch images and map them by imageId
  //   fetch("http://localhost:3000/aidsbridge/upload")
  //     .then((response) => response.json())
  //     .then((data) => {
  //       const imageMap = data.reduce((acc: {[key: string]: string}, img: {_id: string, img: {data: {data: Iterable<number>}}} ) => {
  //         const byteArray = new Uint8Array(img.img.data.data);
  //         let binary = '';
  //         for (let i = 0; i < byteArray.byteLength; i++) {
  //           binary += String.fromCharCode(byteArray[i]);
  //         }
  //         acc[img._id] = `data:image/jpeg;base64,${btoa(binary)}`;
  //         return acc;
  //       }, {});
  //       setImages(imageMap);
  //     })
  //     .catch((err) => console.error('Error fetching images:', err));
  // }, []);

  return (
    <>
      <div style={backgroundStyle}>
          <h2>
          Explore, Learn, Advocate: <br /> Uniting Voices Against HIV/AIDS
          </h2>
        </div>
      <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', marginTop: '100px'}}>
        {aidsArticles.map((article) => (
          <Card key={article._id} sx={{ maxWidth: 345 }}>
            <CardMedia
              sx={{ height: 140 }}
              image={"/static/images/default.jpg"}
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
    </>
  );
}
