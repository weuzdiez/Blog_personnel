import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getArticleById } from '../../services/articleService';
import { useAuth } from '../../hooks/useAuth';
import CommentList from '../comments/CommentList';
import CommentForm from '../comments/CommentForm';

function ArticleDetail() {
  const [article, setArticle] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const { id } = useParams();
  const { user } = useAuth();

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const data = await getArticleById(id);
        setArticle(data);
      } catch (err) {
        setError('Erreur lors du chargement de l\'article.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchArticle();
  }, [id]);

  const handleCommentAdded = (newComment) => {
    setArticle(prevArticle => ({
      ...prevArticle,
      comments: [...prevArticle.comments, newComment]
    }));
  };

  if (isLoading) return <div className="text-center mt-8">Chargement...</div>;
  if (error) return <div className="text-red-500 text-center mt-8">{error}</div>;
  if (!article) return <div className="text-center mt-8">Article non trouvé.</div>;

  return (
    <div className="max-w-3xl mx-auto mt-8">
      <h1 className="text-3xl font-bold mb-4">{article.title}</h1>
      <div className="text-gray-600 mb-4">
        Par {article.author} | {new Date(article.createdAt).toLocaleDateString()}
      </div>
      <div className="prose max-w-none mb-8">{article.content}</div>
      
      {user && user.id === article.authorId && (
        <div className="mb-8">
          <Link to={`/edit-article/${article.id}`} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mr-4">
            Modifier l'article
          </Link>
          <button className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
            Supprimer l'article
          </button>
        </div>
      )}

      {article.allowComments && (
        <div>
          <h2 className="text-2xl font-bold mb-4">Commentaires</h2>
          <CommentList articleId={article.id} />
          <CommentForm articleId={article.id} onCommentAdded={handleCommentAdded} />
        </div>
      )}
    </div>
  );
}

export default ArticleDetail;