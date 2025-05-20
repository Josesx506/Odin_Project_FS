import 'dotenv/config';


const allowedOrigins = [
  'http://localhost:3000',
  'https://odin-book-client-three.vercel.app'
]

const cookieOptions = {
  httpOnly: true,
  sameSite: process.env.NODE_ENV === 'production' ? 'None' : 'Strict',
  secure: process.env.NODE_ENV === 'production',
  maxAge: 24 * 60 * 60 * 1000,
}

const corsOptions = {
  origin: (origin, callback) => {
    if (!origin) return callback(null, true); // allow Postman, etc.

    const isWhitelisted = allowedOrigins.includes(origin) ||
      /^https:\/\/odin-book-client-three-.*\.vercel\.app$/.test(origin); // preview links

    if (isWhitelisted) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
  optionsSuccessStatus: 200
};

export { allowedOrigins, corsOptions, cookieOptions }