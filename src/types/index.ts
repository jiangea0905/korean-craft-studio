export type CraftCategory = "도자기" | "나전칠기" | "보자기" | "목공예";

export interface Craft {
  id: string;
  name: string;
  /** 공예 종류 */
  category: CraftCategory;
  description: string;
  /** KRW, 정수 */
  price: number;
  /** public/ 기준 경로, 예: /images/crafts/celadon-vase.svg */
  imageSrc: string;
  imageAlt: string;
}

export interface CraftClass {
  id: string;
  name: string;
  description: string;
  /** 1인 기준 KRW */
  price: number;
  durationMinutes: number;
  /** 최대 인원(정원) */
  maxParticipants: number;
  imageSrc: string;
  imageAlt: string;
}

export interface OrderInquiry {
  name: string;
  contact: string;
  craftId: string;
  quantity: number;
  /** 요청사항(선택) */
  request: string;
}

export interface ClassApplication {
  name: string;
  contact: string;
  classId: string;
  /** YYYY-MM-DD */
  desiredDate: string;
  participants: number;
  /** 요청사항(선택) */
  request: string;
}

export type MockApiResult =
  | { success: true; receiptNumber: string; message: string }
  | { success: false; message: string };

export type SubmitState =
  | { status: "idle" }
  | { status: "loading" }
  | { status: "success"; receiptNumber: string; message: string }
  | { status: "error"; message: string };

export type FieldErrors<T> = Partial<Record<keyof T, string>>;
