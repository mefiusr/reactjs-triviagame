export const LOGIN = 'LOGIN';
export const QUESTIONS = 'QUESTIONS';

export const login = (payload) => ({
  type: LOGIN,
  payload,
});

export const questions = (payload) => ({
  type: QUESTIONS,
  payload,
});
