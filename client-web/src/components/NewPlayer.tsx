import { PureComponent } from "react";
import { provide, subscribe } from "~/lib/core";
import { styled } from "~/lib/styled";
import { EnterKeyCode } from "~/lib/consts";
import { PlayerList } from "~/services/PlayerList";
import { NewPlayer as NewPlayerEntity } from "~/entities/NewPlayer";
import { LoadingOverlay } from "./atoms/LoadingOverlay";

const Box = styled.div`
  position: relative;
`
const Input = styled.input`
  border: 0;
  padding: 0 0 0 36px;
  margin: 0;
  height: 32px;
  box-sizing: border-box;
  width: 100%;
  outline: 0;
  background-color: rgba(255,255,255,0.65);
  :hover {
    background-color: rgba(255,255,255,0.7);
  }
  :focus {
    background-color: rgba(255,255,255,1);
  }
`
export const ErrorOverlay = styled.div<{ text: string }>`
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  border: 1px solid rgb(199,109,99);
  background-color: transparent;
  pointer-events: none;
  :before {
    content: "${(props) => props.text}";
    position: absolute;
    right: -1px;
    bottom: 100%;
    background: rgb(199,109,99);
    color: rgb(238,242,245);
    padding: 3px 7px;
  }
`

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
    const { entity } = this;
    return (
      <Box>
        <Input
          placeholder="Type here steam profile url..."
          autoFocus
          onChange={this.handleInputChange}
          onKeyDown={this.handleInputKeyDown}
          value={entity.url}
          disabled={entity.pending}
        />
        {entity.error ? <ErrorOverlay text={this.entity.error} /> : null}
        {entity.pending ? <LoadingOverlay/> : null}
      </Box>
    )
  }
}
