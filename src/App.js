import React, { Component } from 'react';
import './App.css';
import logoDll from './logo.png';
import Button from '@material-ui/core/Button';
import waitGif from './static/images/giphy.gif';
import okGif from './static/images/ok.gif';
import { w3cwebsocket as W3CWebSocket } from 'websocket';

const client = new W3CWebSocket('ws://127.0.0.1:8000');
const contentDefaultMessage = 'Start writing your document here';
const username = 'CAIBimput';
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      responseSelenium: false,
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
      userMessage: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  impute = () => {
    console.log('caibImputación desde app.js');

    const functionName = 'functionName';
    const caibUser = this.state.name;
    const imputeData = 'imputeData';

    const data = {
      functionName,
      caibUser: this.state.name,
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

      stateToChange.userMessage = dataFromServer.data.userMessage;
      if (dataFromServer.type === 'userevent') {
        stateToChange.currentUsers = Object.values(dataFromServer.data.users);
      } else if (dataFromServer.type === 'contentchange') {
        stateToChange.text =
          dataFromServer.data.editorContent || contentDefaultMessage;
      }
      stateToChange.userActivity = dataFromServer.data.userActivity;
      console.log(stateToChange.userMessage);
      this.setState({
        ...stateToChange,
      });
    };
  }

  handleChange(event) {
    if (event.target.id === 'name') {
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
          responseSelenium: response,
          hayData: true,
        })
      );
  }

  render() {
    const hStyle = {
      right: '5%',
      position: 'fixed',
      bottom: '0',
      fontSize: '1.5em',
      fontFamily: 'Dosis',
      color: 'white',
    };
    const entreSubmitYLlegaData = this.state.submitDone && !this.state.hayData;
    const cuandoLlegaData = this.state.submitDone && this.state.hayData;
    const imputando = this.state.imputando;

    const gifStyle = {
      width: '400px',
      height: '400px',
    };

    return (
      <div className="App">
        {/* { <ImageAvatars></ImageAvatars> } */}

        <div className="board">
          <h1 className="header">React node starter</h1>

          <img src={logoDll}></img>

          {entreSubmitYLlegaData && (
            <div className="noselect">
              <img src={waitGif} alt="loading..." style={gifStyle} />
            </div>
          )}

          {cuandoLlegaData && (
            <div className="noselect">
              <img src={okGif} alt="loading..." style={gifStyle} />
            </div>
          )}

          {!this.state.submitDone && (
            <form onSubmit={this.handleSubmit}>
              <label htmlFor="name" className="noselect">
                write whatever :
              </label>
              <input
                id="name"
                type="text"
                value={this.state.name}
                onChange={this.handleChange}
              />
              <h1></h1>
              <Button type="submit" variant="contained" className="header">
                GOOGLE IT
              </Button>

              <Button
                onClick={this.impute}
                variant="contained"
                className="header"
              >
                SOCKET IT
              </Button>
            </form>
          )}
          <h1>{this.state.userMessage}</h1>
        </div>

        <h3 style={hStyle} className="noselect">
          By Jesús de la Lama Amengual
        </h3>
      </div>
    );
  }
}

export default App;
