import { useEffect, useRef, useState } from "react";
import "./ArticlesList.css";
import ArticleCard from "./ArticleCard";

const API_BASE = "http://localhost:8080/api";

export default function ArticlesList() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const listRef = useRef();
  const [visible, setVisible] = useState(false);

  useEffect(function () {
    fetch(`${API_BASE}/articles.php`)
      .then(function (res) {
        if (!res.ok) throw new Error("Failed to fetch articles");
        return res.json();
      })
      .then(function (data) {
        setArticles(data.articles || []);
        setLoading(false);
      })
      .catch(function (err) {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  useEffect(function () {
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting) {
          setVisible(true);
        }
      },
      { threshold: [0.1, 1] }
    );
    if (listRef.current) {
      observer.observe(listRef.current);
    }
  }, [loading]);

  if (loading) {
    return (
      <div className="articles-loading">
        <div className="spinner"></div>
        <p>Loading articles...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="articles-error">
        <p>Unable to load articles. Please try again later.</p>
      </div>
    );
  }

  return (
    <div
      ref={listRef}
      className={`articles-list ${visible ? "visible" : ""}`}>
      {articles.length === 0 ? (
        <div className="articles-empty">
          <p>No articles published yet. Check back soon!</p>
        </div>
      ) : (
        articles.map(function (article) {
          return (
            <ArticleCard key={article.id} article={article} />
          );
        })
      )}
    </div>
  );
}
