import { Response } from 'express';
import { ResponseMessage } from '../common/baseResponseStatus';
import { response } from '../common/response';
import Logger from '../config/logger';
import { Request } from '../interface/request.interface';
import { regex } from '../utils/regex';
import AuthService from '../auth/auth.service';

/**
 * API Name : Login
 * [POST] /auth/login
 */
const login = async (req: Request, res: Response): Promise<any> => {
  const { email, password } = req.body;

  if (!regex.email.test(email))
    res.json(response(ResponseMessage.EMAIL_INVALID));
  if (!regex.password.test(password))
    res.json(response(ResponseMessage.PASSWORD_INVALID));

  try {
    const result = await AuthService.loginUser(email, password);
    return res.json(result);
  } catch (e) {
    Logger.error(e);
    res.json(response(ResponseMessage.INTERNAL_ERROR));
  }
};

export default { login };
