import swaggerUi from "swagger-ui-express";
import YAML from "yamljs";
import path from "path";

const swaggerDocument = YAML.load(path.resolve("src", "swagger.yaml"));

export default (app) => {
  app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
};
