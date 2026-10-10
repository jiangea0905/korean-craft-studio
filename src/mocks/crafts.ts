import type { Craft } from "@/types";

export const crafts: readonly Craft[] = [
  {
    id: "celadon-vase",
    name: "청자 달항아리 화병",
    category: "도자기",
    description:
      "은은한 비색 유약을 입힌 둥근 화병입니다. 마른 가지 한두 대만 꽂아도 방 안이 차분해져요.",
    price: 128000,
    imageSrc: "/images/crafts/celadon-vase.svg",
    imageAlt: "연한 청록빛 유약의 둥근 화병이 아이보리 배경 위에 놓인 일러스트",
  },
  {
    id: "celadon-bowl",
    name: "청자 연잎 찻사발",
    category: "도자기",
    description:
      "손에 감기는 낮은 굽의 찻사발입니다. 차의 색이 맑게 비치는 옅은 청자 빛이에요.",
    price: 54000,
    imageSrc: "/images/crafts/celadon-bowl.svg",
    imageAlt: "옅은 청자색의 넓은 찻사발이 받침 위에 놓인 일러스트",
  },
  {
    id: "najeon-box",
    name: "나전 함",
    category: "나전칠기",
    description:
      "검은 옻칠 위에 자개 점을 흩뿌린 작은 함입니다. 장신구나 편지를 담아 두기 좋아요.",
    price: 189000,
    imageSrc: "/images/crafts/najeon-box.svg",
    imageAlt: "짙은 색 옻칠 뚜껑 위에 진주빛 자개 점이 흩어진 작은 함 일러스트",
  },
  {
    id: "najeon-mirror",
    name: "나전 손거울",
    category: "나전칠기",
    description:
      "둥근 거울 뒷면에 자개 꽃 한 송이를 앉힌 손거울입니다. 가방에 쏙 들어가는 크기예요.",
    price: 76000,
    imageSrc: "/images/crafts/najeon-mirror.svg",
    imageAlt: "자개 꽃무늬가 있는 둥근 옻칠 손거울이 비스듬히 놓인 일러스트",
  },
  {
    id: "bojagi-patchwork",
    name: "조각보 보자기",
    category: "보자기",
    description:
      "남은 천 조각을 이어 붙여 만든 조각보입니다. 선물을 싸거나 식탁 위에 깔아 쓸 수 있어요.",
    price: 42000,
    imageSrc: "/images/crafts/bojagi-patchwork.svg",
    imageAlt: "크기가 다른 네모 천 조각을 이어 붙인 부드러운 색감의 조각보 일러스트",
  },
  {
    id: "wood-tray",
    name: "느티나무 소반",
    category: "목공예",
    description:
      "결을 살려 깎은 작은 소반입니다. 차 한 잔과 간식을 올려 두기에 알맞은 크기예요.",
    price: 98000,
    imageSrc: "/images/crafts/wood-tray.svg",
    imageAlt: "곡선 다리가 달린 둥근 나무 소반이 놓인 일러스트",
  },
];
