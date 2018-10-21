// npm packages
const {
    validate
  } = require('jsonschema');
  const mongoose = require('mongoose');
  // app imports
  const Order = require('../models/order.model');
  const 
    ErrorHandler
   = require('../middleware/errorHandler');
  const paginationHandler = require('../middleware/paginationHandler');
  const {
    newOrderSchema,
    updateOrderSchema
  } = require('../schemas');
  var distance = require('google-distance');
  // google distance api key
  const {
    google_maps_key
  } = require('../config/config');
  // set api key in api instance
  distance.apiKey = google_maps_key;
  
  /**
   * Validate the POST request body and create a new Order
   */
  async function createOrder(request, response, next) {
    const validation = validate(request.body, newOrderSchema);
    if (!validation.valid) {
      return next(
        new ErrorHandler(
          500,
          "INVALID_REQUEST_BODY:"+validation.errors[0].instance+" is "+validation.errors[0].message
        )
      );
    }
  
    try {
      const totalDistance = await getDistance(request);
      const orderData = {
        id: mongoose.Types.ObjectId(),
        distance: totalDistance.distance,
        status: "UNASSIGN",
        origin: request.body.origin,
        destination: request.body.destination
      }
  
      const newOrder = await Order.createOrder(new Order(orderData));
      return response.status(200).json({
        id: newOrder.id,
        distance: newOrder.distance,
        status: newOrder.status
      });
    } catch (err) {
      next(err);
    }
  }
  
  /**
   * Update a single order
   */
  async function updateOrder(request, response, next) {
    const {
      id
    } = request.params;
  
    const validation = validate(request.body, updateOrderSchema);
    if (!validation.valid) {
      return next(
        new ErrorHandler(
          500,
          "INVALID_REQUEST_BODY:"+validation.errors[0].instance+" is "+validation.errors[0].message
        )
      );
    }
  
    try {
      const order = await Order.updateOrder(id, request.body);
      return response.status(200).json({
        status: "SUCCESS"
      });
    } catch (err) {
      next(err);
    }
  }
    
  /**
   * List all the orders. Query params ?skip=0&limit=1000 by default
   */
  async function readOrders(request, response, next) {
    /* pagination validation */
    let limit = paginationHandler(request.query.limit, 'limit');
    let page = paginationHandler(request.query.page, 'page');
    let skip = limit * (page - 1) || 0;
    if (typeof page !== 'number') {
      return next(page);
    } else if (typeof limit !== 'number') {
      return next(limit);
    }
  
    try {
      const orders = await Order.readOrders({}, {}, skip, limit);
      console.log('orders----get====',orders);
      next(orders);
    } catch (err) {
      next(err);
    }
  }

  /**
   * Returning distance value from api
   */
  async function getDistance(request, response, next) {
    return new Promise((resolve, reject) => {
      distance.get({
          index: 1,
          origin: request.body.origin.toString(),
          destination: request.body.destination.toString()
        },
        (err, data) => {
          if (err) {
            reject(err);
          }
          resolve(data);
        });
    });
  }
  



  module.exports = {
    createOrder,
    updateOrder,
    readOrders
  };