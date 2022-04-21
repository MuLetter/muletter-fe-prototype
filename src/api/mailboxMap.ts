import { MapQuery } from "../store/mailBoxMap/types";
import client from "./client";
import qs from "qs";

const BASEPATH = "/map";

export const getMap = (query: MapQuery) =>
  client.get(`${BASEPATH}?${qs.stringify(query)}`);
