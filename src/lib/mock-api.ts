import type { ClassApplication, MockApiResult, OrderInquiry } from "../types";

export const MOCK_DELAY_MS = 700;
/** 이 연락처(숫자만 비교)로 제출하면 실습용 오류를 반환한다. */
export const MOCK_ERROR_CONTACT = "01000000000";

const MOCK_ERROR_MESSAGE =
  "실습용 오류입니다. 010-0000-0000은 오류 화면을 확인하기 위한 예시 번호예요. 다른 번호로 다시 시도해 보세요.";

interface MockApiOptions {
  /** 검증 시 지연을 줄이기 위한 옵션. 기본 700ms */
  delayMs?: number;
}

function wait(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function createReceiptNumber(prefix: string): string {
  const now = new Date();
  const yy = String(now.getFullYear()).slice(-2);
  const mm = String(now.getMonth() + 1).padStart(2, "0");
  const dd = String(now.getDate()).padStart(2, "0");
  const rand = String(Math.floor(Math.random() * 10000)).padStart(4, "0");
  return `${prefix}-${yy}${mm}${dd}-${rand}`;
}

async function respond(
  contact: string,
  prefix: string,
  successMessage: string,
  options?: MockApiOptions,
): Promise<MockApiResult> {
  await wait(options?.delayMs ?? MOCK_DELAY_MS);
  if (contact.replace(/\D/g, "") === MOCK_ERROR_CONTACT) {
    return { success: false, message: MOCK_ERROR_MESSAGE };
  }
  return {
    success: true,
    receiptNumber: createReceiptNumber(prefix),
    message: successMessage,
  };
}

export function submitOrderInquiry(
  input: OrderInquiry,
  options?: MockApiOptions,
): Promise<MockApiResult> {
  return respond(
    input.contact,
    "ORD",
    "주문 문의가 접수되었습니다. (실습용 가상 접수이며 실제로 전송되거나 저장되지 않습니다.)",
    options,
  );
}

export function submitClassApplication(
  input: ClassApplication,
  options?: MockApiOptions,
): Promise<MockApiResult> {
  return respond(
    input.contact,
    "CLS",
    "클래스 신청이 접수되었습니다. (실습용 가상 접수이며 실제로 전송되거나 저장되지 않습니다.)",
    options,
  );
}
