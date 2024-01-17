
import React from "react";
import { Navbar } from "../component/homepage/Navbar";
import { Footer } from "../component/homepage/Footer";
import { Raise } from "../component/homepage/Raise";


export function RaisePage() {

    return (
        <>
            <div>
                <Navbar />
                <main id="main-content" className="main-content" role="main" tabIndex="-1">
                    <Raise />
                    <Footer />
                </main>
            </div>
        </>
    )
}