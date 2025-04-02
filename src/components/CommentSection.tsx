import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Comment {
  id: string;
  text: string;
  author: string;
  timestamp: number;
}

const CommentSection = () => {
  const [comments, setComments] = useState<Comment[]>(() => {
    const saved = localStorage.getItem('comments');
    return saved ? JSON.parse(saved) : [];
  });
  const [newComment, setNewComment] = useState('');
  const [author, setAuthor] = useState('');

  useEffect(() => {
    localStorage.setItem('comments', JSON.stringify(comments));
  }, [comments]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim() || !author.trim()) return;

    const comment: Comment = {
      id: Date.now().toString(),
      text: newComment.trim(),
      author: author.trim(),
      timestamp: Date.now(),
    };

    setComments(prev => [comment, ...prev]);
    setNewComment('');
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <form onSubmit={handleSubmit} className="mb-8 space-y-4">
        <div>
          <label htmlFor="author" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Ваше ім'я
          </label>
          <input
            type="text"
            id="author"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            placeholder="Введіть ваше ім'я"
            required
          />
        </div>
        <div>
          <label htmlFor="comment" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Коментар
          </label>
          <textarea
            id="comment"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            rows={3}
            placeholder="Напишіть ваш коментар"
            required
          />
        </div>
        <button
          type="submit"
          className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Додати коментар
        </button>
      </form>

      <AnimatePresence>
        {comments.map((comment) => (
          <motion.div
            key={comment.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow mb-4"
          >
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">{comment.author}</h3>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                {new Date(comment.timestamp).toLocaleString('uk-UA')}
              </span>
            </div>
            <p className="text-gray-700 dark:text-gray-300">{comment.text}</p>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default CommentSection;