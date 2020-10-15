import {EventEmitter} from 'fbemitter'
const SERVER = 'http://3.138.181.35:8080'

class TransportStore{
    
    constructor(){
        this.transports = []
        this.emitter = new EventEmitter()
        
    }
    async getTransports(){
        try{
            let response = await fetch(`${SERVER}/userdata/transports`)
            let data = await response.json()
            this.transports = data
            this.emitter.emit('GET_TRANSPORTS_SUCCESS')
        }
        catch(err){
            console.log(err)
            this.emitter.emit('GET_TRANSPORTS_ERROR')
        }
    }
    
    async addTransport(userID, transport){
        try{
            
            
            await fetch(`${SERVER}/userdata/${userID}/transports`, {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(transport)
                
            })
            this.getTransports()
            
        }
        catch(err){
            console.warn(err)
            this.emitter.emit("ADD_TRANSPORTS_ERROR")
        }
    }
    
    async deleteTransport(userID, transportID){
         try{
            
            
            await fetch(`${SERVER}/userdata/${userID}/transports/${transportID}`, {
                method: 'delete'
                
                
            })
            this.getTransports()
            
        }
        catch(err){
            console.warn(err)
            this.emitter.emit("DELETE_TRANSPORTS_ERROR")
        }
    }
    
    async updateTransport(userID, transportID, transport){
        try{
            
            
            await fetch(`${SERVER}/userdata/${userID}/transports/${transportID}`, {
                method: 'put',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(transport)
                
            })
            this.getTransports()
            
        }
        catch(err){
            console.warn(err)
            this.emitter.emit("UPDATE_TRANSPORTS_ERROR")
        }
    }
    
}

export default TransportStore