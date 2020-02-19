import { PureComponent } from "react";
import { dispatch, subscribe, provide } from "~/lib/core";
import { styled } from "~/lib/styled";
import { PlayerItem as PlayerItemType, RemovePlayerItem, SetPlayerItemEnabed } from "~/services/PlayerList";
import { Fetcher } from "~/entities/Fetcher";
import { Api } from "~/services/Api";
import { LoadingOverlay } from "./atoms/LoadingOverlay";
import { Checkbox } from "./atoms/Checkbox";

const Li = styled.li`
  display: flex;
  align-items: center;
  height: 32px;
  position: relative;
  padding-left: 7px;
  flex-wrap: nowrap;

  :hover {
    background-color: rgb(42,45,46);
  }
`
const DeleteButton = styled.button`
  display: none;
  position: absolute;
  right: 7px;
  top: 0;
  bottom: 3px;
  border: 3px;
  background: transparent;
  font-size: 22px;
  color: inherit;
  :hover {
    color: rgb(226,192,121);
    cursor: pointer;
  }
  :after {
    content: "×";
  }
  ${Li}:hover & {
    display: inline;
  }
`
const Label = styled.label`
  white-space: nowrap;
  padding-left: 5px;
  :hover {
    color: rgb(225,191,140);
  }
`
const CheckboxBox = styled.div`
  width: 25px;
`
const A = styled.a`
  color: inherit;
  text-decoration: none;
`

const Link = ({ item, children }: { item: PlayerItemType; children: any }) => {
  const [,,,,id] = /^((https?:\/\/)?(www\.)?steamcommunity\.com\/id\/)?([^/]{1,})$/i.exec(item.url) || [];
  return (
    <A href={`https://steamcommunity.com/id/${id}`} target="_blank">
      {children}
    </A>
  )
}

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

  private get penging() {
    return this.remover.inProgress || this.toggler.inProgress;
  }

  public render() {
    const { item } = this.props;

    return (
      <Li>
        <CheckboxBox>
          <Checkbox
            checked={item.enabled}
            onChange={this.handleToggleClick}
            disabled={this.penging}
          />
        </CheckboxBox>
        <Label>
          <Link item={item}>{item.url}</Link>
        </Label>
        <DeleteButton onClick={this.handleDestroyClick} />
        {this.penging ? <LoadingOverlay/> : null}
      </Li>
    )
  }
}
