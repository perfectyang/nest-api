export class ErrorResponse {
  code: number;
  message: string;
  data: any;
  tryError(data: any) {
    return {
      message: 'done',
      data,
      code: '200',
    };
  }
}
