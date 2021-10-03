import React, { Component } from 'react';
import './App.css';
import DataTable from './comps/DataTable';
import Button from '@material-ui/core/Button';
import ImageAvatars from './comps/avatar';
import Grid from '@material-ui/core/Grid';
import waitGif from './static/images/giphy.gif';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      password: '',
      rows: [],
      mensaje: '',
      submitDone: false,
      hayData: false,
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
    this.setState({
      submitDone: true,
    });
    fetch(
      `/api/selenium?name=${encodeURIComponent(
        this.state.name
      )}&password=${encodeURIComponent(this.state.password)}`
    )
      .then((response) => response.json())
      .then((response) =>
        this.setState({
          rows: response,
          hayData: true,
        })
      );
  }

  render() {
    const hStyle = {
      right: '0%',
      position: 'absolute',
      bottom: '0',
    };
    const entreSubmitYLlegaData = this.state.submitDone && !this.state.hayData;
    const cuandoLlegaData = this.state.submitDone && this.state.hayData;

    const gifStyle = {
      width: '400px',
      height: '400px',
    };

    const tableStyle = {
      background: 'white',
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      width: '100%',
    };

    return (
      <div className="App">
        {/* { <ImageAvatars></ImageAvatars> } */}

        <div className="board">
          <h1 className="header">CAIB IMPUTTER</h1>

          {entreSubmitYLlegaData && (
            <div className="noselect">
              <img src={waitGif} alt="loading..." style={gifStyle} />
            </div>
          )}

          {!this.state.submitDone && (
            <form onSubmit={this.handleSubmit}>
              <h3 className="noselect">enter intranet credentials</h3>

              <label htmlFor="name" className="noselect">
                name{' '}
              </label>
              <input
                id="name"
                type="text"
                value={this.state.name}
                onChange={this.handleChange}
              />
              <h1></h1>

              <label htmlFor="password" className="noselect">
                pass{' '}
              </label>
              <input
                id="password"
                type="password"
                value={this.state.password}
                onChange={this.handleChange}
              />
              <h1></h1>
              <Button type="submit" variant="contained" className="header">
                INTRANET
              </Button>
            </form>
          )}

          <div>
            {cuandoLlegaData && <DataTable rows={this.state.rows}></DataTable>}
            {/* <DataTable rows={this.state.rows}></DataTable> */}
          </div>

          <p>{this.state.mensaje}</p>
          <h3 style={hStyle} className="noselect">
            By Jesús de la Lama Amengual
          </h3>
        </div>
      </div>
    );
  }
}

export default App;
