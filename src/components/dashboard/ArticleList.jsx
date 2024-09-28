import { Link } from 'react-router-dom';

function ArticleList({ articles }) {
  if (articles.length === 0) {
    return <p className="text-gray-500">Aucun article à afficher.</p>;
  }

  return (
    <div className="space-y-4">
      {articles.map((article) => (
        <div key={article.id} className="border p-4 rounded-lg shadow-sm">
          <h3 className="text-xl font-semibold mb-2">
            <Link to={`/article/${article.id}`} className="text-blue-600 hover:underline">
              {article.title}
            </Link>
          </h3>
          <p className="text-gray-600 mb-2">{article.excerpt}</p>
          <div className="flex justify-between text-sm text-gray-500">
            <span>Par {article.author}</span>
            <span>{new Date(article.createdAt).toLocaleDateString()}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ArticleList;