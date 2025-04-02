import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext'; // Import ThemeProvider
import { Provider } from 'react-redux';
import store from './store'; // Import the Redux store
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Pages from './pages/Pages';
import Profiles from './pages/Profiles';
import TodoList from './pages/TodoList'; // Import the new page
import LifecycleDemo from './components/LifecycleDemo'; // Import the new component

function App() {
  return (
    <Provider store={store}> {/* Wrap the app with Redux Provider */}
      <Router
        future={{
          v7_startTransition: true, // Opt-in to React.startTransition wrapping
          v7_relativeSplatPath: true, // Opt-in to relative splat path changes
        }}
      >
        <ThemeProvider> {/* Wrap the app with ThemeProvider */}
          <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
            <Navbar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/pages" element={<Pages />} />
              <Route path="/profiles" element={<Profiles />} />
              <Route path="/todo" element={<TodoList />} /> {/* Add the new route */}
              <Route path="/lifecycle" element={<LifecycleDemo />} /> {/* Add the new route */}
            </Routes>
          </div>
        </ThemeProvider>
      </Router>
    </Provider>
  );
}

export default App;