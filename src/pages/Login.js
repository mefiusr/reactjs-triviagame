import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchApi } from '../services';
import { login } from '../redux/actions';
import '../styles/login.css';

class Login extends Component {
  constructor() {
    super();

    this.state = {
      activeButton: true,
      name: '',
      email: '',
    };
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value }, this.verifyButton());
  }

  verifyButton = () => {
    const { name, email } = this.state;

    const validEmail = /\S+@\S+\.\S+/;
    if (name.length && validEmail.test(email)) {
      this.setState({ activeButton: false });
    } else {
      this.setState({ activeButton: true });
    }
  };

  getApi = async (objectInfo) => {
    const { loginDispatch, history } = this.props;
    const result = await fetchApi();
    localStorage.setItem('token', result.token);
    loginDispatch(objectInfo);
    history.push('/games');
  }

  render() {
    const { name, email, activeButton } = this.state;
    const { history } = this.props;

    return (
      <section className="section-login">
        <h1>TRIVIA GAME</h1>
        <div className="div-inputs-login">
          <label htmlFor="name">
            {' '}
            Nome:
            <input
              className="inputs-login-page"
              type="text"
              name="name"
              value={ name }
              id="name"
              data-testid="input-player-name"
              onChange={ this.handleChange }
            />
          </label>

          <label htmlFor="email">
            {' '}
            Email:
            <input
              className="inputs-login-page"
              type="email"
              id="email"
              value={ email }
              name="email"
              data-testid="input-gravatar-email"
              onChange={ this.handleChange }
            />
          </label>
        </div>

        <div className="div-buttons-login">
          <button
            className="btn-login-page"
            type="button"
            disabled={ activeButton }
            data-testid="btn-play"
            onClick={ () => this.getApi({ name, email }) }
          >
            Play

          </button>
          <button
            type="button"
            className="btn-login-page"
            data-testid="btn-settings"
            onClick={ () => (history.push('/settings')) }
          >
            Configurações

          </button>
        </div>

      </section>
    );
  }
}

Login.propTypes = {
  loginDispatch: PropTypes.func,
}.isRequired;

const mapDispatchToProps = (dispatch) => ({
  loginDispatch: (informacoes) => dispatch(login(informacoes)),
});

export default connect(null, mapDispatchToProps)(Login);
