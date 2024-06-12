import { Request, Response, Router } from 'express';
import { exampleController } from '../controllers/exampleController';
import { exampleValidator , exampleValidator2} from '../utils/validator';
import { validateBody } from '../middleware/validateBody';
import { cacheMiddleware } from '../middleware/cache';
import { complexQuery } from '../middleware/complexQuery';
import { sanitize } from '../middleware/sanitize';


const router = Router();

router.post('/example', sanitize(), validateBody(exampleValidator2), exampleValidator, exampleController.createExample.bind(exampleController));
router.get('/example',complexQuery,  cacheMiddleware, exampleController.getExamples.bind(exampleController));


// model 
// const Store = sequelize.define('store', {
//   name: {
//     type: Sequelize.STRING,
//     allowNull: false
//   },
//   ip: {
//     type: Sequelize.STRING,
//     allowNull: false
//   },
//   latitude: {
//     type: Sequelize.FLOAT,
//     allowNull: false
//   },
//   longitude: {
//     type: Sequelize.FLOAT,
//     allowNull: false
//   }
// });


router.post('/api/store', async (req: Request, res: Response) => {
  const { name, latitude, longitude } = req.body;
  const ip = req.ip;

  try {
    const store = await Store.create({ name, ip, latitude, longitude });
    res.status(201).json(store);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/api/stores', async (req: Request, res: Response) => {
  try {
    const stores = await Store.findAll();
    res.status(200).json(stores);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

export default router;
