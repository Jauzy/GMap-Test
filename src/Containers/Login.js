import React, { useState } from 'react'
import axios from 'axios'
import { withRouter } from 'react-router-dom'

import Cookies from 'universal-cookie'

const cookies = new Cookies()

const Login = (props) => {
    const [state, setState] = useState({
        email: null, password: null
    })
    const onChange = (event) => {
        setState({ ...state, [event.target.id]: event.target.value })
    }
    const onClick = () => {
        console.log('CLICKED')
        axios.post("http://localhost:4000/login", { email: state.email, password: state.password })
            .then(response => {
                console.log(response)
                cookies.set('SESSION', { email: state.email, password: state.password })
                props.history.push('/locate')
            })
            .catch(err => console.log(err))
    }
    return (
        <div>
            <h1>LOGIN</h1>
            <div style={{ margin: '200px' }}>
                Email : <input type='text' onChange={onChange} value={state.email} id='email' /><br />
                Password : <input type='text' onChange={onChange} value={state.password} id='password' /><br />
                <button onClick={onClick}>Submit</button>
            </div>
        </div>
    )
}

export default withRouter(Login)