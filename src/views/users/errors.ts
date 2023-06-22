import { ApplicationError } from "@/utils/errorHandler";

export function duplicatedEmailError(): ApplicationError {
  console.log('duplicatedEmailError')
  return {
    name: 'DuplicatedEmailError',
    message: 'There is already an user with given email',
  };
}