import React from 'react';
import { motion } from 'framer-motion';
import CommentSection from '../components/CommentSection';

const Pages = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="container mx-auto px-4 py-8"
    >
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">
          Сторінки та коментарі
        </h1>
        <div className="prose dark:prose-invert mb-8">
          <p className="text-lg text-gray-700 dark:text-gray-300">
            На цій сторінці ви можете залишати свої коментарі та думки. Всі коментарі
            зберігаються локально у вашому браузері.
          </p>
        </div>
        <CommentSection />
      </div>
    </motion.div>
  );
};

export default Pages;