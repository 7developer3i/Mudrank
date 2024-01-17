import React, { useEffect } from "react";
import { Navbar } from "../component/homepage/Navbar";
import { Home } from "../component/homepage/Home";
import { Footer } from "../component/homepage/Footer";
// import "../css/menu_style.css";
// import "../css/style.css";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

export function HomePage() {

    const navigate = useNavigate()

    useEffect(() => {
        const googleId = Cookies.get("userin");
        if (googleId !== undefined) {
          navigate("/mainpage");
        } else {
          navigate("/");
        }
      }, []);

    return (
        <>
            <div>
                <Navbar />
                <main id="main-content" className="main-content" role="main" tabIndex="-1">
                    <Home />
                    <Footer />
                </main>
            </div>
        </>
    )
}