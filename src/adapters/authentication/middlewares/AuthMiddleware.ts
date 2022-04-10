import { badRequest, ok, unauthorized } from "@adapters/presentation/controllers/helpers/httpResponses";
import HttpResponse from "@adapters/presentation/controllers/interfaces/HttpResponse";
import AuthTokenManager from "@adapters/authentication/middlewares/interfaces/AuthTokenManager";
import { FindByIdRepository } from "@application/interfaces/DefaultRepositories";
import User from "@domain/entities/user/User";

export interface AuthMiddleware {
    (token: string): Promise<HttpResponse>;
}

export function ensureAuthenticated(tokenManager: AuthTokenManager): AuthMiddleware {
    return async (token: string): Promise<HttpResponse> => {
        if (!token) return badRequest(new Error("Token inválido"));

        const [, splitToken] = token.split(" ");
        const isValidToken = tokenManager.verify(splitToken);
        if (!isValidToken) return badRequest(new Error("Invalid token"));

        const userId = tokenManager.getPayload(splitToken).sub;
        return ok({ userId });
    }
}

export function ensureIsAllowed(tokenManager: AuthTokenManager, repository: FindByIdRepository<User>): AuthMiddleware
{
    return async (token: string): Promise<HttpResponse> => {
        const { statusCode, body } = await ensureAuthenticated(tokenManager)(token);
        if (statusCode !== 200) return { statusCode, body };

        const { userId } = body;
        const user = await repository.findById(userId);
        if (!user) return badRequest(new Error("Tentativa de burlar o sistema"));
        if (!user.isAllowedToCreateAnotherUser()) return unauthorized();
        return ok({});
    }
}