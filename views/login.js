
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../style/Home.css';

class Login extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
          nome:'',
          cognome:''
        }
      }

    doLogin() {
        let res = await fetch('/apis/authentication/login', {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: this.state.username,
                password: this.state.password
            })
        });

        let result = await res.json();

    }

    render() {
        <React.StrictMode>
            <App />
            <h>
                {this.state.nome}
                {this.state.cognome}
            </h>
        </React.StrictMode>

    }
}