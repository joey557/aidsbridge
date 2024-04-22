import React from 'react';
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";

interface Article {
  title: string;
  content: string;
}

interface ArticleDialogProps {
  article: Article | null;
  open: boolean;
  onClose: () => void;
}

const ArticleDialog: React.FC<ArticleDialogProps> = ({ article, open, onClose }) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{article?.title}</DialogTitle>
      <DialogContent>
        <DialogContentText>
          {article?.content}
        </DialogContentText>
      </DialogContent>
    </Dialog>
  );
};

export default ArticleDialog;
