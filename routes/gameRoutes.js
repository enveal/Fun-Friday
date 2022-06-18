const express = require('express')
const router = express.Router();

const EmpModel = require('../models/employee')
// const appModel = require('../models/')

router.get('/getEmployees', async(req, res)=> {
    try{
        let employees = []
        const data= await EmpModel.find({},{"name":1, "_id": 0})
        employees= data.map(e=> e.name)
        res.status(200).json({employees})
    }
    catch(error){
        res.status(400).json({message: error.message})
    }
})

router.post('/create-team', async(req, res)=>{
    const { teamArray, teamSize, numberOfTeams } = req.body
    try{

        let [shuffledArray, teamsArray, tempData ] = [teamArray, [], []];
        if(!((shuffledArray.length)/teamSize === numberOfTeams)){
           return res.status(400).json({message: "Team is not divided correctly"})
        }

        for(let i=0; i< numberOfTeams; i++){
            for(let j=0; j< teamSize; j++){
                tempData.push(shuffledArray.splice(shuffledArray.length * Math.random() | 0, 1)[0])
            }
            teamsArray.push({[`team${i}`]:tempData})
            tempData=[]
        }
        res.status(200).json(teamsArray)
    }
    catch(error){
        res.status(400).json({message: error.message })
    }
})

module.exports = router