import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import DataTable from './comps/DataTable';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      greeting: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ name: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    fetch(`/api/greeting?name=${encodeURIComponent(this.state.name)}`)
      .then((response) => response.json())
      .then((state) => this.setState(state));
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <DataTable></DataTable>
          <form onSubmit={this.handleSubmit}>
            <h1>REACT and NODE project starter</h1>

            <p>Submit across express controller</p>

            <label htmlFor="name">Enter your name: </label>
            
            <input
              id="name"
              type="text"
              value={this.state.name}
              onChange={this.handleChange}
            />
            <button type="submit">Submit</button>
          </form>
          <p>{this.state.greeting}</p>

          <h1>By Jesús de la Lama Amengual</h1>
        </header>
      </div>
    );
  }
}

export default App;
