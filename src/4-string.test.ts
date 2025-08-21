import { describe, expect, it } from "vitest";
import { z } from "zod";

describe("Zod string constraints", () => {
  it("z.string().max(5)", () => {
    const schema = z.string().max(5);
    expect(schema.parse("12345")).toBe("12345");
    expect(() => schema.parse("123456")).toThrow();
  });

  it("z.string().min(5)", () => {
    const schema = z.string().min(5);
    expect(schema.parse("12345")).toBe("12345");
    expect(() => schema.parse("1234")).toThrow();
  });

  it("z.string().length(5)", () => {
    const schema = z.string().length(5);
    expect(schema.parse("12345")).toBe("12345");
    expect(() => schema.parse("1234")).toThrow();
    expect(() => schema.parse("123456")).toThrow();
  });

  it("z.string().regex(/^[a-z]+$/)", () => {
    const schema = z.string().regex(/^[a-z]+$/);
    expect(schema.parse("abc")).toBe("abc");
    expect(() => schema.parse("ABC")).toThrow();
    expect(() => schema.parse("abc123")).toThrow();
  });

  it('z.string().startsWith("aaa")', () => {
    const schema = z.string().startsWith("aaa");
    expect(schema.parse("aaa123")).toBe("aaa123");
    expect(() => schema.parse("123aaa")).toThrow();
  });

  it('z.string().endsWith("zzz")', () => {
    const schema = z.string().endsWith("zzz");
    expect(schema.parse("123zzz")).toBe("123zzz");
    expect(() => schema.parse("zzz123")).toThrow();
  });

  it('z.string().includes("---")', () => {
    const schema = z.string().includes("---");
    expect(schema.parse("abc---def")).toBe("abc---def");
    expect(() => schema.parse("abcdef")).toThrow();
  });

  it("z.string().uppercase()", () => {
    // Accepts only uppercase strings
    const schema = z.string().uppercase();
    expect(schema.parse("ABC")).toBe("ABC");
    expect(() => schema.parse("Abc")).toThrow();
    expect(() => schema.parse("abc")).toThrow();
  });

  it("z.string().lowercase()", () => {
    // Accepts only lowercase strings
    const schema = z.string().lowercase();
    expect(schema.parse("abc")).toBe("abc");
    expect(() => schema.parse("Abc")).toThrow();
    expect(() => schema.parse("ABC")).toThrow();
  });

  it("z.string().trim()", () => {
    const schema = z.string().trim();
    expect(schema.parse("  hello  ")).toBe("hello");
    expect(schema.parse("  a b  ")).toBe("a b");
  });

  it("z.string().toLowerCase()", () => {
    const schema = z.string().toLowerCase();
    expect(schema.parse("AbC")).toBe("abc");
  });

  it("z.string().toUpperCase()", () => {
    const schema = z.string().toUpperCase();
    expect(schema.parse("Abc")).toBe("ABC");
  });

  it("z.string().normalize()", () => {
    const schema = z.string().normalize();
    // "e" + combining acute accent -> should normalize to precomposed "é"
    const decomposed = "e\u0301";
    expect(schema.parse(decomposed)).toBe("é");
  });
});
