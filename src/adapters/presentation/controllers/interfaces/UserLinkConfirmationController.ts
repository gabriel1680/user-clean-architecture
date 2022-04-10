import HttpResponse from "@adapters/presentation/controllers/interfaces/HttpResponse";

export default interface UserLinkConfirmationController {
    handle(confirmLink: string): Promise<HttpResponse>;
}