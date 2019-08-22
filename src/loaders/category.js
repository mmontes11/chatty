import DataLoader from "dataloader";
import { createBatch } from "../helpers/batch";
import models from "../models";

const { Category } = models;
const batchCategories = createBatch(Category);
const categoryLoader = new DataLoader(batchCategories);

export default categoryLoader;
