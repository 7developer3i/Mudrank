import React from "react";
import whatbanner from "../../images/what_banner.png"
import aws from "../../images/aws2.png"
import mix from "../../images/mixx.png"
import exfin from "../../images/exfin.png"

export function Partnership() {
    return (
        <>
            <section className="whatis abt_us">
                <div className="bcontainer">
                    <div className="what_banner">
                        <div
                            className="backimg"
                            style={{ backgroundImage: `url(${whatbanner})` }}
                        >
                            <div className="inner_container">
                                <div className="what_head">
                                    <h4>Benefits of working with Mudrank</h4>

                                    <div className="btn_grp">
                                        <div className="inner_btn">
                                            <a href="#startups" className="button wclr bbg">Startups</a>
                                        </div>

                                        <div className="inner_btn">
                                            <a href="#investors" className="button wclr bbg">Investors</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section id="startups" className="startups">
                <div className="bcontainer">

                    <div className="inner_container">
                        <div className="cmt_head"><h4>Startups</h4>
                            <h6>Exclusive benefits when you raise through Mudrank</h6>
                        </div>

                        <div className="topics_lists">

                            <div className="topic_item" >
                                <div className="inner_startup">
                                    <div className="startup_head">
                                        <div className="startup_tt">
                                            <p className="top_tt">Amazon Web Services</p>
                                            <p className="sml">
                                                Cloud Services
                                            </p>
                                        </div>
                                        <div className="startup_img">
                                            <img src={aws} alt="" />
                                        </div>
                                    </div>
                                    <div className="startup_desc">
                                        <p className="sml">
                                            Amazon Web Services provides on-demand cloud computing platforms and APIs to individuals, companies, and governments, on a metered,
                                            pay-as-you-go basis.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="topic_item" >
                                <div className="inner_startup">
                                    <div className="startup_head">
                                        <div className="startup_tt">
                                            <p className="top_tt">Mix panel</p>
                                            <p className="sml">
                                                Analytics
                                            </p>
                                        </div>
                                        <div className="startup_img">
                                            <img src={mix} alt="" />
                                        </div>
                                    </div>
                                    <div className="startup_desc">
                                        <p className="sml">
                                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="topic_item" >
                                <div className="inner_startup">
                                    <div className="startup_head">
                                        <div className="startup_tt">
                                            <p className="top_tt">Exfin</p>
                                            <p className="sml">
                                                Lorem ipsum
                                            </p>
                                        </div>
                                        <div className="startup_img">
                                            <img src={exfin} alt="" />
                                        </div>
                                    </div>
                                    <div className="startup_desc">
                                        <p className="sml">
                                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="topic_item" >
                                <div className="inner_startup">
                                    <div className="startup_head">
                                        <div className="startup_tt">
                                            <p className="top_tt">Mixpanel</p>
                                            <p className="sml">
                                                Analytics
                                            </p>
                                        </div>
                                        <div className="startup_img">
                                            <img src={mix} alt="" />
                                        </div>
                                    </div>
                                    <div className="startup_desc">
                                        <p className="sml">
                                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="topic_item" >
                                <div className="inner_startup">
                                    <div className="startup_head">
                                        <div className="startup_tt">
                                            <p className="top_tt">Exfin</p>
                                            <p className="sml">
                                                Lorem ipsum
                                            </p>
                                        </div>
                                        <div className="startup_img">
                                            <img src={exfin} alt="" />
                                        </div>
                                    </div>
                                    <div className="startup_desc">
                                        <p className="sml">
                                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="topic_item" >
                                <div className="inner_startup">
                                    <div className="startup_head">
                                        <div className="startup_tt">
                                            <p className="top_tt">Amazon Web Services</p>
                                            <p className="sml">
                                                Cloud Services
                                            </p>
                                        </div>
                                        <div className="startup_img">
                                            <img src={aws} alt="" />
                                        </div>
                                    </div>
                                    <div className="startup_desc">
                                        <p className="sml">
                                            Amazon Web Services provides on-demand cloud computing platforms and APIs to individuals, companies, and governments, on a metered,
                                            pay-as-you-go basis.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="topic_item" >
                                <div className="inner_startup">
                                    <div className="startup_head">
                                        <div className="startup_tt">
                                            <p className="top_tt">Amazon Web Services</p>
                                            <p className="sml">
                                                Cloud Services
                                            </p>
                                        </div>
                                        <div className="startup_img">
                                            <img src={aws} alt="" />
                                        </div>
                                    </div>
                                    <div className="startup_desc">
                                        <p className="sml">
                                            Amazon Web Services provides on-demand cloud computing platforms and APIs to individuals, companies, and governments, on a metered,
                                            pay-as-you-go basis.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="topic_item" >
                                <div className="inner_startup">
                                    <div className="startup_head">
                                        <div className="startup_tt">
                                            <p className="top_tt">Mix panel</p>
                                            <p className="sml">
                                                Analytics
                                            </p>
                                        </div>
                                        <div className="startup_img">
                                            <img src={mix} alt="" />
                                        </div>
                                    </div>
                                    <div className="startup_desc">
                                        <p className="sml">
                                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="topic_item" >
                                <div className="inner_startup">
                                    <div className="startup_head">
                                        <div className="startup_tt">
                                            <p className="top_tt">Exfin</p>
                                            <p className="sml">
                                                Lorem ipsum
                                            </p>
                                        </div>
                                        <div className="startup_img">
                                            <img src={exfin} alt="" />
                                        </div>
                                    </div>
                                    <div className="startup_desc">
                                        <p className="sml">
                                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="topic_item" >
                                <div className="inner_startup">
                                    <div className="startup_head">
                                        <div className="startup_tt">
                                            <p className="top_tt">Mixpanel</p>
                                            <p className="sml">
                                                Analytics
                                            </p>
                                        </div>
                                        <div className="startup_img">
                                            <img src={mix} alt="" />
                                        </div>
                                    </div>
                                    <div className="startup_desc">
                                        <p className="sml">
                                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                                        </p>
                                    </div>
                                </div>
                            </div>

                        </div>

                    </div>
                </div>
            </section>


            <section id="investors" className="startups mrg77">
                <div className="bcontainer">

                    <div className="inner_container">
                        <div className="cmt_head"><h4>Investors</h4>
                            <h6>We're working to give you additional benefits, apart from all the investment opportunities. Stay tuned!</h6>
                        </div>
                    </div>
                </div>
            </section>

        </>
    );
}