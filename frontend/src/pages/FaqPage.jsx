
import React from "react";
import { Navbar } from "../component/homepage/Navbar";
import { Faq } from "../component/homepage/Faq";
import { Footer } from "../component/homepage/Footer";

export function FaqPage() {
  return (
        <>
            <div>
                <Navbar />
                <main id="main-content" className="main-content" role="main" tabIndex="-1">
                    <Faq />
                    <Footer />
                </main>
            </div>
        </>
    )
}