# Mini Proyecto: Refactorización, SOLID y Testing

## Integrante

- Cecilia Rodriguez


## Descripción del sistema

Este proyecto consiste en un sistema de gestión de pedidos para una tienda. Permite registrar productos, crear pedidos, calcular totales, aplicar descuentos según el tipo de cliente, seleccionar un método de envío, guardar pedidos y notificar al cliente.

El objetivo del trabajo es mejorar la organización del código mediante refactorización, aplicar principios SOLID cuando corresponda y comprobar que el comportamiento del sistema se mantenga mediante pruebas automatizadas con Jest.

## Problemas encontrados

Inicialmente, la clase `PedidoService` concentraba varias tareas: calcular los totales, seleccionar los descuentos y los envíos, guardar los pedidos y notificar al cliente.

Esto dificultaba la separación de responsabilidades y hacía que el servicio dependiera directamente de las distintas clases concretas de descuentos y envíos.

## Refactorizaciones realizadas

### 1. Separación de estrategias de descuento

Se crearon clases independientes para cada tipo de descuento:

- `DescuentoNormal`
- `DescuentoPremium`
- `DescuentoVIP`
- `DescuentoMayorista`

Cada clase implementa su propio método `aplicar()`. De esta manera, cada estrategia se encarga de calcular el descuento correspondiente.

### 2. Separación de estrategias de envío

Se crearon clases independientes para los distintos métodos de envío:

- `EnvioNormal`
- `EnvioExpress`
- `RetiroLocal`

Cada clase implementa el método `calcularCosto()`, que devuelve el costo correspondiente.

### 3. Creación de PedidoEstrategiasFactory

Se creó `PedidoEstrategiasFactory` para centralizar la selección y creación de las estrategias de descuento y envío.

Así, `PedidoService` no necesita seleccionar directamente cada clase concreta mediante bloques de condiciones.

### 4. Separación de persistencia y notificación

Se crearon las clases:

- `LocalStoragePedidoRepository`, responsable de guardar los pedidos en `localStorage`.
- `EmailNotificador`, responsable de realizar la notificación simulada mediante la consola.

Esto permite modificar esas implementaciones sin incorporar sus detalles dentro de `PedidoService`.

### 5. Inyección de dependencias

`PedidoService` recibe el repositorio, el notificador y la factory mediante su constructor. Si no se proporcionan, utiliza las implementaciones predeterminadas.

Esto permite reemplazar esas dependencias por otras implementaciones y facilita las pruebas automatizadas.

## Principios SOLID aplicados

### SRP — Principio de responsabilidad única

Se separaron responsabilidades que antes estaban concentradas en `PedidoService`, como la selección de estrategias, la persistencia y la notificación.

### OCP — Principio abierto/cerrado

Las estrategias de descuento y envío permiten definir comportamientos mediante clases independientes. La factory centraliza la selección de esas estrategias.

Sin embargo, para incorporar un nuevo tipo también hay que actualizar el mapa correspondiente de la factory; por eso, la extensión todavía requiere modificar ese punto.

### DIP — Principio de inversión de dependencias

`PedidoService` recibe sus dependencias mediante el constructor, en lugar de tener que crear obligatoriamente todas sus implementaciones dentro del servicio. Esto permite sustituirlas y probar el servicio de forma aislada.

No se aplicaron todos los principios SOLID de manera forzada. Los cambios se realizaron en función de los problemas identificados en el diseño.

## Testing

Se utiliza Jest para ejecutar pruebas automatizadas.

Las pruebas verifican:

- Los cálculos de los descuentos normal, premium, VIP y mayorista.
- Los costos de envío normal, express y retiro local.
- El cálculo del total y la aplicación del descuento solamente sobre los productos.
- La combinación de diferentes tipos de cliente y envío.
- El registro de uno o varios pedidos.
- La selección de estrategias mediante la factory.

Las pruebas se ejecutan antes y después de los cambios para comprobar que se mantenga el comportamiento esperado.

## Cómo ejecutar el proyecto

Instalar las dependencias:

```bash
npm install
```

Iniciar la aplicación, si el proyecto tiene configurado el script `dev`:

```bash
npm run dev
```

## Cómo ejecutar los tests

Ejecutar todas las pruebas automatizadas:

```bash
npm test
```

## ¿Por qué realizamos estos cambios?

El objetivo no fue aplicar todos los principios SOLID obligatoriamente, sino mejorar el diseño del sistema.

Separamos las responsabilidades para que cada clase tenga una función más clara, centralizamos la selección de estrategias y permitimos inyectar dependencias para facilitar las pruebas y los futuros cambios.

Después de cada refactorización, ejecutamos los tests para comprobar que los comportamientos cubiertos por las pruebas continuaran funcionando correctamente.
