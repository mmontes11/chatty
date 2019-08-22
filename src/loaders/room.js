import DataLoader from "dataloader";
import { createBatch } from "../helpers/batch";
import models from "../models";

const { Room } = models;
const roomBatch = createBatch(Room);
const roomLoader = new DataLoader(roomBatch);

export default roomLoader;
