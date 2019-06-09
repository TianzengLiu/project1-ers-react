import React from 'react'
import { NavLogOutComponent } from '../navlogout/navlogout.component';


export class SubmitReimbursementComponent extends React.Component<any, any> {
    constructor(props) {
        super(props)

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

        let newReimbursement = {
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

            const response = await fetch('http://localhost:3000/reimbursements', {
                method: 'POST',
                credentials: 'include',
                body: JSON.stringify(newReimbursement),
                headers: {
                    'content-type': 'application/json'
                }
            })



            console.log(response);

            // if(response.status === 401){
            //     this.setState({
            //         errorMessage:'Invalid Credentials'
            //     })
            // // } else 
            if (response.status === 200) {
                const resBody = await response.json()
                // resBody is an array of all Users
                console.log(resBody)
            }

            // this.setState({
            //     reimbursement : resBody
            // })
            // this.props.history.push('/users')

            // } else {
            //     document.getElementById('error-message').innerText = 'You Can\'t login right now'
            // } else if (response.status === 401) {
            //     alert('Unauthorized, please login first!')
            // }
        } catch (err) {
            console.log(err);
        }
    }

    render() {
        const { author, amount, dateSubmitted, dateResolved, description, resolver, status, reimbursement_type_num } = this.state
        return (

            <div className="submitReimbursement">
                <NavLogOutComponent />

                <h1>Submit your reimbursement </h1>
                <form onSubmit={this.submitHandler} style={{ width: "35%", marginLeft: "3%" }}>
                    <div className="form-group" >
                        <label htmlFor="inputAuthor" style={{ float: "left" }}>Author</label>
                        <input type="text" name="author" value={author} onChange={this.changeHandler} className="form-control" id="inputAuthor" placeholder="Author" />
                    </div>

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


                    <button type="submit" className="btn btn-primary" style={{ float: "left" }}>Submit</button>
                </form>

                <br /><br /><br />


                {/* <h4 className="center">Submit reimbursement: {this.state.reimbursementId && this.state.reimbursementId}</h4>
            <p>First Name: {this.state.author && this.state.author}</p> 
            <p>Amount: {this.state.amount && this.state.amount}</p>
            <p>Date Submitted: {this.state.dateSubmitted && this.state.dateSubmitted}</p>
            <p>Date Resolved: {this.state.dateResolved && this.state.dateResolved}</p> 
            <p>description: {this.state.description && this.state.description}</p> 
            <p>Role: {this.state.resolver && this.state.resolver}</p> 
            <p>Role: {this.state.status && this.state.status}</p> 
            <p>Role: {this.state.type && this.state.type}</p>  */}

            </div>

        )
    }
}


