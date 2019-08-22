import DataLoader from "dataloader";
import { createBatch } from "../helpers/batch";
import models from "../models";

const { Category } = models;
const categoryBatch = createBatch(Category);
const categoryLoader = new DataLoader(categoryBatch);

export default categoryLoader;
