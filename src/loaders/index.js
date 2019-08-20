import DataLoader from "dataloader";
import { batchUsers } from "./user";
import models from "../models";

const user = new DataLoader(keys => batchUsers(keys, models));

export default { user };
