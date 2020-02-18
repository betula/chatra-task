import { styled } from "~/lib/styled";

const Container = styled.label`
  display: block;
  position: relative;
  cursor: pointer;
  height: 25px;
  width: 25px;
  user-select: none;
  transform: scale(0.7);
`
const Input = styled.input`
  position: absolute;
  opacity: 0;
  cursor: pointer;
  height: 0;
  width: 0;
`
const Checkmark = styled.span`
  position: absolute;
  top: 0;
  left: 0;
  height: 25px;
  width: 25px;
  background-color: rgba(238,242,245,0.2);

  ${Container}:hover ${Input} ~ & {
    background-color: rgb(202,202,202,0.5);
  }
  ${Container} input:checked ~ & {
    background-color: rgb(9,71,113);
  }

  :after {
    content: "";
    position: absolute;
    display: none;

    ${Container} input:checked ~ & {
      display: block;
    }

    left: 9px;
    top: 5px;
    width: 5px;
    height: 10px;
    border: solid white;
    border-width: 0 3px 3px 0;
    transform: rotate(45deg);
  }
`

export const Checkbox = (props: any) => {
  return (
    <Container>
      <Input type="checkbox" {...props} />
      <Checkmark />
    </Container>
  )
}
