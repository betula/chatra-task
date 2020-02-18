import { store, provide, subscribe } from "~/lib/core";
import { Fetcher } from "./Fetcher";
import { Api } from "~/services/Api";

export class NewPlayer {
  @provide api: Api;

  @store url = "";
  @store progress = false;

  @subscribe sender = new Fetcher<{ url: string }>();

  private senderCallHandler = async () => {
    this.sender.meta.url = this.url;
    return await this.api.addPlayer(this.url);
  }

  private senderOkHandler = (data: any) => {
    console.log("OKOK", data);
  };
  private senderFailHandler = (error: any) => {
    console.error("Could not add player", error);
  };
  private senderFinishHandler = () => {
    this.url = "";
  }
  private senderShouldFetchHandler = () => {
    return this.sender.meta.url !== this.url;
  };

  constructor() {
    this.sender
      .call(this.senderCallHandler)
      .shouldFetch(this.senderShouldFetchHandler)
      .ok(this.senderOkHandler)
      .fail(this.senderFailHandler)
      .finish(this.senderFinishHandler);
  }

  public send() {
    const url = this.url.trim();
    if (url) {
      this.sender.fetch();
    }
  }
}
