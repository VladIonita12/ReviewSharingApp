import React, {Component}  from 'react';
import SignIn from '../sign-in/sign-in.component';
import App from '../App'
import { CardList } from '../card-list/card-list.component';
const SERVER = 'http://3.138.181.35:8080'

class ModifyUser extends Component {
    constructor(props) { 
      super(props);
  
      this.state = {usersData: [],
        transports: [],
        email: '',
        password: '',
        isOk :false,
       cancel:false,
        delete:false
      };
  
      this.okVal = () => {
        
          this.setState({
              isOk: !this.state.isOk
          })
      
      }
      this.cancelComp = () =>{
          this.setState({
              cancel:!this.state.cancel
          })
      }
    
  
     
    this.deleteData = ()=>{
        this.setState({
          delete:!this.state.delete
        })
      }

      this.handleChange = (evt)=>{
        this.setState({
             [evt.target.name] : evt.target.value
        })
    }
    }
    async componentDidMount() {

        let response = await fetch(`${SERVER}/userdata/${this.props.userId}`)
       let data = await response.json()
      
       this.setState({ usersData: data });

     response = await fetch(`${SERVER}/userdata/${this.props.userId}/transports`)
     data = await response.json()
      
       this.setState({ transports: data });
      
      }

      render() {


        var index;
       for(var i=0;i<this.state.usersData.length;i++){
        if(this.state.usersData[i].userName ===this.state.email)
        index=i;
       
       }
      
       
      
        if((this.state.email ||this.state.password) && this.state.isOk ){
            if(this.state.email){
       
            fetch(`${SERVER}/userdata/${this.props.userId}`, {
                method: 'PUT',
                headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  userName: `${this.state.email}`
                })
              })
            }
             if(this.state.password){
                fetch(`${SERVER}/userdata/${this.props.userId}`, {
                    method: 'PUT',
                    headers: {
                      'Accept': 'application/json',
                      'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                     
                      password: `${this.state.password}`
                    })
                  })
                }
            }
          
            
            if(this.state.delete){

                fetch(`${SERVER}/userdata/${this.props.userId}`, {
                    method: 'DELETE'})
                return <SignIn></SignIn>

            }

            if(this.state.cancel){
                return <App username={this.props.userId}></App>
            }
       
      
      
      
      
      
      
      
         
      
      
          return (
            <div className='App'>
              <h2>Modify an account</h2>
          <h3>Your name is {this.state.usersData.userName}</h3>
              <span>Change your username and password</span>
              <form >
          <input
            name='email'
            placeholder="Email"
            
             value={this.state.email}
            
             onChange={this.handleChange}
            
          />
          <input
            name='password'
            type='password'
            value={this.state.password}
            placeholder="Password"
            label='password'
            onChange={this.handleChange}
            
          />
         <button type='button'  onClick={this.okVal}  >Register
         </button>
      
        </form>
              <button type="button" onClick={this.cancelComp}>Cancel</button>
              <div><button onClick={this.deleteData}>Delete user?</button></div>

             {this.state.transports!==[] && <div > <CardList users={this.state.transports} modify={true} userID={this.props.userId}/> </div>}
            </div>
            
          );
        }





}

    export default ModifyUser