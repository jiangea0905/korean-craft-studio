import type { CraftClass } from "@/types";

export const craftClasses: readonly CraftClass[] = [
  {
    id: "pottery",
    name: "물레 도자기 만들기",
    description:
      "물레 위에서 흙을 올리고 손으로 형태를 잡아 나만의 밥그릇을 빚어 보는 체험이에요. 초벌과 시유는 공방에서 도와드려요.",
    price: 55000,
    durationMinutes: 150,
    maxParticipants: 6,
    imageSrc: "/images/classes/pottery.svg",
    imageAlt: "물레 위에서 흙그릇을 빚는 손과 도자기 도구가 놓인 작업대 그림",
  },
  {
    id: "bojagi",
    name: "보자기 매듭 소품 만들기",
    description:
      "조각 천을 이어 붙여 작은 보자기를 만들고, 매듭으로 마무리해 선물 포장까지 익혀 보는 차분한 수업이에요.",
    price: 38000,
    durationMinutes: 120,
    maxParticipants: 8,
    imageSrc: "/images/classes/bojagi.svg",
    imageAlt: "펼친 보자기 천을 접어 매듭을 짓는 모습의 그림",
  },
  {
    id: "woodwork",
    name: "목공예 작은 함 만들기",
    description:
      "나무 조각을 다듬고 맞추어 손바닥만 한 작은 함을 만들어 보는 수업이에요. 사포질과 오일 마감까지 함께 해요.",
    price: 62000,
    durationMinutes: 180,
    maxParticipants: 4,
    imageSrc: "/images/classes/woodwork.svg",
    imageAlt: "나무 작은 함과 끌, 사포 등 목공 도구가 놓인 작업대 그림",
  },
];
