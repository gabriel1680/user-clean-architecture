import HttpResponse from "@adapters/presentation/controllers/interfaces/HttpResponse";
import { badRequest, noBody, ok, serverError } from "@adapters/presentation/controllers/helpers/httpResponses";
import { IConfirmForgotToken, IRecoveryAccountFromForgotToken, IForgotPassword }
  from "@application/usecases/user/ForgotPassword/interfaces";

type ForgotPasswordControllerData = {
  email?: string,
  forgotToken?: string,
  password?: string
};

export default class ForgotPasswordController {
  constructor(
    private readonly forgotPasswd: IForgotPassword,
    private readonly forgotChangePasswd: IRecoveryAccountFromForgotToken,
    private readonly confirmForgotToken: IConfirmForgotToken
  ) {}

  public async handle({
          email,
          forgotToken,
          password
      }: ForgotPasswordControllerData
  ): Promise<HttpResponse>
  {
    try {
      if (!forgotToken) {
        const responseOrError = await this.forgotPasswd.execute(email);
        if (responseOrError instanceof Error) return badRequest(responseOrError);
        return noBody();
      }
      if (!password) {
        const responseOrError = await this.confirmForgotToken.execute(email, forgotToken);
        if (responseOrError instanceof Error) return badRequest(responseOrError);
        return ok(responseOrError);
      }
      const responseOrError = await this.forgotChangePasswd.execute(email, forgotToken, password);
      if (responseOrError instanceof Error) return badRequest(responseOrError);
      return noBody();
    } catch (e) {
      console.error("[Forgot Password Controller] =>", e);
      return serverError(e.message);
    }
  }
}