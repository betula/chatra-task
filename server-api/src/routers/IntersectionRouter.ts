import { provide, bind } from "~/lib/core";
import { SteamApi } from "~/api/SteamApi";
import { SteamSpyApi } from "~/api/SteamSpyApi";
import { Server, RouteContext } from "~/services/Server";

export class IntersectionRouter {
  @provide public server: Server;
  @provide public steamApi: SteamApi;
  @provide public steamSpyApi: SteamSpyApi;

  public init() {
    this.server.route("GET", "/intersection/multiplayer", this.multiplayer);
  }

  @bind
  public async multiplayer(context: RouteContext) {
    const players = context.getQueryParam("players").json().required().array(1).value;

    const games = {} as any;
    for (const player of players) {
      games[player] = await this.steamApi.getOwnedGamesByVanityUrl(player);
    }

    const multiplayers = await this.steamSpyApi.getMultiplayerGames();

    return {
      games,
      players,
      multiplayers
    };
  }

}
