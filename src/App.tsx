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
import Login from './pages/Login';
import Register from './pages/Register';
import PrivateRoute from './components/PrivateRoute';
import { AuthProvider } from './context/AuthContext'; // Import AuthProvider
import AppInitializer from './components/AppInitializer'; // Import AppInitializer

function App() {
  return (
    <Provider store={store}> {/* Wrap the app with Redux Provider */}
      <AuthProvider> {/* Wrap the app with AuthProvider */}
        <AppInitializer> {/* Wrap the app with AppInitializer */}
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
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                  <Route
                    path="/"
                    element={
                      <PrivateRoute>
                        <Home />
                      </PrivateRoute>
                    }
                  />
                  <Route
                    path="/pages"
                    element={
                      <PrivateRoute>
                        <Pages />
                      </PrivateRoute>
                    }
                  />
                  <Route
                    path="/profiles"
                    element={
                      <PrivateRoute>
                        <Profiles />
                      </PrivateRoute>
                    }
                  />
                  <Route
                    path="/todo"
                    element={
                      <PrivateRoute>
                        <TodoList />
                      </PrivateRoute>
                    }
                  />
                  <Route
                    path="/lifecycle"
                    element={
                      <PrivateRoute>
                        <LifecycleDemo />
                      </PrivateRoute>
                    }
                  />
                </Routes>
              </div>
            </ThemeProvider>
          </Router>
        </AppInitializer>
      </AuthProvider>
    </Provider>
  );
}

export default App;