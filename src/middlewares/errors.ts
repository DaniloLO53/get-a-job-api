import { ApplicationError } from "@/utils/errorHandler";

export function unauthorized(): ApplicationError {
  console.log('unauthorizedError')
  return {
    name: 'unauthorizedError',
    message: 'Invalid token',
    code: 403,
  };
}