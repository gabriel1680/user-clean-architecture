import { join } from "path";


interface MailTemplateConstructor
{
    name: "welcome" | "forgot" | "appraisal";
    type: "ejs" | "html";
}

export default abstract class BaseTemplate
{
    private readonly _type: string;
    private readonly _name: string;
    private readonly _path: string;

    protected constructor({ name, type }: MailTemplateConstructor)
    {
        this._type = type;
        this._name = name;
        this._path = join(__dirname, "..", "views", `${this._name}.${this.type}`);
    }

    public get name(): string
    {
        return this._name;
    }

    public get path(): string
    {
        return this._path;
    }

    public get type(): string
    {
        return this._type;
    }
}
