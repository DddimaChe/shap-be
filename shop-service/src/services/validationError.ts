export class ValidationError extends Error {
  public statusCode: number;
  public message: string;
  public name: string;

  constructor(message: string) {
    super(message);
    this.name = 'ValidationError';
    this.statusCode = 400;
  }
}
