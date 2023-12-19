import { Request, Response } from "@google-cloud/functions-framework";
import { HttpError } from "../errors/http.error";

export enum HttpRequestMethod {
  GET = "GET",
  POST = "POST",
  PUT = "PUT",
  DELETE = "DELETE",
  PATCH = "PATCH",
  ALL = "ALL",
}

export const httpRequest = (fun: (req: Request, res: Response<any, Record<string, any>>) => any, methods: HttpRequestMethod | HttpRequestMethod[] = HttpRequestMethod.ALL) => {
  return async (req: Request, res: Response) => {
    try {
      if (typeof methods !== typeof []) {
        methods = [methods] as HttpRequestMethod[]
      }

      if (!methods.includes(HttpRequestMethod.ALL) && !methods.includes(HttpRequestMethod[req.method as keyof typeof HttpRequestMethod])) return res.status(405).send({
        message: "Method not allowed"
      });

      await fun(req, res);
    } catch (error: any) {
      console.error(error);
      if (error instanceof HttpError) {
        return res.status(error.code).send({
          message: error.message,
          issues: error.issues
        });
      }

      return res.status(500).send({
        message: error?.message
      });
    }
  }
}