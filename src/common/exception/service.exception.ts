import { 
  ErrorCode,
  BAD_REQUEST,
  UNAUTHORIZED,
  ACCESS_DENIED,
  ENTITY_NOT_FOUND  
} from "./error-code";

export class ServiceException extends Error {
  readonly errorCode: ErrorCode;

  constructor(errorCode: ErrorCode, message?: string) {
    if (!message) {
      message = errorCode.message;
    }

    super(message);

    this.errorCode = errorCode;
  }
}

export const BadRequestException = (message?: string): ServiceException => {
  return new ServiceException(BAD_REQUEST, message);
}

export const UnauthorizedException = (message?: string): ServiceException => {
  return new ServiceException(UNAUTHORIZED, message);
}

export const AccessDeniedException = (message?: string): ServiceException => {
  return new ServiceException(ACCESS_DENIED, message);
}

export const EntityNotFoundException = (message?: string): ServiceException => {
  return new ServiceException(ENTITY_NOT_FOUND, message);
}