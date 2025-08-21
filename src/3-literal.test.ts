import { describe, expect, it } from "vitest";
import { z } from "zod";

describe("Zod literal", () => {
  it('z.literal("admin") accepts the exact string value', () => {
    const schema = z.literal("admin");
    expect(schema.parse("admin")).toBe("admin");
  });

  it('z.literal("admin") rejects other string values', () => {
    const schema = z.literal("admin");
    expect(() => schema.parse("user")).toThrow();
  });

  it("z.literal(42) accepts the exact number value", () => {
    const schema = z.literal(42);
    expect(schema.parse(42)).toBe(42);
  });

  it("z.literal(42) rejects other numbers", () => {
    const schema = z.literal(42);
    expect(() => schema.parse(99)).toThrow();
  });

  it("z.literal(true) accepts the exact boolean value", () => {
    const schema = z.literal(true);
    expect(schema.parse(true)).toBe(true);
  });

  it("z.literal(true) rejects other boolean values", () => {
    const schema = z.literal(true);
    expect(() => schema.parse(false)).toThrow();
  });
});

describe("Zod literal with enum", () => {
  const StatusSchema = z.enum(["pending", "success", "error"]);

  it("z.enum([...]) accepts allowed values", () => {
    expect(StatusSchema.parse("pending")).toBe("pending");
    expect(StatusSchema.parse("success")).toBe("success");
    expect(StatusSchema.parse("error")).toBe("error");
  });

  it("z.enum([...]) rejects values not in the enum", () => {
    expect(() => StatusSchema.parse("failed")).toThrow();
    expect(() => StatusSchema.parse("done")).toThrow();
  });

  it("infers a union type from enum", () => {
    type Status = z.infer<typeof StatusSchema>;
    const test: Status = "pending"; // ✅ valid
    // @ts-expect-error
    const bad: Status = "done"; // ❌ invalid in TS
  });
});
