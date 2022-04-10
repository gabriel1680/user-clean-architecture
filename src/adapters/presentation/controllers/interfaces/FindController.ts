import HttpResponse from "@adapters/presentation/controllers/interfaces/HttpResponse";

export interface FindController {
	handle(id?: string): Promise<HttpResponse>;
}

export interface FindQueryController {
	handle(data: any): Promise<HttpResponse>;
}