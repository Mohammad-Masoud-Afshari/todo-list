const router = require('express').Router();
const todoTask = require('../models/todoItems');


//add
router.post('/api/item', async (req, res)=>{
  try{
    const newTask = new todoTask({
      item: req.body.item
    })
    const save = await newTask.save()
    res.status(200).json(save);
  }catch(err){
    res.json(err);
  }
})

router.get('/api/items', async (req, res)=>{
  try{
    const allTasks = await todoTask.find({});
    res.status(200).json(allTasks)
  }catch(err){
    res.json(err);
  }
})


//edit
router.put('/api/item/:id', async (req, res)=>{
  try{
    const editTask = await todoTask.findByIdAndUpdate(req.params.id, {$set: req.body});
    res.status(200).json(editTask);
  }catch(err){
    res.json(err);
  }
})


//delete
router.delete('/api/item/:id', async (req, res)=>{
  try{
    const deleteTask = await todoTask.findByIdAndDelete(req.params.id);
    res.status(200).json('Task Deleted');
  }catch(err){
    res.json(err);
  }
})

module.exports = router;