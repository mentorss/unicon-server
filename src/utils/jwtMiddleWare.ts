import { NextFunction, Response } from 'express';
import jwt from 'jsonwebtoken';
import { ResponseMessage } from '../common/baseResponseStatus';
import { response } from '../common/response';
import { Jwt } from '../interface/jwt.interface';
import { Request } from '../interface/request.interface';

export const jwtMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
): any => {
  // token does not exist
  if (!req.headers['x-access-token'])
    return res.json(response(ResponseMessage.JWT_EMPTY));

  // read the token from header
  const token: string = req.headers['x-access-token'] as string;

  // verify token
  try {
    const verifiedToken: Jwt = jwt.verify(token, process.env.JWT_SECRET) as Jwt;
    req.verifiedToken = verifiedToken;
    next();
  } catch (error) {
    return res.json(response(ResponseMessage.JWT_VERIFICATION_FAIL));
  }
};
