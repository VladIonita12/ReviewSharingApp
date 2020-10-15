const express = require("express")

const bodyParser = require("body-parser")
const Sequelize = require("sequelize")

const cors = require("cors")

const sequelize = new Sequelize('proiect_db2', 'app', 'welcome123', {
    dialect: 'mysql'
})


let User = sequelize.define('userdata', {
    userName:{
        type: Sequelize.STRING,
        allowNull: false
    },
    password:{
        type: Sequelize.STRING,
        allowNull: false
    }
        
    
})


let Transport = sequelize.define('transport',{
    typeTransport : {
         type:Sequelize.ENUM,
        
        values: ["Bus", "Metro","Tram"]
       
    },
    numberBus : {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate:{
            isInt : true
           
        }
    },
    punctPlecare:{
        type: Sequelize.STRING
    },
    punctSosire:{
        type:Sequelize.STRING},
 oraPlecare:{
        type:Sequelize.TIME
    },
    durata:{
        type:Sequelize.INTEGER
    },
    gradDeAglomerare:{
        type:Sequelize.ENUM,
        
        values: ['Empty', "Busy","Very Busy"]
    },
    observatii:{
        type: Sequelize.STRING
    },
    satisfactie:{
        type: Sequelize.INTEGER
    }
})

// let Experience = sequelize.define('experience',{
//     name : {
//         type: Sequelize.STRING,
//         allowNull : false,
//         validate:{
//             len:[5,20]
//         }
//     },
//     oraPlecare:{
//         type:Sequelize.TIME
//     },
//     durata:{
//         type:Sequelize.TIME
//     },
//     gradDeAglomerare:{
//         type:Sequelize.ENUM,
//         allowNull: false,
//         values: ['AGLOMERAT', "FOARTE AGLOMERAT","LIBER"]
//     },
//     observatii:{
//         type: Sequelize.STRING
//     },
//     satisfactie:{
//         type: Sequelize.INTEGER
//     }
    
    
// })

User.hasMany(Transport)
//Transport.belongsTo(User, {foreignKey: 'userName'})
//Transport.hasMany(Experience)
//Experience.belongsTo(Transport)

const app = express()
app.use(cors())
app.use(bodyParser.json())
app.post('/sync', async(req,res, next)=>{
    try{
        await sequelize.sync({force:true})
        res.status(201).json({message:'created'})
        
        
    }
    catch(err){
        next(err)
        
        
    }
    
    
})

app.get('/userdata', async(req,res,next)=>{
     try{
        let users = await User.findAll()
        res.status(200).json(users)
        
        
    }
    catch(err){
        next(err)
        
        
    }
    
})

app.post('/userdata', async(req,res,next)=>{
     try{
        await User.create(req.body)
        res.status(201).json({message:'created'})
        
        
    }
    catch(err){
      
        next(err)
        
    }
})

app.get('/userdata/transports', async(req,res,next)=>{
     try {
   var userData = await Transport.findAll();

//res.status(200).json({message:'pf'})
  res.status(200).json(userData)


       
        
    } catch (err) {
        next(err)
    }
    
        
    
    
})

app.get('/userdata/:id', async(req,res, next)=>{
    try {
        let userdata = await User.findByPk(req.params.id)
        if(userdata){
            res.status(200).json(userdata)
        }
        else{
            res.status(404).json({message:'not found'})
        }
        
    } catch (err) {
        next(err)
    }
})
app.put('/userdata/:id', async(req,res,next)=>{
    try {
        let user = await User.findByPk(req.params.id)
        if(user){
           await user.update(req.body)
            res.status(200).json({message:'accepted'})
        }
        else{
            res.status(404).json({message:'not found'})
        }
        
    } catch (err) {
        next(err)
    }
    
})

app.delete('/userdata/:id', async(req,res,next)=>{
     try {
        let user = await User.findByPk(req.params.id)
        if(user){
           await user.destroy()
            res.status(200).json({message:'accepted'})
        }
        else{
            res.status(404).json({message:'not found'})
        }
        
    } catch (err) {
        next(err)
    }
})





app.get('/userdata/:bid/transports', async(req,res,next)=>{
     try {
        let user = await User.findByPk(req.params.bid,{include:
            [Transport]})
            if(user){
                res.status(200).json(user.transports)
                
            }
            else{
                res.status(404).json({message:'not found'})
            }
        
        
    } catch (err) {
        next(err)
    }
    
        
    
    
})

app.post('/userdata/:bid/transports',async(req,res,next)=>{
    
     try {
         let user = await User.findByPk(req.params.bid)
         if(user){
             let transport = req.body
             transport.userdatumId = user.id
             await Transport.create(transport)
             res.status(201).json({message: 'created'})
         }
         else{
             res.status(404).json({message: 'not found'})
         }
     } catch (err) {
         next(err)
     }
})


app.get('/userdata/:bid/transports/:did',async(req,res,next)=>{
    
    try {
        let user = await User.findByPk(req.params.bid)
        if(user){
            let transports = await user.getTransports({
                where: {
                id: req.params.did
                    }
                        
            })
            let transport = transports.shift()
            if(transport){
                res.status(200).json(transport)
            }
            else{
                res.status(404).json({message: 'not found'})
            }
        }
        else{
            res.status(404).json({message: 'not found'})

        }
        
    } catch (err) {
        next(err)
    }
})

app.put('/userdata/:bid/transports/:did',async(req,res,next)=>{
    try {
        let user = await User.findByPk(req.params.bid)
        if(user){
            let transports = await user.getTransports({
                where: {
                id: req.params.did
                    }
                        
            })
            let transport = transports.shift()
            if(transport){
                await transport.update(req.body,{
                    fields : ['typeTransport', 'numberBus']
                })
                res.status(202).json({message:'accepted'})
            }
            else{
                res.status(404).json({message: 'not found'})
            }
        }
        else{
            res.status(404).json({message: 'not found'})

        }
        
    } catch (err) {
        next(err)
    }
    
})
app.delete('/userdata/:bid/transports/:did',async(req,res,next)=>{
    
    try {
        let user = await User.findByPk(req.params.bid)
        if(user){
            let transports =await user.getTransports({
                where: {
                id: req.params.did
                    }
                        
            })
            let transport = transports.shift()
            if(transport){
                await transport.destroy()
                res.status(202).json({message:'accepted'})
            }
            else{
                res.status(404).json({message: 'not found'})
            }
        }
        else{
            res.status(404).json({message: 'not found'})

        }
        
    } catch (err) {
        next(err)
    }
})

// app.get('/userdata/:bid/transports/:did/experiences',async(req,res,next)=>{
    
//     try {
//           let user = await User.findByPk(req.params.bid)
//         if(user){
//             let transports = await user.getTransports({
//                 where: {
//                 id: req.params.did
//                     },
//                     include:
//             [Experience]
                        
//             })
//             let transport = transports.shift()
            
//             if(transport){
//                 res.status(200).json(transport.experiences)
                
//             }
//             else{
//             res.status(404).json({message: 'not found'})

//         }
           
//         }
//         else{
//             res.status(404).json({message: 'not found'})

//         }
        
//     } catch (err) {
//         next(err)
//     }
// })


// app.post('/userdata/:bid/transports/:did/experiences',async(req,res,next)=>{
    
//      try {
//          let user = await User.findByPk(req.params.bid)
//          if(user){
//              let transport = await Transport.findByPk(req.params.did)
//              if(transport){
//              let userExperience = req.body
//              userExperience.transportId = transport.id
//              await Experience.create(userExperience)
//              res.status(201).json({message: 'created'})
//          }
//          else{
//              res.status(404).json({message: 'not found'})
//          }
//          }    
             
//      } catch (err) {
//          next(err)
//      }
// })

// app.delete('/userdata/:bid/transports/:did/experiences/:sid',async(req,res,next)=>{
//      try {
//     let user = await User.findByPk(req.params.bid)
//         if(user){
//             let transports = await user.getTransports({
//                 where: {
//                 id: req.params.did
//                     },
//                     include:
//             [Experience]
                        
//             })
//             let transport = transports.shift()
            
//             if(transport){
//                 let experience = await Experience.findByPk(req.params.sid)
//                 await experience.destroy();
//                 res.status(202).json({message:'accepted'})
                
//             }
//             else{
//             res.status(404).json({message: 'not found'})

//         }
           
//         }
//         else{
//             res.status(404).json({message: 'not found'})

//         }
// } catch (err) {
//         next(err)
//     }
// })

// app.put('/userdata/:bid/transports/:did/experiences/:sid',async(req,res,next)=>{
//     try {
//          let user = await User.findByPk(req.params.bid)
//         if(user){
//             let transports = await user.getTransports({
//                 where: {
//                 id: req.params.did
//                     },
//                     include:
//             [Experience]
                        
//             })
//             let transport = transports.shift()
            
//             if(transport){
//                 let experience = await Experience.findByPk(req.params.sid)
//                 if(experience){
//                 await experience.update(req.body,{
//                     fields : ['name','satisfactie',' oraPlecare', 'gradDeAglomerare']
//                 })
//                 res.status(202).json({message:'accepted'})
                
//             }
//             else{
//             res.status(404).json({message: 'not found'})

//         }
           
//         }}
//         else{
//             res.status(404).json({message: 'not found'})

//         }
        
//     } catch (err) {
//         next(err)
//     }
    
// })


app.use((err,req,res,next)=>{
      console.warn(err)
        res.status(500).json({message:"there is a problem"})
    
})
app.listen(8080)


