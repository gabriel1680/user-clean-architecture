import BaseTemplate from "./BaseTemplate";
import { EjsTemplate } from ".";


export interface ForgotData
{
    first_name: string;
    confirm_link: string;
}

export class ForgotTemplate extends BaseTemplate implements EjsTemplate 
{
    private readonly _data: ForgotData;

    constructor(data: ForgotData)
    {
        super({ name: "forgot", type: "ejs" });
        this._data = data;
    }

    public get data(): ForgotData
    {
        return this._data;
    }
}