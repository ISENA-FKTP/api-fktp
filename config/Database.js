import { Sequelize } from "sequelize";
import { Connector } from "@google-cloud/cloud-sql-connector";

const connector = new Connector();

const clientOpts = await connector.getOptions({
  instanceConnectionName: "caklalapar:asia-southeast2:akusehat",
  ipType: "PUBLIC",
});

// const db = new Sequelize("apiisena_db", "root", "", {
//   host: "localhost",
//   dialect: "mysql",
// });

const db = new Sequelize({
  dialect: "mysql",
  username: "akusehat",
  password: "1234567akusehat",
  database: "general",
  dialectOptions: {
    ...clientOpts,
  },
});

await db.authenticate();

export default db;

// import { Sequelize } from "sequelize";

// const { DB_HOST, DB_USERNAME, DB_PASSWORD, DB_DBDATABASE } = process.env;

// const db = new Sequelize(DB_DBDATABASE, DB_USERNAME, DB_PASSWORD, {
//   host: DB_HOST,
//   dialect: "mysql",
// });

// export default db;
