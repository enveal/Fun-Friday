const express = require('express')
const Model = require('../models/employee');

const router = express.Router()

router.post('/add', async (req, res) => {
    const { name, gender } = req.body;
    const data= new Model({
        name,gender
    })
    try{
        const dataToSave = await data.save();
        res.status(200).json(dataToSave);
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
})

router.post('/addAll', async (req,res) => {
    const dataToPush = req.body.entries;
    try{
        const dataToSave= await Model.collection.insert(dataToPush)
        res.status(200).json(dataToSave);
    }
    catch(error){
        res.status(400).json({ message: error.message })
    }
})

router.get('/getAll', async (req,res) => {
    try{
        const dataToGet= await Model.find()
        res.status(200).json(dataToGet);
    }
    catch(error){
        res.status(400).json({ message: error.message })
    }
})




module.exports = router