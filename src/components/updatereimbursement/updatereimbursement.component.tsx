import React from 'react'
import { NavLogOutComponent } from '../navlogout/navlogout.component';
import { Link } from 'react-router-dom';



export class UpdateReimbursementComponent extends React.Component<any, any>  {
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
            author: '',
            amount: '',
            dateSubmitted: '',
            dateResolved: '',
            description: '',
            resolver: '',
            status: '',
            reimbursement_type_num: ''

        }
    }


    changeHandler = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }

    submitHandler = async (e) => {
        e.preventDefault()
        console.log(this.state)

        let updateReimbursement = {
            author: this.state.author,
            amount: this.state.amount,
            dateSubmitted: this.state.dateSubmitted,
            dateResolved: this.state.dateResolved,
            description: this.state.description,
            resolver: this.state.resolver,
            status: this.state.status,
            reimbursement_type_num: this.state.reimbursement_type_num

        }

        try {
            let id = this.props.match.params.edit_reim_id
            const response = await fetch('http://localhost:3000/reimbursements/edit/' + id, {
                method: 'PATCH',
                body: JSON.stringify(updateReimbursement),
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
                    reimbursement: resBody
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
        const { author, amount, dateSubmitted, dateResolved, description, resolver, status, reimbursement_type_num } = this.state
        return (
            <div className="updateReimbursement">
                <NavLogOutComponent />

                <br /><br /><h1>Update an {author} reimbursement</h1><br /><br />
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
                    {/* <div className="form-group" >
                        <label htmlFor="inputAuthor" style={{ float: "left" }}>Author</label>
                        <input type="text" name="author" value={author} onChange={this.changeHandler} className="form-control" id="inputAuthor" placeholder="Author" />
                    </div> */}

                    <div className="form-group">
                        <label htmlFor="inputAmount" style={{ float: "left" }}>Amount</label>
                        <input type="text" name="amount" value={amount} onChange={this.changeHandler} className="form-control" id="inputAmount" placeholder="Amount" />
                    </div>

                    <div className="form-group">
                        <label htmlFor="inputDateSubmitted" style={{ float: "left" }}>Date Submitted</label>
                        <input type="text" name="dateSubmitted" value={dateSubmitted} onChange={this.changeHandler} className="form-control" id="inputDateSubmitted" placeholder="Date Submitted" />

                    </div>

                    <div className="form-group">
                        <label htmlFor="inputDateResolved" style={{ float: "left" }}>Date Resolved</label>
                        <input type="text" name="dateResolved" value={dateResolved} onChange={this.changeHandler} className="form-control" id="inputDateResolved" placeholder="Date Resolved" />

                    </div>

                    <div className="form-group">
                        <label htmlFor="inputDescription" style={{ float: "left" }}>Description</label>
                        <input type="text" name="description" value={description} onChange={this.changeHandler} className="form-control" id="inputDescription" placeholder="Description" />

                    </div>

                    <div className="form-group">
                        <label htmlFor="inputResolver" style={{ float: "left" }}>Resolver</label>
                        <input type="text" name="resolver" value={resolver} onChange={this.changeHandler} className="form-control" id="inputResolver" placeholder="Resolver" />

                    </div>

                    <div className="form-group">
                        <label htmlFor="inputStatus" style={{ float: "left" }}>Status</label>
                        <input type="text" name="status" value={status} onChange={this.changeHandler} className="form-control" id="inputStatus" placeholder="Status" />

                    </div>

                    <div className="form-group">
                        <label htmlFor="inputType" style={{ float: "left" }}>Type</label>
                        <input type="text" name="reimbursement_type_num" value={reimbursement_type_num} onChange={this.changeHandler} className="form-control" id="inputType" placeholder="Type" />

                    </div>





                    <button type="submit" className="btn btn-primary" style={{ float: "left" }}>Update</button>
                </form>
                <br /><br /><br /><br /><br />
                <button className="btn btn-primary" style={{ float: "left", marginLeft: "3%" }}>
                    <Link to='/reimbursements/status' style={{ color: "black", textDecoration: "none" }}>Go back to reimbursements</Link>
                </button>
                <br /><br /><br /><br /><br /><br />

            </div>
        )
    }
}


