import { type ZodTypeAny } from "zod";

import { GetApiAuthKakaoCallbackQueryParams } from "../generated/zod/auth/auth";
import {
  GenerateAiLetterContentResponse,
  GetLetterDetailResponse,
  GetApiLettersLetterIdCheckPasswordResponse,
  VerifyLetterPasswordResponse,
} from "../generated/zod/letters/letters";
import {
  GetSentLettersResponse,
  GetReceivedLettersResponse,
  SaveLetterResponse,
  DeleteSavedLetterResponse,
} from "../generated/zod/user-letters/user-letters";
import { GetApiUsersMeResponse } from "../generated/zod/users/users";

interface SchemaEntry {
  urlPattern: RegExp;
  method: string;
  schema: ZodTypeAny;
}

/**
 * URL 패턴과 HTTP 메서드를 기반으로 응답 Zod 스키마를 매핑합니다.
 * orval이 생성한 zod 스키마를 사용하여 API 응답을 런타임에 검증합니다.
 *
 * ⚠️ 이 파일은 orval 재실행 시 덮어씌워지지 않습니다 (generated/ 외부).
 * orval 재실행 후 새 엔드포인트가 추가되면 여기에도 추가하세요.
 */
export const zodResponseSchemaMap: SchemaEntry[] = [
  // ──────────────────────────────────────────────────────────────
  // Auth
  // ──────────────────────────────────────────────────────────────
  {
    urlPattern: /^\/api\/auth\/kakao\/callback$/,
    method: "GET",
    // 콜백은 응답 스키마가 없으므로 query params 스키마로 대체하지 않고 생략합니다.
    // 필요 시 별도 Response 스키마 추가
    schema: GetApiAuthKakaoCallbackQueryParams, // placeholder — 실제 응답 스키마로 교체 가능
  },

  // ──────────────────────────────────────────────────────────────
  // Letters
  // ──────────────────────────────────────────────────────────────
  {
    // POST /api/letters/ai/generate
    urlPattern: /^\/api\/letters\/ai\/generate$/,
    method: "POST",
    schema: GenerateAiLetterContentResponse,
  },
  {
    // GET /api/letters/:letter_id — 편지 상세 조회 (수신자용)
    // check-password / verify 보다 먼저 매칭되지 않도록 순서 주의
    urlPattern: /^\/api\/letters\/[^/]+$/,
    method: "GET",
    schema: GetLetterDetailResponse,
  },
  {
    // GET /api/letters/:letter_id/check-password
    urlPattern: /^\/api\/letters\/[^/]+\/check-password$/,
    method: "GET",
    schema: GetApiLettersLetterIdCheckPasswordResponse,
  },
  {
    // POST /api/letters/:letter_id/verify
    urlPattern: /^\/api\/letters\/[^/]+\/verify$/,
    method: "POST",
    schema: VerifyLetterPasswordResponse,
  },

  // ──────────────────────────────────────────────────────────────
  // User Letters (내 편지함)
  // ──────────────────────────────────────────────────────────────
  {
    // GET /api/user-letters/sent
    urlPattern: /^\/api\/user-letters\/sent$/,
    method: "GET",
    schema: GetSentLettersResponse,
  },
  {
    // GET /api/user-letters/received
    urlPattern: /^\/api\/user-letters\/received$/,
    method: "GET",
    schema: GetReceivedLettersResponse,
  },
  {
    // POST /api/user-letters — 받은 편지 보관
    urlPattern: /^\/api\/user-letters$/,
    method: "POST",
    schema: SaveLetterResponse,
  },
  {
    // DELETE /api/user-letters/:letterId
    urlPattern: /^\/api\/user-letters\/[^/]+$/,
    method: "DELETE",
    schema: DeleteSavedLetterResponse,
  },

  // ──────────────────────────────────────────────────────────────
  // Users
  // ──────────────────────────────────────────────────────────────
  {
    // GET /api/users/me
    urlPattern: /^\/api\/users\/me$/,
    method: "GET",
    schema: GetApiUsersMeResponse,
  },
];
