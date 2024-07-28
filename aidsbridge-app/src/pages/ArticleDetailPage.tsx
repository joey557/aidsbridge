import React from "react";
import { useLocation, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { AppState } from "../store";

const ArticleDetailPage: React.FC = () => {
  const { articleId } = useParams<{ articleId: string }>();
  //use userselector to get all the articles
  const location = useLocation();
  const articleImage = location.state?.articleImage;
  const article = useSelector((state: AppState) =>
    state.articles.find((a) => a._id === articleId)
  );

  if (!article) {
    return <div>Article not found</div>;
  }
  //render for article details
  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
          padding: "0 10%",
          marginTop: "100px",
        }}
      >
        <h1 style={{ textAlign: "center", width: "100%" }}>{article.title}</h1>
        <img
          style={{
            display: "block",
            width: "50%",
            height: "30vh",
          }}
          src={articleImage}
          alt="ArticleImage"
        />
        <p style={{ textAlign: "left", width: "100%" }}>{article.content}</p>
      </div>
    </>
  );
};

export default ArticleDetailPage;
