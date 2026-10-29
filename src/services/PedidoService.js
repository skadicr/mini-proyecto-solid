
// import { DescuentoNormal } from "../descuentos/DescuentoNormal.js";
// import { DescuentoPremium } from "../descuentos/DescuentoPremium.js";
// import { DescuentoVIP } from "../descuentos/DescuentoVIP.js";
// import { DescuentoMayorista } from "../descuentos/DescuentoMayorista.js";

// import { EnvioNormal } from "../envios/EnvioNormal.js";
// import { EnvioExpress } from "../envios/EnvioExpress.js";
// import { RetiroLocal } from "../envios/RetiroLocal.js";

import { LocalStoragePedidoRepository } from "../repositories/LocalStoragePedidoRepository.js";
import { EmailNotificador } from "../notifications/EmailNotificador.js";
import { PedidoEstrategiasFactory } from "./PedidoEstrategiasFactory.js";

export class PedidoService {
  
  constructor(
  repository = new LocalStoragePedidoRepository(),
  notificador = new EmailNotificador(),
  estrategiasFactory = new PedidoEstrategiasFactory(),
) {
  this.pedidos = [];
  this.repository = repository;
  this.notificador = notificador;
  this.estrategiasFactory = estrategiasFactory;
}

  registrar(pedido, tipoCliente, tipoEnvio) {
    let subtotal = 0;

    for (const producto of pedido.productos) {
      subtotal += producto.precio;
    }

  const estrategiaDescuento =
  this.estrategiasFactory.crearDescuento(tipoCliente);

  let total = estrategiaDescuento.aplicar(subtotal);


    const estrategiaEnvio =
    this.estrategiasFactory.crearEnvio(tipoEnvio);

     const costoEnvio = estrategiaEnvio.calcularCosto();

    total += costoEnvio;

    this.pedidos.push({ pedido, total });

    this.repository.guardar(this.pedidos);
    this.notificador.notificar(pedido);

    return total;
  }
}
