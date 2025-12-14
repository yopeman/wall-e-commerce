import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';
import routes from './routes/index.js';
import db from "./models/index.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(helmet());
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api/v1', routes);

app.get('/api', (req, res) => {
    res.send("Ok");
});

db.sequelize.sync().catch((err)=>{
    console.log(err);    
});

app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));