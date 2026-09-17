import { Router } from 'express';

const router = Router();

// In-memory subscriptions
let subscriptions = [
  {
    id: 1,
    name: 'Netflix',
    status: 'active',
    startDate: '2026-09-01',
    validityDays: 30,
    expiryDate: '2026-10-01'
  },
  {
    id: 2,
    name: 'Spotify',
    status: 'inactive',
    startDate: '2026-08-01',
    validityDays: 30,
    expiryDate: '2026-08-31'
  }
];


// GET all subscriptions
router.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    count: subscriptions.length,
    data: subscriptions
  });
});


// GET subscription by ID
router.get('/:id', (req, res) => {
  const id = Number(req.params.id);

  if (isNaN(id)) {
    return res.status(400).json({
      success: false,
      message: 'Invalid subscription ID'
    });
  }

  const subscription = subscriptions.find(sub => sub.id === id);

  if (!subscription) {
    return res.status(404).json({
      success: false,
      message: 'Subscription not found'
    });
  }

  res.status(200).json({
    success: true,
    data: subscription
  });
});


// POST - Add new subscription
router.post('/', (req, res) => {
  const {
    name,
    status,
    startDate,
    validityDays
  } = req.body;

  // Validate input
  if (!name || !status || !startDate || !validityDays) {
    return res.status(400).json({
      success: false,
      message: 'name, status, startDate and validityDays are required'
    });
  }

  // Validate status
  if (status !== 'active' && status !== 'inactive') {
    return res.status(400).json({
      success: false,
      message: 'Status must be active or inactive'
    });
  }

  // Validate validity
  if (typeof validityDays !== 'number' || validityDays <= 0) {
    return res.status(400).json({
      success: false,
      message: 'validityDays must be a positive number'
    });
  }

  // Calculate expiry date
  const start = new Date(startDate);

  if (isNaN(start.getTime())) {
    return res.status(400).json({
      success: false,
      message: 'Invalid startDate'
    });
  }

  const expiry = new Date(start);
  expiry.setDate(expiry.getDate() + validityDays);

  const newSubscription = {
    id: subscriptions.length > 0
      ? subscriptions[subscriptions.length - 1].id + 1
      : 1,
    name,
    status,
    startDate,
    validityDays,
    expiryDate: expiry.toISOString().split('T')[0]
  };

  subscriptions.push(newSubscription);

  res.status(201).json({
    success: true,
    message: 'Subscription added successfully',
    data: newSubscription
  });
});


// PUT - Update subscription
router.put('/:id', (req, res) => {
  const id = Number(req.params.id);

  if (isNaN(id)) {
    return res.status(400).json({
      success: false,
      message: 'Invalid subscription ID'
    });
  }

  const subscription = subscriptions.find(sub => sub.id === id);

  if (!subscription) {
    return res.status(404).json({
      success: false,
      message: 'Subscription not found'
    });
  }

  const {
    name,
    status,
    startDate,
    validityDays
  } = req.body;

  if (status && status !== 'active' && status !== 'inactive') {
    return res.status(400).json({
      success: false,
      message: 'Status must be active or inactive'
    });
  }

  if (validityDays !== undefined &&
      (typeof validityDays !== 'number' || validityDays <= 0)) {
    return res.status(400).json({
      success: false,
      message: 'validityDays must be a positive number'
    });
  }

  subscription.name = name || subscription.name;
  subscription.status = status || subscription.status;
  subscription.startDate = startDate || subscription.startDate;
  subscription.validityDays =
    validityDays || subscription.validityDays;

  // Recalculate expiry date
  const start = new Date(subscription.startDate);

  if (isNaN(start.getTime())) {
    return res.status(400).json({
      success: false,
      message: 'Invalid startDate'
    });
  }

  const expiry = new Date(start);

  expiry.setDate(
    expiry.getDate() + subscription.validityDays
  );

  subscription.expiryDate =
    expiry.toISOString().split('T')[0];

  res.status(200).json({
    success: true,
    message: 'Subscription updated successfully',
    data: subscription
  });
});


// DELETE - Delete subscription
router.delete('/:id', (req, res) => {
  const id = Number(req.params.id);

  if (isNaN(id)) {
    return res.status(400).json({
      success: false,
      message: 'Invalid subscription ID'
    });
  }

  const index = subscriptions.findIndex(sub => sub.id === id);

  if (index === -1) {
    return res.status(404).json({
      success: false,
      message: 'Subscription not found'
    });
  }

  const deletedSubscription = subscriptions.splice(index, 1);

  res.status(200).json({
    success: true,
    message: 'Subscription deleted successfully',
    data: deletedSubscription[0]
  });
});


export default router;