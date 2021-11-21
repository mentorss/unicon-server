import pool from '../config/db';
import homeDao from './home.dao';
import Logger from '../config/logger';
import { response } from '../common/response';
import baseResponseStatus from '../common/baseResponseStatus';

const getHome = async (userIdx: number): Promise<any> => {
  try {
    const mentoringRows = await homeDao.selectMymentoring(pool, userIdx);
    const mentorRows = await homeDao.selectPopularMentor(pool);

    return response(baseResponseStatus.ResponseMessage.SUCCESS, {
      myMentoring: mentoringRows,
      popularMentor: mentorRows,
    });
  } catch (e) {
    Logger.error(e);
    throw e;
  }
};

export default { getHome };
