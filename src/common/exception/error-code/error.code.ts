class ErrorCodeVo {
  readonly status;
  readonly message;

  constructor(status, message) {
    this.status = status;
    this.message = message;
  }
}

export type ErrorCode = ErrorCodeVo;

export const BAD_REQUEST = new ErrorCodeVo(400, 'Bad Request');
export const UNAUTHORIZED = new ErrorCodeVo(401, 'Unauthorized');
export const ACCESS_DENIED = new ErrorCodeVo(403, 'Access Denied');
export const ENTITY_NOT_FOUND = new ErrorCodeVo(404, 'Entity Not Found');