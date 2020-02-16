import { PureComponent } from "react";
import { store, provide } from "~/lib/core";
import { EnterKeyCode } from "~/lib/consts";
import { PlayerList } from "~/services/PlayerList";

export class NewPlayer extends PureComponent {
  @provide list: PlayerList;
  @store url = "";

  private handleInputChange = (event: any) => {
    this.url = event.target.value;
  }

  private handleInputKeyDown = (event: any) => {
    if (event.keyCode !== EnterKeyCode) {
      return;
    }
    const url = this.url.trim();
    if (url) {
      // this.list.append(url);
      this.url = "";
    }
  }

  public render() {
    return (
      <input
        className="new-todo"
        placeholder="Steam profile url"
        autoFocus
        onChange={this.handleInputChange}
        onKeyDown={this.handleInputKeyDown}
        value={this.url}
      />
    )
  }
}
