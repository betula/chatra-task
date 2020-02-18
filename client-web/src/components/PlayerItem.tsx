import { PureComponent } from "react";
import { dispatch, subscribe, provide } from "~/lib/core";
import { PlayerItem as PlayerItemType, RemovePlayerItem, SetPlayerItemEnabed } from "~/services/PlayerList";
import { Fetcher } from "~/entities/Fetcher";
import { Api } from "~/services/Api";

export class PlayerItem extends PureComponent<{ item: PlayerItemType }> {
  @provide api: Api;

  private remover: Fetcher;
  private toggler: Fetcher;

  constructor(props: any) {
    super(props);

    this.remover = new Fetcher()
      .call(() => this.api.removePlayer(this.props.item.steamid))
      .ok(() => dispatch(RemovePlayerItem, this.props.item));
    subscribe(this, this.remover);

    this.toggler = new Fetcher()
      .call(() => this.api.setPlayerEnabled(this.props.item.steamid, !this.props.item.enabled))
      .ok(({ enabled }) => dispatch(SetPlayerItemEnabed, this.props.item, enabled));
    subscribe(this, this.toggler);
  }

  private handleDestroyClick = () => {
    if (this.remover.inProgress) return;
    this.remover.exec();
  }

  private handleToggleClick = () => {
    if (this.toggler.inProgress) return;
    this.toggler.exec();
  }

  private getLiClassName() {
    if (!this.props.item.enabled) return "completed";
  }

  private get penging() {
    return this.remover.inProgress || this.toggler.inProgress;
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
            disabled={this.penging}
          />
          <label>{item.url}</label>
          <button className="destroy" onClick={this.handleDestroyClick} />
        </div>
        {this.penging ? <b>Loading</b> : null}
      </li>
    )
  }
}
