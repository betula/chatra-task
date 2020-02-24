import { store, action, on, dispatch, provide, subscribe } from "~/lib/core";
import { Api } from "./Api";
import { NewPlayerAdded } from "~/entities/NewPlayer";
import { Fetcher } from "~/entities/Fetcher";
import { PlayerItem, PlayerItemData, PlayerItemEnabledChanged } from "./PlayerList/PlayerItem";

export const EnabledPlayerListChanged = action();

export class PlayerList {
  @provide api: Api;
  @store store: PlayerItem[] = [];

  @subscribe fetcher = new Fetcher()
    .call(() => this.api.getPlayers())
    .ok((items) => this.setListData(items));

  constructor() {
    on(PlayerItemEnabledChanged, () => dispatch(EnabledPlayerListChanged));
  }

  private set list(list: PlayerItem[]) {
    if (list === this.store) return;
    this.store = list;
    dispatch(EnabledPlayerListChanged);
  }
  private get list() {
    return this.store;
  }

  @on(NewPlayerAdded)
  public async fetch() {
    await this.fetcher.exec();
  }

  public setListData(items: PlayerItemData[]) {
    this.list = items.map((i) => new PlayerItem(i));
  }

  public remove(item: PlayerItem) {
    this.list = this.list.filter((i) => item !== i);
  }

  public getList() {
    return this.list;
  }

  public getEnabledList() {
    return this.list.filter(({ enabled }) => enabled);
  }

  public getEnabledSteamIdList() {
    return this.getEnabledList().map(({ steamid }) => steamid);
  }

  public isEmpty() {
    return this.list.length === 0;
  }
}
