import { Connection } from 'mysql2/promise';

const checkUser = async (pool: Connection, email: string): Promise<any> => {
  const checkUserQuery = `
    SELECT
        idx userIdx, password, salt
    FROM
        User
    WHERE
        email=?
  `;

  const [userRows] = await pool.query(checkUserQuery, email);
  return userRows[0];
};

const createUser = async (
  pool: Connection,
  createUserParam: string[],
): Promise<any> => {
  const createUserQuery = `
    INSERT INTO User(email, password, salt) VALUES(?, ?, ?)
  `;

  const [userRows] = await pool.query(createUserQuery, createUserParam);
  return userRows;
};

export default {
  checkUser,
  createUser,
};
