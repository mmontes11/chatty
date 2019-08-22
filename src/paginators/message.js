import { createCursorPaginator } from "../helpers/pagination";
import models from "../models";

const { Message } = models;
const message = createCursorPaginator(Message, "createdAt");

export default message;
