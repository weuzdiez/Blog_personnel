import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { getUserArticles, getFriendsArticles } from '../../services/articleService';
import ArticleList from './ArticleList';

function Dashboard() {
  const [userArticles, setUserArticles] = useState([]);
  const [friendsArticles, setFriendsArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const userArticlesData = await getUserArticles();
        setUserArticles(userArticlesData);

        const friendsArticlesData = await getFriendsArticles();
        setFriendsArticles(friendsArticlesData);
      } catch (error) {
        console.error("Erreur lors de la récupération des articles:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchArticles();
  }, []);

  if (isLoading) {
    return <div className="text-center mt-8">Chargement...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Tableau de bord</h1>
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold">Mes articles</h2>
          <Link to="/create-article" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
            Créer un article
          </Link>
        </div>
        <ArticleList articles={userArticles} />
      </div>
      <div>
        <h2 className="text-2xl font-semibold mb-4">Articles de mes amis</h2>
        <ArticleList articles={friendsArticles} />
      </div>
    </div>
  );
}

export default Dashboard;