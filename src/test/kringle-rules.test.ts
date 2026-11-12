import { describe, expect, it } from "vitest";
import { bundleSaving } from "@/config/catalog";
import { arrivalStatus } from "@/config/delivery";
import { niceScore } from "@/config/quiz";
import { nextChapter } from "@/config/brand";
import { validateStep, initialState } from "@/components/kp/builder/types";

describe("savings badges only where the maths is true", () => {
  it("Magic Bundle 19.99 vs video 12.99 + letter 6.99 + certificate 4.99 saves 4.98", () => {
    expect(bundleSaving(19.99, [{ price: 12.99, qty: 1 }, { price: 6.99, qty: 1 }, { price: 4.99, qty: 1 }])).toBe(4.98);
  });
  it("Family Pack 39.99 vs 3 x video 12.99 (38.97) shows no saving", () => {
    expect(bundleSaving(39.99, [{ price: 12.99, qty: 3 }])).toBeNull();
  });
});

describe("Will it arrive by Christmas?", () => {
  it("is green more than 7 days before the cutoff", () => {
    expect(arrivalStatus("2026-12-15", new Date(2026, 10, 12))).toBe("green");
  });
  it("is amber within 7 days of the cutoff", () => {
    expect(arrivalStatus("2026-12-15", new Date(2026, 11, 10))).toBe("amber");
  });
  it("is still amber on the cutoff day itself", () => {
    expect(arrivalStatus("2026-12-15", new Date(2026, 11, 15, 20))).toBe("amber");
  });
  it("is red the day after the cutoff", () => {
    expect(arrivalStatus("2026-12-15", new Date(2026, 11, 16, 0, 1))).toBe("red");
  });
});

describe("Nice List quiz", () => {
  it("all nicest answers score 99%", () => {
    expect(niceScore([3, 3, 3, 3, 3, 3])).toBe(99);
  });
  it("cheekiest answers still land on the Nice List at 82%", () => {
    expect(niceScore([1, 1, 1, 1, 1, 1])).toBe(82);
  });
});

describe("continuous paging", () => {
  it("the last chapter loops back to the front page", () => {
    expect(nextChapter("/faq")?.to).toBe("/");
  });
  it("the front page leads to the Santa message workshop", () => {
    expect(nextChapter("/")?.to).toBe("/create");
  });
});

describe("builder validation", () => {
  it("requires the child's name", () => {
    expect(validateStep(0, { ...initialState(), age: "6" })).not.toBeNull();
  });
  it("requires the buyer's email before delivery", () => {
    expect(validateStep(6, { ...initialState(), buyerEmail: "" })).not.toBeNull();
    expect(validateStep(6, { ...initialState(), buyerEmail: "mum@example.com" })).toBeNull();
  });
  it("Family Pack needs all three children's names", () => {
    expect(validateStep(7, { ...initialState(), extraNames: ["Leo", ""] }, 3)).not.toBeNull();
  });
});
