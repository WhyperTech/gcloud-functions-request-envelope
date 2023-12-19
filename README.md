# Getting Started

Here you can see the basics of using this package, also we provide some examples in how to use.

### Installation

Start by installing the package with NPM:

```
npm i @whyper/gcloud-functions-request-envelope
```

Or, for Yarn users:

```
yarn add @whyper/gcloud-functions-request-envelope
```

### Available Request Functions

Today, we only have the Http Request function available, here it is the method:

```js
const request = httpRequest(youEndpointFunction, [
  HttpRequestMethod.yourMethod,
]);
```

Example of usage, following the GCloud example for using express and cloud-functions (without declaring any GCloud Functions specific methods)

```ts
//...other imports above
import {
  HttpFunction,
  Request,
  Response,
} from "@google-cloud/functions-framework";
import {
  HttpRequestMethod,
  httpRequest,
} from "../../../shared/requests/http.request";

export const userGetFunction: HttpFunction = httpRequest(
  async (req: Request, res: Response) => {
    const user = await findUserById(req.body.id);

    return res.send(user);
  },
  HttpRequestMethod.GET
);
```

### What this package does?

This package is like a middleware, basically we have a try/catch by default (to not crash you serveless application and return a beatiful 5xx or any other error) and we also await your function.

## Available Error Classes

### 404 - Not Found

```ts
throw new NotFoundError(message: string)
```

### 400 - Bad Request

```ts
throw new BadRequestError(message: string, issues?: any)
```

### Custom Default Error

```ts
throw new HttpError(message: string, code?: number = 500, issues?: any)
```

### Creating a custom Error

To create a custom error you can extend from the HttpError class, here is the example, following the NotFoundError implementation:

```ts
import { HttpError } from "@whyper/gcloud-functions-request-envelope";

export class NotFoundError extends HttpError {
  constructor(message: string = "Not Found") {
    super(message, 404);
    // Set the prototype explicitly.
    Object.setPrototypeOf(this, NotFoundError.prototype);
  }
}
```

# Contributors

- [Mateus Tozoni @ Whyper Tech](https://github.com/mateustozoni)
- [Whyper Tech Team](https://github.com/WhyperTech)

# Issues

You can open any issue that you like, but please, be very specific in the description
