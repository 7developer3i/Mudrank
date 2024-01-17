const express = require('express');


const app = express();
const port = 3002;

app.use(express.json());

// Connect to the Solana network



app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

