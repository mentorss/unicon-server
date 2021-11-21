import { ResponseMessage } from '../common/baseResponseStatus';
import { response } from '../common/response';
import pool from '../config/db';
import { validatePwd } from '../utils/validatePwd';
import authDao from './auth.dao';
import jwt from 'jsonwebtoken';
import Logger from '../config/logger';

const loginUser = async (email: string, password: string): Promise<any> => {
  try {
    const userRows = await authDao.checkUser(pool, email);

    if (!userRows) return response(ResponseMessage.USER_NOT_FOUND);

    const hashedPassword = await validatePwd.hash(password, userRows.salt);

    if (hashedPassword !== userRows.password)
      return response(ResponseMessage.USER_AUTH_FAILED);

    //generate token
    const token = jwt.sign(
      {
        userIdx: userRows.userIdx,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: '365d',
        subject: 'userInfo',
      },
    );

    return response(ResponseMessage.SUCCESS, {
      token: token,
      userIdx: userRows.userIdx,
    });
  } catch (e) {
    Logger.error(e);
    throw e;
  }
};

const creatUser = async (email: string, password: string): Promise<any> => {
  //TODO check duplicate email
  const salt = await validatePwd.genSalt();
  password = await validatePwd.hash(password, salt);

  const creatUserParam = [email, password, salt];
  const userRows = await authDao.createUser(pool, creatUserParam);
  return userRows;
};

export default { loginUser, creatUser };
