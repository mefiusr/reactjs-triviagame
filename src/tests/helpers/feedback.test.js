import Feedback from "../../pages/Feedback";
import React from "react";
import { screen } from "@testing-library/react";
import App from "../../App";
import userEvent from "@testing-library/user-event";
import renderWithRouterAndRedux from "./renderWithRouterAndRedux";

describe('Teste pagína de Feedback', () => {
  it('Testa de todas as informaçoẽs são renderizadas corretamente', () => {
    renderWithRouterAndRedux(<Feedback />);

    expect(screen.getByTestId('feedback-text')).toBeInTheDocument();
    expect(screen.getByTestId('feedback-total-score')).toBeInTheDocument();
    expect(screen.getByTestId('feedback-total-question')).toBeInTheDocument();
    expect(screen.getByTestId('btn-play-again')).toBeInTheDocument();

  });
  it('Testa se ao clicar no botão é redirecionado para jogar jogar novemente', () => {
    
    const { history } = renderWithRouterAndRedux(<App />);
    history.push('/feedback')
    userEvent.click(screen.getByTestId('btn-play-again'));
    
    expect(history.location.pathname).toBe('/');
    expect(screen.getByTestId('input-player-name')).toBeInTheDocument();
  });

  it('Testa se ao clicar no botão é redirecionado para a pagina de Ranking', () => {

    const { history } = renderWithRouterAndRedux(<App />);
    history.push('/feedback')

    const button = screen .getByTestId('btn-ranking')
    userEvent.click(button)

    expect(history.location.pathname).toBe('/ranking');
  });
})