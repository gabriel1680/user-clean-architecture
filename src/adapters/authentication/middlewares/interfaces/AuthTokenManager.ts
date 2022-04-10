import TokenManager from "@application/services/TokenManager";

export default interface AuthTokenManager extends TokenManager {
	getPayload(token: string): { sub: any };
}