const { users } = require('./data/users');
const { products } = require('./data/products');
const User = require('./models/userModel');
const Product = require('./models/productModel');
const Order = require('./models/orderModel');
const { connectDB } = require('./config/db');
const colors = require('colors');

// Connect to the database
connectDB();

const importData = async () => {
  try {
    // Clear existing collections
    await Order.deleteMany();
    await User.deleteMany();
    await Product.deleteMany();

    console.log('Existing data destroyed!'.yellow.inverse);

    // Insert new users
    const createdUsers = await User.insertMany(users);
    console.log(`Users inserted: ${createdUsers.length}`.green.inverse);

    // Pick the first user as admin
    const adminUser = createdUsers[0]._id;

    // Map products to add admin user as the creator
    const sampleProducts = products.map((product) => {
      return { ...product, user: adminUser };
    });

    // Insert new products
    const createdProducts = await Product.insertMany(sampleProducts);
    console.log(`Products inserted: ${createdProducts.length}`.green.inverse);

    console.log('Data Imported Successfully!'.green.bold);
    process.exit();
  } catch (error) {
    console.error(`Error: ${error.message}`.red.inverse);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    // Clear existing collections
    await Order.deleteMany();
    await User.deleteMany();
    await Product.deleteMany();

    console.log('Data Destroyed!'.red.bold);
    process.exit();
  } catch (error) {
    console.error(`Error: ${error.message}`.red.inverse);
    process.exit(1);
  }
};

// Process arguments: if -d is passed, destroy data, else import data
if (process.argv[2] === '-d') {
  destroyData();
} else {
  importData();
}

// Handle unhandled promise rejections
process.on('unhandledRejection', (reason, promise) => {
  console.log('Unhandled Rejection at:', promise, 'reason:', reason);
  process.exit(1);
});
