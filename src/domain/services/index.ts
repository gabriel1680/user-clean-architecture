// export { default as HashPasswordService } from "./HashPasswordService";
// export { default as UniqueIdGeneratorService } from "./UniqueIdGeneratorService";

export interface UniqueIdGeneratorService {
  generate(): string;
}

export interface HashPasswordService {
  hash(password: string): string;
}