import React from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { AppState } from '../store';

const ArticleDetailPage: React.FC = () => {
  const { articleId } = useParams<{ articleId: string }>();
  // 使用 useSelector 获取文章数据
  const location = useLocation();
  const articleImage = location.state?.articleImage;
  console.log('Article image:', articleImage);
  const article = useSelector((state: AppState) => state.articles.find(a => a._id === articleId));

  if (!article) {
    return <div>Article not found</div>;
  }

  return (
    <>
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center', 
      justifyContent: 'center', 
      height: '100vh', 
      padding: '0 10%',
    }}>
      <h1 style={{ textAlign: 'center', width: '100%' }}>{article.title}</h1>
      <img src={articleImage} alt="Article" />
      <p style={{ textAlign: 'left', width: '100%' }}>{article.content}</p>
    </div>
    </>
  );
};

export default ArticleDetailPage;