
import { DescuentoNormal } from "../descuentos/DescuentoNormal.js";
import { DescuentoPremium } from "../descuentos/DescuentoPremium.js";
import { DescuentoVIP } from "../descuentos/DescuentoVIP.js";
import { DescuentoMayorista } from "../descuentos/DescuentoMayorista.js";

export class PedidoService {
  constructor() {
    this.pedidos = [];
  }

  registrar(pedido, tipoCliente, tipoEnvio) {
   let subtotal = 0;

for (const producto of pedido.productos) {
  subtotal += producto.precio;
}

let estrategiaDescuento;

if (tipoCliente === "premium") {
  estrategiaDescuento = new DescuentoPremium();
} else if (tipoCliente === "vip") {
  estrategiaDescuento = new DescuentoVIP();
} else if (tipoCliente === "mayorista") {
  estrategiaDescuento = new DescuentoMayorista();
} else {
  estrategiaDescuento = new DescuentoNormal();
}

let total = estrategiaDescuento.aplicar(subtotal);

    let costoEnvio = 0;

    if (tipoEnvio === "normal") {
      costoEnvio = 1000;
    }

    if (tipoEnvio === "express") {
      costoEnvio = 2000;
    }

    total += costoEnvio;
    this.pedidos.push({ pedido, total });

    localStorage.setItem("pedidos", JSON.stringify(this.pedidos));
    console.log(`Email enviado a ${pedido.cliente.email}`);

    return total;
  }
}
