
import React from "react";
import { Navbar } from "../component/homepage/Navbar";
import { Footer } from "../component/homepage/Footer";
import { Terms } from "../component/homepage/Terms";


export function TermsPage() {

    return (
        <>
            <div>
                <Navbar />
                <main id="main-content" className="main-content" role="main" tabIndex="-1">
                    <Terms />
                    <Footer />
                </main>
            </div>
        </>
    )
}