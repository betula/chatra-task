import { memo } from "react";
import { NewPlayer } from "./NewPlayer";

export const Header = memo(() => (
  <header className="header">
    <h1>Let's together</h1>
    <NewPlayer />
  </header>
));
