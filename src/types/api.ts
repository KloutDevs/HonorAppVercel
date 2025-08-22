export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

export type ApiResponseData<T> = T extends ApiResponse<infer U> ? U : never;