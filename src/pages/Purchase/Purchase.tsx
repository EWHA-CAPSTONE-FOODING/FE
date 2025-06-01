import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Header from "@components/Header/Header";
import NavBar from "@components/NavBar/NavBar";
import { FontMedium } from "@style/font.style";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from "chart.js";
import { Line } from "react-chartjs-2";
import "chart.js/auto";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const ingredientFeatures: Record<string, number[]> = {
  계란: [8.0, 10.0, 8.0, 4.0, 0.5, 10, 12],
  우유: [4.0, 7.0, 6.0, 2.0, 0.5, 7, 12],
  당근: [10.0, 17.3333333333, 18.0, 2.0, 2.0, 14, 12],
  양파: [21.0, 20.3333333333, 20.0, 1.0, 2.0, 21, 12]
};

// 🔥 범례/선 색상 새로 지정
const colorMap: Record<string, string> = {
  계란: "#6868AC",
  당근: "#B76EB0",
  양파: "#F47A9E",
  우유: "#FF9880"
};

const getImageForIngredient = (ingredient: string) => {
  switch (ingredient) {
    case "계란":
      return "/icon6.png";
    case "양파":
      return "/icon3.png";
    case "우유":
      return "/icon13.png";
    case "당근":
      return "/icon4.png";
    default:
      return "";
  }
};

const Purchase = () => {
  const [chartData, setChartData] = useState<any>(null);
  const [recommendations, setRecommendations] = useState<
    { ingredient: string; qty: number; date: string }[]
  >([]);

  useEffect(() => {
    fetch("/consumption.json")
      .then((res) => res.json())
      .then((data: { date: string; ingredient: string; amount: number }[]) => {
        const grouped: Record<string, Record<string, number>> = {};

        data.forEach(({ date, ingredient, amount }) => {
          if (!grouped[ingredient]) grouped[ingredient] = {};
          grouped[ingredient][date] = amount;
        });

        const allDates: string[] = Array.from(
          new Set(data.map((d) => d.date))
        ).sort();

        const datasets = Object.keys(grouped).map((ingredient: string) => ({
          label: ingredient,
          data: allDates.map((date: string) => grouped[ingredient][date] || 0),
          borderColor: colorMap[ingredient],      // ✅ 선 색상
          backgroundColor: colorMap[ingredient],  // ✅ 범례 색상
          tension: 0.3,
          borderWidth: 1,
          pointRadius: allDates.map((date: string) =>
            grouped[ingredient][date] && grouped[ingredient][date] !== 0 ? 3 : 0
        )
        }));

        setChartData({
          labels: allDates,
          datasets
        });
      });
  }, []);

  useEffect(() => {
    const fetchPredictions = async () => {
      const results: { ingredient: string; qty: number; date: string }[] = [];

      await Promise.all(
        Object.entries(ingredientFeatures).map(async ([name, features]) => {
          try {
            const res = await fetch("http://3.36.159.65:5000/predict", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ features })
            });
            const json = await res.json();
            results.push({
              ingredient: name,
              qty: json.recommended_qty,
              date: json.recommended_date
            });
          } catch (err) {
            console.error(`${name} 예측 실패`, err);
            results.push({ ingredient: name, qty: 0, date: "예측 실패" });
          }
        })
      );

      setRecommendations(results);
    };

    fetchPredictions();
  }, []);

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        labels: {
          boxWidth: 10,
          boxHeight: 10
        }
      }
    },
    scales: {
      x: {
        ticks: {
          font: {
            size: 10
          }
        }
      },
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 2
        }
      }
    }
  };

  return (
    <Container>
      <HeaderWrapper>
        <Header isBack={false} title=" " />
      </HeaderWrapper>

      <IntroBlock>
        <FontMedium size="16px">식재료 구매 기록 확인하고 추천받기</FontMedium>
        <FontMedium size="12px" className="grey">
          소진일 기준으로 구매가 필요한 항목을 자동 추천해요.
        </FontMedium>
      </IntroBlock>

      {chartData && (
        <ChartSection>
          <Line data={chartData} options={chartOptions} height={300} />
        </ChartSection>
      )}

      <CardSection>
        {recommendations.map(({ ingredient, qty, date }) => (
          <Card key={ingredient}>
            <img src={getImageForIngredient(ingredient)} alt={ingredient} />
            <div className="info">
              <h4>{ingredient}</h4>
              <p>추천 구매 수량: {qty}개</p>
              <p>예상 구매일: {date}</p>
            </div>
          </Card>
        ))}
      </CardSection>

      <NavBarWrapper>
        <NavBar />
      </NavBarWrapper>
    </Container>
  );
};

export default Purchase;

// Styled Components
const Container = styled.div`
  width: 100%;
  max-width: 375px;
  margin: 0 auto;
  background-color: #fdf4dc;
  min-height: 107vh;
  display: flex;
  flex-direction: column;
  height: auto;
`;

const HeaderWrapper = styled.div`
  width: 100%;
  padding-top: 16px;
`;

const IntroBlock = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 4px;
  margin: 4px 20px 12px;
  .grey {
    color: var(--grey2);
  }
`;

const ChartSection = styled.div`
  padding: 1rem;
`;

const CardSection = styled.div`
  flex: 1;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 16px;
`;

const Card = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  background: white;
  border-radius: 12px;
  padding: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);

  img {
    width: 40px;
    height: 40px;
    border-radius: 8px;
    object-fit: cover;
  }

  .info {
    display: flex;
    flex-direction: column;
    gap: 4px;

    h4 {
      font-size: 14px;
      margin: 0;
    }

    p {
      font-size: 12px;
      margin: 0;
      color: #555;
    }
  }
`;

const NavBarWrapper = styled.div`
  position: fixed;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  max-width: 375px;
`;



























/*
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Header from "@components/Header/Header";
import NavBar from "@components/NavBar/NavBar";
import { FontMedium } from "@style/font.style";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from "chart.js";
import { Line } from "react-chartjs-2";
import "chart.js/auto";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const ingredientFeatures: Record<string, number[]> = {
  계란: [8.0, 10.0, 8.0, 4.0, 0.5, 10, 12],
  우유: [4.0, 7.0, 6.0, 2.0, 0.5, 7, 12],
  당근: [10.0, 17.3333333333, 18.0, 2.0, 2.0, 14, 12],
  양파: [21.0, 20.3333333333, 20.0, 1.0, 2.0, 21, 12]
};

const colorMap: Record<string, string> = {
  계란: "yellow",
  당근: "orange",
  양파: "brown",
  우유: "skyblue"
};

// 🔥 식재료별 이미지 연결 함수
const getImageForIngredient = (ingredient: string) => {
  switch (ingredient) {
    case "계란":
      return "/icon6.png";
    case "양파":
      return "/icon3.png";
    case "우유":
      return "/icon13.png";
    case "당근":
      return "/icon4.png";
    default:
      return "";
  }
};

const Purchase = () => {
  const [chartData, setChartData] = useState<any>(null);
  const [recommendations, setRecommendations] = useState<
    { ingredient: string; qty: number; date: string }[]
  >([]);

  useEffect(() => {
    fetch("/consumption.json")
      .then((res) => res.json())
      .then((data: { date: string; ingredient: string; amount: number }[]) => {
        const grouped: Record<string, Record<string, number>> = {};

        data.forEach(({ date, ingredient, amount }) => {
          if (!grouped[ingredient]) grouped[ingredient] = {};
          grouped[ingredient][date] = amount;
        });

        const allDates: string[] = Array.from(
          new Set(data.map((d) => d.date))
        ).sort();

        const datasets = Object.keys(grouped).map((ingredient: string) => ({
          label: ingredient,
          data: allDates.map((date: string) => grouped[ingredient][date] || 0),
          borderColor: colorMap[ingredient],
          backgroundColor: colorMap[ingredient],
          tension: 0.3
        }));

        setChartData({
          labels: allDates,
          datasets
        });
      });
  }, []);

  useEffect(() => {
    const fetchPredictions = async () => {
      const results: { ingredient: string; qty: number; date: string }[] = [];

      await Promise.all(
        Object.entries(ingredientFeatures).map(async ([name, features]) => {
          try {
            const res = await fetch("http://3.36.159.65:5000/predict", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ features })
            });
            const json = await res.json();
            results.push({
              ingredient: name,
              qty: json.recommended_qty,
              date: json.recommended_date
            });
          } catch (err) {
            console.error(`${name} 예측 실패`, err);
            results.push({ ingredient: name, qty: 0, date: "예측 실패" });
          }
        })
      );

      setRecommendations(results);
    };

    fetchPredictions();
  }, []);

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        labels: {
          boxWidth: 10,
          boxHeight: 10
        }
      }
    },
    scales: {
      x: {
        ticks: {
          font: {
            size: 10
          }
        }
      },
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 2
        }
      }
    }
  };

  return (
    <Container>
      <HeaderWrapper>
        <Header isBack={false} title=" " />
      </HeaderWrapper>

      <IntroBlock>
        <FontMedium size="16px">식재료 구매 기록 확인하고 추천받기</FontMedium>
        <FontMedium size="12px" className="grey">
          소진일 기준으로 구매가 필요한 항목을 자동 추천해요.
        </FontMedium>
      </IntroBlock>

      {chartData && (
        <ChartSection>
          <Line data={chartData} options={chartOptions} height={300} />
        </ChartSection>
      )}

      <CardSection>
        {recommendations.map(({ ingredient, qty, date }) => (
          <Card key={ingredient}>
            <img src={getImageForIngredient(ingredient)} alt={ingredient} />
            <div className="info">
              <h4>{ingredient}</h4>
              <p>추천 구매 수량: {qty}개</p>
              <p>예상 구매일: {date}</p>
            </div>
          </Card>
        ))}
      </CardSection>

      <NavBarWrapper>
        <NavBar />
      </NavBarWrapper>
    </Container>
  );
};

export default Purchase;

// Styled Components
const Container = styled.div`
  width: 100%;
  max-width: 375px;
  margin: 0 auto;
  background-color: #fdf4dc;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const HeaderWrapper = styled.div`
  width: 100%;
  padding-top: 16px;
`;

const IntroBlock = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 4px;
  margin: 4px 20px 12px;
  .grey {
    color: var(--grey2);
  }
`;

const ChartSection = styled.div`
  padding: 1rem;
`;

const CardSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 16px;
`;

const Card = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  background: white;
  border-radius: 12px;
  padding: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);

  img {
    width: 40px;
    height: 40px;
    border-radius: 8px;
    object-fit: cover;
  }

  .info {
    display: flex;
    flex-direction: column;
    gap: 4px;

    h4 {
      font-size: 14px;
      margin: 0;
    }

    p {
      font-size: 12px;
      margin: 0;
      color: #555;
    }
  }
`;

const NavBarWrapper = styled.div`
  position: fixed;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  max-width: 375px;
`;

*/