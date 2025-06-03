import Header from "@components/Header/Header";
import styled from "styled-components";
import example from "@assets/create/ocr-eg.png";
import gallery from "@assets/create/gallery.png";
import example2 from "@assets/create/od-eg.png";

import { FontBold, FontMedium } from "@style/font.style";
import { useEffect, useRef, useState } from "react";
import ItemInput from "@components/Ingredients/Item/ItemInput";
import { useRecoilState } from "recoil";
import { newListState } from "@services/store/ingredients";
import LongBtn from "@components/Buttons/LongBtn";
import loading from "@assets/common/loading.gif";
import { TypeIngredient } from "../../type/ingredients";
import { useNavigate } from "react-router-dom";
import imageCompression from "browser-image-compression";

type Props = {
  isOCR: boolean;
};

const AICreate = ({ isOCR }: Props) => {
  const [previewImg, setPreviewImg] = useState<string | ArrayBuffer | null>(null);
  const [newList, setNewList] = useRecoilState(newListState);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const imgRef = useRef<HTMLInputElement>(null);

  const uploadImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files[0];
  
      const options = {
        maxSizeMB: 1,
        maxWidthOrHeight: 1024,
        useWebWorker: true,
      };
  
      try {
        const compressedFile = await imageCompression(file, options);
  
        const reader = new FileReader();
        reader.readAsDataURL(compressedFile);
        reader.onload = () => {
          setPreviewImg(reader.result);
        };
  
        setIsLoading(true);
  
        // ✅ MOCK 데이터: 백엔드 연동 전 테스트용
        const mockOCR: TypeIngredient[] = [
          { ingredientId: Math.random(), iconId: 13, name: "P 굿모닝 우유 900ML", price: 1350, amount: 1 },
          { ingredientId: Math.random(), iconId: 3, name: "P 양파", price: 3300, amount: 1 },
          { ingredientId: Math.random(), iconId: 26, name: "P 무", price: 500, amount: 1 },
          { ingredientId: Math.random(), iconId: 25, name: "P 깻잎", price: 750, amount: 1 },
          { ingredientId: Math.random(), iconId: 1, name: "P 하선정 바로먹기좋은장아찌", price: 1380, amount: 1 },
          { ingredientId: Math.random(), iconId: 18, name: "P 브로커리", price: 1280, amount: 1 },
        ];
  
        const mockObjectDetection: TypeIngredient[] = [
          { ingredientId: Math.random(), iconId: 10, name: "양송이버섯 140g", price: 0, amount: 1 },
          { ingredientId: Math.random(), iconId: 16, name: "한살림 스파게티소스 180g", price: 0, amount: 1 },
          { ingredientId: Math.random(), iconId: 11, name: "참 귀한 한살림채소 가지 2개", price: 0, amount: 1 },
          { ingredientId: Math.random(), iconId: 12, name: "방울토마토", price: 0, amount: 1 },
          { ingredientId: Math.random(), iconId: 21, name: "한살림 두부면", price: 0, amount: 1 },
        ];
  
        // 👇 isOCR 여부에 따라 다른 mock 적용
        const mockData = isOCR ? mockOCR : mockObjectDetection;
  
        setTimeout(() => {
          setNewList(mockData);
          setIsLoading(false);
        }, 1000); // 약간의 로딩 효과
  
      } catch (err) {
        console.error("업로드 오류:", err);
        alert("이미지를 분석할 수 없습니다. 다시 시도해주세요.");
      }
    }
  };
  

  const requestAICreate = () => {
    if (newList.length === 0) {
      alert("등록할 식재료가 없습니다.");
      return;
    }

    const existing = localStorage.getItem("tempIngredients");
    let mergedList: TypeIngredient[] = [];

    try {
      const parsed: TypeIngredient[] = existing ? JSON.parse(existing) : [];
      mergedList = [...parsed, ...newList];
    } catch (err) {
      mergedList = [...newList];
    }

    localStorage.setItem("tempIngredients", JSON.stringify(mergedList));
    alert("등록이 완료되었습니다.");
    navigate("/statistics");
    setNewList([]);
  };

  useEffect(() => {
    setNewList([]);
  }, []);

  return (
    <Div>
      <Header
        isBack={true}
        title={isOCR ? " " : " "}
      />

      {!previewImg ? (
        <Example>
          <Container>
            {isOCR ? <img src={example} /> : <img src={example2} />}
          </Container>
          <div className="eg-text">
            <FontMedium size="10px">*예시 이미지</FontMedium>
          </div>
        </Example>
      ) : (
        <Container>
          {typeof previewImg == "string" && (
            <img src={previewImg} className="preview" />
          )}
        </Container>
      )}

      {!previewImg ? (
        <>
          <div className="explanation">
            <FontMedium size="13px" style={{ textAlign: "start", color: "#7d7d7d" }}>
              {isOCR ? (
                <>
                  영수증이나 주문내역 이미지를 업로드 해주세요
                </>
              ) : (
                <>
                  등록하고자 하는 식재료 사진을 업로드 해주세요
                </>
              )}
            </FontMedium>
          </div>
          <input
            type="file"
            id="file-input"
            className="file"
            ref={imgRef}
            accept=".jpg, .jpeg, .png"
            onChange={uploadImage}
          />
          <Btn htmlFor="file-input">
            <img className="gallery" src={gallery} alt="" />
          </Btn>
        </>
      ) : (
        <>
          <Result>
            <div className="title">
              <FontBold size="15px">인식 결과</FontBold>
            </div>
            {isLoading ? (
              <img src={loading} className="loading" />
            ) : (
              <div className="result-container">
                {newList.map((input: any) => (
                  <ItemInput
                    key={input.ingredientId}
                    inputs={input}
                    isList={true}
                    setInputList={setNewList}
                    inputList={newList}
                  />
                ))}
              </div>
            )}
          </Result>
          {!isLoading && (
            <div className="bottom">
              <LongBtn text="등록 완료" onClick={requestAICreate} />
            </div>
          )}
        </>
      )}
    </Div>
  );
};

export default AICreate;

// 스타일은 동일
const Div = styled.div`
  width: 100%;
  max-width: 375px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;

  .explanation {
    margin-top: 30px;
    width: 90%;
    display: flex;
  }

  .file {
    display: none;
  }

  .preview {
    height: 100%;
  }

  .bottom {
    width: 100%;
    max-width: 375px;
    margin: 0 auto;
    position: fixed;
    bottom: 0px;
    padding: 30px;
    display: flex;
    justify-content: center;
    background-color: #fff;
  }
`;

const Example = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;

  .eg-text {
    margin-top: 5px;
    width: 90%;
    display: flex;
    justify-content: end;
    color: var(--grey2);
  }
`;

const Container = styled.div`
  overflow: hidden;
  display: flex;
  width: 90%;
  box-sizing: border-box;
  height: 350px;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  background:rgb(255, 249, 235);

  img {
    height: 100%;
  }
`;

const Btn = styled.label`
  width: 90%;
  height: 246px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  background:rgb(255, 249, 235);

  img {
    width: 62.093px;
    height: 60px;
    flex-shrink: 0;
  }
`;

const Result = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 120px;

  .title {
    margin: 0 auto;
    width: 90%;
    color: black;
    display: flex;
  }

  .result-container {
    margin: 0 auto;
    width: 90%;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
  }

  .loading {
    margin: 30% auto;
    width: 50px;
  }
`;





