import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getArticleById, updateArticle } from '../../services/articleService';

function EditArticle() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [isPublic, setIsPublic] = useState(true);
  const [allowComments, setAllowComments] = useState(true);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const article = await getArticleById(id);
        setTitle(article.title);
        setContent(article.content);
        setIsPublic(article.isPublic);
        setAllowComments(article.allowComments);
      } catch (err) {
        setError('Erreur lors du chargement de l\'article.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchArticle();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      await updateArticle(id, { title, content, isPublic, allowComments });
      navigate(`/article/${id}`);
    } catch (err) {
      setError('Erreur lors de la mise à jour de l\'article. Veuillez réessayer.');
    }
  };

  if (isLoading) return <div className="text-center mt-8">Chargement...</div>;
  if (error) return <div className="text-red-500 text-center mt-8">{error}</div>;

  return (
    <div className="max-w-2xl mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-4">Modifier l'article</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="title" className="block mb-1">Titre</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="w-full px-3 py-2 border rounded-md"
          />
        </div>
        <div>
          <label htmlFor="content" className="block mb-1">Contenu</label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
            className="w-full px-3 py-2 border rounded-md h-40"
          />
        </div>
        <div className="flex items-center space-x-4">
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={isPublic}
              onChange={(e) => setIsPublic(e.target.checked)}
              className="mr-2"
            />
            Article public
          </label>
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={allowComments}
              onChange={(e) => setAllowComments(e.target.checked)}
              className="mr-2"
            />
            Autoriser les commentaires
          </label>
        </div>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
          Mettre à jour l'article
        </button>
      </form>
    </div>
  );
}

export default EditArticle;