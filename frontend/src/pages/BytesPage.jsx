
import React from "react";
import { Navbar } from "../component/homepage/Navbar";
import { Footer } from "../component/homepage/Footer";
import { Bytes } from "../component/homepage/Bytes";

export function BytesPage() {
    return (
        <>
            <div>
                <Navbar />
                <main id="main-content" className="main-content" role="main" tabIndex="-1">
                    <Bytes />
                    <Footer />
                </main>
            </div>
        </>
    )
}