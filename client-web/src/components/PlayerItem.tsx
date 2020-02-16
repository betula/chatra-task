import { PureComponent } from "react";
import { dispatch } from "~/lib/core";
import { PlayerItem as PlayerItemType, RemovePlayerItem, TogglePlayerItem } from "~/services/PlayerList";

export class PlayerItem extends PureComponent<{ item: PlayerItemType }> {
  private handleDestroyClick = () => {
    dispatch(RemovePlayerItem, this.props.item);
  }

  private handleToggleClick = () => {
    dispatch(TogglePlayerItem, this.props.item);
  }

  private getLiClassName() {
    if (!this.props.item.enabled) return "completed";
  }

  public render() {
    const { item } = this.props;

    return (
      <li className={this.getLiClassName()}>
        <div className="view">
          <input
            className="toggle"
            type="checkbox"
            checked={item.enabled}
            onChange={this.handleToggleClick}
          />
          <label>{item.url}</label>
          <button className="destroy" onClick={this.handleDestroyClick} />
        </div>
      </li>
    )
  }
}
