import React from "react";
import renderWithRouterAndRedux from "../helpers/renderWithRouterAndRedux";
import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from '../../App';

describe('Testes no componente Ranking', () => {
  it('Testa se ao clicar no botão login, a página é redirecionada', () => {

    const string = JSON.stringify({result: [{ name: 'samara', score: 0, picture: `https://opentdb.com/api.php?amount=5&token={img}` }]})

    localStorage.setItem('ranking', string);

    const initialState = {
      player: {
        name: 'samara',
        assertions: 2,
        score: 25,
        gravatarEmail: 'samara@trybe.com',
        questions: [],
        firstLogin: true,
      },
    };

    const { history } = renderWithRouterAndRedux(<App />, initialState, '/ranking');

    const button = screen.getByTestId('btn-go-home');
    userEvent.click(button);
    expect(history.location.pathname).toBe('/');
  })
  it('Testa se ao clicar no botão login, a página é redirecionada e o sort é testado', () => {

    const string = JSON.stringify({result: [{ name: 'samara', score: 1, picture: `https://opentdb.com/api.php?amount=5&token={img}` },
    { name: 'samara', score: 2, picture: `https://opentdb.com/api.php?amount=5&token={img}` },
    { name: 'samara', score: 3, picture: `https://opentdb.com/api.php?amount=5&token={img}` },
    { name: 'samara', score: 4, picture: `https://opentdb.com/api.php?amount=5&token={img}` },
    { name: 'samara', score: 0, picture: `https://opentdb.com/api.php?amount=5&token={img}` }]},
    )

    localStorage.setItem('ranking', string);

    const initialState = {
      player: {
        name: 'samara',
        assertions: 2,
        score: 25,
        gravatarEmail: 'samara@trybe.com',
        questions: [],
        firstLogin: true,
      }
    };

    const { history } = renderWithRouterAndRedux(<App />, initialState, '/ranking');

    const button = screen.getByTestId('btn-go-home');
    userEvent.click(button);
    expect(history.location.pathname).toBe('/');
  })
})