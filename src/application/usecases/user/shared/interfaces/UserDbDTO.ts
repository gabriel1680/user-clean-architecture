export default interface UserDbDTO
{
    id: string;
    first_name: string;
    last_name: string;
    email: string;
    password: string;
    role: string;
    confirm_link?: string;
    forgot_token?: string;
    created_at: Date;
    updated_at?: Date;
}