import { describe, expect, it } from "vitest";
import { clampToBody, edgeScrollStep } from "./gridAutoScroll";

describe("edgeScrollStep", () => {
  it("no mueve nada con el puntero dentro del area", () => {
    expect(edgeScrollStep(100, 50, 400)).toBe(0);
    expect(edgeScrollStep(50, 50, 400)).toBe(0);
    expect(edgeScrollStep(400, 50, 400)).toBe(0);
  });

  it("avanza hacia el lado por el que se salio el puntero", () => {
    expect(edgeScrollStep(40, 50, 400)).toBeLessThan(0);
    expect(edgeScrollStep(410, 50, 400)).toBeGreaterThan(0);
  });

  it("va mas rapido cuanto mas lejos y se frena en un tope", () => {
    expect(edgeScrollStep(500, 50, 400)).toBeGreaterThan(edgeScrollStep(410, 50, 400));
    expect(edgeScrollStep(5000, 50, 400)).toBe(48);
    expect(edgeScrollStep(-5000, 50, 400)).toBe(-48);
  });
});

describe("clampToBody", () => {
  it("deja el punto si cae dentro del margen", () => {
    expect(clampToBody(100, 50, 400, 10)).toBe(100);
  });

  it("lo lleva al borde interior si se sale", () => {
    expect(clampToBody(0, 50, 400, 10)).toBe(60);
    expect(clampToBody(900, 50, 400, 10)).toBe(390);
  });
});
