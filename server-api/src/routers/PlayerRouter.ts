import { provide, bind } from "~/lib/core";
import { SteamApi } from "~/api/SteamApi";
import { Server, RouteContext } from "~/services/Server";

export class PlayerRouter {
  @provide public server: Server;
  @provide public steamApi: SteamApi;

  public init() {
    this.server.route("GET", "/player/steamid", this.steamid);
  }

  @bind
  public async steamid(context: RouteContext) {
    const param = context.getQueryParam("url")
      .required()
      .format(/^((https?:\/\/)?(www\.)?steamcommunity\.com\/id\/)?([^/]{1,})$/i, ([,,,,url]) => url);

    const url = param.value;
    const data = await this.steamApi.getSteamIdByVanityUrl(url);
    if (!data.ok) {
      param.error("not found");
    }
    return {
      steamid: data.steamid
    }
  }

}
