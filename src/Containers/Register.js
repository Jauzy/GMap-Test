import React, { useState } from 'react'
import axios from 'axios'
import {withRouter} from 'react-router-dom'

const Register = (props) => {
    const [state, setState] = useState({
        name: null, email: null, password: null
    })
    const onChange = (event) => {
        setState({ ...state, [event.target.id]: event.target.value })
    }
    const onClick = () => {
        axios.post("http://localhost:4000/register", {name : state.name, email : state.email, password : state.password})
        .then(response => {
            console.log(response)
            props.history.push('/login')
        })
        .catch(err => console.log(err))
    }
    return (
        <div>
            <h1>REGISTER</h1>
            <div style={{margin : '200px'}}>
                Name : <input type='text' onChange={onChange} value={state.name} id='name' /><br/>
                Email : <input type='text' onChange={onChange} value={state.email} id='email' /><br/>
                Password : <input type='text' onChange={onChange} value={state.password} id='password' /><br/>
                <button onClick={onClick}>Submit</button>
            </div>
        </div>
    )
}

export default withRouter(Register)