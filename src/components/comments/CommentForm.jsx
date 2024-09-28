import { useState } from 'react';
import { createComment } from '../../services/commentService';

function CommentForm({ articleId, onCommentAdded }) {
  const [content, setContent] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!content.trim()) {
      setError('Le commentaire ne peut pas être vide.');
      return;
    }

    try {
      const newComment = await createComment(articleId, { content });
      setContent('');
      onCommentAdded(newComment);
    } catch (err) {
      setError('Erreur lors de l\'ajout du commentaire. Veuillez réessayer.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-4">
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Ajouter un commentaire..."
        className="w-full p-2 border rounded-lg resize-none"
        rows="3"
      />
      {error && <p className="text-red-500 mt-1">{error}</p>}
      <button
        type="submit"
        className="mt-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Publier le commentaire
      </button>
    </form>
  );
}

export default CommentForm;