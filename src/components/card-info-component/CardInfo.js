import React, {Component} from 'react';
import './CardInfo.css';
import Card from '../card/card.component';

import SentimentSatisfiedAltIcon from '@material-ui/icons/SentimentSatisfiedAltOutlined';


class CardInfo extends Component{
    constructor(props){
        super(props)
        this.state = {
          
          isOk :false,
          cancel:false
        };
        this.cancelApp = ()=>{
            this.setState({
                cancel:!this.state.cancel
            })
        }
        
    }

    // async componentDidMount() {

    //     let response = await fetch(`${SERVER}/userdata/${this.props.user.id}/transports`)
    //    let data = await response.json()
      
    //    this.setState({ users: data });
      
    //   }
render(){
    if(this.state.cancel){
       return <Card user={this.props.userNumber} modify={this.props.modify && true}></Card>
    }


   

    var items = []
    for (var val = 0; val<this.props.userNumber.satisfactie;val++) {
        items.push(<SentimentSatisfiedAltIcon />)
      }


    return (
        <div className='card-container cardInfo'>
        
        <h2>Leaving point: {this.props.userNumber.punctPlecare} </h2>
        <p>Ending point: {this.props.userNumber.punctSosire} </p>
        <p>Hour of leaving: {this.props.userNumber.oraPlecare} </p>
        <p>Duration: {this.props.userNumber.durata} </p>
        <p>Fullness: {this.props.userNumber.gradDeAglomerare} </p>
        <p>Observations: {this.props.userNumber.observatii} </p>
        <p>Satisfaction: {items} </p>
        <button onClick={this.cancelApp}>Cancel</button>
        
       
      </div>
    )
}

}

export default CardInfo