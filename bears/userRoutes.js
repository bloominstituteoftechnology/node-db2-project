const knex=require('knex');
const dbConfig=require('../knexfile');
const db = knex(dbConfig.development);
const express=require('express');
const router=express.Router();

router.get('/',(req,res)=>{
    db('bears')
      .select('name')
      .then(bears=>res.status(200).json(bears))
      .catch(err=>res.status(500).json(err));
  })
router.post('/',(req,res)=>{
    const bear=req.body;
    db
      .insert(bear)
      .into('bears')
      .then(id=>res.status(201).json(id))
      .catch(err=>res.status(500).json(err));
  })
router.get('/:id',(req,res)=>{
    db('bears')
      .where({'id':req.params.id})
      .then(row=>res.status(200).json(row))
      .catch(err=>res.status(500).json(err));
  })
router.delete('/:id',(req,res)=>{
    db('bears')
      .where({'id':req.params.id})
      .del()
      .then(count=>res.status(200).json(count))
      .catch(err=>res.status(500).json(err));
  })
router.put('/id',(req,res)=>{
    const bear=req.body;
    db('bears')
      .where({'id':req.params.id})
      .update(bear)
      .then(count=>res.status(200).json(count))
      .catch(err=>res.status(500).json(err));
  })
  
module.exports=router;