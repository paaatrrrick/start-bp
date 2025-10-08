if (process.env.NODE_ENV !== "production") {
    require('dotenv').config();
}
import catchAsync from '../methods/catchAsync';
import express, { Response, NextFunction, Request } from 'express';

const DemoRouter = express.Router();

// Get services list
DemoRouter.get('/services', catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    res.status(200).json({
        success: true,
        data: [
            {
                id: 1,
                name: "Web Development",
                description: "Custom websites and web applications",
                price: 5000,
                duration: "4-6 weeks"
            },
            {
                id: 2,
                name: "Mobile Development",
                description: "Native and cross-platform mobile apps",
                price: 8000,
                duration: "6-8 weeks"
            },
            {
                id: 3,
                name: "Backend Services",
                description: "Scalable server infrastructure",
                price: 3000,
                duration: "2-4 weeks"
            }
        ]
    });
}));

export default DemoRouter;
