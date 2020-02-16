import { store, listen, provide } from "~/lib/core";
import { PlayerListChanged, PlayerList } from "./PlayerList";
import { fetchJson } from "~/lib/fetchJson";

export type GameItem = {
  appid: string;
  name: string;
}

export class GameList {
  @provide playerList: PlayerList;
  @store list: GameItem[] = [];

  @listen(PlayerListChanged)
  public async fetch() {
    const steamids = this.playerList.getEnabledList().map(({ steamid }) => steamid);
    if (steamids.length === 0) {
      this.list = [];
      return;
    }
    this.list = await fetchJson("/api/games?steamids=" + steamids.join(","));
  }

  getList() {
    return this.list;
  }

  isEmpty() {
    return this.list.length === 0;
  }
}
