import axios from "axios";

import { zodRequestSchemaMap } from "./orval/zodRequestSchemaMap";
import { zodResponseSchemaMap } from "./orval/zodResponseSchemaMap";

const baseURL = "/api/proxy";

if (!baseURL) {
  console.warn("VITE_API_URL is not set.");
}

export const api = axios.create({
  baseURL,
  withCredentials: true,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// ─── Zod 요청 검증 (Soft Validation) ────────────────────────────────────────
// API 호출 전 request body / query params를 orval 생성 zod 스키마로 검증합니다.
// 검증 실패 시 에러를 throw하지 않고 console.warn으로만 경고를 출력합니다.
api.interceptors.request.use((config) => {
  const url = config.url ?? "";
  const method = (config.method ?? "get").toUpperCase();

  const match = zodRequestSchemaMap.find(
    (entry) => entry.urlPattern.test(url) && entry.method === method,
  );

  if (match) {
    // Body 검증 (POST/PUT 등)
    if (match.bodySchema && config.data !== undefined) {
      const body =
        typeof config.data === "string"
          ? JSON.parse(config.data)
          : config.data;
      const result = match.bodySchema.safeParse(body);
      if (!result.success) {
        console.warn(
          `[Zod Request Body] ${method} ${url}`,
          result.error.flatten(),
        );
      }
    }

    // Query Params 검증 (GET 등)
    if (match.paramsSchema && config.params !== undefined) {
      const result = match.paramsSchema.safeParse(config.params);
      if (!result.success) {
        console.warn(
          `[Zod Request Params] ${method} ${url}`,
          result.error.flatten(),
        );
      }
    }
  }

  return config;
});

// ─── Zod 응답 검증 (Soft Validation) ────────────────────────────────────────
// orval이 생성한 zod 스키마를 이용해 API 응답 구조를 런타임에 검증합니다.
// 검증 실패 시 에러를 throw하지 않고 console.warn으로만 경고를 출력합니다.
api.interceptors.response.use((response) => {
  const url = response.config.url ?? "";
  const method = (response.config.method ?? "get").toUpperCase();

  const match = zodResponseSchemaMap.find(
    (entry) => entry.urlPattern.test(url) && entry.method === method,
  );

  if (match) {
    const result = match.schema.safeParse(response.data);
    if (!result.success) {
      console.warn(
        `[Zod Validation] ${method} ${url}`,
        result.error.flatten(),
      );
    }
  }

  return response;
});

