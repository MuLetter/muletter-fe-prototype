import { GetMailBoxQuery } from "../store/mailbox/types";
import client from "./client";
import qs from "qs";

const BASEPATH = "/mailbox";

export const getMailBoxes = () => client.get(`${BASEPATH}`);
export const getMail = (q: GetMailBoxQuery) =>
  client.get(`${BASEPATH}/${q.id}?${qs.stringify(q.query)}`);
export const postMailBox = (formData: FormData) =>
  client.post(`${BASEPATH}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
