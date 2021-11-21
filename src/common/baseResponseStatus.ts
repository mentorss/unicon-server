export interface ResponseMessageModel {
  isSuccess: boolean;
  code: number;
  message: string;
}

export const ResponseMessage = {
  SUCCESS: {
    isSuccess: true,
    code: 200,
    message: 'success',
  },
  EMAIL_INVALID: {
    isSuccess: false,
    code: 400,
    message: 'email is invalid',
  },
  PASSWORD_INVALID: {
    isSuccess: false,
    code: 400,
    message: 'password is invalid',
  },
  USER_AUTH_FAILED: {
    isSuccess: false,
    code: 403,
    message: 'user authentication failed',
  },
  JWT_EMPTY: {
    isSuccess: false,
    code: 403,
    message: 'jwt token is empty',
  },
  JWT_VERIFICATION_FAIL: {
    isSuccess: false,
    code: 403,
    message: 'jwt verification failed',
  },
  USER_NOT_FOUND: {
    isSuccess: false,
    code: 404,
    message: 'user not found',
  },
  INTERNAL_ERROR: {
    isSuccess: false,
    code: 5000,
    message: 'internal server error',
  },
  NOT_FOUND: {
    isSuccess: false,
    code: 404,
    message: 'resourcenot found',
  },
};

export default { ResponseMessage };
