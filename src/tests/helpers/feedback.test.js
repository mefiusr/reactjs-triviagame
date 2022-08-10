import Feedback from "../../pages/Feedback";
import React from "react";
import { screen } from "@testing-library/react";
import App from "../../App";
import userEvent from "@testing-library/user-event";
import renderWithRouterAndRedux from "./renderWithRouterAndRedux";

describe("Teste pagína de Feedback", () => {
  it("Testa de todas as informaçoẽs são renderizadas corretamente", () => {
    renderWithRouterAndRedux(<Feedback />);

    expect(screen.getByTestId("feedback-text")).toBeInTheDocument();
    expect(screen.getByTestId("feedback-total-score")).toBeInTheDocument();
    expect(screen.getByTestId("feedback-total-question")).toBeInTheDocument();
    expect(screen.getByTestId("btn-play-again")).toBeInTheDocument();
  });
  it("Testa se ao clicar no botão é redirecionado para jogar jogar novemente", () => {
    const { history } = renderWithRouterAndRedux(<App />);
    history.push("/feedback");
    userEvent.click(screen.getByTestId("btn-play-again"));

    expect(history.location.pathname).toBe("/");
    expect(screen.getByTestId("input-player-name")).toBeInTheDocument();
  });

  it("Testa se ao clicar no botão é redirecionado para a pagina de Ranking", () => {
    const { history } = renderWithRouterAndRedux(<App />);
    history.push("/feedback");

    const button = screen.getByTestId("btn-ranking");
    userEvent.click(button);

    expect(history.location.pathname).toBe("/ranking");
  });

  it('Testa se o estado é limpo após clicar no botão', () => {

    // localStorage.setItem = jest.fn().mockImplementation(() => {});

    const setItem = jest.spyOn(Storage.prototype, 'setItem')
    // localStorage.setItem('ranking', { result: [] })

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
    const { store } = renderWithRouterAndRedux(<App />, initialState, '/feedback');

    const level = JSON.stringify({result: []});

    const button = screen.getByTestId('btn-play-again');
    userEvent.click(button);
    console.log(setItem);
    expect(setItem).toHaveBeenCalledWith('ranking', level);

    const { score, assertions, firstLogin } = store.getState().player
    expect(score).toBe(0);
    expect(assertions).toBe(0);
    expect(firstLogin).toBe(false);
  })

  it.skip('Testa o localStorage', () => {

    // localStorage.setItem = jest.fn().mockImplementation(() => {});

    const setItem = jest.spyOn(Storage.prototype, 'setItem')
    // localStorage.setItem('ranking', { result: [] })

    const initialState = {
      player: {
        name: 'samara',
        assertions: 2,
        score: 25,
        gravatarEmail: 'samara@trybe.com',
        questions: [],
        firstLogin: false,
      }
    };
    const { store } = renderWithRouterAndRedux(<App />, initialState, '/feedback');

    const level = JSON.stringify({
      result: [ {}, { name, score: initialState.player.score, picture: `https://opentdb.com/api.php?amount=5&token=${initialState.player.gravatarEmail}` },
      { name, score: initialState.player.score, picture: `https://opentdb.com/api.php?amount=5&token=${initialState.player.gravatarEmail}` }],
    });

    const button = screen.getByTestId('btn-play-again');
    userEvent.click(button);
    console.log(setItem);
    expect(setItem).toHaveBeenCalledWith('ranking', level);

    const { score, assertions, firstLogin } = store.getState().player
    expect(score).toBe(0);
    expect(assertions).toBe(0);
    expect(firstLogin).toBe(false);
  })
});
