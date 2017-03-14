var User = require('../models/user');
var express = require('express');
var router = express.Router();
var moment = require('moment-timezone');
var Todo = require('../models/todolist');


router.post('/addtodo', (req,res)=>{
    User.findById(req.body.user, (err, user)=>{
        if(!req.user){
            return res.json({
                success: false,
                title: 'Unauthorized'
            });
        }
        if(!user || err){
             return res.json({
                success: false,
                title: 'Error',
                response: 'Error occured'
            });
        }
        console.log("user found");
        console.log(user);
        const todo = new Todo({
            name: req.body.name,
            user: user,
            createDate: req.body.createDate,
        });
        todo.save((err,todo)=>{
            if(err){
                console.log("onerror save");
                console.log(err)
               res.json({
                    success: false,
                    title: 'Error',
                    response: err.errors.name.message
                });
                return; 
            }
            user.mytodo.push(todo);
            user.save();
            console.log("success");
            res.status(201).json({
                success:true,
                title: 'Success',
                response: todo
            });
        });
    });
});

router.patch('/:id/:field/:value', (req, res)=>{
    Todo.findById(req.params.id, (err, todo)=>{
        if(err){
            return res.json({
                success:false,
                response: 'Error occured'
            });
        }
        if(!req.user){
            return res.json({
                success:false,
                response: 'User not found'
            })
        }
        if(!todo){
            return res.json({
                success:false,
                reponse: 'Todo not found'
            });
        }
        console.log(req.params.value);
        todo[req.params.field]=req.params.value;
        todo.save((err, todo)=>{
            if(err){
                return res.json({
                    success:false,
                    response: 'Error occured!'
                })
            }
            res.json({
                success:true,
                response: todo
            });
        });

    });
});

router.delete('/:id',(req,res)=>{
    Todo.findById(req.params.id,(err,todo)=>{
        if(err){
           return res.json({
                success: false,
                title: 'Error',
                response: 'Error occured'
            });
        }
        if(!todo){
            return res.json({
                success: false,
                title: 'Error',
                response: 'Todo not found'
            });
        }
        if(!req.user){
            return res.json({
               success:false,
               title: 'Error',
               response: 'Unauthorized' 
            })
        }
        todo.remove((err,todo)=>{
            if(err){
                return res.json({
                    success: false,
                    title: 'Error',
                    response: 'Error occured'
                }); 
            }
            res.status(200).json({
                success: true,
                title: 'Success',
                response: todo
            });
        });
    });
});

router.delete('/delAllComplete/:id', (req,res)=>{
    console.log("here");
    Todo.find((err,mytodo)=>{
        if(err){
            return res.json({
                success:false,
                response: 'Error occured'
            });
        }
        if(!req.user){
            return res.json({
                success:false,
                response: 'Unauthorized'
            });
        }
        mytodo.map((todo, index)=>{
            if(todo.user.toString()===req.params.id && todo.isCompleted === true){
                todo.remove(err=>{
                    if(err){
                        return res.json({
                            success:false,
                            response: 'Error occured'
                        });
                    }
                    if(!req.user){
                        return res.json({
                            success:false,
                            response: 'Unauthorized'
                        });
                    }
                });
            }
        });
        res.json({
            success:true
        });
    });
});

module.exports = router;