import { describe, it, expect } from 'vitest';
import { Url } from '../../domain/value-objects/Url';
import { DomainError } from '../../domain/DomainError';

describe('The Url value object', () => {
  it('creates a URL with https protocol', () => {
    const url = Url.create('https://www.youtube.com/watch?v=abc123');

    expect(url.value).toBe('https://www.youtube.com/watch?v=abc123');
  });

  it('creates a URL without protocol', () => {
    const url = Url.create('youtube.com/watch?v=abc123');

    expect(url.value).toBe('youtube.com/watch?v=abc123');
  });

  it('throws a validation DomainError for empty URL', () => {
    try {
      Url.create('');
      expect.fail('Should have thrown');
    } catch (error) {
      expect(error).toBeInstanceOf(DomainError);
      expect((error as DomainError).type).toBe('validation');
      expect((error as DomainError).message).toBe('URL cannot be empty');
    }
  });

  it('throws a validation DomainError for malformed URL', () => {
    try {
      Url.create(':::invalid');
      expect.fail('Should have thrown');
    } catch (error) {
      expect(error).toBeInstanceOf(DomainError);
      expect((error as DomainError).type).toBe('validation');
      expect((error as DomainError).message).toBe('Invalid URL format');
    }
  });

  it('returns true from isValid for a valid URL', () => {
    expect(Url.isValid('https://youtube.com/watch?v=abc')).toBe(true);
  });

  it('returns false from isValid for an empty string', () => {
    expect(Url.isValid('')).toBe(false);
  });

  it('returns false from isValid for a malformed URL', () => {
    expect(Url.isValid(':::invalid')).toBe(false);
  });

  it('considers two URLs equal when they have the same value', () => {
    const url1 = Url.create('https://youtube.com/watch?v=abc');
    const url2 = Url.create('https://youtube.com/watch?v=abc');

    expect(url1.equals(url2)).toBe(true);
  });

  it('considers two URLs different when they have different values', () => {
    const url1 = Url.create('https://youtube.com/watch?v=abc');
    const url2 = Url.create('https://youtube.com/watch?v=xyz');

    expect(url1.equals(url2)).toBe(false);
  });
});
