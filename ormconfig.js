const dotEnv = require("dotenv");

dotEnv.config({
   path: process.env.ENVIRONMENT === "production" ? ".env" : "stage.env"
});

const environment = process.env.ENVIRONMENT;

let rootFolder;
let filesExtension;

if(environment === "production") {
   rootFolder = "build/infra/database";
   filesExtension = ".js";
} else {
   rootFolder = "src/infra/database";
   filesExtension = ".ts";
}

const entitiesPathManager = {
   getDir() {
      return `${rootFolder}/models`;
   },
   getPath() {
      return `${rootFolder}/models/**/*${filesExtension}`;
   }
};

const migrationsPathManager = {
   getDir() {
      return `${rootFolder}/migrations`;
   },
   getPath() {
      return `${rootFolder}/migrations/**/*${filesExtension}`;
   }
};


module.exports = {
   type: process.env.DB_TYPE || "postgres",
   host: process.env.DB_HOST || "localhost",
   port: process.env.DB_PORT || 5432,
   username: process.env.DB_USERNAME || "userAdmin",
   password: process.env.DB_PASSWORD || "123",
   database: process.env.DB_NAME || "userCA",
   entities: [
      entitiesPathManager.getPath()
   ],
   migrations: [
      migrationsPathManager.getPath()
   ],
   cli: {
      "entitiesDir": entitiesPathManager.getDir(),
      "migrationsDir": migrationsPathManager.getDir()
   }
};