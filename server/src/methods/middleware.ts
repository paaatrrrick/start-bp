if (process.env.NODE_ENV !== "production") {
    require('dotenv').config();
}

import { Request, NextFunction, Response } from 'express';


const Authenticate =  async function (req: Request, res: Response, next: NextFunction) {
  try {
    next();
  } catch (err) {
    //Unauthorized
    return res.status(401).send({error: "Sorry you are not authorized to access this"});
  }
}



export { Authenticate };
