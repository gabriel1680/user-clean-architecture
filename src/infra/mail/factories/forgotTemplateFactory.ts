import { ForgotTemplate, ForgotData } from "../templates";
import { EjsTemplateBuilder } from "../templates/builders";


async function forgotTemplateFactory(data: ForgotData): Promise<string> {
    const template = new ForgotTemplate(data);
    const templateBuilder = new EjsTemplateBuilder(template);
    return templateBuilder.build();
};

export default forgotTemplateFactory;