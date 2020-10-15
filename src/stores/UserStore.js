import {EventEmitter} from 'fbemitter'
const SERVER = 'http://3.138.181.35:8080'

class UserStore{
    
    constructor(){
        this.users = []
        this.emitter = new EventEmitter()
        
    }
    async getUsers(){
        try{
            let response = await fetch(`${SERVER}/userdata`)
            let data = await response.json()
            this.users = data
            this.emitter.emit('GET_USERS_SUCCESS')
        }
        catch(err){
            console.log(err)
            this.emitter.emit('GET_USERS_ERROR')
        }
    }
    
    async addUser(user){
        try{
            
            
            await fetch(`${SERVER}/userdata`, {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(user)
                
            })
            this.getUsers()
            
        }
        catch(err){
            console.warn(err)
            this.emitter.emit("ADD_USER_ERROR")
        }
    }
    
    async deleteUser(id){
         try{
            
            
            await fetch(`${SERVER}/userdata/${id}`, {
                method: 'delete'
                
                
            })
            this.getUsers()
            
        }
        catch(err){
            console.warn(err)
            this.emitter.emit("DELETE_USER_ERROR")
        }
    }
    
    async updateBus(id, user){
        try{
            
            
            await fetch(`${SERVER}/userdata/${id}`, {
                method: 'put',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(user)
                
            })
            this.getUsers()
            
        }
        catch(err){
            console.warn(err)
            this.emitter.emit("UPDATE_USER_ERROR")
        }
    }
    
}

export default UserStore