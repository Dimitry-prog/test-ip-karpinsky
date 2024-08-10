import { Route, Routes } from 'react-router-dom';
import Layout from './shared/components/layout.tsx';
import HomePage from './pages/home';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
      </Route>
    </Routes>
  );
}

export default App;
