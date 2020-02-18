import { resolve } from "~/lib/core";
import { Api } from "~/server/services/Api";

export default async (req: any, res: any) => {
  const api = resolve(Api);
  const steamids = JSON.parse(req.query.q);
  res.json(
    await api.getIntersectionMultiplayerGamesBySteamIds(steamids)
  );
};
