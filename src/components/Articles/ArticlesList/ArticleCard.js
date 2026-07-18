import { Link } from "react-router-dom";

export default function ArticleCard({ article }) {
  var shortExcerpt = "";
  if (article.excerpt && article.excerpt.length > 120) {
    shortExcerpt = article.excerpt.slice(0, 120) + "...";
  } else {
    shortExcerpt = article.excerpt || "";
  }

  var formattedDate = "";
  if (article.created_at) {
    var date = new Date(article.created_at);
    formattedDate = date.toLocaleDateString("en-US", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  }

  return (
    <div className="article-card">
      {article.cover_image ? (
        <img src={article.cover_image} alt={article.title} />
      ) : (
        <div className="article-card-placeholder">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
            width="48"
            height="48">
            <path
              fill="#ccc"
              d="M448 80V448c0 26.5-21.5 48-48 48H112c-26.5 0-48-21.5-48-48V80c0-26.5 21.5-48 48-48H400c26.5 0 48 21.5 48 48zM48 448V80C48 53.5 69.5 32 96 32H416c26.5 0 48 21.5 48 48V448c0 26.5-21.5 48-48 48H96c-26.5 0-48-21.5-48-48zM256 96c-44.2 0-80 35.8-80 80s35.8 80 80 80 80-35.8 80-80-35.8-80-80-80zm0 208c-26.5 0-47.1-14.7-64-32-16-15.5-32-37.3-32-64 0-17.7 14.3-32 32-32 22.1 0 32 14.3 64 14.3s41.9-14.3 64-14.3c17.7 0 32 14.3 32 32 0 26.7-16 48.5-32 64-16.9 17.3-37.5 32-64 32z"
            />
          </svg>
        </div>
      )}
      <div className="article-card-body">
        {article.category && (
          <span className="article-category">{article.category}</span>
        )}
        <h2>{article.title}</h2>
        {shortExcerpt && <p>{shortExcerpt}</p>}
        <div className="article-card-footer">
          {formattedDate && <span className="article-date">{formattedDate}</span>}
          <Link to={`/articles/${article.id}`}>Read More</Link>
        </div>
      </div>
    </div>
  );
}
