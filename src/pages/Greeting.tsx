import logo from "@assets/common/logo.png";
import LongBtn from "@components/Buttons/LongBtn";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Greeting = () => {
  const navigate = useNavigate();

  return (
    <Div>
      <Img src={logo} />

      <div className="bottom">
        <LongBtn text={"시작하기"} onClick={() => navigate("/main")} />
      </div>
    </Div>
  );
};

export default Greeting;

const Div = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;



  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(to bottom, #FFFDF4, #FDF4DC, #FCE9A8); 
    z-index: -1;
  }


  .bottom {
    position: absolute; //하단 고정
    bottom: 55px;
    width: 90%;
    max-width: 335px;
  }
`;

const Img = styled.img`
  margin-top: 120px;
  width: 60%;
  height: auto;
  aspect-ratio: 1 / 1;
`;

