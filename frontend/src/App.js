import Form from './pages/form';
import Login from './pages/login';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import TabView from './pages/tabs';

function App() {
  return (
    <div className="App">
<Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<TabView />} />
        <Route path="/register" element={<Form />} />
      </Routes>
    </Router>
    </div>
  );
}

export default App;
