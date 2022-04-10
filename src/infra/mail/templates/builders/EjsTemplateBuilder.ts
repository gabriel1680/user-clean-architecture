import { renderFile } from "ejs";

import MailTemplateBuilder from "./MailTemplateBuilder.interface";
import EjsTemplate from "../../templates/EjsTemplate.interface";


export default class EjsTemplateBuilder implements MailTemplateBuilder
{
    constructor(private _template: EjsTemplate) {}

    public async build(): Promise<string>
    {
        const { path, data } = this._template;
        
        const html = await renderFile(path, data, { async: true });
        return html;
    }
}