import HttpResponse from "./HttpResponse";

export default interface CreationController {
    handle(data: object): Promise<HttpResponse>
}