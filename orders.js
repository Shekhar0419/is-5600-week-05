// orders.js
const cuid = require('cuid')
const db = require('./db')

// Mongoose Order Model
const Order = db.model('Order', {
  _id: { type: String, default: cuid },
  buyerEmail: { type: String, required: true },
  products: [{
    type: String,
    ref: 'Product',
    index: true,
    required: true
  }],
  status: {
    type: String,
    index: true,
    default: 'CREATED',
    enum: ['CREATED', 'PENDING', 'COMPLETED']
  }
})

/**
 * List all orders
 */
async function list (options = {}) {
  const { offset = 0, limit = 25, productId, status } = options

  const query = {}
  if (productId) query.products = productId
  if (status) query.status = status

  return await Order.find(query)
    .sort({ _id: 1 })
    .skip(offset)
    .limit(limit)
}

/**
 * Get an order
 */
async function get (_id) {
  return await Order.findById(_id).populate('products').exec()
}

/**
 * Create an order
 */
async function create (fields) {
  const order = await new Order(fields).save()
  await order.populate('products')
  return order
}

/**
 * Edit an order (your lab requirement)
 */
async function edit (_id, change) {
  const order = await Order.findById(_id)

  Object.keys(change).forEach(key => {
    order[key] = change[key]
  })

  await order.save()
  return order
}

/**
 * Delete an order (your lab requirement)
 */
async function destroy (_id) {
  return await Order.deleteOne({ _id })
}

module.exports = {
  list,
  get,
  create,
  edit,
  destroy
}
