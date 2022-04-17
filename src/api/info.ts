import client from "./client";

const BASEPATH = "/info";

export const getMainData = () => client.get(`${BASEPATH}/data`);
