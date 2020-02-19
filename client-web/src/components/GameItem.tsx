import { memo } from "react";
import { styled } from "~/lib/styled";
import { GameItem as GameItemType } from "~/services/GameList";

const Li = styled.li`
  display: flex;
  align-content: flex-start;
  :hover {
    background-color: rgb(42,45,46);
  }
`
const IconPlaceholder = styled.div`
  width: 32px;
  height: 32px;
`
const IconImage = styled.img`
  width: 32px;
  height: 32px;
`
const Text = styled.div`
  line-height: 32px;
  padding-left: 7px;
  white-space: nowrap;
  :hover {
    color: rgb(225,191,140);
  }
`
const A = styled.a`
  color: inherit;
  text-decoration: none;
`

const Icon = ({ item: { icon, appid } }: { item: GameItemType }) => (
  (icon)
    ? <IconImage src={`http://media.steampowered.com/steamcommunity/public/images/apps/${appid}/${icon}.jpg`} />
    : <IconPlaceholder />
)
const Link = (props: any) => (
  <A href={`https://steamcommunity.com/app/${props.item.appid}`} target="_blank">
    {props.children}
  </A>
)

export const GameItem = memo(({ item }: { item: GameItemType }) => (
  <Li>
    <Link item={item}>
      <Icon item={item} />
    </Link>
    <Text>
      <Link item={item}>
        {item.name}
      </Link>
    </Text>
  </Li>
))
