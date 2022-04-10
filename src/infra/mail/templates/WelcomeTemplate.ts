import EjsTemplate from "./EjsTemplate.interface";
import BaseTemplate from "./BaseTemplate";


export interface WelcomeData
{
    first_name: string;
    confirm_link: string;
}

export class WelcomeTemplate extends BaseTemplate implements EjsTemplate 
{
    private _data: WelcomeData;

    constructor(data: WelcomeData) {
        super({ name: "welcome", type: "ejs" });
        this._data = data;
    }

    public get data(): WelcomeData
    {
        return this._data;
    }
}