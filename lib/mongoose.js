import mongoose from 'mongoose';

const connectDatabase = handler => async (req, res) => {
  if (mongoose.connections[0].readyState !== 1) {
    try {
      await mongoose.connect(process.env.MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true,
      });
    } catch (err) {
      console.log(error);
    }
  }
  return handler(req, res);
};

const db = mongoose.connection;

db.once('open', () => {
  console.log('Connected to mongo');
});

export default connectDatabase;
