import { type ZodTypeAny } from "zod";

import { GetApiAuthKakaoCallbackQueryParams } from "../generated/zod/auth/auth";
import {
  GenerateAiLetterContentBody,
  CreateLetterBody,
  VerifyLetterPasswordBody,
} from "../generated/zod/letters/letters";
import { SaveLetterBody } from "../generated/zod/user-letters/user-letters";

interface RequestSchemaEntry {
  urlPattern: RegExp;
  method: string;
  /** POST/PUT 요청의 request body 스키마 */
  bodySchema?: ZodTypeAny;
  /** GET 요청의 query params 스키마 */
  paramsSchema?: ZodTypeAny;
}

/**
 * URL 패턴 + HTTP 메서드 → 요청 데이터 Zod 스키마 매핑.
 * axios request interceptor에서 API 호출 전에 검증합니다.
 *
 * ⚠️ orval 재실행 후 새 엔드포인트가 추가되면 여기에도 추가하세요.
 */
export const zodRequestSchemaMap: RequestSchemaEntry[] = [
  // ──────────────────────────────────────────────────────────────
  // Auth
  // ──────────────────────────────────────────────────────────────
  {
    // GET /api/auth/kakao/callback?code=...&state=...
    urlPattern: /^\/api\/auth\/kakao\/callback$/,
    method: "GET",
    paramsSchema: GetApiAuthKakaoCallbackQueryParams,
  },

  // ──────────────────────────────────────────────────────────────
  // Letters
  // ──────────────────────────────────────────────────────────────
  {
    // POST /api/letters/ai/generate
    urlPattern: /^\/api\/letters\/ai\/generate$/,
    method: "POST",
    bodySchema: GenerateAiLetterContentBody,
  },
  {
    // POST /api/letters — 편지 최종 저장
    urlPattern: /^\/api\/letters$/,
    method: "POST",
    bodySchema: CreateLetterBody,
  },
  {
    // POST /api/letters/:letter_id/verify — 비밀번호 확인
    urlPattern: /^\/api\/letters\/[^/]+\/verify$/,
    method: "POST",
    bodySchema: VerifyLetterPasswordBody,
  },

  // ──────────────────────────────────────────────────────────────
  // User Letters (내 편지함)
  // ──────────────────────────────────────────────────────────────
  {
    // POST /api/user-letters — 받은 편지 보관
    urlPattern: /^\/api\/user-letters$/,
    method: "POST",
    bodySchema: SaveLetterBody,
  },
];
