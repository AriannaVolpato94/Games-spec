import { BrowserRouter, Routes, Route } from "react-router-dom";
import Homepage from "../pages/homepage/index.jsx";
import Layout from "../layout/Layout.jsx";
import GenresDropdown from "../components/GenresDropdown.jsx";
import GenresPage from "../pages/genrepage/index.jsx";
import Gamepage from "../pages/gamepage/index.jsx";
import Header from "../components/Header.jsx";
import RegisterPage from "../pages/register/RegisterPage.jsx";
import LoginPage from "../login/LoginPage.jsx";
import AccountPage from "../pages/account/AccountPage.jsx"; // ✅ aggiunto

export default function Routing() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Homepage />} />
          <Route path="/genres" element={<GenresPage />} />
          <Route path="/game/:slug/:id" element={<Gamepage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/account" element={<AccountPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
