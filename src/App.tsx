import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "sonner";
import Index from "./pages/Index";
import CreateBoard from "./pages/CreateBoard";
import BoardSuccess from "./pages/BoardSuccess";
import BoardPage from "./pages/BoardPage";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <BrowserRouter>
      <Toaster position="top-center" richColors />
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/create" element={<CreateBoard />} />
        <Route path="/board/:slug/success" element={<BoardSuccess />} />
        <Route path="/board/:slug" element={<BoardPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
