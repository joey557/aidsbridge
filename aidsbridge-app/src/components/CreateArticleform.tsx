import React, { useState } from 'react';
import { TextField, Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { selectCurrentUser } from '../store/account-slice';
import { Article } from "../models/article";
import { useSelector } from 'react-redux';

interface CreateArticleFormProps {
    open: boolean;
    onClose: () => void;
}

const CreateArticleForm: React.FC<CreateArticleFormProps> = ({ open, onClose }) => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [imageId, setImageId] = useState('');
    const user = useSelector(selectCurrentUser);

    const handleCreate = async () => {
        if (!user) {
            alert('Please login to create an article.');
            onClose();
            return;
        }

        if (!title || !content) {
            alert("Title and content are required.");
            return;
        }

        const newArticle: Article = {
            _id: new Date().toISOString(),
            title,
            content,
            creater: user.userName,  
            createdDate: new Date(),
            imageId,
            userId: user._id,
        };

        try {
            
            const response = await fetch('http://localhost:3000/api/articles', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newArticle),
            });

            if (response.ok) {
                
                onClose();
            } else {
                
                const errorMessage = await response.text();
                console.error('Failed to create article:', errorMessage);
                alert('Failed to create article. Please try again later.');
            }
        } catch (error) {
            console.error('Error creating article:', error);
            alert('Failed to create article. Please try again later.');
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
                <TextField
                    label="Image ID"
                    value={imageId}
                    onChange={(e) => setImageId(e.target.value)}
                    fullWidth
                    margin="dense"
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cancel</Button>
                <Button onClick={handleCreate} color="primary">Create</Button>
            </DialogActions>
        </Dialog>
    );
};

export default CreateArticleForm;