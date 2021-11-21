import { Connection } from 'mysql2/promise';

const selectMymentoring = async (
  pool: Connection,
  userIdx: number,
): Promise<any> => {
  const selectMymentoringQuery = `
    SELECT
        M.idx mentoringIdx, title, category, myProfileImg, mentorName, mentorProfileImg,
        case
        when status='WAITING' then '신청'
        when status='INPROGRESS' then '진행중'
        end status
    FROM
        Mentoring M
    JOIN
        Resume R
        ON M.mentorIdx=R.userIdx
    JOIN
        (SELECT idx, U.profileImg myProfileImg FROM User U) MTE
        ON MTE.idx=menteeIdx
    JOIN
        (SELECT idx, U.name mentorName, U.profileImg mentorProfileImg FROM User U) MTO
        ON MTO.idx=M.mentorIdx
    WHERE
        menteeIdx=?
        AND (M.status='WAITING' OR M.status='INPROGRESS');
  `;

  const [mentoringRows] = await pool.query(selectMymentoringQuery, userIdx);

  return mentoringRows;
};

const selectPopularMentor = async (pool: Connection): Promise<any> => {
  const selectPopularMentorQuery = `
    SELECT
      title, category, U.name mentorName, U.profileImg mentorProfileImg
    FROM
      Resume R
    JOIN User U
      ON U.idx=R.userIdx
    ORDER BY rating DESC
  `;

  const [mentorRows] = await pool.query(selectPopularMentorQuery);

  return mentorRows;
};

export default {
  selectMymentoring,
  selectPopularMentor,
};
