import { DescuentoNormal } from "../descuentos/DescuentoNormal.js";
import { DescuentoPremium } from "../descuentos/DescuentoPremium.js";
import { DescuentoVIP } from "../descuentos/DescuentoVIP.js";
import { DescuentoMayorista } from "../descuentos/DescuentoMayorista.js";

import { EnvioNormal } from "../envios/EnvioNormal.js";
import { EnvioExpress } from "../envios/EnvioExpress.js";
import { RetiroLocal } from "../envios/RetiroLocal.js";

export class PedidoEstrategiasFactory {
  crearDescuento(tipoCliente) {
    const descuentos = {
      normal: DescuentoNormal,
      premium: DescuentoPremium,
      vip: DescuentoVIP,
      mayorista: DescuentoMayorista,
    };

    const Descuento = descuentos[tipoCliente] ?? DescuentoNormal;

    return new Descuento();
  }

  crearEnvio(tipoEnvio) {
    const envios = {
      normal: EnvioNormal,
      express: EnvioExpress,
      retiroLocal: RetiroLocal,
    };

    const Envio = envios[tipoEnvio] ?? EnvioNormal;

    return new Envio();
  }
}