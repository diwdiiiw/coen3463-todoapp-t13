import React, {PropTypes} from 'react';
import '../components/App.css';
import Login from '../components/Login.js';
import Register from '../components/Register.js';



function User(props){
    return(
        <div>
            {props.login?
                <div className="App-section" onActive={props.handleLogin}>
                    <Login/>   
                    <br/>
                    <button onClick={props.switch} value="RegForm">Register</button> 
                </div>:
                <div className="App-section" onActive={props.handleRegister}>                  
                    <Register />
                    <br/>
                    <button onClick={props.switch} value="LoginForm">Back</button>
                </div>
            }
        </div>
    );
}

User.PropTypes = {
    login: PropTypes.bool.isRequired,
    switch: PropTypes.func.isRequired,
    handleRegister: PropTypes.func.isRequired,
    handleLogin: PropTypes.func.isRequired,
}

export default User;
