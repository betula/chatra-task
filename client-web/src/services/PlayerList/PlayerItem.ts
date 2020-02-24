import { provide, subscribe, store, dispatch, resolve, action } from "~/lib/core";
import { Fetcher } from "~/entities/Fetcher";
import { Api } from "../Api";
import { PlayerList } from "../PlayerList";

export type PlayerItemData = {
  steamid: string;
  url: string;
  enabled: boolean;
};

export const PlayerItemEnabledChanged = action();

export class PlayerItem {
  @provide api: Api;
  get playerList() { return resolve(PlayerList); }

  @subscribe remover = new Fetcher()
    .call(() => this.api.removePlayer(this.steamid))
    .ok(() => this.playerList.remove(this));

  @subscribe toggler = new Fetcher()
    .call(() => this.api.setPlayerEnabled(this.steamid, !this.enabled))
    .ok(({ enabled }) => this.enabled = enabled);

  @store store: PlayerItemData;

  constructor(data: PlayerItemData) {
    this.store = data;
  }

  get steamid() {
    return this.store.steamid;
  }
  get enabled() {
    return this.store.enabled;
  }
  set enabled(enabled: boolean) {
    if (this.store.enabled === enabled) return;
    this.store = {
      ...this.store,
      enabled
    }
    dispatch(PlayerItemEnabledChanged, this);
  }
  get url() {
    return this.store.url;
  }

  sendRemove() {
    if (this.remover.inProgress) return;
    this.remover.exec();
  }

  sendToggle() {
    if (this.toggler.inProgress) return;
    this.toggler.exec();
  }

  get pending() {
    return this.remover.inProgress || this.toggler.inProgress;
  }
}
