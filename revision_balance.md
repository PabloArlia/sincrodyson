# Revisión de estimaciones de balance

> Registro de la revisión inicial, calculada con −3 PV por ingeniero anclado. El balance actual usa −4 PV por anclado, energía a $2 e ingenieros a $4. Las cifras de esta tabla se conservan como comparación histórica.

La suma nueva es puntos_carta + puntos_capas + puntos_ingenieros + puntos_otros. Después se agregan 3 PV por disco de sector y 9 PV por disco de soporte. Los casos pendientes muestran coeficiente — hasta completar puntos_otros. Los datos de discos se conservan.

Los ingenieros se estiman en −3 PV cada uno. Se puede cambiar el supuesto a −4 en balance.js. Las ganancias por cobertura usan nivel 4. Las penalizaciones por nivel faltante usan 2 niveles según el ejemplo del usuario; esto requiere confirmación porque 5 − 4 = 1.

| Carta | Anterior | Carta | Capas | Ingenieros | Otros | Nueva suma |
|---|---:|---:|---:|---:|---:|---:|
| P001 Batería de gravedad sólida | 1 | 0 | 0 | 0 | 0 | 0 |
| P002 Batería de hidruro metálico | 4 | 1 | 0 | 0 | 0 | 1 |
| P003 Banco de supercondensadores | 3 | 2 | 0 | 0 | 0 | 2 |
| P004 Volante de inercia magnético | 6 | 0 | 0 | 0 | 0 | 0 |
| P032 Paneles solares | 2 | 1 | 0 | 0 | 0 | 1 |
| P033 Generador de radioisótopos (RTG) | 3 | 1 | 0 | 0 | 0 | 1 |
| P034 Concentrador solar Stirling | 7 | 4 | 0 | 0 | 0 | 4 |
| P035 Central solar de ciclo Brayton | 15 | 10 | 0 | 0 | 0 | 10 |
| P040 Estación de coordinación orbital | Sin estimar | 0 | 0 | 0 | Pendiente | Pendiente |
| P044 Desregulación de sueldos | 0 | 0 | 0 | 0 | Pendiente | Pendiente |
| P047 Consorcio de minerales estratégicos | 0 | 0 | 0 | 0 | Pendiente | Pendiente |
| P049 Centro de fusión nuclear | 0 | 0 | 0 | 0 | Pendiente | Pendiente |
| P052 Cohete de combustible sólido | 3 | 0 | 0 | 0 | 0 | 0 |
| P056 Extensómetros de fibra óptica | -2 | 0 | 0 | 0 | Pendiente | Pendiente |
| P057 Termografía infrarroja | -3 | 1 | 0 | 0 | Pendiente | Pendiente |
| P058 Dosímetros de radiación | -6 | 0 | 0 | 0 | Pendiente | Pendiente |
| P059 Detectores de micrometeoritos | -4 | 0 | 0 | 0 | Pendiente | Pendiente |
| P061 Red de interferometría láser | -2 | 0 | 0 | 0 | Pendiente | Pendiente |
| P062 Monitores de calidad eléctrica | -4 | 0 | -4 | 0 | 0 | -4 |
| P065 Centro de supervisión orbital | 6 | 0 | 0 | -3 | Pendiente | Pendiente |
| P067 Centro de mantenimiento predictivo | 14 | 20 | 0 | -9 | 0 | 11 |
| P068 Centro de coordinación integral | 7 | 10 | 0 | -3 | Pendiente | Pendiente |
| P071 Centro de calibración retroactiva | 15 | 0 | 12 | 0 | 0 | 12 |
| P072 Red de túneles de servicio | 9 | 0 | 12 | -6 | 0 | 6 |
| P073 Brigada de propulsión iónica | 5 | 5 | 0 | -9 | 0 | -4 |
| P074 Gimnasio y spa de gravedad cero | 30 | 0 | 0 | 0 | Pendiente | Pendiente |
| P075 Jardines bioclimáticos inteligentes | 36 | 20 | 0 | 0 | Pendiente | Pendiente |
| P076 Aditivo de nanobots microactuadores | 12 | 0 | 12 | -3 | 0 | 9 |
| P078 Anticipación y blindaje contra llamaradas solares | -12 | 0 | -6 | -6 | 0 | -12 |
| P079 Detección y ablación láser de micrometeoritos | 9 | 0 | 12 | -6 | 0 | 6 |
| P080 Plataforma de reparaciones sobre rieles | 1 | 10 | 0 | -6 | Pendiente | Pendiente |
| P082 Ascensores de mantenimiento radial | -3 | 0 | 0 | -6 | 0 | -6 |

## Casos para revisar

- **P001 Batería de gravedad sólida:** la suma no coincide con la estimación anterior; se aplicaron los campos separados sin trasladar diferencias a otros puntos.
- **P002 Batería de hidruro metálico:** la suma no coincide con la estimación anterior; se aplicaron los campos separados sin trasladar diferencias a otros puntos.
- **P003 Banco de supercondensadores:** la suma no coincide con la estimación anterior; se aplicaron los campos separados sin trasladar diferencias a otros puntos.
- **P004 Volante de inercia magnético:** la suma no coincide con la estimación anterior; se aplicaron los campos separados sin trasladar diferencias a otros puntos.
- **P032 Paneles solares:** la suma no coincide con la estimación anterior; se aplicaron los campos separados sin trasladar diferencias a otros puntos.
- **P033 Generador de radioisótopos (RTG):** la suma no coincide con la estimación anterior; se aplicaron los campos separados sin trasladar diferencias a otros puntos.
- **P034 Concentrador solar Stirling:** la suma no coincide con la estimación anterior; se aplicaron los campos separados sin trasladar diferencias a otros puntos.
- **P035 Central solar de ciclo Brayton:** la suma no coincide con la estimación anterior; se aplicaron los campos separados sin trasladar diferencias a otros puntos.
- **P040 Estación de coordinación orbital:** La ganancia final depende del total de ingenieros anclados de todos los jugadores.
- **P044 Desregulación de sueldos:** Los PI dependen de las fichas de contratación entregadas; no hay cantidad estimada.
- **P047 Consorcio de minerales estratégicos:** Los PI dependen de ventas y del número de repeticiones del proyecto.
- **P049 Centro de fusión nuclear:** Los PI dependen de la energía entregada y del número de repeticiones.
- **P052 Cohete de combustible sólido:** la suma no coincide con la estimación anterior; se aplicaron los campos separados sin trasladar diferencias a otros puntos.
- **P056 Extensómetros de fibra óptica:** Penaliza celdas vacías en un cuadrante; nivel 4 global no determina su distribución por cuadrante.
- **P057 Termografía infrarroja:** Penaliza celdas vacías de dos capas en un cuadrante; falta estimar su distribución.
- **P058 Dosímetros de radiación:** Falta estimar los espacios de Mantenimiento vacíos del área de soporte.
- **P059 Detectores de micrometeoritos:** La pérdida depende del dinero disponible para pagar; no se puede deducir −4 PV del texto.
- **P061 Red de interferometría láser:** Falta estimar cuántos cuadrantes terminan sin Sensores.
- **P062 Monitores de calidad eléctrica:** Se estiman 2 niveles faltantes según el criterio indicado; nivel final 4 y máximo 5 dejarían solo 1. Confirmar este supuesto.
- **P065 Centro de supervisión orbital:** La ganancia inmediata depende del número de Sensores colocados.
- **P067 Centro de mantenimiento predictivo:** la suma no coincide con la estimación anterior; se aplicaron los campos separados sin trasladar diferencias a otros puntos.
- **P068 Centro de coordinación integral:** Falta estimar cuántos discos de soporte habrá al final.
- **P071 Centro de calibración retroactiva:** la suma no coincide con la estimación anterior; se aplicaron los campos separados sin trasladar diferencias a otros puntos.
- **P072 Red de túneles de servicio:** la suma no coincide con la estimación anterior; se aplicaron los campos separados sin trasladar diferencias a otros puntos.
- **P073 Brigada de propulsión iónica:** la suma no coincide con la estimación anterior; se aplicaron los campos separados sin trasladar diferencias a otros puntos.
- **P074 Gimnasio y spa de gravedad cero:** Falta estimar el total final de ingenieros anclados de todos los jugadores.
- **P075 Jardines bioclimáticos inteligentes:** Retirar hasta 4 ingenieros puede beneficiar a distintos jugadores; no se puede asignar +16 PV fijos.
- **P076 Aditivo de nanobots microactuadores:** la suma no coincide con la estimación anterior; se aplicaron los campos separados sin trasladar diferencias a otros puntos.
- **P078 Anticipación y blindaje contra llamaradas solares:** Se estiman 2 niveles faltantes según el criterio indicado; nivel final 4 y máximo 5 dejarían solo 1. Confirmar este supuesto.
- **P079 Detección y ablación láser de micrometeoritos:** la suma no coincide con la estimación anterior; se aplicaron los campos separados sin trasladar diferencias a otros puntos.
- **P080 Plataforma de reparaciones sobre rieles:** discos = 2 suma +6 PV de sector, pero el efecto solo coloca 2 discos de soporte. No se cambió ese dato. Falta estimar la penalización de Estructura.
- **P082 Ascensores de mantenimiento radial:** la suma no coincide con la estimación anterior; se aplicaron los campos separados sin trasladar diferencias a otros puntos.

Las baterías, generadores y Transporte tenían algunas estimaciones que valoraban recursos como puntos. Esas valoraciones no se incorporan automáticamente a puntos_carta; pueden definirse explícitamente en puntos_otros.
