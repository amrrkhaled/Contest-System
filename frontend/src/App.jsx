import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Problems from "./pages/Problems";
import ProblemDetails from "./pages/ProblemDetails";
import { ContestProvider } from "./context/ContestContext";

function App() {
  return (
    <ContestProvider>
      <Router>
        <Routes>
          <Route path="/problems" element={<Problems />} />
          <Route path="/problems/:id" element={<ProblemDetails />} />
        </Routes>
      </Router>
    </ContestProvider>
  );
}

export default App;
