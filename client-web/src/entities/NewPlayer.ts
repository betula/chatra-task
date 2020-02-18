import { store, provide, subscribe, action, dispatch } from "~/lib/core";
import { Fetcher } from "./Fetcher";
import { Api } from "~/services/Api";

export const NewPlayerAdded = action();

export class NewPlayer {
  @provide private api: Api;
  @store private _url = "";
  @subscribe private sender = new Fetcher();

  @store public error: any = null;

  public get url() {
    return this._url;
  }
  public set url(url: string) {
    this._url = url;
    this.error = null;
  }

  private senderCallHandler = () => this.api.addPlayer(this.url);

  private senderOkHandler = (data: any) => {
    if (data.error) {
      this.error = data.error;
      return;
    }
    this.url = "";
    dispatch(NewPlayerAdded);
  };

  constructor() {
    this.sender
      .call(this.senderCallHandler)
      .ok(this.senderOkHandler);
  }

  public send() {
    if (this.pending) return;
    if (this.error) return;

    const url = this.url.trim();
    if (url) {
      this.sender.fetch();
    }
  }

  public get pending() {
    return this.sender.inProgress();
  }
}
