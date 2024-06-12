import express from "express";
import  exampleController from "../controller/example.controller"

// import { paginate } from '../middleware/pagination';
// import { search } from '../middleware/search';
// import { sort } from '../middleware/sort';
// import { filter } from '../middleware/filter';

// for only one route 
const route = express.Router()

const router = route.get('/examples', [paginate, search, sort, filter], exampleController.getAll);


export default router


