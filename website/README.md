# Syncrodyson · Mercado

Aplicación móvil compartida en **PHP 8.2+ / MySQL 8 o MariaDB 10.4+**, con Tabler 1.7.1 en modo oscuro. No requiere Node en producción, Composer, sockets, cron ni servicios externos. Tabler y el generador QR se sirven desde `assets/vendor/`, con sus licencias MIT.

PHP necesita las extensiones `pdo_mysql` y `mbstring` (además de JSON, incluido en PHP 8).

## Qué subir al hosting

Subí **todo el contenido de `website/`, incluidos los archivos ocultos**, a la carpeta del dominio que tengas disponible. Sirve tanto en la raíz del dominio como en una subcarpeta, por ejemplo `https://tudominio.com/mercado/`. Ya no hay una carpeta `public/` ni hace falta escribir fuera del espacio público del hosting.

```text
public_html/mercado/     o la carpeta asignada por tu hosting
  .htaccess             protección, HTTPS y acceso a archivos
  .user.ini             errores PHP ocultos
  .env                  creada a partir de .env.example
  config.php
  index.php
  api.php
  assets/
  src/
  database/
  bin/
```

El hosting necesita **Apache 2.4 o LiteSpeed compatible con `.htaccess`**, `mod_rewrite` y permisos de `AllowOverride` para estas reglas. Apache puede ignorar `.htaccess` si el proveedor lo deshabilita: comprobá los bloqueos indicados más abajo antes de cargar credenciales reales. Conservá las licencias incluidas en `assets/vendor/`.

## Instalar

1. Creá una base vacía y un usuario dedicado. Ejemplo, con una cuenta administradora de MySQL:

   ```sql
   CREATE DATABASE syncrodyson CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
   CREATE USER 'syncrodyson'@'localhost' IDENTIFIED BY 'elegir-una-clave';
   GRANT SELECT, INSERT, UPDATE, DELETE, CREATE, REFERENCES ON syncrodyson.* TO 'syncrodyson'@'localhost';
   ```

2. Copiá `.env.example` a `.env` y completá la conexión. También se admiten las variables de entorno `DB_DSN`, `DB_USER` y `DB_PASSWORD`. La contraseña no se versiona.

3. Desde `website/`, ejecutá una vez:

   ```sh
   php bin/init.php
   ```

   La instalación es idempotente. `database/mysql.sql` también puede importarse desde phpMyAdmin. Después de instalar se puede retirar el permiso CREATE al usuario de ejecución.

4. Activá el certificado SSL del dominio desde el panel del hosting. Abrí la carpeta de la app por HTTPS. `.htaccess` redirige HTTP a HTTPS con código 308, conservando la ruta y los parámetros; no puede emitir o instalar un certificado.

## Protección incluida

- Acceso HTTP denegado a `.env`, archivos ocultos, `config.php`, SQL, logs, documentación y copias de respaldo.
- Carpetas `src/`, `database/` y `bin/` bloqueadas por las reglas raíz y por un `.htaccess` propio. PHP puede seguir leyendo sus archivos internamente.
- Solo se publican `index.php`, `api.php` y los tipos de archivos estáticos permitidos dentro de `assets/`.
- Listado de directorios y MultiViews desactivados; métodos de la aplicación limitados a GET, HEAD y POST. Apache procesa TRACE antes de `.htaccess`; desactivarlo requiere `TraceEnable Off` en la configuración del hosting, no en este archivo.
- Límite de 32 KiB por cuerpo de petición.
- HTTPS obligatorio y HSTS de un día, sin `includeSubDomains`. HSTS afecta al hostname completo, aunque la app esté en una subcarpeta.
- CSP, bloqueo de iframes, `nosniff`, política de referencias y permisos restringidos. No se habilita CORS.
- Errores PHP ocultos y registro de errores habilitado. Cabecera `X-Powered-By` eliminada.
- Reenvío de la cabecera Authorization para conservar el acceso de los jugadores con FastCGI.

Las cabeceras para archivos estáticos requieren `mod_headers`; las páginas PHP también las envían directamente. La protección de archivos y la redirección no se omiten silenciosamente si falta `mod_rewrite`.

Después de subir, verificá que `https://tudominio.com/mercado/.env.example`, `config.php`, `src/Market.php` y `database/mysql.sql` respondan **403** y que la página y sus estilos sí carguen. Podés hacer esta comprobación con `.env.example` antes de crear el `.env` real. Entrar por HTTP debe redirigir a la misma ruta por HTTPS.

Si aparece un error 500, consultá el log del hosting: puede faltar un módulo o permiso para alguna directiva. No borres las reglas de protección para hacerlo funcionar. Si aparece un bucle de HTTPS porque el proveedor termina TLS en un proxy, el hosting debe indicar cómo informa de forma confiable la conexión segura; no se confía automáticamente en `X-Forwarded-Proto` enviado por el cliente.

Referencias: [archivos .htaccess de Apache](https://httpd.apache.org/docs/2.4/howto/htaccess.html), [reglas de reescritura](https://httpd.apache.org/docs/2.4/rewrite/flags.html) y [cabeceras HTTP](https://httpd.apache.org/docs/2.4/mod/mod_headers.html).

### Prueba local

Con MySQL iniciado y `.env` configurado:

```sh
php -S 127.0.0.1:8080
```

Abrí <http://127.0.0.1:8080>. Para probar varios jugadores en una computadora, usá perfiles de navegador distintos. Dos pestañas del mismo perfil comparten jugador.

El servidor integrado de PHP ignora `.htaccess`: usalo solamente en loopback para desarrollo con datos de prueba, sin exponerlo a otros equipos. Para probar las protecciones y compartir con celulares, usá Apache/LiteSpeed con HTTPS. Un QR con `localhost` apunta al propio teléfono y no sirve para compartir.

## Qué incluye

- Crear una sala, entrar por código alfanumérico de ocho caracteres o QR y comenzar con un solo jugador o en grupo. Hasta 12 por sala.
- Escanear el QR de otra sala reemplaza el acceso local anterior y une automáticamente al jugador con el mismo nombre. Si es su primera visita o el nombre está ocupado, se muestra el formulario de ingreso. Escanear la sala actual conserva el jugador existente. La partida anterior no se elimina del servidor.
- Saldo inicial configurable; por defecto $40 por jugador.
- Clave privada de recuperación, sin cuentas ni contraseñas. Se guarda en el navegador y se puede copiar para recuperar el jugador en otro teléfono. El código de sala solo permite entrar durante la preparación; no da acceso a otro jugador.
- Catorce recursos: básicos, tierras raras, reactivos, Transporte y Energía.
- Dos rondas simuladas, reproducibles con la semilla guardada. No alteran saldos ni generan operaciones de jugadores.
- Último precio de cierre, nominal y minigráfico de tres cierres con referencia al nominal.
- Órdenes secretas de compra o venta por recurso; guardado de borradores local y en servidor. Una cantidad positiva compra, una negativa vende. No se compra y vende el mismo recurso a la vez.
- Pasar guarda y compromete las órdenes en una sola operación. Retirar el pase pierde la prioridad. El último pase cierra el mercado automáticamente.
- Un precio final por recurso para todos; el agente externo vende o compra toda la diferencia. No hay reserva ni reparto por escasez.
- Liquidación pública de un jugador por vez según el orden de pase. El jugador activo o el anfitrión confirma las entregas. Las confirmaciones del anfitrión quedan identificadas en el registro.
- Recursos no entregados que quedan en deuda, con cobro de la venta completo. Devolver esas unidades al banco no modifica el saldo ni los precios. El agente externo cubre las compras aunque un vendedor no entregue.
- Descubierto monetario sin límite de juego y penalizaciones recurrentes por ambas clases de deuda.
- Caja para todos los ingresos y egresos del tablero, transferencias entre jugadores, registro público y exportación JSON sin credenciales. Correcciones mediante un movimiento inverso con motivo.
- Proyectos e ingenieros en la misma tabla de recursos: proyectos a $3 para comprar y $2 para vender; cuatro filas de ingenieros (electromecánico, químico, estructural y en sistemas), con contratación a $5 y despido sin ingresos. Cantidad positiva compra o contrata; negativa vende o despide. Todas las filas se guardan juntas con **Guardar y pasar**, permanecen secretas durante Planificación y se liquidan en el mismo turno que los recursos. No hay confirmaciones independientes ni movimientos de caja al planificar o pasar. Los borradores se recuperan al recargar; retirar el pase permite editarlos. El servidor valida cantidades y calcula precios fijos, dejando las operaciones en el registro público, incluso los despidos de importe cero. Los componentes y contratos se manejan en la mesa. Compatible con partidas existentes; las operaciones fijas no alteran precios ni gráficos de recursos.
- Fin de partida con saldos y registros conservados.
- Cuatro fases: Planificar, Mercado, Ejecutar y Mantenimiento. El anfitrión abre Mantenimiento al terminar la ejecución. Cada jugador confirma sus valores; la aplicación registra el importe en caja una sola vez por ronda y permite avanzar cuando todos terminaron.
- Mantenimiento: Yacimientos suma o resta según +15, +10, +5, 0, −5, −10; Barracas resta según 0, 2, 4, 6, 8, 10, 13, 15, 18, 20, 23, 25, 30, 33, 35; Soporte externo suma $1 por ingeniero. Los componentes y el total quedan en el registro público. No se cobra mantenimiento por baterías.
- Polling de 2,5 segundos con número de versión; recuperación al volver del segundo plano, recargar o reconectar. Peticiones cortas, sin sesiones PHP que bloqueen consultas concurrentes.

La aplicación deja el inventario de recursos físicos en manos de los jugadores: cada uno declara lo que entrega en la mesa. El saldo monetario se lleva íntegramente en la app. Los PV mostrados son las penalizaciones acumuladas por deuda, no el puntaje completo del tablero.

## Reglas y parámetros de esta versión

Este prototipo implementa el mercado nuevo acordado, que reemplaza las reglas del tablero físico. El manual existente todavía describe el mercado anterior y no se reescribió en este cambio.

Los parámetros están en `src/Market.php` y se copian dentro de cada partida al crearla. Cambiar el catálogo afecta solo a partidas nuevas. Los nominales son la fila central del tablero anterior y los límites, sus valores extremos:

| Recurso | Mínimo | Nominal | Máximo |
| --- | ---: | ---: | ---: |
| Hierro / Carbono | $1 | $1 | $2 |
| Cobre / Aluminio | $2 | $3 | $5 |
| Silicio | $1 | $2 | $3 |
| Titanio | $3 | $6 | $9 |
| Neodimio | $5 | $9 | $14 |
| Gadolinio / Erbio / Cerio | $3 | $6 | $9 |
| Ácido sulfúrico / Ácido clorhídrico | $2 | $3 | $5 |
| Transporte | $4 | $7 | $11 |
| Energía **(provisional)** | $1 | $2 | $4 |

La banda de Energía no estaba definida en el tablero. Su nominal $2 y banda $1–$4 quedan como valores de prueba. En Hierro y Carbono el nominal coincide con el mínimo, como en el tablero anterior: la oferta no puede bajar el precio de ese piso. La liquidez inicial es 10 por recurso; debe ajustarse con partidas de prueba.

### Precio con memoria

```text
ancla = cierre anterior + 0,20 × (nominal − cierre anterior)
desequilibrio = compras − ventas
presión = desequilibrio / (liquidez + |desequilibrio|)

si desequilibrio ≥ 0:
  precio = ancla + presión × (máximo − ancla)
si desequilibrio < 0:
  precio = ancla + presión × (ancla − mínimo)
```

Se calcula cada recurso independientemente. Sin operaciones, el precio se acerca un 20 % al nominal. El precio se redondea a **centavos** al cerrar; dinero y movimientos se almacenan como enteros en centavos, sin acumular errores de coma flotante. No se muestra una estimación de precio final durante la planificación.

El calentamiento usa dos desequilibrios por recurso obtenidos de compras y ventas de 0 a 6 unidades, con una semilla aleatoria por sala. El gráfico inicial muestra nominal y ambos cierres simulados. Luego muestra los últimos tres cierres. La historia completa se conserva.

### Deudas y penalizaciones

Al confirmar la **última liquidación** de cada ronda:

```text
valor de deuda = máximo(0, −saldo)
              + suma(unidades pendientes × precio máximo del recurso)
PV perdidos = parte entera(valor de deuda / $5)
```

La penalización se registra una sola vez por ronda y se repite en mercados posteriores si sigue habiendo deuda. El dinero positivo no cancela automáticamente recursos pendientes: deben entregarse físicamente. Valorar recursos para penalizar **no crea además una deuda monetaria**. Saldar deuda no devuelve PV anteriores.

El límite de 1.000.000 de unidades por orden y $1.000.000 por movimiento es una validación de entrada; no limita el descubierto acumulado ni representa stock del agente.

## Arquitectura y recuperación

```text
index.php / api.php     Página y API JSON
assets/                 Archivos estáticos públicos
.htaccess               Protección de rutas, archivos y HTTPS
src/Market.php          Curva de precios, catálogo y simulación
src/Game.php            Reglas, fases, dinero, deuda y vistas privadas
src/Store.php           Persistencia transaccional e idempotencia
database/mysql.sql      Esquema InnoDB
bin/init.php            Instalación por CLI
```

Cada partida es un agregado JSON guardado en una fila `games`. Se bloquea con `SELECT … FOR UPDATE` al modificarla: las peticiones de **distintas partidas** no se bloquean entre sí. Un mercado se calcula una sola vez dentro de esa transacción. Los movimientos de caja y las penalizaciones forman parte del mismo registro atómico y tienen jugador, motivo, ronda e identificador.

`commands` reconoce las acciones repetidas por partida, credencial e identificador. `entry_requests` hace lo mismo para crear y entrar. Reutilizar una clave con otro contenido se rechaza. La ronda y el jugador que se liquida también se validan para que una pantalla vieja no confirme al siguiente jugador por accidente. Los deadlocks transitorios de MySQL se reintentan con la misma clave.

Las credenciales son secretos aleatorios de 256 bits y se guardan con hash en la base. No se incluyen en QR, enlaces, vistas públicas ni exportaciones. Las consultas de planificación eliminan las órdenes de los otros jugadores antes de responder.

El cliente conserva la acción pendiente antes de enviarla. Si pierde la respuesta, permite repetir **esa misma acción** sin duplicar dinero. Al actualizar, el servidor vuelve a enviar el estado vigente. La app no necesita recibir mensajes mientras iOS está en segundo plano: al volver consulta nuevamente. El anfitrión puede liquidar a un jugador desconectado; no hay avance automático por tiempo.

Guardá también la clave del anfitrión: no hay recuperación por correo ni reasignación de anfitrión en esta versión. Las copias de seguridad deben incluir las tres tablas. El agregado está pensado para partidas de mesa, no para historiales ilimitados de miles de rondas.

## Verificación realizada

La adaptación a carpeta pública única pasó 107 comprobaciones con Apache y PHP reales, HTTPS con certificado de prueba y despliegue en raíz y subcarpeta: bloqueo de secretos y fuentes, cabeceras, redirección, recursos estáticos, autenticación y un ciclo completo de mercado. Las pruebas no verifican la configuración del hosting del usuario.

Antes de limpiar las herramientas de desarrollo pasaron 243 comprobaciones de reglas y persistencia, tanto con MySQL como con SQLite, las pruebas de concurrencia contra MySQL y dos pruebas de navegador. Se verificaron dos perfiles móviles, secreto de órdenes, liquidación sincronizada, persistencia al recargar, caja, QR, recuperación de acceso y pérdida de respuesta después de procesar un movimiento. Las herramientas y los archivos de esas pruebas se eliminaron a pedido del usuario para dejar solo la aplicación y su instalación.

El soporte de reanudación para Safari está implementado; no se verificó en un iPhone físico.

## Pendiente

- Ajustar energía, liquidez y penalizaciones con partidas de prueba.
- Migrar al manual las reglas del mercado nuevo cuando se valide el balance.
