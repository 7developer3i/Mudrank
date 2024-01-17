
import React, { useContext } from "react";
import { Navbar } from "../component/homepage/Navbar";
import { About } from "../component/homepage/About";
import { Footer } from "../component/homepage/Footer";
// import "../css/menu_style.css";
// import "../css/style.css";


export function AboutPage() {

    return (
        <>
            <div>
                <Navbar />
                <main id="main-content" className="main-content" role="main" tabIndex="-1">
                    <About />
                    <Footer />
                </main>
            </div>
        </>
    )
}