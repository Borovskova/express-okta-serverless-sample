export function httpResponseFailed(
  errorMsg: string = `Internal server error. Please try again later`,
  status: string = "failed",
): { status: string; error: string } {
  return {
    status,
    error: errorMsg,
  };
}

export function httpResponseSuccess(data: any): { status: string; data: any } {
  return {
    status: "success",
    data,
  };
}
