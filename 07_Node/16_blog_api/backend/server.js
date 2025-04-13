import 'dotenv/config';
import express from 'express';

const app = express();








const PORT = process.env.PORT;
app.listen(PORT, ()=>{
    console.log(`Backend blog express server listening on port ${PORT}`);
})