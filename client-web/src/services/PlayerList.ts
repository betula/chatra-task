import { store, action, listen } from "~/lib/core";
import { fetchJson } from "~/lib/fetchJson";

export const RemovePlayerItem = action();
export const TogglePlayerItem = action();

export type PlayerItem = {
  steamid: string;
  url: string;
  enabled: boolean;
}

export class PlayerList {
  @store list: PlayerItem[] = [];

  public async prefetch() {
    const list = await fetchJson("/api/players");
    for (const item of list) {
      this.append(item);
    }
  }

  public append(item: PlayerItem) {
    this.list = [ ...this.list, item ];
  }

  @listen(RemovePlayerItem)
  public remove(item: PlayerItem) {
    this.list = this.list.filter((_item) => item !== _item);
  }

  @listen(TogglePlayerItem)
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

  public isEmpty() {
    return this.list.length === 0;
  }
}
