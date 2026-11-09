ignora V1 excepto orden expresa

## Redacción de cartas

- Para colocar discos, usa «Coloca un disco en N celdas libres de ...», con la cantidad en las celdas. No uses «Coloca N discos en celdas libres de ...». Para una sola celda: «Coloca un disco en 1 celda libre de ...».
- Mantén esa forma también en colocaciones de varias capas y en frases como «para colocar un disco en N celdas libres de ...». Conserva las cantidades, restricciones y efectos especiales.
- Si la cantidad depende de las celdas disponibles, usa «Coloca un disco en todas las celdas libres de ...».
- Cuando la carta pasa al jugador de la derecha, termina el efecto con un salto de línea y «Luego debes darle esta carta al jugador a tu derecha.» (en el archivo JavaScript: `\nLuego debes darle esta carta al jugador a tu derecha.`).
- No cambies `revisada` por ajustes de redacción. Las dudas de reglas se anotan debajo de ese campo.
- El símbolo `[=<]` significa «menor o igual» y fija el máximo de cuadrantes distintos. Ejemplo: `[=<]2[QU]` permite colocar todo en el mismo cuadrante o repartirlo entre hasta 2 cuadrantes distintos. Úsalo para «hasta N cuadrantes»; conserva las condiciones que exigen exactamente N cuadrantes y las referencias al mismo cuadrante.
