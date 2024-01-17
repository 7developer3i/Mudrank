
import React from "react";
import { Navbar } from "../component/homepage/Navbar";
import { Footer } from "../component/homepage/Footer";
import { Blog } from "../component/homepage/Blog";


export function BlogPage() {

    return (
        <>
            <div>
                <Navbar />
                <main id="main-content" className="main-content" role="main" tabIndex="-1">
                    <Blog />
                    <Footer />
                </main>
            </div>
        </>
    )
}