import { useState } from 'react';
import { signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth'; // Import signInWithPopup
import { auth, googleProvider } from '../firebase'; // Import googleProvider
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/');
    } catch (err) {
      setError('Невірний email або пароль');
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      navigate('/');
    } catch (err) {
      setError('Помилка входу через Google');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400 dark:from-gray-800 dark:via-gray-900 dark:to-black transition-colors duration-200">
      <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-2xl max-w-md w-full border border-gray-300 dark:border-gray-700">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Вхід</h1>
        {error && <p className="text-red-500 dark:text-red-400 mb-4">{error}</p>}
        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 mb-4 border rounded-md dark:bg-gray-700 dark:text-white dark:border-gray-600"
          />
          <input
            type="password"
            placeholder="Пароль"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 mb-4 border rounded-md dark:bg-gray-700 dark:text-white dark:border-gray-600"
          />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
          >
            Увійти
          </button>
        </form>
        <button
          onClick={handleGoogleLogin}
          className="w-full bg-red-600 text-white py-2 rounded-md hover:bg-red-700 dark:bg-red-500 dark:hover:bg-red-600 mt-4"
        >
          Увійти через Google
        </button>
        <p className="mt-4 text-center text-gray-700 dark:text-gray-300">
          Немає акаунту?{' '}
          <a href="/register" className="text-blue-600 dark:text-blue-400 hover:underline">
            Зареєструватися
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
