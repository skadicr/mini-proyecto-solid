import { describe, expect, test } from "@jest/globals";
import { DescuentoNormal } from "../src/descuentos/DescuentoNormal.js";
import { DescuentoPremium } from "../src/descuentos/DescuentoPremium.js";
import { DescuentoVIP } from "../src/descuentos/DescuentoVIP.js";
import { DescuentoMayorista } from "../src/descuentos/DescuentoMayorista.js";

describe("Estrategias de descuento", () => {
  test("el cliente normal no recibe descuento", () => {
    expect(new DescuentoNormal().aplicar(10000)).toBe(10000);
  });

  test("el cliente premium recibe un 10% de descuento", () => {
    expect(new DescuentoPremium().aplicar(10000)).toBe(9000);
  });

  test("el cliente VIP recibe un 20% de descuento", () => {
    expect(new DescuentoVIP().aplicar(10000)).toBe(8000);
  });

  test("el cliente mayorista recibe un 30% de descuento", () => {
  expect(new DescuentoMayorista().aplicar(10000)).toBe(7000);
});

});