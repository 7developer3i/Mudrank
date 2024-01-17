
import React from "react";
import { Navbar } from "../component/homepage/Navbar";
import { Footer } from "../component/homepage/Footer";
import { Partnership } from "../component/homepage/Partnership";

export function PartnershipPage() {
    return (
        <>
            <div>
                <Navbar />
                <main id="main-content" className="main-content" role="main" tabIndex="-1">
                    <Partnership />
                    <Footer />
                </main>
            </div>
        </>
    )
}