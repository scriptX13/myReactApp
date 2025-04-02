import { useState, useEffect } from 'react';

const LifecycleDemo = () => {
  const [count, setCount] = useState(0);
  const [logs, setLogs] = useState<string[]>([]);

  // ComponentDidMount: Runs once when the component is mounted
  useEffect(() => {
    console.log('Component mounted');
    setLogs((prevLogs) => [...prevLogs, 'Компонент змонтовано!']);

    // ComponentWillUnmount: Runs when the component is unmounted
    return () => {
      console.log('Component unmounted');
      setLogs((prevLogs) => [...prevLogs, 'Компонент знищено!']);
    };
  }, []);

  // ComponentDidUpdate: Runs whenever the `count` state changes
  useEffect(() => {
    if (count > 0) {
      console.log(`Count updated to: ${count}`);
      setLogs((prevLogs) => [...prevLogs, `Лічильник оновлено: ${count}`]);
    }
  }, [count]);

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white">React Lifecycle Demo</h1>
      <p className="text-lg text-gray-700 dark:text-gray-300 mt-4">
        Лічильник: <strong>{count}</strong>
      </p>
      <div className="mt-4">
        <button
          onClick={() => setCount(count + 1)}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Збільшити
        </button>
        <button
          onClick={() => setCount(0)}
          className="ml-4 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
        >
          Скинути
        </button>
      </div>
      <div className="mt-8 p-4 bg-gray-100 dark:bg-gray-800 rounded-md">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Логи життєвого циклу:</h2>
        <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 mt-2">
          {logs.map((log, index) => (
            <li key={index}>{log}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default LifecycleDemo;
