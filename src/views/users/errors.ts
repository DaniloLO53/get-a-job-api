import { ApplicationError } from "@/utils/errorHandler";

export function duplicatedEmailError(): ApplicationError {
  console.log('duplicatedEmailError')
  return {
    name: 'DuplicatedEmailError',
    message: 'There is already an user with given email',
    code: 409,
  };
}
export function duplicatedEmailOauthError(): ApplicationError {
  console.log('duplicatedEmailOauthError')
  return {
    name: 'DuplicatedEmailOauthError',
    message: 'User registered with oauth',
    code: 409,
  };
}
export function noUserRegisteredError(): ApplicationError {
  console.log('noUserRegisteredError')
  return {
    name: 'NoUserRegisteredError',
    message: 'No user registered with given email or password',
    code: 403,
  };
}
export function confirmPasswordError(): ApplicationError {
  console.log('confirmPasswordError')
  return {
    name: 'ConfirmPasswordError',
    message: 'Password and confirm password must match',
    code: 409,
  };
}