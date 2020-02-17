import { store, action, on, dispatch } from "~/lib/core";
import { fetchJson } from "~/lib/fetch";

export const RemovePlayerItem = action();
export const TogglePlayerItem = action();
export const PlayerListChanged = action();

export type PlayerItem = {
  steamid: string;
  url: string;
  enabled: boolean;
}

export class PlayerList {
  @store store: PlayerItem[] = [];

  private set list(list: PlayerItem[]) {
    if (list === this.store) return;
    this.store = list;
    dispatch(PlayerListChanged);
  }
  private get list() {
    return this.store;
  }

  public async fetch() {
    this.list = await fetchJson("/api/players");
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

  public isEmpty() {
    return this.list.length === 0;
  }
}
