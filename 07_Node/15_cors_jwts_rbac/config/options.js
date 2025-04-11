
const allowedOrigins = [
    'http://localhost:3000',
    'http://localhost:3200',
]

const cookieOptions = { 
    httpOnly: true,
    sameSite: 'None',
    secure: process.env.NODE_ENV === 'production',
    maxAge: 24 * 60 * 60 * 1000,
}

const corsOptions = { 
    origin: (origin, callback) => {
        if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
            callback(null, true)
        } else {
            callback( new Error("Not allowed by cors"))
        }
    },
    optionsSuccessStatus: 200
}

export { allowedOrigins, corsOptions, cookieOptions }