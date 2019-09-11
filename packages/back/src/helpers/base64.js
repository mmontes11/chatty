export const encode = string => Buffer.from(string).toString("base64");

export const decode = string => Buffer.from(string, "base64").toString("ascii");
