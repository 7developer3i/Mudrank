import banner from "../../images/banner.png"
import portfolio from "../../images/no_invest.png"


export function Portfolio() {

    return (
        <>
            <section className="portfolio explore_container">
                <div className="bcontainer">
                    <div className="explore_inner">
                        <div className="explore_cnt">
                            <div className="inner_container">

                                <section className="portfolio_lists"                                                    >
                                    <div className="sec_container">
                                        <div className="inner_img backimg" style={{ backgroundImage: `url(${banner})` }}>

                                            <div className="sec_inner">
                                                <h4>
                                                    Portfolio
                                                </h4>

                                                <div className="port_items">
                                                    <div className="no_item">
                                                        <div className="no_img">
                                                            <div
                                                                className="backimg"
                                                                style={{ backgroundImage: `url(${portfolio})` }}
                                                            >
                                                                <svg
                                                                    className="transparent_svg"
                                                                    data-name="Layer 1"
                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                    viewBox="0 0 311 211"
                                                                >
                                                                    <rect
                                                                        className="cls-1"
                                                                        x="0.5"
                                                                        y="0.5"
                                                                        width="310"
                                                                        height="210"
                                                                    ></rect>
                                                                </svg>
                                                            </div>
                                                        </div>
                                                        <div className="no_cnt">
                                                            <h5>
                                                                No Investments
                                                            </h5>
                                                            <p> You have not subscribed to any campaigns on Mudrank
                                                            </p>
                                                        </div>
                                                        <div className="inner_btn"><a href="#" className="button wbg">Explore Now</a></div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </section>
                            </div>
                        </div>
                    </div>
                </div>
            </section >

        </>
    )

}