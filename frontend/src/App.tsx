import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./navigation/Navbar";
import NotFound from "./pages/NotFound";
import Notes from "./pages/Notes";

export default function App() {
  return (
    <main className="layout">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/notes" element={<Notes />} />
          <Route path="/*" element={<NotFound />} />
        </Routes>
      </Router>
    </main>
  );
}
