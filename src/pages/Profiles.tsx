import React from 'react';
import { motion } from 'framer-motion';

const profiles = [
  {
    id: 1,
    name: 'Олена Петренко',
    role: 'Дизайнер',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=128&q=80',
  },
  {
    id: 2,
    name: 'Іван Ковальчук',
    role: 'Розробник',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=crop&w=128&q=80',
  },
  {
    id: 3,
    name: 'Марія Шевченко',
    role: 'Менеджер',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=crop&w=128&q=80',
  },
];

const Profiles = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="container mx-auto px-4 py-8"
    >
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">
          Профілі команди
        </h1>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {profiles.map((profile) => (
            <motion.div
              key={profile.id}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              whileHover={{ scale: 1.05 }}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden"
            >
              <img
                src={profile.image}
                alt={profile.name}
                className="w-full h-32 object-cover"
              />
              <div className="p-4">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  {profile.name}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">{profile.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default Profiles;