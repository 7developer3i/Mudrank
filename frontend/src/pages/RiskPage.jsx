
import React from "react";
import { Navbar } from "../component/homepage/Navbar";
import { Footer } from "../component/homepage/Footer";
import { Risk } from "../component/homepage/Risk";

export function RiskPage() {

    return (
        <>
            <div>
                <Navbar />
                <main id="main-content" className="main-content" role="main" tabIndex="-1">
                    <Risk />
                    <Footer />
                </main>
            </div>
        </>
    )
}