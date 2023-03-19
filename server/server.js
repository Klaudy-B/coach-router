require('dotenv').config();
const express = require('express');
const { connect, set } = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const authRouter = require('./routes/authRoutes');
const { messages: { _404message } } = require('./helpers');

const app = express();
app.use(
    cors(
        {
            origin: [process.env.FRONTEND],
            methods: ['GET', 'POST', 'DELETE', 'PATCH'],
            credentials: true
        }
    )
)
app.use(cookieParser());
app.use(express.json());
set('strictQuery', false);
connect(
    process.env.URI,
    ()=>{
        console.log('Connected to the database.'); 
        app.listen(process.env.PORT, ()=>{ console.log(`Server listening on port ${process.env.PORT}`); }   );
    },
    (error)=>{ console.log(error); }
)

app.use('/auth', authRouter);
app.use('*', (req, res)=>res.status(404).json({error: _404message})  );

