import ApplicationService from "@application/interfaces/ApplicationService";

export default interface TokenManager extends ApplicationService
{
	verify(token: string): boolean;
	generateToken(payload: string | object, expiresIn: string | number): string;
}