import client from "./client";

const BASEPATH = "/auth";

export const getToken = () => client.get(`${BASEPATH}/token`);
