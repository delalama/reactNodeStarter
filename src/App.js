import React, { Component } from 'react';
import './App.css';
import DataTable from './comps/DataTable';
import Button from '@material-ui/core/Button';
import waitGif from './static/images/giphy.gif';
import CuadroDeImputacion from './comps/cuadroDeImputacion';
import { w3cwebsocket as W3CWebSocket } from 'websocket';

const client = new W3CWebSocket('ws://127.0.0.1:8000');
const contentDefaultMessage = 'Start writing your document here';
const username = 'CAIBimput';

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
      imputacionSeleccionada: false,
      imputationRows: [],
      imputando: false,
      currentUsers: [],
      userActivity: [],
      username: null,
      text: '',
      caibUser: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  impute = () => {

    console.log('caibImputación desde app.js');

    const functionName = 'CAIBimput';
    const data = {
      functionName,
      caibUser: this.state.caibUser,
      imputeData: this.state.imputationRows,
    };
    this.setState(
      {
        ...data,
      },
      () => {
        client.send(
          JSON.stringify({
            ...data,
            type: 'userevent',
          })
        );
      }
    );
  };

  componentWillMount() {
    client.onopen = () => {
      console.log('WebSocket Client Connected');
    };
    client.onmessage = (message) => {
      const dataFromServer = JSON.parse(message.data);
      const stateToChange = {};
      if (dataFromServer.type === 'userevent') {
        stateToChange.currentUsers = Object.values(dataFromServer.data.users);
      } else if (dataFromServer.type === 'contentchange') {
        stateToChange.text =
          dataFromServer.data.editorContent || contentDefaultMessage;
      }
      stateToChange.userActivity = dataFromServer.data.userActivity;
      this.setState({
        ...stateToChange,
      });
    };
  }

  handleChange(event) {
    if (event.target.id === 'password') {
      this.setState({
        password: event.target.value,
      });
    }
    else if(event.target.id ==='caibUser') {
      this.setState({
        caibUser: event.target.value,
      });
    }
    else {
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
    const imputando = this.state.imputando;

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

    const imputationRows = (rws) => {
      this.setState({
        imputationRows: rws,
        imputando: true,
      });

      console.log('vamos a imputar', rws);
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

              <label htmlFor="password" className="noselect">
                caibUser{' '}
              </label>
              <input
                id="caibUser"
                type="text"
                value={this.state.caibUser}
                onChange={this.handleChange}
              />
              <h1></h1>

              <Button type="submit" variant="contained" className="header">
                INTRANET
              </Button>
            </form>
          )}

          <div>
            {cuandoLlegaData && !imputando && (
              <DataTable
                rows={this.state.rows}
                imputationRows={imputationRows}
              ></DataTable>
            )}
            {/* <DataTable rows={this.state.rows}></DataTable> */}
          </div>
        </div>

        {imputando && (
          <CuadroDeImputacion
            imputationRows={this.state.imputationRows}
            impute={this.impute}
          ></CuadroDeImputacion>
        )}

        <p>{this.state.mensaje}</p>
        <h3 style={hStyle} className="noselect">
          By Jesús de la Lama Amengual
        </h3>
      </div>
    );
  }
}

export default App;
