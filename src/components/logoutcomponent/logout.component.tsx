import React from 'react'

interface ILogOutState {
    username: string
    password: string
    errorMessage: string
}

export class LogOutComponent extends React.Component<any, ILogOutState>{//first is props second is state
    constructor(props){
        super(props);
        this.state = {
            username: '',
            password: '',
            errorMessage: ''
        }
    }


    


    

    logout = async (event)=>{
        event.preventDefault()
        console.log('trying to logout')
        const username = this.state.username
        const password = this.state.password
    
        const credentials = {
            username,
            password
        }
    
        try{
    
            const response = await fetch('http://localhost:3000', {
                method: 'GET',
                credentials: 'include',
                body: JSON.stringify(credentials),
                headers:{
                    'content-type': 'application/json'
                }
            })
    
            console.log(response);
    
            if(response.status === 200){
                this.setState({
                    username: '',
                    password: ''
                })
                this.props.history.push('/')
            }          
        } catch(err){
            console.log(err);        
        }
    }

    componentDidMount(){
        console.log(this.props)
    }

    render(){
        return (
                <button className="btn btn-lg btn-danger btn-block" type="submit" onSubmit={this.logout}>Log out</button>
               
            
        )
    }
}