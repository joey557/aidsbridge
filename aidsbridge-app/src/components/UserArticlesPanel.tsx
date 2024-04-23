import React, { useState } from "react";
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
  Button,
} from "@mui/material";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { deleteArticle, updateArticle } from "../store/articles-slice";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../store/account-slice";

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
  const user = useSelector(selectCurrentUser);
  const [open, setOpen] = useState(false);
  const [editData, setEditData] = useState({
    _id: "",
    title: "",
    content: "",
  });

  const handleClickOpen = (article) => {
    setEditData({
      _id: article._id,
      title: article.title,
      content: article.content,
    });
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSave = async () => {
    await handleUpdate(editData._id, {
      title: editData.title,
      content: editData.content,
    });
    setOpen(false);
  };

  const handleDelete = async (articleId: string) => {
    try {
      const response = await fetch(
        `http://localhost:3000/aidsbridge/articles/${articleId}`,
        {
          method: "DELETE",
        }
      );
      if (!response.ok) {
        throw new Error("Failed to delete the article.");
      }
      dispatch(deleteArticle(articleId));
    } catch (error) {
      console.error("Error deleting article:", error);
    }
  };

  const handleUpdate = async (articleId: string, newData: Partial<Article>) => {
    try {
      const response = await fetch(
        `http://localhost:3000/aidsbridge/articles/${articleId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newData),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update the article.");
      }

      const updatedArticle = await response.json();
      dispatch(updateArticle({ id: articleId, newData: updatedArticle }));
    } catch (error) {
      console.error("Error updating article:", error);
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
      {articles.map(
        (article) =>
          user?.userName === article.creater && (
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
                <Button
                  size="small"
                  sx={{
                    backgroundColor: "#CFD2CD",
                    color: "black",
                    "&:hover": {
                      backgroundColor: "#A9ACB3",
                    },
                  }}
                  onClick={() => handleClickOpen(article)}
                >
                  UPDATE
                </Button>
              </CardActions>
              <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Edit Article</DialogTitle>
                <DialogContent>
                  <TextField
                    autoFocus
                    margin="dense"
                    id="title"
                    label="Article Title"
                    type="text"
                    fullWidth
                    variant="standard"
                    value={editData.title}
                    onChange={(e) =>
                      setEditData({ ...editData, title: e.target.value })
                    }
                  />
                  <TextField
                    margin="dense"
                    id="content"
                    label="Article Content"
                    type="text"
                    fullWidth
                    multiline
                    rows={4}
                    variant="standard"
                    value={editData.content}
                    onChange={(e) =>
                      setEditData({ ...editData, content: e.target.value })
                    }
                  />
                </DialogContent>
                <DialogActions>
                  <Button
                    sx={{
                      backgroundColor: "#CFD2CD",
                      color: "black",
                      "&:hover": {
                        backgroundColor: "#A9ACB3",
                      },
                    }}
                    onClick={handleClose}
                  >
                    Cancel
                  </Button>
                  <Button
                    sx={{
                      backgroundColor: "#CFD2CD",
                      color: "black",
                      "&:hover": {
                        backgroundColor: "#A9ACB3",
                      },
                    }}
                    onClick={handleSave}
                  >
                    Save
                  </Button>
                </DialogActions>
              </Dialog>
            </Card>
          )
      )}
    </div>
  );
};

export default ArticlesPanel;
