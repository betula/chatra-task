import "todomvc-app-css/index.css";
import { serialize, unserialize, zone } from "~/lib/ssr";
import { resolve } from "~/lib/core";
import { PlayerList } from "~/services/PlayerList";
import { GameList } from "~/services/GameList";

const SerializedDataKey = "__SERIALIZED_DATA__";

export default function App({ Component, pageProps }: any) {
  if (pageProps[SerializedDataKey]) {
    unserialize(pageProps[SerializedDataKey]);
  }
  return <Component {...pageProps} />
}

App.getInitialProps = async () => {
  const pageProps = {};
  if (!(process as any).browser) {
    await zone(async () => {
      await resolve(PlayerList).fetch();
      await resolve(GameList).fetch();
      (pageProps as any)[SerializedDataKey] = serialize();
    });
  }
  return { pageProps };
};
