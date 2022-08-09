export const LOGIN = 'LOGIN';
export const QUESTIONS = 'QUESTIONS';
export const SCORE = 'SCORE';
export const CLEAR = 'CLEAR';

export const login = (payload) => ({
  type: LOGIN,
  payload,
});

export const questions = (payload) => ({
  type: QUESTIONS,
  payload,
});

export const score = (payload) => ({
  type: SCORE,
  payload,
});

export const clear = () => ({
  type: CLEAR,
});
