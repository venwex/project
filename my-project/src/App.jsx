import { Routes, Route } from "react-router-dom";
import RootLayout from "./layouts/RootLayout";
import Home from "./pages/Home";
import About from "./pages/About";
import CharactersList from "./pages/CharacterList";
import CharacterDetails from "./pages/CharacterDetails";
import Login from "./pages/Login";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<RootLayout />}>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="items" element={<CharactersList />} />
        <Route path="items/:id" element={<CharacterDetails />} />
        <Route path="login" element={<Login />} />
      </Route>
    </Routes>
  );
}
