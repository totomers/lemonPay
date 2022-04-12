// import { Handler, Context } from "aws-lambda";
// import dotenv from "dotenv";
// import path from "path";
// const dotenvPath = path.join(
//   __dirname,
//   "../",
//   `config/.env.${process.env.NODE_ENV}`
// );
// dotenv.config({
//   path: dotenvPath,
// });

// import { Business } from "./models";
// import { BusinessesController } from "./controllers/business.controller";
// const businessesController = new BusinessesController(Business);

// export const create: Handler = (event: any, context: Context) => {
//   return businessesController.create(event, context);
// };

// export const update: Handler = (event: any) =>
//   businessesController.update(event);

// export const getAll: Handler = () => businessesController.getAll();

// export const getOneById: Handler = (event: any, context: Context) => {
//   return businessesController.findOne(event, context);
// };

// export const deleteOneById: Handler = (event: any) =>
//   businessesController.deleteOne(event);
