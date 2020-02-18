import initialData from "./PlayerList/initial-data.json";

export type PlayerItem = {
  steamid: string;
  url: string;
  enabled: boolean;
}

export class PlayerList {
  private list: PlayerItem[];

  constructor() {
    this.list = initialData.slice();
  }

  public getList() {
    return this.list;
  }

  public addPlayer(player: PlayerItem) {
    this.list.push(player);
  }
}
