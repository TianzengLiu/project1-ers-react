import React from 'react'
import '../../App.css'
import { Link } from 'react-router-dom';


interface ISignInState {
    username: string
    password: string
    errorMessage: string
}

export class SignInComponent extends React.Component<any, ISignInState>{//first is props second is state
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            errorMessage: ''
        }
    }


    updateUsername = (event) => {
        console.log(event)
        this.setState({
            username: event.target.value
        })
    }

    updatePassword = (event) => {
        this.setState({
            password: event.target.value
        })
    }



    login = async (event) => {
        event.preventDefault()
        console.log('trying to login')
        const username = this.state.username
        const password = this.state.password

        const credentials = {
            username,
            password
        }

        try {

            const response = await fetch('http://localhost:3000/users/login', {
                method: 'POST',
                credentials: 'include',
                body: JSON.stringify(credentials),
                headers: {
                    'content-type': 'application/json'
                }
            })

            console.log(response);

            if (response.status === 401) {
                this.setState({
                    errorMessage: 'Invalid Credentials'
                })
                // } else if( response.status === 200){
                //const user = await response.json()

            } else if (response.status === 200 && username === 'Manager') {
                this.props.history.push('/users')
            } else if (response.status === 200 && username === 'Tony Hawk') {
                this.props.history.push('/admin/users')
            } else if (response.status === 200 && username === 'Tony2'){
                this.props.history.push('/users')
            }
            else {
                document.getElementById('error-message').innerText = 'You Can\'t login right now'
            }
        } catch (err) {
            console.log(err);
        }
    }

    componentDidMount() {
        console.log(this.props)
    }

    render() {
        return (
            <form className="form-signin" onSubmit={this.login}>
                <br/>
                <h1 className="h3 mb-3 font-weight-normal please-signin">Sign in</h1>

                <label htmlFor="inputUsername" className="signin-username">Username</label>
                <input type="text" id="inputUsername" className="form-control" value={this.state.username} onChange={this.updateUsername} placeholder="Username" required autoFocus />

                <br />
                <label htmlFor="inputPassword" className="signin-password">Password</label>
                
                <input type="password" id="inputPassword" className="form-control" value={this.state.password} onChange={this.updatePassword} placeholder="Password" required />
                <br />
                <Link to='/' className="mt-5 mb-3">Forgot password?</Link>

                <p>{this.state.errorMessage}</p><br />
                <button className="btn btn-lg btn-primary btn-block" type="submit">Sign in</button>
                <br />


            </form>
        )
    }
}