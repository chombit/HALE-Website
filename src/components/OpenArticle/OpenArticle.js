import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./OpenArticle.css";

const API_BASE = "http://localhost:8080/api";

export default function OpenArticle() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(function () {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [id]);

  useEffect(function () {
    setLoading(true);
    setError(null);
    fetch(`${API_BASE}/articles.php?id=${id}`)
      .then(function (res) {
        if (!res.ok) throw new Error("Article not found");
        return res.json();
      })
      .then(function (data) {
        setArticle(data);
        setLoading(false);
      })
      .catch(function (err) {
        setError(err.message);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <div className="open-article-loading">
        <div className="spinner"></div>
        <p>Loading article...</p>
      </div>
    );
  }

  if (error || !article) {
    return (
      <div className="open-article-error">
        <h2>Article not found</h2>
        <p>The article you're looking for doesn't exist or has been removed.</p>
        <button onClick={() => navigate("/articles")}>Back to Articles</button>
      </div>
    );
  }

  var formattedDate = "";
  if (article.created_at) {
    var date = new Date(article.created_at);
    formattedDate = date.toLocaleDateString("en-US", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  }

  var paragraphs = article.content.split("\n").filter(function (p) {
    return p.trim() !== "";
  });

  return (
    <div className="open-article">
      <button className="back-btn" onClick={() => navigate("/articles")}>
        &larr; Back to Articles
      </button>

      {article.cover_image && (
        <div className="open-article-hero">
          <img src={article.cover_image} alt={article.title} />
        </div>
      )}

      <div className="open-article-meta">
        {article.category && (
          <span className="article-category">{article.category}</span>
        )}
        <span className="meta-separator">|</span>
        <span className="meta-date">{formattedDate}</span>
        <span className="meta-separator">|</span>
        <span className="meta-author">By {article.author || "HALE-HRIN"}</span>
      </div>

      <h1 className="open-article-title">{article.title}</h1>
      <hr className="title-bar" />

      {article.excerpt && (
        <p className="open-article-excerpt">{article.excerpt}</p>
      )}

      <div className="open-article-content">
        {paragraphs.map(function (para, i) {
          return <p key={i}>{para}</p>;
        })}
      </div>
    </div>
  );
}
