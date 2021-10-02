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
      rows: [],
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
    fetch(`/api/selenium?name=${encodeURIComponent(this.state.name)}&password=${encodeURIComponent(this.state.password)}`)
      // .then((response) => response.json())
      .then((response) => response.json())
      .then((response) => console.log(response))
      .then((response) => this.setState(
        {
          rows: response,
        }
      ))
      ;
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <DataTable
            rows = {this.state.rows}
          ></DataTable>
          <form onSubmit={this.handleSubmit}>
            <h1>CAIB IMPUTTER MÁXIMUS VÉNOM</h1>

            <label htmlFor="name">Enter your name: </label>
            <input
              id="name"
              type="text"
              value={this.state.name}
              onChange={this.handleChange}
            />

            <h1></h1>
            <label htmlFor="password">Enter your password: </label>
            <input
              id="password"
              type="text"
              // type="password"
              value={this.state.password}
              onChange={this.handleChange}
            />

            
            <h1></h1>
            
            <button type="submit">GO</button>
          </form>

          <p>{this.state.mensaje}</p>

          <h1>By Jesús de la Lama Amengual</h1>
        </header>
      </div>
    );
  }
}

export default App;
