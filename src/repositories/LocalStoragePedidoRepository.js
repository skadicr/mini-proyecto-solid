
export class LocalStoragePedidoRepository {
  guardar(pedidos) {
    localStorage.setItem("pedidos", JSON.stringify(pedidos));
  }
}
