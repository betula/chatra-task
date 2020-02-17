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
    const steamids = context.getQueryParam("steamids")
      .required()
      .json()
      .array(1)
      .format(/[0-9]+/)
      .sort()
      .nonduplicate()
      .value;

    const [ intersection, multiplayers ] = await Promise.all([
      this.getGameIntersectionBySteamids(steamids),
      this.steamSpyApi.getMultiplayerGames()
    ]);

    const games = [];

    if (multiplayers) {
      for (const game of intersection) {
        if (multiplayers[game.appid]) {
          games.push(game);
        }
      }
    } else {
      // TODO: API of steamspy is not stable. Necessary to store all games to local db
      games.push(...intersection);
    }

    return {
      games,
      steamids
    };
  }

  private async getGameIntersectionBySteamids(steamids: string[]) {
    const responses = await Promise.all(steamids.map(
      (steamid: string, index: number) => this.steamApi.getOwnedGames(steamid, { info: index === 0 })
    ));

    const collection = {} as any;
    const intersectionCounter = {} as any;
    const intersection = [] as any[];
    const participants = steamids.length;

    responses.forEach(({ games }: any, index: number) => {
      if (index === 0) {
        for (const game of games) {
          collection[game.appid] = game;
        }
      } else {
        for (const { appid } of games) {
          if (collection[appid]) {
            const count = intersectionCounter[appid] = (intersectionCounter[appid] || 0) + 1;
            if (count === participants - 1) {
              intersection.push(collection[appid]);
            }
          }
        }
      }
    });

    return intersection;
  }

}
