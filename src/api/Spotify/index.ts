import client from "./client";
import qs from "qs";

const getSearch = (q: string, token: string) =>
  client.get(
    `/search?${qs.stringify({
      q,
      type: "track",
      market: "KR",
      limit: 20,
      offset: 0,
    })}`,
    {
      headers: {
        authorization: `Bearer ${token}`,
      },
    }
  );

const SpotifyAPI = {
  getSearch,
};

export default SpotifyAPI;
