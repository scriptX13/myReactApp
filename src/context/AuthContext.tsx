import React, { createContext, useContext, useEffect, useState } from 'react';
import { onAuthStateChanged, User, signOut } from 'firebase/auth';
import { auth } from '../firebase'; // Correctly import auth
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase'; // Import Firestore
import { useDispatch } from 'react-redux';
import { setTasks, setLoading } from '../store/taskSlice'; // Import Redux actions

interface AuthContextProps {
  user: User | null;
  loading: boolean;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loadingState, setLoadingState] = useState(true);
  const dispatch = useDispatch();

  const fetchTasks = async () => {
    try {
      dispatch(setLoading(true)); // Set loading to true before fetching tasks
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
      dispatch(setLoading(false)); // Set loading to false after fetching tasks
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        await fetchTasks(); // Fetch tasks when the user logs in
      }
      setLoadingState(false);
    });
    return () => unsubscribe();
  }, [dispatch]);

  const logout = async () => {
    await signOut(auth);
  };

  return (
    <AuthContext.Provider value={{ user, loading: loadingState, logout }}>
      {!loadingState && children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextProps => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
