import bcrypt from 'bcryptjs';
const saltRounds = 12;

export class validatePwd {
  static genSalt = async () => {
    return bcrypt.genSalt(saltRounds);
  };

  static hash = async (plainPassword, salt) => {
    return bcrypt.hash(plainPassword, salt);
  };
}
