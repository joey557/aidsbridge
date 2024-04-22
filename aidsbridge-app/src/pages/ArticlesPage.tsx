import { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

import { getBackgroundStyle } from "../components/BackgroundStyle";
import readingImage from "../assets/reading.jpg";
import { useDispatch, useSelector } from 'react-redux';
import { loadArticles, getAllArticles } from '../store/articles-slice';
import { getArticles } from '../services/articles-service';
import React from 'react';
import { selectCurrentUser } from '../store/account-slice';
import { useTranslation } from 'react-i18next';
import { Article } from "../models/article";
import { AppDispatch } from '../store';
import ArticleDialog from '../components/ArticleDialog';
import { useNavigate } from 'react-router-dom';
export default function MediaCard() {
  //const [articles, setArticles] = useState<Array<Article>>([]);
  const [images, setImages] = useState<{ [key: string]: string }>({});
  const backgroundStyle = getBackgroundStyle(readingImage);
  const { t } = useTranslation('common');

  const dispatch = useDispatch<AppDispatch>();
  const aidsArticles = useSelector(getAllArticles());
  const user = useSelector(selectCurrentUser);

  const [open, setOpen] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const navigate = useNavigate();



  const handleClickOpen = (article: React.SetStateAction<Article | null>) => {
    setSelectedArticle(article);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedArticle(null);
  };

  const handleArticleClick = (articleId: string) => {
    navigate(`/articles/${articleId}`);
  };

  useEffect(() => {
    getArticles().then((articles) => {
      dispatch(loadArticles(articles));
    });
    console.log('Current user:', user);
  })

  useEffect(() => {
    // Fetch images and map them by imageId
    fetch("http://localhost:3000/aidsbridge/upload")
      .then((response) => response.json())
      .then((data) => {
        const imageMap = data.reduce(
          (
            acc: { [key: string]: string },
            img: { _id: string; img: { data: { data: Iterable<number> } } }
          ) => {
            const byteArray = new Uint8Array(img.img.data.data);
            let binary = "";
            for (let i = 0; i < byteArray.byteLength; i++) {
              binary += String.fromCharCode(byteArray[i]);
            }
            acc[img._id] = `data:image/jpeg;base64,${btoa(binary)}`;
            return acc;
          },
          {}
        );
        setImages(imageMap);
      })
      .catch((err) => console.error("Error fetching images:", err));
  }, []);

  return (
    <>
      <div style={backgroundStyle}>
        <h2>
          {t('article.header.line')} <br /> {t('article.header.line2')}
        </h2>
      </div>
      <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', marginTop: '100px' }}>
        {aidsArticles.map((article) => (
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
                {article.content.substring(0, 150) + "..."}
              </Typography>
            </CardContent>
            <CardActions>
              {/* <Button size="small">Share</Button> */}
              <Button size="small" onClick={() => handleArticleClick(article._id)}>Learn More</Button>
            </CardActions>
          </Card>
        ))}
      </div>
      <ArticleDialog article={selectedArticle} open={open} onClose={handleClose} />
    </>
  );
}