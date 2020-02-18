import { PureComponent } from "react";
import { provide, subscribe } from "~/lib/core";
import { EnterKeyCode } from "~/lib/consts";
import { PlayerList } from "~/services/PlayerList";
import { NewPlayer as NewPlayerEntity } from "~/entities/NewPlayer";

export class NewPlayer extends PureComponent {
  @provide list: PlayerList;
  @subscribe entity = new NewPlayerEntity();

  private handleInputChange = (event: any) => {
    this.entity.url = event.target.value;
  }

  private handleInputKeyDown = (event: any) => {
    if (event.keyCode === EnterKeyCode) {
      this.entity.send();
    }
  }

  public render() {
    return (
      <div>
      <input
        className="new-todo"
        placeholder="Steam profile url"
        autoFocus
        onChange={this.handleInputChange}
        onKeyDown={this.handleInputKeyDown}
        value={this.entity.url}
      />
      </div>
    )
  }
}
