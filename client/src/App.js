import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Home";
import Auth from "./Auth";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="auth" element={<Auth />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
