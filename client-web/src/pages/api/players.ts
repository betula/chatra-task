const list = [{
  steamid: "76561197993331235",
  url: "https://steamcommunity.com/id/gwellir",
  enabled: true
}, {
  steamid: "76561198081942812",
  url: "https://steamcommunity.com/id/molotoko",
  enabled: true
}, {
  steamid: "76561198039833219",
  url: "https://steamcommunity.com/id/Tryr",
  enabled: false
}];

export default (_req: any, res: any) => {
  res.status(200).json(list);
};
