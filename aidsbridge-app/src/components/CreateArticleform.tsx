import React, { useState } from "react";
import {
  TextField,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { selectCurrentUser } from "../store/account-slice";
import { Article } from "../models/article";
import { useSelector } from "react-redux";
import { styled } from "@mui/material/styles";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { useNavigate } from "react-router-dom";

interface CreateArticleFormProps {
  open: boolean;
  onClose: () => void;
}

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

const CreateArticleForm: React.FC<CreateArticleFormProps> = ({
  open,
  onClose,
}) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [imageId, setImageId] = useState("");
  const user = useSelector(selectCurrentUser);
  const navigate = useNavigate();

  

  const uploadFileToServer = (file: string | Blob) => {
    const formData = new FormData();
    formData.append("eventsImage", file);

    fetch("http://localhost:3000/aidsbridge/upload", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.imageId) {
          setImageId(data.imageId);
        }
      })
      .catch((error) => console.error("Error:", error));
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    uploadFileToServer(file);
  };

  const handleCreate = async () => {
    if (!user) {
      alert("Please login to create an article.");
      onClose();
      return;
    }

    if (!title || !content) {
      alert("Title and content are required.");
      return;
    }

    const newArticle: Article = {
      //_id: new Date().toISOString(),
      title,
      content,
      creater: user.userName,
      createdDate: new Date(),
      imageId,
      userId: user._id,
    };

    try {
      const response = await fetch(
        "http://localhost:3000/aidsbridge/articles",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newArticle),
        }
      );

      if (response.ok) {
        console.log("Article created successfully");
        onClose();
        navigate('/')
      } else {
        const errorMessage = await response.text();
        console.error("Failed to create article:", errorMessage);
        alert("Failed to create article. Please try again later.");
      }
    } catch (error) {
      console.error("Error creating article:", error);
      alert("Failed to create article. Please try again later.");
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Create New Article</DialogTitle>
      <DialogContent>
        <TextField
          label="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          fullWidth
          margin="dense"
        />
        <TextField
          label="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          fullWidth
          multiline
          rows={4}
          margin="dense"
        />
        <Button
          component="label"
          role={undefined}
          variant="contained"
          tabIndex={-1}
          startIcon={<CloudUploadIcon />}
          onChange={handleFileChange}
        >
          Upload file
          <VisuallyHiddenInput type="file" />
        </Button>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleCreate} color="primary">
          Create
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CreateArticleForm;
