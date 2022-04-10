import HttpResponse from "@adapters/presentation/controllers/interfaces/HttpResponse";

export default interface Controller {
	handle(...params: any): Promise<HttpResponse>
}
