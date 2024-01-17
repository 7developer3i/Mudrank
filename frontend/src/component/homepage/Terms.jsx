import React from "react";
import whatbanner from "../../images/what_banner.png"

export function Terms() {

    const datasTerms = [
        {
            id: 1,
            title: "Mudrank offers investment advisory and related services. These services are subject to the terms outlined herein and any additional agreements or disclosures provided to you.",
            header: "1. Services:"
        },
        {
            id: 2,
            title: "All investments carry risks, and the value of investments can go up as well as down. Past performance is not indicative of future results. You acknowledge and understand that investing involves inherent risks, and you are solely responsible for evaluating and assuming these risks.",
            header: "2. Investment Risks:"
        },
        {
            id: 3,
            title: "Any investment recommendations provided by Mudrank are for informational purposes only and should not be considered as personalized financial advice. You should conduct your own research and consider seeking advice from qualified financial professionals before making any investment decisions.",
            header: "3. Investment Recommendations:"
        },
        {
            id: 4,
            title: "Our services are not suitable for all individuals. By using our services, you represent and warrant that you are of legal age and have the legal capacity to enter into these Terms and make investment decisions. You acknowledge that you have provided accurate and complete information about your financial situation and investment objectives.",
            header: "4. Client Suitability:"
        },
        {
            id: 5,
            title: "We will take reasonable measures to protect the confidentiality of your personal and financial information. However, we cannot guarantee the security of information transmitted over the internet. You acknowledge and accept the risks associated with transmitting sensitive information electronically.",
            header: "5. Confidentiality:"
        },
        {
            id: 6,
            title: "To the extent permitted by law, Mudrank and its affiliates shall not be liable for any direct, indirect, incidental, special, or consequential damages arising out of or in any way connected with the use of our services.",
            header: "6. Limitation of Liability:"
        },
        {
            id: 7,
            title: "We reserve the right to terminate or suspend your access to our services at any time and for any reason, without prior notice. You may also terminate your use of our services at any time.",
            header: "7. Termination:"
        },
        {
            id: 8,
            title: "All content and materials provided as part of our services, including but not limited to text, graphics, logos, and software, are the property of Mudrank and are protected by intellectual property laws.",
            header: "8. Intellectual Property:"
        },
        {
            id: 9,
            title: "These Terms shall be governed by and construed in accordance with the laws of Mumbai. Any disputes arising from or in connection with these Terms shall be subject to the exclusive jurisdiction of the courts of Mumbai.",
            header: "9. Governing Law:"
        },
        {
            id: 10,
            title: "We reserve the right to update or modify these Terms at any time. Any changes to the Terms will be effective upon posting to our website. Your continued use of our services after any changes to the Terms constitutes your acceptance of the revised Terms.",
            header: "10. Amendments:"
        }
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
                                    <h4>Terms and Conditions</h4>
                                </div>

                                <div className="normal_txt">

                                    <div className="para_item">
                                        <p>Please read these Terms and Conditions ("Terms") carefully before using the services provided by Mudrank ("we," "us," or "our"). By accessing or using our services, you agree to be bound by these Terms. If you do not agree to these Terms, please refrain from using our services.</p>
                                    </div>

                                    <div className="para_item">
                                        <p className="bold">1. Services:</p>

                                        <p>Mudrank offers investment advisory and related services. These services are subject to the terms outlined herein and any additional agreements or disclosures provided to you.</p>
                                    </div>

                                    {datasTerms && datasTerms.map((datas, index) =>
                                        <div className="para_item" key={index}>
                                            <p className="bold">{datas.header}</p>
                                            <p>{datas.title}</p>
                                        </div>
                                    )}

                                    <div className="para_item">
                                        <p>By using our services, you acknowledge that you have read, understood, and agreed to these Terms and Conditions.</p>
                                        <br />
                                        <p>If you have any questions or concerns about these Terms, please contact us at contact@yourinvestmentfirm.com.</p>
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