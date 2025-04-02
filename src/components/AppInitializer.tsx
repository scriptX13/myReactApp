import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import { setTasks } from '../store/taskSlice';

const AppInitializer: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [loading, setLoading] = useState(true); // Local loading state
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const tasksCollection = collection(db, 'tasks');
        const taskSnapshot = await getDocs(tasksCollection);
        const fetchedTasks = taskSnapshot.docs.map((doc) => ({
          id: doc.id,
          name: doc.data().name || '',
          completed: doc.data().completed || false,
        }));
        dispatch(setTasks(fetchedTasks)); // Update Redux store with tasks
      } catch (error) {
        console.error('Error fetching tasks:', error);
      } finally {
        setLoading(false); // Set local loading to false after fetching tasks
      }
    };

    fetchTasks();
  }, [dispatch]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <p className="text-lg text-gray-800 dark:text-gray-200">Завантаження...</p>
      </div>
    );
  }

  return <>{children}</>;
};

export default AppInitializer;
