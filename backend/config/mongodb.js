import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    // Set up connection event listeners
    mongoose.connection.on('connected', () => console.log('Database Connected'));
    mongoose.connection.on('error', (err) => console.error('Database Connection Error:', err));
    mongoose.connection.on('disconnected', () => console.log('Database Disconnected'));

    // Connect to MongoDB
    await mongoose.connect(`${process.env.MONGODB_URL}/doctorto`, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('Mongoose connection established successfully');
  } catch (error) {
    console.error('Error connecting to the database:', error.message);
    process.exit(1); // Exit the process with a failure code
  }
};

export default connectDB;
