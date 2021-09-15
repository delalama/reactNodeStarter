import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import DataTable from './comps/DataTable';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      password: '',
      mensaje: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    if (event.target.id === 'password') {
      this.setState({
        password: event.target.value,
      });
    } else {
      this.setState({
        name: event.target.value,
      });
    }
  }

  handleSubmit(event) {
    event.preventDefault();
    fetch(`/api/selenium?name=${encodeURIComponent(this.state.name)}`)
      .then((response) => response.json())
      .then((state) => this.setState(state));
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <DataTable></DataTable>
          <form onSubmit={this.handleSubmit}>
            <h1>CAIB IMPUTTER MÁXIMUS VÉNOM</h1>

            <label htmlFor="name">Enter your name: </label>
            <input
              id="name"
              type="text"
              value={this.state.name}
              onChange={this.handleChange}
            />

            <label htmlFor="password">Enter your password: </label>
            <input
              id="password"
              type="text"
              // type="password"
              value={this.state.password}
              onChange={this.handleChange}
            />

            <button type="submit">Submit</button>
          </form>

          <p>{this.state.mensaje}</p>

          <h1>By Jesús de la Lama Amengual</h1>
        </header>
      </div>
    );
  }
}

export default App;
