import {Router} from 'express';
const router = Router();

/**
 * @route GET 
 */
router.get('/health', (req, res) => {
  res.status(200).json({
    status: 'Healthy',
    message: 'Server is healthy!',
    date: new Date().toISOString(),
    method: req.method,
    service: 'Health Checker',
    protocol: req.protocol,
    
  });
});

/**
 * @route POST 
 */
router.post('/health', (req, res) => {

    const {payload} = req.body;
  res.status(200).json({
     status: 'received',
    message: 'Server is healthy!',
    date: new Date().toISOString(),
    method: req.method,
    service: 'Health Checker',
    protocol: req.protocol,
    payload,
  });
});

export default router;