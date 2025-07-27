import {Outlet} from "react-router-dom";
import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";
import Sidebar from "../components/Sidebar.jsx";
import Searchbar from "../components/Searchbar.jsx";


export default function Layout () {
    return (
        <div className="style-layout-system">

            <nav className="style-header"> Header </nav>
            <Header />

            <div className="style-sidebar-filters">
            <Sidebar/>
            </div>
            
            <div className="style-searchbar">
            <Searchbar/>
            </div>
            
         <div className="style-main-content">
            <Outlet />
         </div>

         <div className="style-footer"> Footer </div>
        
        <Footer/>
        </div>
    );
};