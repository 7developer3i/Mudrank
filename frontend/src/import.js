// import React, { useState } from 'react';

// const Import = () => {
//   const [qrCodeImage, setQRCodeImage] = useState(null);

//   const handlePayment = async () => {
//     try {
//       const response = await fetch('http://localhost:3002/solana-payment', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           recipientPublicKey: 'RECIPIENT_PUBLIC_KEY', // Replace with the actual recipient public key
//           amount: 0.1, 
//         }),
//       });

//       const result = await response.json();

//       if (result.success) {
//         setQRCodeImage(result.qrCode);
//       } else {
//         console.error('Solana payment error:', result.error);
//       }
//     } catch (error) {
//       console.error('Error:', error);
//     }
//   };

//   useEffect(() => {
//     handlePayment();
//   }, []);

//   return (
//     <div>
//       {qrCodeImage && (
//         <div>
//           <h3>Payment QR Code</h3>
//           <img src={qrCodeImage} alt="Solana Payment QR Code" />
//         </div>
//       )}
//     </div>
//   );
// };

// export default Import;
