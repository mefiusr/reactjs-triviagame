import { LOGIN, QUESTIONS, SCORE } from '../actions';

const INITIAL_STATE = {
  name: '',
  assertions: 0,
  score: 0,
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
  case SCORE:
    return {
      ...state,
      score: Number(state.score) + Number(action.payload),
      assertions: Number(state.assertions) + 1,
    };
  default:
    return state;
  }
};

export default player;
