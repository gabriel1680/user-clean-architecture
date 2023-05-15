import { Router } from "express";
import {
    makeCreateUserController,
    makeFindUserController,
    makeUserLinkConfirmationController,
    makeAuthenticateUserController,
    makeUserDeleteController,
    makeUserUpdateController,
    makeForgotPasswordController,
    makeAuthMiddleware,
} from "@main/factories/user";
import {
    adaptFindRoute,
    adaptCreationRoute,
    adaptConfirmLinkRoute,
    adaptUpdateRoute,
    adaptDeleteRoute,
    adaptAuthMiddleware,
    adaptForgotPasswordRoute,
} from "@main/adapters";

export default function userRoutes(): Router {
    const router = Router();

    const groupName = "/users";

    const ensureAdmin = adaptAuthMiddleware(
        makeAuthMiddleware("ensureIsAllowed")
    );
    const ensureAuth = adaptAuthMiddleware(
        makeAuthMiddleware("ensureAuthenticated")
    );

    router.get(
        groupName + "/:id",
        ensureAuth,
        ensureAdmin,
        adaptFindRoute(makeFindUserController())
    );
    router.get(
        groupName,
        ensureAuth,
        ensureAdmin,
        adaptFindRoute(makeFindUserController())
    );
    router.get(
        groupName + "/confirm-account/:confirmLink",
        adaptConfirmLinkRoute(makeUserLinkConfirmationController())
    );
    router.get(
        groupName + "/forgot/:email/:forgotToken",
        adaptForgotPasswordRoute(makeForgotPasswordController())
    );

    router.post(
        groupName,
        ensureAuth,
        ensureAdmin,
        adaptCreationRoute(makeCreateUserController())
    );
    router.post(
        groupName + "/login",
        adaptCreationRoute(makeAuthenticateUserController())
    );
    router.post(
        groupName + "/forgot",
        adaptForgotPasswordRoute(makeForgotPasswordController())
    );
    router.post(
        groupName + "/forgot/:email/:forgotToken",
        adaptForgotPasswordRoute(makeForgotPasswordController())
    );

    router.put(
        groupName + "/:id",
        ensureAuth,
        ensureAdmin,
        adaptUpdateRoute(makeUserUpdateController())
    );

    router.delete(
        groupName + "/:id",
        ensureAuth,
        ensureAdmin,
        adaptDeleteRoute(makeUserDeleteController())
    );

    return router;
}
