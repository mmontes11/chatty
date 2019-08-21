import DataLoader from "dataloader";
import { createBatch } from "./batch";
import models from "../models";

const { User, Category } = models;
const batchUsers = createBatch(User);
const batchCategories = createBatch(Category);
const user = new DataLoader(batchUsers);
const category = new DataLoader(batchCategories);

export default { user, category };
