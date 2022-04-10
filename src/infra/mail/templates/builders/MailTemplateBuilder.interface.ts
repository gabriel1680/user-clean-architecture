export default interface MailTemplateBuilder
{
    build(): Promise<string>;
}