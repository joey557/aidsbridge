import React from "react";
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
  Button,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { deleteArticle } from "../store/articles-slice";

interface Article {
  _id?: string;
  title: string;
  content: string;
  creater: string;
  createdDate: Date;
  userId: string;
  image?: string;
}

interface ArticlesPanelProps {
  articles: Article[];
}



const ArticlesPanel: React.FC<ArticlesPanelProps> = ({ articles }) => {
  const dispatch = useDispatch();

  const handleDelete = async (articleId: string) => {
    try {
      const response = await fetch(`http://localhost:3000/aidsbridge/articles/${articleId}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete the article.');
      }
      dispatch(deleteArticle(articleId));
    } catch (error) {
      console.error('Error deleting article:', error);
    }
  };
  
  
  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        gap: "40px",
        justifyContent: "center",
        maxWidth: "1000px",
        margin: "auto",
      }}
    >
      {articles.map((article) => (
        <Card
          key={article._id}
          sx={{
            width: "calc(33% - 40px)",
            maxWidth: 345,
            minWidth: 300,
            minHeight: 300,
          }}
        >
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
              {article.content.substring(0, 150) + "..."}
            </Typography>
          </CardContent>
          <CardActions>
            <Button
              size="small"
              sx={{
                backgroundColor: "#CFD2CD",
                color: "black",
                "&:hover": {
                  backgroundColor: "#A9ACB3",
                },
              }}
              onClick={() => handleDelete(article._id || "")}
            >
              DELETE
            </Button>
          </CardActions>
        </Card>
      ))}
    </div>
  );
};

export default ArticlesPanel;
