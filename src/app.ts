import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import { AuthRoutes } from './app/modules/auth/auth.route';
import { ParcelRoutes } from './app/modules/parcel/parcel.route';
import { UserRoutes } from './app/modules/user/user.route'; // <-- Import user routes

const app: Application = express();

// CORS Configuration
const allowedOrigins = [
  'http://localhost:5173',          // Your local frontend for development
  'https://uthao-client.vercel.app' // Your DEPLOYED frontend URL
];

const corsOptions = {
  origin: allowedOrigins,
};

app.use(express.json());
app.use(cors(corsOptions));



// Application Routes
app.use('/api/auth', AuthRoutes);
app.use('/api/parcels', ParcelRoutes);
app.use('/api/users', UserRoutes); // <-- Add user routes

app.get('/', (req: Request, res: Response) => {
  res.send('Uthao Parcel Delivery API is running!');
});

export default app;