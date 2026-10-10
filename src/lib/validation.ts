import type {
  ClassApplication,
  Craft,
  CraftClass,
  FieldErrors,
  OrderInquiry,
} from "../types";

export const QUANTITY_MIN = 1;
export const QUANTITY_MAX = 10;
export const REQUEST_MAX_LENGTH = 300;

export function normalizeContact(raw: string): string {
  return raw.replace(/\D/g, "");
}

/** 로컬 날짜를 YYYY-MM-DD로 반환 (date input의 min 값과 과거 날짜 검증에 사용) */
export function toISODate(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

function validateName(name: string): string | undefined {
  const len = name.trim().length;
  return len >= 1 && len <= 20
    ? undefined
    : "이름(별칭)을 1~20자로 입력해 주세요.";
}

function validateContact(contact: string): string | undefined {
  if (contact.trim().length === 0) return "연락처를 입력해 주세요.";
  return /^010\d{8}$/.test(normalizeContact(contact))
    ? undefined
    : "010으로 시작하는 11자리 번호를 입력해 주세요. (예: 010-1234-5678)";
}

function validateRequest(request: string): string | undefined {
  return request.trim().length <= REQUEST_MAX_LENGTH
    ? undefined
    : `요청사항은 ${REQUEST_MAX_LENGTH}자 이내로 입력해 주세요.`;
}

function isIntInRange(value: number, min: number, max: number): boolean {
  return Number.isInteger(value) && value >= min && value <= max;
}

export function validateOrderInquiry(
  input: OrderInquiry,
  crafts: readonly Craft[],
): FieldErrors<OrderInquiry> {
  const errors: FieldErrors<OrderInquiry> = {};
  const name = validateName(input.name);
  const contact = validateContact(input.contact);
  const request = validateRequest(input.request);
  if (name) errors.name = name;
  if (contact) errors.contact = contact;
  if (!crafts.some((craft) => craft.id === input.craftId)) {
    errors.craftId = "상품을 선택해 주세요.";
  }
  if (!isIntInRange(input.quantity, QUANTITY_MIN, QUANTITY_MAX)) {
    errors.quantity = `수량은 ${QUANTITY_MIN}~${QUANTITY_MAX} 사이의 정수로 입력해 주세요.`;
  }
  if (request) errors.request = request;
  return errors;
}

export function validateClassApplication(
  input: ClassApplication,
  classes: readonly CraftClass[],
  today: Date = new Date(),
): FieldErrors<ClassApplication> {
  const errors: FieldErrors<ClassApplication> = {};
  const name = validateName(input.name);
  const contact = validateContact(input.contact);
  const request = validateRequest(input.request);
  if (name) errors.name = name;
  if (contact) errors.contact = contact;

  const selected = classes.find((cls) => cls.id === input.classId);
  if (!selected) errors.classId = "클래스를 선택해 주세요.";

  if (!/^\d{4}-\d{2}-\d{2}$/.test(input.desiredDate)) {
    errors.desiredDate = "희망 날짜를 선택해 주세요.";
  } else if (input.desiredDate < toISODate(today)) {
    errors.desiredDate = "오늘 이후의 날짜를 선택해 주세요. (과거 날짜는 선택할 수 없어요.)";
  }

  if (selected) {
    if (!Number.isInteger(input.participants) || input.participants < 1) {
      errors.participants = "인원은 1명 이상으로 입력해 주세요.";
    } else if (input.participants > selected.maxParticipants) {
      errors.participants = `최대 인원(${selected.maxParticipants}명)을 넘을 수 없어요.`;
    }
  } else if (!Number.isInteger(input.participants) || input.participants < 1) {
    errors.participants = "인원은 1명 이상으로 입력해 주세요.";
  }

  if (request) errors.request = request;
  return errors;
}
