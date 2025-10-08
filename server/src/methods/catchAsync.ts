import { NextFunction, Response } from 'express';
import { Request } from 'express';


//@ts-ignore
const catchAsync = func => {
    return (req: Request, res: Response, next: NextFunction) => {
        func(req, res, next).catch(next);
    }
}

export default catchAsync;
