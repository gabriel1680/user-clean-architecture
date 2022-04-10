import HttpResponse from "@adapters/presentation/controllers/interfaces/HttpResponse";
import { NextFunction, Request, Response } from "express";
import { ConfirmRegisterEmailController, ForgotPasswordController } from "@adapters/presentation/controllers/user";
import Controller from "@adapters/presentation/controllers/interfaces/Controller";
import { FindController, FindQueryController } from "@adapters/presentation/controllers/interfaces/FindController";


/**
 * Generics
 */

export const adaptCreationRoute = (controller: Controller) => {
	return async (req: Request, res: Response): Promise<Response> => {
		const { statusCode, body }: HttpResponse = await controller.handle(req.body);
		return res.status(statusCode).json(body);
	}
}

interface DeleteController {
	handle(id: string): Promise<HttpResponse>;
}
export function adaptDeleteRoute(controller: DeleteController) {
	return async (req: Request, res: Response) => {
		const id = req.params.id || req.query.id || req.body.id;
		const { statusCode } = await controller.handle(id);
		return res.status(statusCode).json();
	}
}

export function adaptFindRoute(controller: FindController | FindQueryController) {
	return async (req: Request, res: Response): Promise<Response> => {
		if (Object.keys(req.query).length > 0) {
			const { statusCode, body } = await controller.handle(req.query);
			return res.status(statusCode).json(body);
		}
		const id = req.params.id || req.query.id;
		const { statusCode, body }: HttpResponse = await controller.handle(id as string);
		return res.status(statusCode).json(body);
	}
}

interface UpdateController {
	handle(id: string, payload: any): Promise<HttpResponse>;
}

export function adaptUpdateRoute(controller: UpdateController) {
	return async (req: Request, res: Response): Promise<Response> => {
		const id = req.params.id || req.query.id || req.body.id;
		const payload = req.body;
		const { statusCode, body }: HttpResponse = await controller.handle(id, payload);
		return res.status(statusCode).json(body);
	}
}


/**
 * Specifics
 */

export function adaptForgotPasswordRoute(controller: ForgotPasswordController) {
	return async (req: Request, res: Response): Promise<Response> => {
		const email = req.body.email || req.params.email;
		const forgotToken = req.body.forgotToken || req.params.forgotToken;
		const { password } = req.body;
		const { statusCode, body }: HttpResponse = await controller.handle({
			email,
			password,
			forgotToken
		});
		return res.status(statusCode).json(body);
	}
}

export const adaptConfirmLinkRoute = (controller: ConfirmRegisterEmailController) => {
	return async (req: Request, res: Response): Promise<Response> => {
		const { statusCode }: HttpResponse = await controller.handle(req.originalUrl);
		return res.status(statusCode).json();
	}
}

export function adaptUploadRoute(controller: Controller) {
	return async (req: Request, res: Response): Promise<Response> => {
		const { statusCode, body }: HttpResponse = await controller.handle({
			image: req.file, failure_id: req.body.failure_id
		});
		return res.status(statusCode).json(body);
	}
}


/**
 * Middlewares
 */

export function adaptAuthMiddleware(authMiddleware: (authToken: string) => Promise<HttpResponse>) {
	return async (req: Request, res: Response, next: NextFunction) => {
		const authorization = req.headers.authorization;
		const { statusCode, body } = await authMiddleware(authorization);
		if (statusCode == 200) return next();
		return res.status(statusCode).json(body);
	}
}