import React from "react";
import whatbanner from "../../images/what_banner.png"

export function Risk() {

    const data = [
        {
            id: 1,
            paratext: "1. Market Risk:",
            paraitem: "Market risk, also known as systematic risk, refers to the possibility of losing money due to overall market fluctuations. Factors such as economic conditions, geopolitical events, interest rate changes, and market sentiment can impact the value of your investments. While diversification can help mitigate this risk to some extent, it cannot eliminate it entirely."
        },
        {
            id: 2,
            paratext: "2. Volatility:",
            paraitem: "Price volatility is the rapid and unpredictable price fluctuations of an investment. High volatility can lead to significant gains, but it also increases the potential for significant losses. Investments with higher volatility may not be suitable for investors with a low risk tolerance."
        },
        {
            id: 3,
            paratext: "3. Liquidity Risk:",
            paraitem: "Liquidity risk arises when it becomes difficult to buy or sell an investment without causing a substantial change in its price. Less liquid investments can be challenging to exit quickly, potentially leading to losses or missed opportunities."
        },
        {
            id: 4,
            paratext: "4. Credit Risk:",
            paraitem: "Credit risk, also known as default risk, is the risk that the issuer of a debt instrument (such as a bond) may not be able to meet their payment obligations. If the issuer defaults, investors may not receive the expected interest payments or may lose a portion of their principal."
        },
        {
            id: 5,
            paratext: "5. Inflation Risk:",
            paraitem: "Inflation risk refers to the potential for the purchasing power of your investments to decrease over time due to rising inflation. If the rate of return on your investments does not keep pace with inflation, your real returns may be lower than expected."
        },
        {
            id: 6,
            paratext: "6. Regulatory and Political Risk:",
            paraitem: "Changes in regulations, tax policies, or political events can impact the value of your investments. Investments in certain industries or regions may be particularly susceptible to regulatory or political changes."
        },
        {
            id: 7,
            paratext: "7. Currency Risk:",
            paraitem: "Currency risk, also known as exchange rate risk, applies when investing in assets denominated in foreign currencies. Fluctuations in exchange rates can affect the value of your investments and may result in gains or losses."
        },
        {
            id: 8,
            paratext: "8. Interest Rate Risk:",
            paraitem: "Interest rate risk refers to the impact of changes in interest rates on the value of fixed-income investments. When interest rates rise, the value of existing bonds may decrease, and vice versa."
        },
        {
            id: 9,
            paratext: "9. Concentration Risk:",
            paraitem: "Concentration risk arises when a significant portion of your investment portfolio is allocated to a single asset, sector, or region. If that asset or sector underperforms, your overall portfolio may be adversely affected."
        },
        {
            id: 10,
            paratext: "10. Past Performance is Not Indicative of Future Results:",
            paraitem: "It's important to note that past performance of an investment is not a reliable indicator of future performance. Just because an investment has performed well in the past does not guarantee similar performance in the future."
        },
        {
            id: 11,
            paratext: "Conclusion:",
            paraitem: "Before making any investment decisions, it's crucial to conduct thorough research, understand the risks involved, and consider seeking advice from financial professionals. Diversification, proper asset allocation, and a clear understanding of your investment goals and risk tolerance can help you manage and navigate the risks associated with investing. Remember that all investments carry some level of risk, and it's important to only invest funds that you can afford to lose."
        }
    ]


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
                                    <h4>Risk of Investment</h4>
                                </div>

                                <div className="normal_txt">

                                    <div className="para_item">
                                        <p>Investing in any financial instrument carries inherent risks that you should be aware of before making any investment decisions. It is important to carefully consider these risks and assess your risk tolerance before investing. Below are some of the key risks associated with investment:</p>
                                    </div>
                                    {data && data.map((item,index)=>
                                    <div className="para_item">
                                        <p className="bold">{item.paratext}</p>
                                        <p>{item.paraitem}</p>
                                    </div>
                                    )}
                                    

                                </div>



                            </div>
                        </div>
                    </div>
                </div>
            </section>

        </>
    );
}