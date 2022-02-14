export default interface HashPasswordService {
    hash(password: string): string;
}