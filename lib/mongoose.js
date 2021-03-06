import mongoose from 'mongoose';

const connectDatabase = handler => async (req, res) => {
  if (mongoose.connections[0].readyState !== 1) {
    try {
      console.log(`Connecting to ${process.env.MONGO_URL}`);
      await mongoose.connect(process.env.MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true,
        serverSelectionTimeoutMS: 5000,
      });
    } catch (err) {
      console.log(err);
    }
  }
  return handler(req, res);
};

const db = mongoose.connection;

db.once('open', () => {
  console.log('Connected to mongo');
});

export default connectDatabase;
