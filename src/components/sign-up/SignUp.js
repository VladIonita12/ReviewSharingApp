import React, {Component, useState} from 'react';
import App from '../App';
import SignIn from '../sign-in/sign-in.component'
import Alert from 'react-bootstrap/Alert'
import './SignUp.css';
import UserStore from '../../stores/UserStore';
const SERVER = 'http://3.138.181.35:8080'

function AlertDismissible() {
    const [show, setShow] = useState(true);
  
    return (
      <>
        <Alert show={show} variant="success">
          <Alert.Heading>How's it going?!</Alert.Heading>
          <p>
            Wrong password/username, doc
          </p>
          <hr />
          <div className="d-flex justify-content-end">
            <button onClick={() => setShow(false)} variant="outline-success">
              Close me ya'll!
            </button>
          </div>
        </Alert>
  
        {!show && <SignUp/>}
      </>
    );
  }



class SignUp extends Component{
    constructor() { 
        super();
    
        this.state = {usersData: [],
          email: '',
          password: '',
          isOk :false,
          cancel:false
        };

        this.store = new UserStore()
        // this.add = (user)=>{
        //     this.store.addUser(user)
        // }
    
        this.okVal = () => {
          
            this.setState({
                isOk: !this.state.isOk
            })
        
        }
        this.cancelApp = ()=>{
            this.setState({
                cancel:!this.state.cancel
            })
        }
       
        this.handleChange = (evt)=>{
          this.setState({
               [evt.target.name] : evt.target.value
          })
      }

      this.handleClick=()=>
        {

          
        var index;
        for(var i=0;i<this.state.usersData.length;i++){
         if(this.state.usersData[i].userName ===this.state.email)
         index=this.state.usersData[i].id;
        
        
        }
        if(index===undefined)
            this.props.onAdd({
                userName : this.state.email,
                password: this.state.password
            })
         this.okVal()     
           
        }
      }
      async componentDidMount() {

        this.store.getUsers()
  this.store.emitter.addListener('GET_USERS_SUCCESS', ()=>{
      this.setState({
          usersData : this.store.users
      })
  })
      }
      
     render() {


      
       
      
        if( this.state.isOk ){
       
            // fetch(`${SERVER}/userdata`, {
            //     method: 'POST',
            //     headers: {
            //       'Accept': 'application/json',
            //       'Content-Type': 'application/json',
            //     },
            //     body: JSON.stringify({
            //       userName: `${this.state.email}`,
            //       password: `${this.state.password}`
            //     })
            //   })
           var index;
            for(var i=0;i<this.state.usersData.length;i++){
             if(this.state.usersData[i].userName ===this.state.email)
             index=this.state.usersData[i].id;
            
            
            }
                return <App username={this.state.usersData[this.state.usersData.length-1].id+1}/>
              
          
            
       }
       
      
      
      
      
       else if(this.state.isOk===true){
        return (<AlertDismissible isOk={this.state.isOk} />);
       
     
     }
        if(this.state.cancel){
          return <SignIn/>
        }
      
      
         
      
      
          return (
            <div className='App'>
              <h2>Create an account</h2>
              <span >Put your email and password</span>
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
         <button type='button'  onClick={this.handleClick}  >Register
         </button>
      
        </form>
              <button type="button" onClick={this.cancelApp}>Cancel</button>
      
            </div>
            
          );
        }


}


export default SignUp