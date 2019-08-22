import DataLoader from "dataloader";
import { createBatch } from "../helpers/batch";
import models from "../models";

const { User } = models;
const userCategories = createBatch(User);
const userLoader = new DataLoader(userCategories);

export default userLoader;
