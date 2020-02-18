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

  public setPlayerEnabled(steamid: string, enabled: boolean) {
    for (const player of this.list) {
      if (player.steamid === steamid) {
        player.enabled = enabled;
      }
    }
  }

  public removePlayer(steamid: string) {
    this.list = this.list.filter((player) => steamid !== player.steamid);
  }

  public hasPlayer(steamid: string) {
    return this.list.some((player) => player.steamid === steamid);
  }

}
