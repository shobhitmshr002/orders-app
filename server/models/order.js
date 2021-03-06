// npm packages
const mongoose = require("mongoose");
const constants = require("../config/constants");
// app imports
const ErrorHandler  = require("../middleware/error");

// globals
const Schema = mongoose.Schema;

const orderSchema = new Schema({
    id: String,
    distance: String,
    status: String,
    origin: Array,
    destination: Array
});

orderSchema.statics = {
    /**
   * Create a Single New Order
   */
    async createOrder(newOrder) {
        try {
            const duplicate = await this.findOne({
                id: newOrder.id
            });

            if (duplicate) {
                return response.status(500).json({
                    error: constants.errorMessages.ORDER_ALREADY_EXISTS
                });
            }

            const order = await newOrder.save();
            return order.toObject();
        } catch (err) {
            return Promise.reject(err);
        }
    },
    /**
   * Get a list of Orders
   */
    async readOrders(query, fields, skip, limit) {
        try {
            const orders = await this.find(query, fields)
                .skip(skip)
                .limit(limit)
                .exec();
            if (!orders.length) {
                return [];
            }
            return orders.map(order => order.toObject());
        } catch (err) {
            return Promise.reject(err);
        }
    },
    /**
   * PUT/Update a single Order
   */
    async updateOrder(id, orderUpdate) {
        try {
            const order = await this.findOneAndUpdate({
                id,status:"UNASSIGN"
            },{$set:{status:orderUpdate.status}},{new:false});
            if (!order) {
                throw new ErrorHandler(409, constants.errorMessages.ORDER_TAKEN_OR_NOT_FOUND);
            }
        } catch (err) {
            return Promise.reject(err);
        }
    }
};

/* Transform with .toObject to remove __v and _id from response */
if (!orderSchema.options.toObject) orderSchema.options.toObject = {};
orderSchema.options.toObject.transform = (doc, ret) => {
    const transformed = ret;
    delete transformed._id;
    delete transformed.__v;
    delete transformed.origin;
    delete transformed.destination;
    return transformed;
};

module.exports = mongoose.model("Order", orderSchema);