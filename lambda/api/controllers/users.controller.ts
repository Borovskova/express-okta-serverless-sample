import { Response, Request } from "express";

import { UsersService } from "../services/users.service";
import { HttpStatus } from "../enums/http-status.enum";
import {
  httpResponseFailed,
  httpResponseSuccess,
} from "../helpers/api-response.helper";

export class UserController {
  static async getUsersList(req: Request, res: Response) {
    const result = await UsersService.getUsersList();
    const { data, error } = result;
    const adaptedResponse = error
      ? httpResponseFailed(error)
      : httpResponseSuccess(data);

    res
      .status(data ? HttpStatus.OK : HttpStatus.BAD_REQUEST)
      .json(adaptedResponse);

    return;
  }
}
