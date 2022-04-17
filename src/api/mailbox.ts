import client from "./client";

const BASEPATH = "/mailbox";

export const getMailBoxes = () => client.get(`${BASEPATH}`);
export const getMail = (id: string) => client.get(`${BASEPATH}/${id}`);
export const postMailBox = (formData: FormData) =>
  client.post(`${BASEPATH}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
