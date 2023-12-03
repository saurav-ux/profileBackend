import express from 'express'
const app = express()
import cors from 'cors'
import './database/connect.js'
import profileRouter from './router/profileRouter.js'
import filterRouter from './router/filterRouter.js'
import pageRouter from './router/paginationRouter.js'
import searchRouter from './router/searchRouter.js'
const PORT = process.env.PORT || 5001;
app.use(express.json());
app.use(cors({
    origin: 'http://localhost:3000', // Allow requests from this origin
    credentials: true, // Allow sending cookies and other credentials
  }));

app.use('/profile',profileRouter)
app.use('/filter',filterRouter)
app.use('/sheet',pageRouter)
app.use('/search',searchRouter)
app.get('/',(req,res)=>{
    res.send("Welcome Saurav Profile")
})

app.listen(PORT,()=>{
    console.log(`Server is running on : http://localhost:${PORT}`);
})