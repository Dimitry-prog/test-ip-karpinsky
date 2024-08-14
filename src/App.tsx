import { Route, Routes } from 'react-router-dom';
import Layout from '@/shared/components/layout.tsx';
import JournalPage from '@/pages/journal';
import HomePage from '@/pages/home';
import JournalSinglePage from '@/pages/journal-single';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="journal">
          <Route index element={<JournalPage />} />
          <Route path=":journalId" element={<JournalSinglePage />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
