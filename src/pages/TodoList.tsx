import { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, addDoc, getDocs, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { setTasks, addTask, toggleTaskCompletion, deleteTask } from '../store/taskSlice';

const TodoList = () => {
  const [newTask, setNewTask] = useState<string>('');
  const tasks = useSelector((state: RootState) => state.tasks.tasks);
  const dispatch = useDispatch();
  const tasksCollection = collection(db, 'tasks');

  useEffect(() => {
    const fetchTasks = async () => {
      const taskSnapshot = await getDocs(tasksCollection);
      const fetchedTasks = taskSnapshot.docs.map((doc) => ({
        id: doc.id,
        name: doc.data().name || '',
        completed: doc.data().completed || false,
      }));
      dispatch(setTasks(fetchedTasks));
    };
    fetchTasks();
  }, [dispatch]);

  const handleAddTask = async () => {
    if (newTask.trim()) {
      const docRef = await addDoc(tasksCollection, { name: newTask, completed: false });
      dispatch(addTask({ id: docRef.id, name: newTask, completed: false }));
      setNewTask('');
    }
  };

  const handleToggleTaskCompletion = async (id: string, completed: boolean) => {
    await updateDoc(doc(tasksCollection, id), { completed: !completed });
    dispatch(toggleTaskCompletion(id));
  };

  const handleDeleteTask = async (id: string) => {
    await deleteDoc(doc(tasksCollection, id));
    dispatch(deleteTask(id));
  };

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white">To-Do List</h1>
      <div className="flex items-center space-x-2 mt-4">
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Добавить задание"
          className="flex-1 p-2 border rounded-md dark:bg-gray-700 dark:text-white"
        />
        <button
          onClick={handleAddTask}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Добавить
        </button>
      </div>
      <ul className="mt-4 space-y-2">
        {tasks.map((task) => (
          <li key={task.id} className="flex items-center justify-between p-2 bg-gray-100 dark:bg-gray-700 rounded-md">
            <span
              onClick={() => handleToggleTaskCompletion(task.id, task.completed)}
              className={`cursor-pointer ${task.completed ? 'line-through text-gray-500' : ''}`}
            >
              {task.name}
            </span>
            <button
              onClick={() => handleDeleteTask(task.id)}
              className="text-red-500 hover:text-red-700"
            >
              Удалить
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
