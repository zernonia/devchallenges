import { Connection, createConnection } from "mongoose";

let conn: Connection = null;

const uri: string = process.env.MONGO_URL;

export const getConnection = async (): Promise<Connection> => {
  if (conn == null) {
    conn = await createConnection(uri, {
      bufferCommands: false,
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
  }

  return conn;
};