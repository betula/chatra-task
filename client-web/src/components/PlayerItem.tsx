import { PureComponent } from "react";
import { subscribe } from "~/lib/core";
import { styled } from "~/lib/styled";
import { PlayerItem as PlayerItemEntity } from "~/services/PlayerList/PlayerItem";
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

const Link = ({ item, children }: { item: PlayerItemEntity; children: any }) => {
  const [,,,,id] = /^((https?:\/\/)?(www\.)?steamcommunity\.com\/id\/)?([^/]{1,})$/i.exec(item.url) || [];
  return (
    <A href={`https://steamcommunity.com/id/${id}`} target="_blank">
      {children}
    </A>
  )
}

@subscribe
export class PlayerItem extends PureComponent<{ item: PlayerItemEntity }> {

  private handleDestroyClick = () => {
    this.props.item.sendRemove();
  }

  private handleToggleClick = () => {
    this.props.item.sendToggle();
  }

  public render() {
    const { item } = this.props;

    console.log(item);

    return (
      <Li>
        <CheckboxBox>
          <Checkbox
            checked={item.enabled}
            onChange={this.handleToggleClick}
            disabled={item.pending}
          />
        </CheckboxBox>
        <Label>
          <Link item={item}>{item.url}</Link>
        </Label>
        <DeleteButton onClick={this.handleDestroyClick} />
        {item.pending ? <LoadingOverlay/> : null}
      </Li>
    )
  }
}
