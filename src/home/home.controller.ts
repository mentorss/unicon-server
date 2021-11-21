import { Response } from 'express';
import baseResponseStatus, {
  ResponseMessage,
} from '../common/baseResponseStatus';
import { response } from '../common/response';
import Logger from '../config/logger';
import { Request } from '../interface/request.interface';
import { regex } from '../utils/regex';
import HomeService from '../home/home.service';

/**
 * API Name : Get Home
 * [POST] /home
 */
const getHome = async (req: Request, res: Response): Promise<any> => {
  const userIdx = req.verifiedToken.userIdx;

  try {
    const result = await HomeService.getHome(userIdx);
    return res.json(result);
  } catch (e) {
    Logger.error(e);
    res.json(response(ResponseMessage.INTERNAL_ERROR));
  }
};

export default { getHome };
