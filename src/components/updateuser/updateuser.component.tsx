import React from 'react'
import { NavLogOutComponent } from '../navlogout/navlogout.component';
import { Link } from 'react-router-dom';



export class UpdateUserComponent extends React.Component<any, any>  {
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
            username: '',
            password: '',
            firstName: '',
            lastName: '',
            email: '',
            role: '',
        }
    }


    changeHandler = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }

    submitHandler = async (e) => {
        e.preventDefault()
        console.log(this.state)

        let updateUser = {
            username: this.state.username,
            password: this.state.password,
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            email: this.state.email,
            role: this.state.role,

        }

        try {
            let id = this.props.match.params.edit_user_id
            const response = await fetch('http://localhost:3000/users/edit/' + id, {
                method: 'PATCH',
                body: JSON.stringify(updateUser),
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
                    user: resBody
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


    render() {
        const { username, password, firstName, lastName, email, role } = this.state
        return (
            <div className="user">
                <NavLogOutComponent />

                <br /><br /><h1>Update an individual user</h1><br /><br />
                {/* we need && to check the this.state.user to see if it is truthy because we render this first time,
             the initial state is null if not check then break in the first time*/}
                {/* <p>{this.state.user && this.state.user.username}</p> */}
                {/* we can not put object directly in the Dom, we need JSON.stringify to transfer to "json" string
             to display in the browser */}
                {/* {JSON.stringify(this.state)} */}
                {/*              
            <h4 className="center">Update Users: {this.state.user && this.state.user.userId}</h4>
            <p>Username: {this.state.user && this.state.user.username}</p>
            <p>First Name: {this.state.user && this.state.user.firstName}</p>
            <p>Last Name: {this.state.user && this.state.user.lastName}</p>
            <p>Email: {this.state.user && this.state.user.email}</p>
            <p>Role: {this.state.user && this.state.user.role}</p> */}


                <form onSubmit={this.submitHandler} style={{ width: "35%", marginLeft: "3%" }}>
                    <div className="form-group" >
                        <label htmlFor="inputUsername" style={{ float: "left" }}>Username</label>
                        <input type="text" name="username" value={username} onChange={this.changeHandler} className="form-control" id="inputUsername" placeholder="Username" />
                    </div>

                    <div className="form-group">
                        <label htmlFor="inputPassword" style={{ float: "left" }}>Password</label>
                        <input type="password" name="password" value={password} onChange={this.changeHandler} className="form-control" id="inputPassword" placeholder="Password" />
                    </div>

                    <div className="form-group">
                        <label htmlFor="inputFirstName" style={{ float: "left" }}>First Name</label>
                        <input type="text" name="firstName" value={firstName} onChange={this.changeHandler} className="form-control" id="inputFirstName" placeholder="First Name" />

                    </div>

                    <div className="form-group">
                        <label htmlFor="inputLastName" style={{ float: "left" }}>Last Name</label>
                        <input type="text" name="lastName" value={lastName} onChange={this.changeHandler} className="form-control" id="inputLastName" placeholder="Last Name" />

                    </div>

                    <div className="form-group">
                        <label htmlFor="inputEmail" style={{ float: "left" }}>Email</label>
                        <input type="text" name="email" value={email} onChange={this.changeHandler} className="form-control" id="inputEmail" placeholder="Email" />

                    </div>

                    <div className="form-group">
                        <label htmlFor="inputRole" style={{ float: "left" }}>Role</label>
                        <input type="text" name="role" value={role} onChange={this.changeHandler} className="form-control" id="inputRole" placeholder="Role" />

                    </div>





                    <button type="submit" className="btn btn-primary" style={{ float: "left" }}>Update</button>
                </form>
                <br /><br /><br /><br /><br />
                <button className="btn btn-primary" style={{ float: "left", marginLeft: "3%" }}>
                    <Link to='/users/' style={{ color: "black", textDecoration: "none" }}>Go back to users</Link>
                </button>
                <br /><br /><br /><br /><br /><br />

            </div>
        )
    }
}


