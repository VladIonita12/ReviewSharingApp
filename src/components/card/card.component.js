import React, {Component} from 'react';
import {CardList} from '../card-list/card-list.component'
import './card.styles.css';
import CardInfo from '../card-info-component/CardInfo';
const SERVER = 'http://3.138.181.35:8080'
class Card extends Component{


  constructor(props){
    super(props)
    this.state = {user: [],
      email: '',
      password: '',
      isOk :false,
      delete:false,
      cancel:false
    };

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
  this.deleteVal = () =>{
    this.setState({
        delete:!this.state.delete
    })
}
  }

  render(){
    if(this.state.isOk)
    return <CardInfo key={this.props.user.id} userNumber={this.props.user} modify={this.props.modify && true}></CardInfo>
    console.log(this.state.delete)
    if(this.state.delete){

      fetch(`${SERVER}/userdata/${this.props.userID}/transports/${this.props.number}`, {
          method: 'DELETE'})
   

  }
  return (
    <div className='card-container'>


      {this.props.user.typeTransport==='Bus' ? (<img
        alt='bus'
        src="http://stbsa.ro/maps2/mc-422.jpg"
      />):(this.props.user.typeTransport==='Metro'?(<img
        alt='metro'
        src="https://clubferoviar.ro/wp-content/uploads/2019/04/licita%C8%9Bia-pentru-trenurile-de-metrou.jpg"
      />):(this.props.user.typeTransport==='Tram'&&(<img
        alt='tram'
        src="https://mobilitate.eu/wp-content/uploads/2018/12/DSC_8602-840x480.jpg"
      />)))
      
      }
      <h2> Type of transport {this.props.user.typeTransport} </h2>
      <p> Number {this.props.user.numberBus} </p>
      <button onClick={this.okVal}>View More</button>
      {
        this.props.modify && <button type="button" onClick={this.deleteVal}>Delete</button>
      }
      
     
    </div>)
  }
  
}

export default Card
  
  

