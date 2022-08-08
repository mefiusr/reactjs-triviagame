import { LOGIN, QUESTIONS } from '../actions';

const INITIAL_STATE = {
  name: '',
  assertions: '',
  score: '',
  gravatarEmail: '',
  questions: [],
};

const player = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case LOGIN:
    return {
      ...state,
      name: action.payload.name,
      gravatarEmail: action.payload.email,
    };
  case QUESTIONS:
    return {
      ...state,
      questions: action.payload,
    };
  default:
    return state;
  }
};

export default player;
