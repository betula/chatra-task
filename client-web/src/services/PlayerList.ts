import { store, action, on, dispatch, provide } from "~/lib/core";
import { Api } from "./Api";
import { NewPlayerAdded } from "~/entities/NewPlayer";
import { Fetcher } from "~/entities/Fetcher";

export const RemovePlayerItem = action();
export const TogglePlayerItem = action();
export const PlayerListChanged = action();

export type PlayerItem = {
  steamid: string;
  url: string;
  enabled: boolean;
}

export class PlayerList {
  @provide api: Api;
  @store store: PlayerItem[] = [];

  private fetcher = new Fetcher()
    .call(() => this.api.getPlayers())
    .ok((list) => this.list = list);

  private set list(list: PlayerItem[]) {
    if (list === this.store) return;
    this.store = list;
    dispatch(PlayerListChanged);
  }
  private get list() {
    return this.store;
  }

  @on(NewPlayerAdded)
  public async fetch() {
    await this.fetcher.exec();
  }

  public append(...items: PlayerItem[]) {
    this.list = [ ...this.list, ...items ];
  }

  @on(RemovePlayerItem)
  public remove(item: PlayerItem) {
    this.list = this.list.filter((_item) => item !== _item);
  }

  @on(TogglePlayerItem)
  public toggle(item: PlayerItem) {
    this.list = this.list.map((_item) => (item === _item)
      ? { ...item, enabled: !item.enabled }
      : _item
    )
  }

  public hasDisabled() {
    return this.list.some(({ enabled }) => !enabled);
  }

  public toggleAll() {
    if (this.hasDisabled()) {
      this.list = this.list.map((item) => (!item.enabled)
        ? { ...item, enabled: true }
        : item
      )
    } else {
      this.list = this.list.map((item) => ({ ...item, enabled: false }));
    }
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
