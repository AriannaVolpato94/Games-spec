import { BrowserRouter, Routes, Route } from "react-router-dom";
import Homepage from "../pages/homepage/index.jsx";
import Layout from "../layout/Layout.jsx";
import GenresDropdown from "../components/GenresDropdown.jsx";
import GenresPage from "../pages/genrepage/index.jsx";
import Gamepage from "../pages/gamepage/index.jsx";
import Header from "../components/Header.jsx";
import RegisterPage from "../pages/register/RegisterPage.jsx";
import Login from "../../src/login/LoginPage.jsx";
import LoginPage from "../../src/login/LoginPage.jsx";



export default function Routing() {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<Layout />}>
                <Route path="/" element={<Homepage />} />
                <Route path="/src/pages/genrepage/index.jsx" element={<GenresPage />} />
                <Route path="/layout" element={<Layout />} />
                <Route path="/games/:slug/:id" element={<Gamepage />} />
                <Route path="/components/header" element={<Header />} />
                <Route path="/components/genresdropdown" element={<GenresDropdown />} />
                <Route path="/src/register" element={<RegisterPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/account" element={<AccountPage/>} />
           </Route>
            </Routes>
        </BrowserRouter>
    );
}