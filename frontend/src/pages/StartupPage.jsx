
import React from "react";
import { Navbar } from "../component/homepage/Navbar";
import { Footer } from "../component/homepage/Footer";
import { Startup } from "../component/homepage/Startup";


export function StartupPage() {

    return (
        <>
            <div>
                <Navbar />
                <main id="main-content" className="main-content" role="main" tabIndex="-1">
                    <Startup />
                    <Footer />
                </main>
            </div>
        </>
    )
}