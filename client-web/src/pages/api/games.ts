import fetch from "isomorphic-unfetch";

export default async (_req: any, _res: any) => {
  const steamids = _req.query.steamids.split(",");

  const res = await fetch("http://127.0.0.1:2020/intersection/multiplayer?steamids=" + JSON.stringify(steamids));
  const data = await res.json();

  _res.json(data.games);
};
