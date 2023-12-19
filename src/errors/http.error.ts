export class HttpError extends Error {
  public code: number;
  public issues: any;

  constructor(message?: string, code: number = 500, issues?: any) {
    super(message);
    this.code = code;
    this.issues = issues;

    Object.setPrototypeOf(this, HttpError.prototype);
  }
}