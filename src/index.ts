import express from "express";
import mongoose, { ConnectOptions } from "mongoose";
import dotenv from "dotenv";
import routes from "./routes/index.routes";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const _conString = `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASS}@cluster0.3pxkivu.mongodb.net/${process.env.MONGODB_NAME}`;
mongoose
  .connect(_conString!, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  } as ConnectOptions)
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => console.error("MongoDB connection error:", error));

app.use(express.json());
app.use("/api", routes);

export default app;
