import { styled } from "~/lib/styled";

export const LoadingOverlay = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  border: 1px solid rgb(200,200,200);
  background-color: rgba(0,0,0,.5);
  :before {
    content: "loading";
    position: absolute;
    right: 0;
    top: 0;
    background: rgb(200,200,200);
    color: rgb(30,30,30);
    padding: 3px 7px;
  }
`
