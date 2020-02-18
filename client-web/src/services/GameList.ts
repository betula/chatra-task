import { store, on, provide } from "~/lib/core";
import { PlayerListChanged, PlayerList } from "./PlayerList";
import { Api } from "./Api";
import { Fetcher } from "~/entities/Fetcher";

export type GameItem = {
  appid: string;
  name: string;
  icon: string;
}

export class GameList {
  @provide playerList: PlayerList;
  @provide api: Api;
  @store list: GameItem[] = [];

  private fetcher = new Fetcher()
    .call(() => this.api.getGamesBySteamIds(this.playerList.getEnabledSteamIdList()))
    .ok((list) => this.list = list);

  @on(PlayerListChanged)
  public async fetch() {
    await this.fetcher.exec();
  }

  getList() {
    return this.list;
  }

  isEmpty() {
    return this.list.length === 0;
  }
}
