import { motion } from 'framer-motion';
import { useSelector } from 'react-redux';
import { RootState } from '../store';

const Home = () => {
  const completedCount = useSelector((state: RootState) => state.tasks.completedCount);
  const incompleteCount = useSelector((state: RootState) => state.tasks.incompleteCount);
  const loading = useSelector((state: RootState) => state.tasks.loading); // Get loading state

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="container mx-auto px-4 py-8"
    >
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">
          Ласкаво просимо до нашого веб-додатку
        </h1>
        <div className="prose dark:prose-invert">
          <p className="text-lg text-gray-700 dark:text-gray-300 mb-4">
            Цей веб-додаток створено для демонстрації можливостей React та сучасних веб-технологій.
            Ви можете переглядати різні сторінки, залишати коментарі та насолоджуватися зручним
            інтерфейсом як у світлій, так і в темній темі.
          </p>
          <div className="grid md:grid-cols-2 gap-6 mt-8">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
              <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
                Особливості додатку
              </h2>
              <ul className="list-disc list-inside text-gray-700 dark:text-gray-300">
                <li>Адаптивний дизайн</li>
                <li>Темна та світла теми</li>
                <li>Система коментарів</li>
                <li>Анімації переходів</li>
              </ul>
            </div>
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
              <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
                Технології
              </h2>
              <ul className="list-disc list-inside text-gray-700 dark:text-gray-300">
                <li>React + Vite</li>
                <li>React Router</li>
                <li>Tailwind CSS</li>
                <li>Framer Motion</li>
              </ul>
            </div>
          </div>
          <div className="mt-8 p-4 bg-blue-100 dark:bg-blue-900 rounded-md">
            {loading ? (
              <p className="text-lg text-gray-800 dark:text-gray-200">Завантаження...</p>
            ) : (
              <>
                <p className="text-lg text-gray-800 dark:text-gray-200">
                  Завершені завдання: <strong>{completedCount}</strong>
                </p>
                <p className="text-lg text-gray-800 dark:text-gray-200">
                  Незавершені завдання: <strong>{incompleteCount}</strong>
                </p>
              </>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Home;