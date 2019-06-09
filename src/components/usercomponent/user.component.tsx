import React from 'react'
import { NavLogOutComponent } from '../navlogout/navlogout.component';
import { Link } from 'react-router-dom';
// import axios from 'axios'


export class UserComponent extends React.Component<any, any>  {
    // state = {
    //     user : null
    // }
    // componentDidMount() {
    //     let id = this.props.match.params.user_id
    //     axios.get('http://localhost:3000/users/' + id)
    //     .then(res => {
    //         this.setState({
    //             user: res.data
    //         })
    //         console.log(res)
    //     })
    //     // console.log(this.props) 
       
    // }

    
    constructor(props) {
        super(props);
        this.state = {
            user: null
        }
    }

    

    getUser = async () => {

        console.log('trying to get individual user')
        console.log(this.props) 

        try {
            let id = this.props.match.params.user_id
            const response = await fetch('http://localhost:3000/users/' + id, {
                method: 'GET',
                credentials: 'include',
                headers: {
                    'content-type': 'application/json'
                }
            })

            console.log(response);

            // if(response.status === 401){
            //     this.setState({
            //         errorMessage:'Invalid Credentials'
            //     })
            // } else 
            if (response.status === 200) {
                const resBody = await response.json()
                // resBody is an array of all Users
                console.log(resBody)

                this.setState({
                    user : resBody
                })
                // this.props.history.push('/users')

                // } else {
                //     document.getElementById('error-message').innerText = 'You Can\'t login right now'
            } else if (response.status === 401) {
                alert('Unauthorized, please login first!')
            }




        } catch (err) {
            console.log(err);
        }
    }


    //call the function getAllUsers() after first time render the page, this is the second time render the getAllUsers()
    componentDidMount() {
        this.getUser()
    }




    render() {
        return (
            <div className ="user"> 
            <NavLogOutComponent />  
            
            <br/><br/><h1>I am an individual user</h1><br/><br/>
             {/* we need && to check the this.state.user to see if it is truthy because we render this first time,
             the initial state is null if not check then break in the first time*/}
             {/* <p>{this.state.user && this.state.user.username}</p> */}
            {/* we can not put object directly in the Dom, we need JSON.stringify to transfer to "json" string
             to display in the browser */}
            {/* {JSON.stringify(this.state)} */}
             
            <h4 className="center">Find user by UserId: {this.state.user && this.state.user.userId}</h4>
            <p>Username: {this.state.user && this.state.user.username}</p>
            <p>First Name: {this.state.user && this.state.user.firstName}</p>
            <p>Last Name: {this.state.user && this.state.user.lastName}</p>
            <p>Email: {this.state.user && this.state.user.email}</p>
            <p>Role: {this.state.user && this.state.user.role}</p>

            <button className="btn btn-primary">
                <Link to='/users/' style={{color:"black", textDecoration:"none"}}>Go back to users</Link>
                </button>
            </div>
        )
    }
}


