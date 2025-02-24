import styled, { keyframes } from "styled-components";
import lodingimg from "../assets/image/loding.png";
export const turn = keyframes`
    0%{-webkit-transform:rotate(0deg);}
    25%{-webkit-transform:rotate(90deg);}
    50%{-webkit-transform:rotate(180deg);}
    75%{-webkit-transform:rotate(270deg);}
    100%{-webkit-transform:rotate(360deg);}
`;
export const LodingMode = styled.div`
  /* min-height:100vh; */
  width: 100%;
  height: 100%;
  /* background: rgba(0, 0, 0, 0.3); */
  /* background: #ccc; */
  display: flex;
  align-items: center;
  justify-content: center;
  & img {
    width: 100px;
    animation: ${turn} 3s linear infinite;
  }
`;
export default function PageLoding() {
  return (
    <LodingMode>
      <img src={lodingimg} alt="" />
    </LodingMode>
  );
}
