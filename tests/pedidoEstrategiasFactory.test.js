
import { describe, expect, test } from "@jest/globals";
import { PedidoEstrategiasFactory } from "../src/services/PedidoEstrategiasFactory.js";

describe("PedidoEstrategiasFactory", () => {
  const factory = new PedidoEstrategiasFactory();

  test("crea el descuento premium", () => {
    const descuento = factory.crearDescuento("premium");

    expect(descuento.aplicar(1000)).toBe(900);
  });

  test("crea el descuento VIP", () => {
    const descuento = factory.crearDescuento("vip");

    expect(descuento.aplicar(1000)).toBe(800);
  });

  test("crea el descuento mayorista", () => {
    const descuento = factory.crearDescuento("mayorista");

    expect(descuento.aplicar(1000)).toBe(700);
  });

  test("crea el descuento normal para un tipo desconocido", () => {
    const descuento = factory.crearDescuento("desconocido");

    expect(descuento.aplicar(1000)).toBe(1000);
  });

  test("crea el envío express", () => {
    const envio = factory.crearEnvio("express");

    expect(envio.calcularCosto()).toBe(2000);
  });

  test("crea el retiro local", () => {
    const envio = factory.crearEnvio("retiroLocal");

    expect(envio.calcularCosto()).toBe(0);
  });

  test("crea el envío normal para un tipo desconocido", () => {
    const envio = factory.crearEnvio("desconocido");

    expect(envio.calcularCosto()).toBe(1000);
  });
});
