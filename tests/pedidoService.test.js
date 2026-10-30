

import { describe, expect, test, beforeEach } from "@jest/globals";

import { Producto } from "../src/models/Producto.js";
import { Pedido } from "../src/models/Pedido.js";
import { PedidoService } from "../src/services/PedidoService.js";

describe("PedidoService: caracterizacion antes de refactorizar", () => {
  beforeEach(() => {
    const almacenamiento = {};

    global.localStorage = {
      setItem(clave, valor) {
        almacenamiento[clave] = valor;
      },

      getItem(clave) {
        return almacenamiento[clave] ?? null;
      },
    };
  });

  test("cliente normal con envio normal paga subtotal mas 1000", () => {
    const pedido = new Pedido(
      { nombre: "Ana", email: "ana@example.com" },
      [
        new Producto(1, "Cuaderno", 3000),
        new Producto(2, "Lapicera", 1000),
      ],
    );

    const service = new PedidoService();

    const total = service.registrar(pedido, "normal", "normal");

    expect(total).toBe(5000);
  });

  test("cliente premium recibe 10% de descuento sobre los productos", () => {
    const pedido = new Pedido(
      { nombre: "Ana", email: "ana@example.com" },
      [
        new Producto(1, "Cuaderno", 3000),
        new Producto(2, "Lapicera", 1000),
      ],
    );

    const service = new PedidoService();

    const total = service.registrar(pedido, "premium", "normal");

    expect(total).toBe(4600);
  });

  test("cliente VIP recibe 20% de descuento sobre los productos", () => {
    const pedido = new Pedido(
      { nombre: "Ana", email: "ana@example.com" },
      [
        new Producto(1, "Cuaderno", 3000),
        new Producto(2, "Lapicera", 1000),
      ],
    );

    const service = new PedidoService();

    const total = service.registrar(pedido, "vip", "normal");

    expect(total).toBe(4200);
  });

  test("cliente mayorista recibe 25% de descuento sobre los productos", () => {
    const pedido = new Pedido(
      { nombre: "Empresa", email: "empresa@example.com" },
      [
        new Producto(1, "Cuaderno", 3000),
        new Producto(2, "Lapicera", 1000),
      ],
    );

    const service = new PedidoService();

    const total = service.registrar(pedido, "mayorista", "normal");

    expect(total).toBe(4000);
  });

  test("retiro en local no agrega costo de envio", () => {
    const pedido = new Pedido(
      { nombre: "Ana", email: "ana@example.com" },
      [new Producto(1, "Cuaderno", 3000)],
    );

    const service = new PedidoService();

    const total = service.registrar(pedido, "normal", "retiroLocal");

    expect(total).toBe(3000);
  });

  test("envio express agrega 2000", () => {
    const pedido = new Pedido(
      { nombre: "Ana", email: "ana@example.com" },
      [new Producto(1, "Cuaderno", 3000)],
    );

    const service = new PedidoService();

    const total = service.registrar(pedido, "normal", "express");

    expect(total).toBe(5000);
  });

  test("el descuento no se aplica al costo de envio", () => {
    const pedido = new Pedido(
      { nombre: "Ana", email: "ana@example.com" },
      [new Producto(1, "Cuaderno", 3000)],
    );

    const service = new PedidoService();

    const total = service.registrar(pedido, "premium", "normal");

    expect(total).toBe(3700);
  });

  test("combina distintos tipos de cliente y envio", () => {
    const pedido = new Pedido(
      { nombre: "Ana", email: "ana@example.com" },
      [
        new Producto(1, "Cuaderno", 3000),
        new Producto(2, "Lapicera", 1000),
      ],
    );

    const service = new PedidoService();

    const total = service.registrar(pedido, "vip", "express");

    expect(total).toBe(5200);
  });

  test("conserva correctamente un total con decimales", () => {
    const pedido = new Pedido(
      { nombre: "Ana", email: "ana@example.com" },
      [
        new Producto(1, "Producto A", 10.5),
        new Producto(2, "Producto B", 20.25),
      ],
    );

    const service = new PedidoService();

    const total = service.registrar(pedido, "normal", "normal");

    expect(total).toBeCloseTo(1030.75);
  });

  test("registra el pedido y el total en memoria", () => {
    const pedido = new Pedido(
      { nombre: "Ana", email: "ana@example.com" },
      [new Producto(1, "Cuaderno", 3000)],
    );

    const service = new PedidoService();

    const total = service.registrar(pedido, "normal", "normal");

    expect(service.pedidos).toHaveLength(1);
    expect(service.pedidos[0].pedido).toBe(pedido);
    expect(service.pedidos[0].total).toBe(total);
  });

  test("conserva dos pedidos registrados con la misma instancia", () => {
    const pedido1 = new Pedido(
      { nombre: "Ana", email: "ana@example.com" },
      [new Producto(1, "Cuaderno", 3000)],
    );

    const pedido2 = new Pedido(
      { nombre: "Juan", email: "juan@example.com" },
      [new Producto(2, "Lapicera", 1000)],
    );

    const service = new PedidoService();

    service.registrar(pedido1, "normal", "normal");
    service.registrar(pedido2, "normal", "express");

    expect(service.pedidos).toHaveLength(2);

    expect(service.pedidos[0].pedido).toBe(pedido1);
    expect(service.pedidos[0].total).toBe(4000);

    expect(service.pedidos[1].pedido).toBe(pedido2);
    expect(service.pedidos[1].total).toBe(3000);
  });
});
