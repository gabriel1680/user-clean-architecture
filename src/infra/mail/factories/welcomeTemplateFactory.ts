import { WelcomeTemplate, WelcomeData } from "../templates";
import { EjsTemplateBuilder } from "../templates/builders";


async function welcomeTemplateFactory(data: WelcomeData): Promise<string> {
    const template = new WelcomeTemplate(data);
    const templateBuilder = new EjsTemplateBuilder(template);
    return templateBuilder.build();
};

export default welcomeTemplateFactory;