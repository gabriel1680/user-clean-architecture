import { sign, verify, decode, Jwt } from "jsonwebtoken";
import AuthTokenManager from "@adapters/authentication/middlewares/interfaces/AuthTokenManager";

export default class JWT implements AuthTokenManager {
    private _key: string;

    private _error: Error;

    constructor(private secretKey: string) {}

    public get key(): string {
        return this._key;
    }

    public get errorMessage(): string {
        return this._error.message;
    }

    public generateToken(
        payload: string | object,
        expiresIn: string | number
    ): string {
        this._key = sign(payload, this.secretKey, { expiresIn });
        return this._key;
    }

    public verify(token: string): boolean {
        try {
            verify(token, this.secretKey);
            return true;
        } catch (error) {
            this._error = error;
            return false;
        }
    }

    public decode(token: string): Jwt {
        return decode(token, { complete: true });
    }

    public getPayload(token: string): { sub: any } {
        // @ts-ignore
        return decode(token, { complete: true })?.payload;
    }
}
