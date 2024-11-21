export default interface ApiResponse<T> {
  statusCode: number;
  error: string | null;
  content: T | null;
}
