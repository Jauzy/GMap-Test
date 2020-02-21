import React from 'react'
import axios from 'axios'
import Cookies from 'universal-cookie'
import {withRouter} from 'react-router-dom'
const cookies = new Cookies()

const Navbar = (props) => {

    const onLogout = () => {
        const cookiesData = cookies.get('SESSION')
        axios.put('https://user-tracking-268910.appspot.com/logout', { email: cookiesData.email, password: cookiesData.password })
            .then(response => console.log(response))
            .catch(err => console.log(err))
        cookies.remove('SESSION')
        props.history.push('/login')
    }

    return (
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
            <a class="navbar-brand" href="#">Navbar</a>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>

            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav mr-auto">
                    <li class="nav-item active">
                        <a class="nav-link" href="#">Home <span class="sr-only">(current)</span></a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#">Link</a>
                    </li>
                    <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            Dropdown
                        </a>
                        <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                            <a class="dropdown-item" href="#">Action</a>
                            <a class="dropdown-item" href="#">Another action</a>
                            <div class="dropdown-divider"></div>
                            <a class="dropdown-item" href="#">Something else here</a>
                        </div>
                    </li>
                    {cookies.get('SESSION') && <li class="nav-item">
                        <a class="nav-link" onClick={onLogout}>Logout</a>
                    </li>}
                </ul>
            </div>
        </nav>
    )
}

export default withRouter(Navbar)