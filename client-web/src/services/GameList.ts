import { store, on, provide } from "~/lib/core";
import { PlayerListChanged, PlayerList } from "./PlayerList";
import { Api } from "./Api";

export type GameItem = {
  appid: string;
  name: string;
  icon: string;
}

export class GameList {
  @provide playerList: PlayerList;
  @provide api: Api;
  @store list: GameItem[] = [];

  @on(PlayerListChanged)
  public async fetch() {
    const steamids = this.playerList.getEnabledList().map(({ steamid }) => steamid);
    this.list = await this.api.getGamesBySteamIds(steamids);
  }

  getList() {
    return this.list;
  }

  isEmpty() {
    return this.list.length === 0;
  }
}
