import React, { Component } from 'react';

export default class Login extends Component {
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

  render() {
    const { name, email, activeButton } = this.state;
    return (
      <section>
        <label htmlFor="name">
          {' '}
          Nome:
          <input
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
            type="email"
            id="email"
            value={ email }
            name="email"
            data-testid="input-gravatar-email"
            onChange={ this.handleChange }
          />
        </label>

        <button
          type="button"
          disabled={ activeButton }
          data-testid="btn-play"
        >
          Play

        </button>
      </section>
    );
  }
}
