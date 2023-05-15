export interface UniqueIdGeneratorService {
  generate(): string;
}

export interface HashPasswordService {
  hash(password: string): string;
}