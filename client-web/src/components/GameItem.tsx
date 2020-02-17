import { memo } from "react";
import { styled } from "~/lib/styled";
import { GameItem as GameItemType } from "~/services/GameList";

const IconPlaceholder = styled.div`
  display: inline-block;
  width: 32px;
  height: 32px;
`;

const IconImage = styled.img`
  display: inline-block;
  width: 32px;
  height: 32px;
`

const Icon = ({ item: { icon, appid } }: { item: GameItemType }) => {
  return (icon)
    ? <IconImage src={`http://media.steampowered.com/steamcommunity/public/images/apps/${appid}/${icon}.jpg`} />
    : <IconPlaceholder />
}

export const GameItem = memo(({ item }: { item: GameItemType }) => (
  <li>
    <div>
      <Icon item={item} />
      <label>{item.name}</label>
    </div>
  </li>
))
