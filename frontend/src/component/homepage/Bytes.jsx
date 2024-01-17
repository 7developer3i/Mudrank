import React from 'react'
import whatbanner from "../../images/what_banner.png";
import blog2 from "../../images/blog2.png";

export function Bytes() {

    const videoData = [
        {
            image: blog2,
            url: 'https://www.youtube.com/watch?v=_sI_Ps7JSEk',
            episode: 'Episode 1',
            title: 'How to be a startup investor',
            description:
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.',
        },

        {
            image: blog2,
            url: 'https://www.youtube.com/watch?v=_sI_Ps7JSEk',
            episode: 'Episode 2',
            title: 'How to be a startup investor',
            description:
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.',
        },

        {
            image: blog2,
            url: 'https://www.youtube.com/watch?v=_sI_Ps7JSEk',
            episode: 'Episode 3',
            title: 'How to be a startup investor',
            description:
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.',
        },

    ];


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
                                    <h4>Tutorials</h4>
                                </div>
                                <div className="tut_lists">
                                    <div className="tut_list_inner">
                                        {/* <div className="tut_item">
                                            <a
                                                data-fancybox
                                                data-src="https://www.youtube.com/watch?v=_sI_Ps7JSEk"
                                                className="tut_item_inner"
                                            >
                                                <div className="tut_vid">
                                                    <div
                                                        className="backimg"
                                                        style={{ backgroundImage: `url(${blog2})` }}
                                                    >
                                                        <svg
                                                            className="transparent_svg"
                                                            data-name="Layer 1"
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            viewBox="0 0 321 181"
                                                        >
                                                            <rect
                                                                className="cls-1"
                                                                x="0.5"
                                                                y="0.5"
                                                                width="320"
                                                                height="180"
                                                            ></rect>
                                                        </svg>
                                                    </div>
                                                </div>
                                                <div className="tut_info">
                                                    <div className="ep_num">
                                                        <p className="sml">Episode 1</p>
                                                    </div>
                                                    <div className="tut_tt">
                                                        <h5 className="ssize">How to be a startup investor</h5>
                                                    </div>
                                                    <div className="tut_desc">
                                                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                                                    </div>
                                                    <div className="wtc_vid">

                                                        <p className="button wbg" href="https://www.youtube.com/watch?v=_sI_Ps7JSEk" target="_blank" rel="noopener noreferrer">
                                                            <svg
                                                                className="svg"
                                                                focusable="false"
                                                                aria-hidden="true"
                                                                viewBox="0 0 18 18"
                                                                width={18}
                                                                height={18}
                                                                fill="none"
                                                            >
                                                                <circle cx={9} cy={9} r={9} fill="#2D32FF" />
                                                                <path
                                                                    d="M12.095 8.1251L7.95545 5.73349C7.83712 5.66348 7.70237 5.62605 7.56488 5.625C7.34876 5.625 7.14149 5.71085 6.98867 5.86367C6.83585 6.01649 6.75 6.22376 6.75 6.43988V11.5727C6.75003 11.7161 6.78847 11.8569 6.86134 11.9804C6.93421 12.104 7.03884 12.2057 7.16434 12.2751C7.28985 12.3445 7.43166 12.379 7.57503 12.3751C7.71839 12.3711 7.85808 12.3288 7.97956 12.2526L12.1239 9.63432C12.2528 9.55367 12.3585 9.44102 12.4309 9.30734C12.5033 9.17366 12.5398 9.02351 12.5369 8.87152C12.534 8.71953 12.4917 8.57089 12.4143 8.44008C12.3368 8.30927 12.2268 8.20075 12.095 8.1251Z"
                                                                    fill="white"
                                                                />
                                                            </svg>
                                                            Watch Video
                                                        </p>

                                                    </div>
                                                </div>
                                            </a>
                                        </div>*/}

                                        {videoData.map((video, index) => (
                                            <div className="tut_item" key={index}>
                                                <a  data-fancybox={`tutorial-${index}`}
                                                    data-src={video.url}
                                                    className="tut_item_inner"
                                                >
                                                    <div className="tut_vid">
                                                        <div
                                                            className="backimg"
                                                            style={{ backgroundImage: `url(${video.image})` }}
                                                        >
                                                            <svg
                                                                className="transparent_svg"
                                                                data-name="Layer 1"
                                                                xmlns="http://www.w3.org/2000/svg"
                                                                viewBox="0 0 321 181"
                                                            >
                                                                <rect className="cls-1" x="0.5" y="0.5" width="320" height="180"></rect>
                                                            </svg>
                                                        </div>
                                                    </div>
                                                    <div className="tut_info">
                                                        <div className="ep_num">
                                                            <p className="sml">{video.episode}</p>
                                                        </div>
                                                        <div className="tut_tt">
                                                            <h5 className="ssize">{video.title}</h5>
                                                        </div>
                                                        <div className="tut_desc">
                                                            <p>{video.description}</p>
                                                        </div>
                                                        <div className="wtc_vid">
                                                            <p className="button wbg">
                                                                <svg
                                                                    className="svg"
                                                                    focusable="false"
                                                                    aria-hidden="true"
                                                                    viewBox="0 0 18 18"
                                                                    width={18}
                                                                    height={18}
                                                                    fill="none"
                                                                >
                                                                    <circle cx={9} cy={9} r={9} fill="#2D32FF" />
                                                                    <path
                                                                        d="M12.095 8.1251L7.95545 5.73349C7.83712 5.66348 7.70237 5.62605 7.56488 5.625C7.34876 5.625 7.14149 5.71085 6.98867 5.86367C6.83585 6.01649 6.75 6.22376 6.75 6.43988V11.5727C6.75003 11.7161 6.78847 11.8569 6.86134 11.9804C6.93421 12.104 7.03884 12.2057 7.16434 12.2751C7.28985 12.3445 7.43166 12.379 7.57503 12.3751C7.71839 12.3711 7.85808 12.3288 7.97956 12.2526L12.1239 9.63432C12.2528 9.55367 12.3585 9.44102 12.4309 9.30734C12.5033 9.17366 12.5398 9.02351 12.5369 8.87152C12.534 8.71953 12.4917 8.57089 12.4143 8.44008C12.3368 8.30927 12.2268 8.20075 12.095 8.1251Z"
                                                                        fill="white"
                                                                    />
                                                                </svg>
                                                                Watch Video
                                                            </p>
                                                        </div>
                                                    </div>
                                                </a>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}


