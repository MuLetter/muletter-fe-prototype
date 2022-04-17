import client from "./client";

const BASEPATH = "/mailbox";

export const getMailBoxes = () => client.get(`${BASEPATH}`);
export const getMail = (id: string) => client.get(`${BASEPATH}/${id}`);
