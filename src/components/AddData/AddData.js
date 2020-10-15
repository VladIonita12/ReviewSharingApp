import React, {Component} from 'react'
import PropTypes from 'prop-types';

import Rating from '@material-ui/lab/Rating';

import SentimentVeryDissatisfiedIcon from '@material-ui/icons/SentimentVeryDissatisfied';
import SentimentDissatisfiedIcon from '@material-ui/icons/SentimentDissatisfied';
import SentimentSatisfiedIcon from '@material-ui/icons/SentimentSatisfied';
import SentimentSatisfiedAltIcon from '@material-ui/icons/SentimentSatisfiedAltOutlined';
import SentimentVerySatisfiedIcon from '@material-ui/icons/SentimentVerySatisfied';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import App from '../App'
import { Dropdown } from 'semantic-ui-react'
import './AddData.css';

const SERVER = 'http://3.138.181.35:8080'
// const StyledRating = withStyles({
//     iconFilled: {
//       color: '#ff6d75',
//     },
//     iconHover: {
//       color: '#ff3d47',
//     },
//   })(Rating);
  
  const customIcons = {
    1: {
      icon: <SentimentVeryDissatisfiedIcon />,
      label: 'Very Dissatisfied',
    },
    2: {
      icon: <SentimentDissatisfiedIcon />,
      label: 'Dissatisfied',
    },
    3: {
      icon: <SentimentSatisfiedIcon />,
      label: 'Neutral',
    },
    4: {
      icon: <SentimentSatisfiedAltIcon />,
      label: 'Satisfied',
    },
    5: {
      icon: <SentimentVerySatisfiedIcon />,
      label: 'Very Satisfied',
    },
  };
  
  function IconContainer(props) {
    const { value, ...other } = props;
    return <span {...other}>{customIcons[value].icon}</span>;
  }
  
  IconContainer.propTypes = {
    value: PropTypes.number.isRequired,
  };

  const friendOptions = [
    {
      key: 'Empty',
      text: 'Empty',
      value: 'Empty'
    },
    {
      key: 'Busy',
      text: 'Busy',
      value: 'Busy'
    },
    {
      key: 'Very Busy',
      text: 'Very Busy',
      value: 'Very Busy'
     
    }
   
  ]
  // const DropdownExampleSelection = () => (
  //   <Dropdown
  //     placeholder='Select Friend'
  //     fluid
  //     selection
  //     options={friendOptions}
  //   />
  // )
  
class AddData extends Component{

    
    constructor(props) { 
     
        super(props);
    
        this.state = {usersData: [],
          email: '',
          password: '',
          isOk :false,
         cancel:false,
          delete:false,
          newRating:5,
          typeTransport: 'Bus',
          numberBus:0,
          punctPlecare:undefined,
          punctSosire:undefined,
          oraPlecare:0,
          durata:0,
          gradDeAglomerare:'Empty',
          observatii:'',
          itEnded:false

        };
        this.finished = () => {
          
          this.setState({
              itEnded: !this.state.itEnded
          })
      
      }
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
        this.modifyType = (event) =>{
          this.setState({
            typeTransport: event.target.value
          })
        }

        this.modifyGrad = (event) =>{
          this.setState({
            gradDeAglomerare: event.target.value
          })
        }
      
        this.onChange = (event, newValue) => {
            this.setState({
                newRating: newValue
            });
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

      this.handleClick=()=>
      {
          this.props.onAdd({
            typeTransport: this.state.typeTransport,
            numberBus: this.state.numberBus,
            punctPlecare: this.state.punctPlecare,
            punctSosire: this.state.punctSosire,
            oraPlecare: this.state.oraPlecare,
            durata: this.state.durata,
            gradDeAglomerare: this.state.gradDeAglomerare,
            observatii: this.state.observatii,
            satisfactie: this.state.newRating
          })
      }
      }
      async componentDidMount() {
  
        //   let response = await fetch(`${SERVER}/userdata/${this.props.userId}/transports`)
        //  let data = await response.json()
        
        //  this.setState({ usersData: data });
        // console.log(this.state.user)
        // }}
      }
      

        render(){  
            // var index;
            // for(var i=0;i<this.state.usersData.length;i++){
            //  if(this.state.usersData[i].id === this.props.userId)
            //  index=i;
            
            
            // }

            if(this.state.cancel){
                return <App username={this.props.userId}/>
            }

            if(this.state.isOk){
                fetch(`${SERVER}/userdata/${this.props.userId}/transports`, {
                    method: 'POST',
                    headers: {
                      'Accept': 'application/json',
                      'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                      typeTransport: `${this.state.typeTransport}`,
                      numberBus: `${this.state.numberBus}`,
                      punctPlecare: `${this.state.punctPlecare}`,
                      punctSosire: `${this.state.punctSosire}`,
                      oraPlecare: `${this.state.oraPlecare}`,
                      durata: `${this.state.durata}`,
                      gradDeAglomerare: `${this.state.gradDeAglomerare}`,
                      observatii: `${this.state.observatii}`,
                      satisfactie: `${this.state.newRating}`
                    })
                  })

                  
                    console.log(this.state.isOk)
                    return <App username={this.props.userId}/>
            }
            


            return(
                <div className="container">
                    <h1>Add experience</h1>

<form>
Transport type:
<select  value={this.state.typeTransport} onChange={this.modifyType} >
            <option name="typeTransport" value="Bus">Bus</option>
            <option value="Metro" name="typeTransport">Metro</option>
            <option value="Tram" name="typeTransport">Tram</option>
            
          </select><br></br>
Number Bus:
<input type="number" name="numberBus"
value={this.state.numberBus}
required
onChange={this.handleChange}></input><br></br>
Leaving point:
<input type="text" name="punctPlecare"
value={this.state.punctPlecare}
            required
onChange={this.handleChange}></input><br></br>
Ending point:
<input type="text" name="punctSosire"
value={this.state.punctSosire}
            
onChange={this.handleChange}></input><br></br>
Hour of leaving:
<input type="time" name="oraPlecare"
value={this.state.oraPlecare}
required   
onChange={this.handleChange}></input><br></br>
Duration:
<input type="number" name="durata"
value={this.state.durata}
required
onChange={this.handleChange}></input><br></br>
Fullness:
<select value={this.state.gradDeAglomerare} onChange = {this.modifyGrad} >
            <option value="Empty">Empty</option>
            <option value="Busy ">Busy</option>
            <option value="Very Busy">Very Busy</option>
            
          </select><br></br>
Observations:
<input type="text" 
value={this.state.observatii}
name='observatii'            
onChange={this.handleChange}></input><br></br>
<Box component="fieldset" mb={3} borderColor="transparent">
        <Typography component="legend">Preference</Typography>
        <Rating
          name="size-large"
          defaultValue={5}
          value={this.state.newRating}
          onChange={this.onChange}
          IconContainerComponent={IconContainer}
          size="large"
        />
      </Box>
      <button type="button" onClick={this.handleClick}>Add value</button>
      
</form>

                </div>
            )


        }


}

export default AddData