import React, {Component, useState}  from 'react';

import App from '../App';
import SignUp from '../sign-up/SignUp'
import Alert from 'react-bootstrap/Alert'

import './sign-in.styles.scss';
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

      {!show && <SignIn/>}
    </>
  );
}


class SignIn extends Component {
  constructor(props) { 
    super(props);

    this.state = {usersData: [],
      email: '',
      password: '',
      isOk :false,
      register: false,
      noLogin: false
    };

    this.store = new UserStore()
        this.add = (user)=>{
            this.store.addUser(user)
        }

    this.okVal = () => {
      
        this.setState({
            isOk: !this.state.isOk
        })
    
    }
    this.notLogged = () => {
      
      this.setState({
          noLogin: !this.state.noLogin
      })
  
  }

    this.signUP = () => {
      
      this.setState({
         register: !this.state.register
      })
  
  }
    this.handleChange = (evt)=>{
      this.setState({
           [evt.target.name] : evt.target.value
      })
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


  var index;
  var pos;
 for(var i=0;i<this.state.usersData.length;i++){
  if(this.state.usersData[i].userName ===this.state.email && this.state.usersData[i].password ===this.state.password)
  index=this.state.usersData[i].id;
  pos=i
 }

 

  if(index!=null && this.state.isOk){
 
   
     
    return <App username={index}/>
      
 
 

}
else if(this.state.isOk===true){
   return (<AlertDismissible isOk={this.state.isOk} />);
  

}






  if(this.state.noLogin){
    return <App/>
  }


   if(this.state.register){
     return <SignUp onAdd={this.add}/>
   }


    return (
      <div className='sign-in'>
        <h2 >Welcome to our sharing app</h2>
        <span>Sign in with your email and password</span>

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
         <button type='button'  onClick={this.okVal}  >Sign In
         </button>
        
        </form>
        <div>
        <button type="button" onClick={this.signUP}>Sign Up</button>
        <button type="button" onClick={this.notLogged}>Continue without logging</button>
      </div>

      </div>
      
    );
  }
}

export default SignIn;