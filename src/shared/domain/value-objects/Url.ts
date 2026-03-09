import { DomainError } from '../DomainError';

const urlPattern = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?(\?.*)?(#.*)?$/;

export class Url {
  private constructor(readonly value: string) {}

  static create(value: string): Url {
    if (!value || value.trim() === '') {
      throw DomainError.createValidation('URL cannot be empty');
    }
    if (!urlPattern.test(value.trim())) {
      throw DomainError.createValidation('Invalid URL format');
    }
    return new Url(value.trim());
  }

  static isValid(value: string): boolean {
    if (!value || value.trim() === '') return false;
    return urlPattern.test(value.trim());
  }

  equals(other: Url): boolean {
    return this.value === other.value;
  }

  toPrimitives(): string {
    return this.value;
  }
}
