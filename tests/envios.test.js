import { describe, expect, test } from "@jest/globals";
import { EnvioNormal } from "../src/envios/EnvioNormal.js";
import { EnvioExpress } from "../src/envios/EnvioExpress.js";
import { RetiroLocal } from "../src/envios/RetiroLocal.js";

describe("Estrategias de envío", () => {
  test("el envío normal cuesta 1000", () => {
    expect(new EnvioNormal().calcularCosto()).toBe(1000);
  });

  test("el envío express cuesta 2000", () => {
    expect(new EnvioExpress().calcularCosto()).toBe(2000);
  });

  test("el retiro en local no tiene costo", () => {
    expect(new RetiroLocal().calcularCosto()).toBe(0);
  });
});