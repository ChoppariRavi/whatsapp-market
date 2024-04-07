import mongoose from "mongoose";

let cachedDb: any = null;

export async function connectToDatabase() {
  if (cachedDb) {
    return cachedDb;
  }

  const uri = "mongodb+srv://admin:admin@gps.xtfmmlv.mongodb.net/whatcafe";
  const options: any = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };

  const db = await mongoose.connect(uri, options);
  cachedDb = db;
  return db;
}
