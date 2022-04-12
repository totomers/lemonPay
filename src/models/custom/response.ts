export class CustomResponseBody {
  code: number;
  message: string;
  data?: object;
}

export class CustomResponse {
  statusCode: number;
  body: string;
}
