import { Router } from 'express';
const router = Router();
import {getTodos, createTodo, updateTodo, deleteTodo} from '../controller/todoController.js';

router.get('/', getTodos);
router.post('/create', createTodo);
router.patch('/up/:id', updateTodo);
router.delete('/del/:id', deleteTodo);