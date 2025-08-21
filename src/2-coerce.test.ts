import { describe, expect, it } from "vitest";
import { z } from "zod";

describe("Zod coerce", () => {
  it("z.coerce.number() converts a string number into a number", () => {
    const schema = z.coerce.number();
    expect(schema.parse("42")).toBe(42);
  });

  it("z.coerce.number() rejects invalid number strings", () => {
    const schema = z.coerce.number();
    expect(() => schema.parse("not-a-number")).toThrow();
  });

  it("z.coerce.boolean() converts a string boolean into a boolean", () => {
    const schema = z.coerce.boolean();
    expect(schema.parse("true")).toBe(true);
    // because of the coerce, string "false" is true
    expect(schema.parse("false")).toBe(true);
  });

  it("z.coerce.date() converts a string date into a Date object", () => {
    const schema = z.coerce.date();
    const result = schema.parse("2023-01-01");
    expect(result).toBeInstanceOf(Date);
    expect(result.toISOString()).toBe("2023-01-01T00:00:00.000Z");
  });

  it("works inside an object schema with z.coerce", () => {
    const schema = z.object({
      age: z.coerce.number(),
      active: z.coerce.boolean(),
      joined: z.coerce.date(),
    });

    const result = schema.parse({
      age: "30",
      active: "true",
      joined: "2023-01-01",
    });

    expect(result).toEqual({
      age: 30,
      active: true,
      joined: new Date("2023-01-01"),
    });
  });
});
