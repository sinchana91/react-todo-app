import express from 'express';
import Todo from '../models/Todo.js';
import mongoose from 'mongoose';
//get all todos
const getTodos = async (req, res) => {
    try {
        const todos = await Todo.find();
        res.status(200).json(todos);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

//create a todo
const createTodo = async (req, res) => {
    const todo = req.body;
    const newTodo = new Todo(todo);
    try {
        await newTodo.save();
        res.status(201).json(newTodo);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

//update a todo
const updateTodo = async (req, res) => {
    try{
    const { id: _id } = req.params;
    const todo = req.body;
    if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No todo with that id');
    const updatedTodo = await Todo.findByIdAndUpdate(_id, { ...todo, _id }, { new: true });
    res.status(200).json(updatedTodo);
    }
    catch(error){
        res.status(404).json({ message: error.message });
    }
}

//delete a todo
const deleteTodo = async (req, res) => {
    try {
      const { id } = req.params;
      
      // Check if the ID is a valid Mongoose Object ID
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).send('No todo with that id');
      }
  
      // Attempt to find and remove the todo item
      const deletedTodo = await Todo.findByIdAndDelete(id);
  
      // Check if a todo item was actually deleted
      if (!deletedTodo) {
        return res.status(404).send('Todo not found');
      }
  
      res.status(200).json({ message: 'Todo deleted successfully' });
    } catch (error) {
        console.log(error);
      res.status(500).json({ message: error.message });
    }
  };

export {getTodos, createTodo, updateTodo, deleteTodo};