
import { describe, expect, test } from "@jest/globals";
import { Producto } from "../src/models/Producto.js";
import { Pedido } from "../src/models/Pedido.js";

describe("Modelos: completar sin agregar responsabilidades innecesarias", () => {
  test("Producto conserva su id, nombre y precio", () => {
    const producto = new Producto(1, "Cuaderno", 3000);

    expect(producto.id).toBe(1);
    expect(producto.nombre).toBe("Cuaderno");
    expect(producto.precio).toBe(3000);
  });

  test("Pedido conserva su cliente y sus productos", () => {
    const cliente = {
      nombre: "Ana",
      email: "ana@example.com",
    };

    const productos = [
      new Producto(1, "Cuaderno", 3000),
      new Producto(2, "Lapicera", 1000),
    ];

    const pedido = new Pedido(cliente, productos);

    expect(pedido.cliente).toBe(cliente);
    expect(pedido.productos).toBe(productos);
  });

  test("Pedido comienza con productos vacios cuando se omiten", () => {
    const cliente = {
      nombre: "Ana",
      email: "ana@example.com",
    };

    const pedido = new Pedido(cliente);

    expect(pedido.productos).toEqual([]);
  });

  test("dos pedidos creados sin productos no comparten el mismo arreglo", () => {
    const pedido1 = new Pedido({ nombre: "Ana" });
    const pedido2 = new Pedido({ nombre: "Juan" });

    pedido1.productos.push(new Producto(1, "Cuaderno", 3000));

    expect(pedido1.productos).toHaveLength(1);
    expect(pedido2.productos).toEqual([]);
  });
});