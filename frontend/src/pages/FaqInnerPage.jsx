import React from "react";
import { Navbar } from "../component/homepage/Navbar";
import { Footer } from "../component/homepage/Footer";
import { FaqInner } from "../component/homepage/FaqInner";

export function FaqInnerPage() {
  return (
        <>
            <div>
                <Navbar />
                <main id="main-content" className="main-content" role="main" tabIndex="-1">
                    <FaqInner />
                    <Footer />
                </main>
            </div>
        </>
    )
}