import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Home from './pages/Home';
import Balloons from './pages/Balloons';
import FinalMessage from './pages/FinalMessage';

// ─── App: route shell with AnimatePresence for page transitions ──────────────
export default function App() {
  const location = useLocation();

  return (
    // AnimatePresence enables exit animations between route changes
    <AnimatePresence mode="wait" initial={false}>
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/balloons" element={<Balloons />} />
        <Route path="/final" element={<FinalMessage />} />
      </Routes>
    </AnimatePresence>
  );
}
