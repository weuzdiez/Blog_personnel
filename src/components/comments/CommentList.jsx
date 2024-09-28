import { useState, useEffect } from 'react';
import { getComments, deleteComment } from '../../services/commentService';
import { useAuth } from '../../hooks/useAuth';

function CommentList({ articleId }) {
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const { user } = useAuth();

  useEffect(() => {
    fetchComments();
  }, [articleId]);

  const fetchComments = async () => {
    try {
      const data = await getComments(articleId);
      setComments(data);
    } catch (err) {
      setError('Erreur lors du chargement des commentaires.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteComment = async (commentId) => {
    try {
      await deleteComment(commentId);
      setComments(comments.filter(comment => comment.id !== commentId));
    } catch (err) {
      setError('Erreur lors de la suppression du commentaire.');
    }
  };

  if (isLoading) return <div>Chargement des commentaires...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="space-y-4">
      {comments.map((comment) => (
        <div key={comment.id} className="bg-gray-100 p-4 rounded-lg">
          <p className="mb-2">{comment.content}</p>
          <div className="text-sm text-gray-600 flex justify-between items-center">
            <span>Par {comment.author} le {new Date(comment.createdAt).toLocaleDateString()}</span>
            {(user.id === comment.authorId || user.id === comment.articleAuthorId) && (
              <button
                onClick={() => handleDeleteComment(comment.id)}
                className="text-red-500 hover:text-red-700"
              >
                Supprimer
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

export default CommentList;