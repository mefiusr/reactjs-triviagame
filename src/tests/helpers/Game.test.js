import React from "react";
import renderWithRouterAndRedux from "./renderWithRouterAndRedux";
import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from '../../App';
import Game from "../../pages/Game";


describe('Testes no componente Game', () => {
  it('Testa se as perguntas são de multipla escolha', () => {
    const initialState = {
      player: {
        questions: [
          {
            "category":"Entertainment: Video Games",
            "type":"multiple",
            "difficulty":"easy",
            "question":"What is the first weapon you acquire in Half-Life?",
            "correct_answer":"A crowbar",
            "incorrect_answers":[
                "A pistol",
                "The H.E.V suit",
                "Your fists",
                "A crowbar",
            ]
          }
        ],
      }
    }
    renderWithRouterAndRedux(<Game />, initialState)

    const correctButton = screen.getByTestId('correct-answer');
    const incorrectButton = screen.getAllByTestId('wrong-answer-0');
    expect(correctButton).toBeInTheDocument();
    expect(incorrectButton).toHaveLength(3);

    userEvent.click(correctButton);
    const nextButton = screen.getByTestId('btn-next');
    expect(nextButton).toBeInTheDocument();
  })

  it('Testa se o fetch é chamado', () => {

    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
    json: jest.fn().mockResolvedValue(
      {
        "response_code":0,
        "results":[
            {
              "category":"Entertainment: Video Games",
              "type":"multiple",
              "difficulty":"easy",
              "question":"What is the first weapon you acquire in Half-Life?",
              "correct_answer":"A crowbar",
              "incorrect_answers":[
                  "A pistol",
                  "The H.E.V suit",
                  "Your fists"
              ]
            }
        ]
      }
    ),
  });
    renderWithRouterAndRedux(<Game />);

    expect(fetch).toHaveBeenCalled();

  })

  it('Testa se acontece um redirect quando o token expira', () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
    json: jest.fn().mockResolvedValue(
      {
        "response_code":3,
        "results":[],
      }
    ),
    });

   const {history} = renderWithRouterAndRedux(<Game />)
    const {pathname} = history.location;
    expect(pathname).toBe('/')
  })

  it('Testa se ao clicar no botão next a próxima pergunta é renderizada', () => {
    const initialState = {
      player: {
        questions: [
          {
            "category":"Entertainment: Video Games",
            "type":"boolean",
            "difficulty":"hard",
            "question":"TF2: Sentry rocket damage falloff is calculated based on the distance between the sentry and the enemy, not the engineer and the enemy",
            "correct_answer":"False",
            "incorrect_answers":[
                "True",
                "False",
            ]
          },
          {
            "category":"Entertainment: Video Games",
            "type":"multiple",
            "difficulty":"easy",
            "question":"What is the first weapon you acquire in Half-Life?",
            "correct_answer":"A crowbar",
            "incorrect_answers":[
                "A pistol",
                "The H.E.V suit",
                "Your fists",
                "A crowbar",
            ]
          }
        ],
      }
    }

    renderWithRouterAndRedux(<Game />, initialState)

    const correctButton = screen.getByTestId('correct-answer');
    
    userEvent.click(correctButton);
    
    const nextButton = screen.getByTestId('btn-next');
    userEvent.click(nextButton);

    const timer = screen.getByTestId('p-timer');
    expect(timer.innerHTML).toBe('30');
    
    const incorrectButton = screen.getAllByTestId('wrong-answer-1');
    expect(incorrectButton).toHaveLength(3);

  })

  it('Testa se a pontuação esta correta', () => {
    const initialState = {
      player: {
        score: 0,
        questions: [
          {
            "category":"Entertainment: Video Games",
            "type":"boolean",
            "difficulty":"hard",
            "question":"TF2: Sentry rocket damage falloff is calculated based on the distance between the sentry and the enemy, not the engineer and the enemy",
            "correct_answer":"False",
            "incorrect_answers":[
                "True",
                "False",
            ]
          },
          {
            "category":"Entertainment: Video Games",
            "type":"multiple",
            "difficulty":"medium",
            "question":"What is the first weapon you acquire in Half-Life?",
            "correct_answer":"A crowbar",
            "incorrect_answers":[
                "A pistol",
                "The H.E.V suit",
                "Your fists",
                "A crowbar",
            ]
          }
        ],
      }
    }

    const { store } = renderWithRouterAndRedux(<Game />, initialState)

    const correctButton = screen.getByTestId('correct-answer');
    
    userEvent.click(correctButton);

    expect(store.getState().player.score).toBe(100)
    
    const nextButton = screen.getByTestId('btn-next');
    userEvent.click(nextButton);

    const correctButtons = screen.getByTestId('correct-answer');
    userEvent.click(correctButtons);

    expect(store.getState().player.score).toBe(170)

  })

it('Testa se apos acabar as questões renderiza o feedback', () => {
  const initialState = {
    player: {
      score: 0,
      questions: [
        {
          "category":"Entertainment: Video Games",
          "type":"boolean",
          "difficulty":"hard",
          "question":"TF2: Sentry rocket damage falloff is calculated based on the distance between the sentry and the enemy, not the engineer and the enemy",
          "correct_answer":"False",
          "incorrect_answers":[
              "True",
              "False",
          ]
        },
        {
          "category":"Entertainment: Video Games",
          "type":"multiple",
          "difficulty":"medium",
          "question":"What is the first weapon you acquire in Half-Life?",
          "correct_answer":"A crowbar",
          "incorrect_answers":[
              "A pistol",
              "The H.E.V suit",
              "Your fists",
              "A crowbar",
          ]
        },
        {
          "category":"Entertainment: Video Games",
          "type":"boolean",
          "difficulty":"hard",
          "question":"TF2: Sentry rocket damage falloff is calculated based on the distance between the sentry and the enemy, not the engineer and the enemy",
          "correct_answer":"False",
          "incorrect_answers":[
              "True",
              "False",
          ]
        },
        {
          "category":"Entertainment: Video Games",
          "type":"multiple",
          "difficulty":"medium",
          "question":"What is the first weapon you acquire in Half-Life?",
          "correct_answer":"A crowbar",
          "incorrect_answers":[
              "A pistol",
              "The H.E.V suit",
              "Your fists",
              "A crowbar",
          ]
        },
        {
          "category":"Entertainment: Video Games",
          "type":"multiple",
          "difficulty":"medium",
          "question":"What is the first weapon you acquire in Half-Life?",
          "correct_answer":"A crowbar",
          "incorrect_answers":[
              "A pistol",
              "The H.E.V suit",
              "Your fists",
              "A crowbar",
          ]
        }
      ],
    }
  }

  const { history } = renderWithRouterAndRedux(<App />, initialState, '/games');

  const buttonCorrect1 = screen.getByTestId('correct-answer');
  userEvent.click(buttonCorrect1);
  const btnNext1 = screen.getByTestId('btn-next');
  userEvent.click(btnNext1);

  const buttonCorrect2 = screen.getByTestId('correct-answer');
  userEvent.click(buttonCorrect2);
  const btnNext2 = screen.getByTestId('btn-next');
  userEvent.click(btnNext2);

  const buttonCorrect3 = screen.getByTestId('correct-answer');
  userEvent.click(buttonCorrect3);
  const btnNext3 = screen.getByTestId('btn-next');
  userEvent.click(btnNext3);

  const buttonCorrect4 = screen.getByTestId('correct-answer');
  userEvent.click(buttonCorrect4);
  const btnNext4 = screen.getByTestId('btn-next');
  userEvent.click(btnNext4);

  const buttonCorrect5 = screen.getByTestId('correct-answer');
  userEvent.click(buttonCorrect5);
  const btnNext5 = screen.getByTestId('btn-next');
  userEvent.click(btnNext5);

  expect(history.location.pathname).toBe('/feedback');
})
it('Testes referentes aos timers', async() => {
  jest.setTimeout(6000)
const initialState = {
  player: {
    questions: [
      {
        "category":"Entertainment: Video Games",
        "type":"multiple",
        "difficulty":"easy",
        "question":"What is the first weapon you acquire in Half-Life?",
        "correct_answer":"A crowbar",
        "incorrect_answers":[
            "A pistol",
            "The H.E.V suit",
            "Your fists",
            "A crowbar",
        ]
      }
    ],
  }
}
  renderWithRouterAndRedux(<Game />, initialState)
  await waitFor(() => {expect(screen.getByTestId('p-timer').innerHTML).toBe('25')}, {timeout: 6000});

})
})
