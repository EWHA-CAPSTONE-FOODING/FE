
import Header from "@components/Header/Header";
import Drawer from "@components/Recipe/Drawer";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { TypeRecipe } from "type/recipe";
import { useEffect, useState } from "react";
import tomatooilpasta from "@assets/common/tomatooilpasta.jpg";

const Detail = () => {
  const { id } = useParams();
  const [detail, setDetail] = useState<TypeRecipe>();

  useEffect(() => {
    // ✅ 백엔드 없이 mock 데이터 사용
    const mockDetail: TypeRecipe = {
      recipeId: Number(id),
      name: "올리브 토마토 파스타",
      image: tomatooilpasta,
      mainIng: "토마토, 파스타면, 올리브, 버섯",
      heart: false,
      total: 5300,
      createdAt: "2025-04-13",
      ingredients: [
        { name: "링귀니 파스타", amount: 1, price: 7300, iconId: 21},
        {name: "양파", amount: 1, price: 3300, iconId: 3 },
        {name: "올리브", amount: 15, price: 10400, iconId: 17 },
        {name: "양송이 버섯", amount: 1, price: 0, iconId: 10 },
        {name: "한살림 스파게티소스", amount: 1, price: 0, iconId: 16 },
      ],
      instructions: [
        "양파 0.5개(종이컵 0.5컵), 올리브 15개(종이컵 1컵)를 다져서 팬에 넣어주세요.",
        "링귀니 파스타, 버터를 차례로 투하해주세요.",
        "스파게티소스와 물 600ml를 팬에 넣어주세요.",
        "설탕2T, 참치액1T을 넣고 졸여주세요.",
        "팬에 바닥이 보이기 시작하면 불을 꺼주고, 다진마늘 1/3스푼을 넣어주세요.",
        "양송이 버섯까지 넣어주면 완벽한 올리브 토마토 파스타 완성!"
      ],
      advantage: ["요리하기 용이", "1인 가구 인기 메뉴", "담백깔끔 건강에 좋음"],
    };
    setDetail(mockDetail);
  }, [id]);

  return (
    <Div>
      <Header isBack={true} />
      <Img>
        <img src={detail?.image} alt="메뉴 이미지" />
      </Img>
      {detail && id && <Drawer detail={detail} recipeId={Number(id)} />}
    </Div>
  );
};

export default Detail;

const Div = styled.div`
  width: 100%;
  max-width: 375px;
  background-color:rgb(255, 198, 65);
  margin: 0 auto; /* ✅ 중앙 정렬 핵심 */
  min-height: 100vh; /* ✅ 배경 꽉 차게 */
  
`;

const Img = styled.div`
  width: 100%;
  max-width: 375px;

  height: 100%;
  margin: 0 auto;
  display: flex;
  overflow: hidden;
  justify-content: center;
  align-items: center;
  

  img {
    width: 100%;
    height: 100%;
  }
`;













/* 그 뒤에 핑크색
// 메뉴 추천 페이지 (/recipes/:id)에서 보여줄 화면
import Header from "@components/Header/Header";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { TypeRecipe } from "type/recipe";

const Detail = () => {
  const { id } = useParams();
  const [detail, setDetail] = useState<TypeRecipe>();

  // ✅ mock 데이터로 대체 (id 무시)
  useEffect(() => {
    const mockDetail: TypeRecipe = {
      recipeId: 999,
      name: "토마토 파스타",
      image: "/assets/recipe/tomato-pasta.jpg", // 실제 public에 넣었거나 @assets/... 경로
      mainIng: "토마토, 파스타 면, 올리브오일",
      heart: false,
      total: 8900,
      ingredients: [
        { name: "토마토", amount: 2, price: 2000 },
        { name: "파스타 면", amount: 1, price: 3000 },
        { name: "올리브오일", amount: 0.5, price: 2500 },
        { name: "소금", amount: 0.1, price: 400 },
      ],
    };
    setDetail(mockDetail);
  }, []);

  return (
    <Container>
      <Header isBack={true} title="레시피 상세" />

      {detail && (
        <Card>
          <ImgWrapper>
            <img src={detail.image} alt="레시피 이미지" />
          </ImgWrapper>

          <InfoSection>
            <Title>{detail.name}</Title>
            <MainIng>주요 재료: {detail.mainIng}</MainIng>
          </InfoSection>

          <Section>
            <SectionTitle>재료 목록</SectionTitle>
            <List>
              {detail.ingredients?.map((ing, idx) => (
                <ListItem key={idx}>
                  <span>{ing.name}</span>
                  <span>
                    {ing.amount}개 / {ing.price.toLocaleString()}원
                  </span>
                </ListItem>
              ))}
            </List>
          </Section>

          <Bottom>
            <Total>총합: {detail.total?.toLocaleString()}원</Total>
            <BookmarkBtn>찜하기 💛</BookmarkBtn>
          </Bottom>
        </Card>
      )}
    </Container>
  );
};

export default Detail;

const Container = styled.div`
  width: 100%;
  max-width: 375px;
  margin: 0 auto;
  padding-bottom: 20px;
  min-height: 100vh;
  background-color:rgb(253, 220, 251);
`;

const Card = styled.div`
  width: 90%;
  margin: 20px auto;
  padding: 20px;
  border-radius: 12px;
  background-color: #fff8e8;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
`;

const ImgWrapper = styled.div`
  width: 100%;
  height: 180px;
  overflow: hidden;
  border-radius: 10px;
  margin-bottom: 15px;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const InfoSection = styled.div`
  margin-bottom: 20px;
`;

const Title = styled.h2`
  font-size: 18px;
  font-weight: bold;
  margin: 0 0 6px 0;
`;

const MainIng = styled.p`
  font-size: 14px;
  color: #666;
`;

const Section = styled.div`
  margin-bottom: 20px;
`;

const SectionTitle = styled.h3`
  font-size: 15px;
  font-weight: bold;
  margin-bottom: 10px;
`;

const List = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const ListItem = styled.li`
  font-size: 14px;
  display: flex;
  justify-content: space-between;
`;

const Bottom = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Total = styled.div`
  font-size: 16px;
  font-weight: bold;
`;

const BookmarkBtn = styled.button`
  padding: 8px 14px;
  font-size: 14px;
  background-color: #ffc241;
  border: none;
  border-radius: 6px;
  cursor: pointer;
`;
*/






















/* 백엔드용
import Header from "@components/Header/Header";
import Drawer from "@components/Recipe/Drawer";
import { getRecipesDetail } from "@services/api/recipes";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { TypeRecipe } from "type/recipe";

const Detail = () => {
  const { id } = useParams();
  const [detail, setDetail] = useState<TypeRecipe>();

  useEffect(() => {
    id && getRecipesDetail(Number(id)).then(res => setDetail(res.data));
  }, []);

  return (
    <Div>
      <Header isBack={true} />

      <Img>
        <img src={detail?.image} />
      </Img>

      {detail && id && <Drawer detail={detail} recipeId={Number(id)} />}
    </Div>
  );
};

export default Detail;

const Div = styled.div`
  width: 100%;
`;

const Img = styled.div`
  width: 100%;
  height: 100%;
  margin: 0 auto;
  display: flex;
  overflow: hidden;
  justify-content: center;
  align-items: center;

  img {
    width: 100%;
    height: 100%;
  }
`;
*/