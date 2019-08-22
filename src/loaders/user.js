import DataLoader from "dataloader";
import { createBatch } from "../helpers/batch";
import models from "../models";

const { User } = models;
const userBatch = createBatch(User);
const userLoader = new DataLoader(userBatch);

export default userLoader;
