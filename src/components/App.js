import React, { Component } from 'react';
//import logo from './logo.svg';
import './App.css';

import { CardList } from './card-list/card-list.component';
import { SearchBox } from './search-box/search-box.component';
import ModifyUser from './modifyUser/modifyUser'
import AddData from './AddData/AddData'
import SignIn from './sign-in/sign-in.component';
import TransportStore from '../stores/TransportStore';
import UserStore from '../stores/UserStore';
//import { withNavigation } from 'react-navigation';
const SERVER = 'http://3.138.181.35:8080'
class App extends Component {
  constructor(props) {
    super(props);

    this.state = {userData:[],
      transports: [],
      searchField: '',
      modifyUser: false,
      logOut:false,
      userID: null,
      add:false

    };

    this.store = new TransportStore()
this.userStore = new UserStore()
    this.add = (transport)=>{
      this.store.addTransport(this.props.username,transport)
  }
    this.logout = () => {
          
      this.setState({
          logOut: !this.state.logOut
      })
  
  }

  this.addData = ()=>{
    this.setState({
      add:!this.state.add

    })
  }
  
  this.modifyData = ()=>{
      this.setState({
        modifyUser:!this.state.modifyUser
      })
  }
 
  this.handleChange = (evt)=>{
    this.setState({
         [evt.target.name] : evt.target.value
    })
}


  }

  async componentDidMount() {

    this.store.getTransports()
        this.store.emitter.addListener('GET_TRANSPORTS_SUCCESS', ()=>{
            this.setState({
                transports : this.store.transports
            })
        })

        // var valueEmail = this.props.username
        // var resultFound = false;
        // var data
        // var index
        // var fetchNow = function() {
        //  fetch(`${SERVER}/userdata`).then(function(response) {
          
        //     data = response.json()
           
        //      for(var i=0;i<data.length;i++){
        //       if(data[i].userName ===valueEmail){
        //       index=data[i].id;
        //       resultFound=true}
             
             
             
            
        //     else {
        //       fetchNow();
        //     }}
        //   });
        // }

        
        // console.log(index)
        // if(typeof(this.props.username)!=="number")
        //     {
             
              
        //       console.log(data)
        
              
             
        //       if(index){
        //       this.setState({userID:index})
        //     resultFound=true  
        //     }
        //       console.log(this.state.userID)
        //     }
        // fetchNow();
 
   
      console.log(this.props.username)
   

  
  

  }

  
  
  //  async getDerivedStateFromProps () {
  //   const refresh=null
  //   console.log(this.props.refresh)
  //   console.log(refresh)
  //   if (this.props.refresh !== refresh) {
    
  //     let response = await fetch(`${SERVER}/userdata/transports`)
  //     let data = await response.json()
  //     this.setState({ transports: data });

  //   }
  // }


  onSearchChange = event => {
    this.setState({ searchField: event.target.value });
  };

  render() {

  
    


    const { transports, searchField } = this.state;
    const filteredUsers = transports.filter(transport =>
      transport.numberBus.toString().includes(searchField.toLowerCase())
    );
    var notLogged = false
    if (this.props.username) notLogged = true 
    if(this.state.logOut)
    return <SignIn></SignIn>
    if(this.state.modifyUser ){
    if(this.state.userID===null){
    
    return  <ModifyUser userId = {this.props.username} />}
    else return <ModifyUser userId = {this.state.userID}/>
    }

    if(this.state.add ){
      if(this.state.userID===null){
      
      return  <AddData userId = {this.props.username} />}
      else return <AddData userId = {this.state.userID} />
      }



    return (
      <div className='App'>
        <h1>RECENZII RATB</h1>
        {notLogged && 
          <div><button onClick={this.modifyData } >Modify your data</button>
            <button onClick={this.logout}>Log Out</button>
            {/* <button onClick={this.addData}>Add Data</button> */}
          </div>}
          {
            notLogged===false && <div><button onClick={this.logout}>Exit</button></div>
          }
          {/* {(this.state.add && this.state.userID===null) &&<div><AddData userId = {this.props.username} /></div>

          }
          {
            (this.state.add && this.state.userID) &&<div><AddData userId = {this.state.userID} /></div>
          } */}

        
        <br></br>
        <SearchBox onSearchChange={this.onSearchChange} />
        <CardList users={filteredUsers} />


<div className="label">
        
        {
           notLogged && ( this.state.userID ?(<div><AddData userId = {this.state.userID}  onAdd={this.add}  /></div>)
            :(<div><AddData userId = {this.props.username}  onAdd={this.add} /></div>))
          }
</div>

      </div>

    );
  }
}

export default App;
