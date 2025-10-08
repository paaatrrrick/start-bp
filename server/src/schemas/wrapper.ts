if (process.env.NODE_ENV !== "production") {
    require('dotenv').config();
}
import { NextFunction, Response } from 'express';
import { Request } from 'express';

interface Validatable {
    validate(input: any): any;
  }
  

const JoiWrapper = (joiSchema: Validatable) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        const validation = joiSchema.validate(req.body);
        if (validation.error) return res.status(400).send({error: validation.error.details[0].message});
        next();
    }
}

export default JoiWrapper;
