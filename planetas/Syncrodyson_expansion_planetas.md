# Syncrodyson — Un lugar para la humanidad

Fecha: 17 de noviembre de 2026. Borrador de ideas; no modifica las reglas del juego base.

## Restricción temática global

Ningún planeta ni sus cartas debe hacer referencia a vida ya existente: sin fauna, flora, microorganismos, biosferas, bosques existentes ni recursos de origen biológico. Pueden existir condiciones físicas o químicas favorables para una futura colonización humana; eso no confirma vida autóctona. Esta restricción rige para todos los diseños.

## Ideas del autor

- Hay ocho planetas disponibles. Se considera usar cinco por partida; cantidad pendiente de confirmar.
- Cada planeta admite hasta cinco discos de los jugadores. Como interpretación provisional, son cinco espacios compartidos en total; falta confirmar si el límite era por jugador.
- Queda pendiente la mecánica para colocar discos.
- Cada planeta tiene una reserva propia de cartas (diez como cantidad tentativa). Al preparar la partida se eligen cinco al azar de esa reserva, que se jugarán durante el transcurso de la partida y modificarán sus condiciones y funcionamiento. Las restantes quedan fuera de esa partida.
- Cada vez que un jugador coloca un disco en un planeta, puede elegir qué carta de las cinco mirar. Puede elegir una que todavía no haya visto para evitar repetir; no es una selección al azar. No se conocen todas de entrada. Ver una carta no implica, por ahora, activarla ni mostrarla públicamente.
- Las mejoras de habitabilidad aumentan sus puntos; las condiciones que dificultan la vida los reducen.
- Al final, cada planeta tiene un valor en puntos determinado por sus cartas y posiblemente otros factores aún por definir.
- Los jugadores con discos o cartas de ese planeta reciben puntos vinculados a su valor final. Falta elegir cómo representan la participación discos y cartas.

## Personalidades de los ocho planetas — base aprobada

Estas identidades son la base temática para diseñar las cartas; no fijan todavía valores, efectos ni un orden orbital completo.

| Planeta | Personalidad |
| --- | --- |
| Apolo | El más cercano a la estrella. |
| Hestia | El más habitable. |
| Poseidón | Mundo oceánico. |
| Zeus | Gigante gaseoso. |
| Hera | Planeta con anillos. |
| Atenea | Mundo rocoso y templado. |
| Artemisa | Mundo de hielos. Se elimina la referencia a bosques para respetar la restricción global sobre vida existente. |
| Hades | El más lejano y frío. |

Los nombres vigentes se verificaron en V2/planetas.js del repositorio PabloArlia/sincrodyson. Hermes, Venus y Deméter no forman parte de esta lista. El autor aprobó desarrollar la expansión con estas ocho personalidades.

## Lógica propuesta para desarrollar, aún no aprobada

Cada planeta tiene dos aspectos independientes: condiciones compartidas (cartas) y presencia de los jugadores (discos).

Valor final del planeta = valor base + suma de modificadores de sus cartas. Base, modificadores y posibilidad de valores negativos pendientes.

Para una primera prueba, cada disco propio podría otorgar el valor final completo del planeta. Así, mejorar un planeta beneficia a todos sus participantes, en proporción a su presencia. Las cinco plazas compartidas introducen escasez.

Ejemplo puramente ilustrativo: un planeta parte de 3 puntos y sus cartas aportan +2, +1 y −1. Termina en 5 puntos; quien tenga dos discos gana 10 y quien tenga uno gana 5.

Las cartas asociadas al planeta determinan su valor. Si también hay cartas en manos de jugadores que conceden derechos sobre ese planeta, deben distinguirse claramente: queda pendiente decidir si reemplazan a los discos como participación o se suman a ellos. Evitar contar dos veces una misma participación por accidente.

Posibles temas de cartas: agua disponible, presión atmosférica moderada, radiación intensa, tormentas y actividad volcánica. No hay efectos ni cifras definitivas.

## Decisiones abiertas

- Usar cinco de ocho planetas u otra cantidad.
- Cinco discos totales por planeta o cinco por jugador.
- Cómo y cuándo se coloca presencia, qué cuesta y si puede retirarse.
- Cómo se registra qué cartas ha consultado cada jugador. Falta definir cuándo se revelan públicamente o se activan sus efectos y si pueden reemplazarse. La selección aleatoria inicial y la elección de una carta para mirar por disco colocado ya están definidos.
- Si las cartas afectan únicamente al planeta o también conceden efectos durante la partida; alcance de esos efectos.
- Puntuar por disco, una sola vez por jugador presente, por mayorías o mediante cartas de participación.
- Permitir pérdidas si un planeta termina con valor negativo o establecer un mínimo de cero.
- Añadir otros factores al valor del planeta, solo si aportan decisiones útiles.

## Apolo — primera propuesta de diez cartas

Aprobado por el autor: planeta rocoso más cercano a la estrella, con abundante energía solar, calor y radiación intensos; posibilidades de asentamiento polar o subterráneo. Distribución definida: dos cartas favorables, cuatro desfavorables y cuatro neutras. Los textos siguientes son propuestas; magnitudes de puntos pendientes.

| Tipo | Carta | Texto propuesto |
| --- | --- | --- |
| Favorable | Hielo en cráteres polares | Algunos cráteres polares conservan depósitos de hielo en zonas de sombra permanente, aprovechables para abastecer asentamientos. |
| Favorable | Cavernas habitables | Cavernas naturales amplias permiten instalar hábitats presurizados bajo roca que protege del calor y la radiación de la superficie. |
| Desfavorable | Llamaradas estelares | Los episodios de radiación intensa obligan a reforzar el blindaje y suspender las operaciones en superficie. |
| Desfavorable | Suelo abrasador | En las regiones iluminadas, las altas temperaturas dificultan mantener instalaciones y equipos de superficie. |
| Desfavorable | Polvo abrasivo | El polvo mineral daña juntas, mecanismos y trajes durante los trabajos sobre el terreno. |
| Desfavorable | Depósitos profundos | Los yacimientos minerales aprovechables están a gran profundidad y requieren excavaciones costosas. |
| Neutra | Cuenca de impacto | Una antigua colisión dejó una extensa depresión circular rodeada de relieves concéntricos. |
| Neutra | Llanuras basálticas | Antiguas coladas de lava solidificada cubren parte de la superficie. |
| Neutra | Estratos multicolores | Las paredes de algunos cráteres muestran franjas de roca de distintos colores. |
| Neutra | Roca estriada | Algunas formaciones rocosas presentan surcos paralelos visibles desde la órbita. |

Las cuatro cartas neutras aportan descripción y no modifican puntos ni añaden efectos mecánicos en esta propuesta.

Compatibilidad revisada: el calor se limita a zonas iluminadas y el hielo a cráteres polares en sombra; las cavernas dan protección local sin eliminar los peligros de operar en superficie; depósitos minerales profundos no niegan hielo superficial ni cavernas naturales. Ninguna carta declara ausencia global de un recurso o condición afirmada por otra.

Queda pendiente asignar los modificadores favorables y desfavorables y el valor base del planeta. La proporción desfavorable es una decisión temática; su impacto en balance depende de esas magnitudes.

## Hestia — primera propuesta de diez cartas

Identidad aprobada: el planeta más habitable. Distribución definida por el autor: cuatro favorables, tres desfavorables y tres neutras. Textos propuestos; valores de puntos pendientes.

| Tipo | Carta | Texto propuesto |
| --- | --- | --- |
| Favorable | Agua dulce accesible | Depósitos de agua líquida dulce cercanos a la superficie facilitan abastecer los asentamientos. |
| Favorable | Presión atmosférica moderada | La presión exterior reduce las exigencias estructurales de los hábitats presurizados. El aire requiere tratamiento para poder respirarlo. |
| Favorable | Clima templado | Amplias regiones mantienen temperaturas moderadas durante la mayor parte del año. |
| Favorable | Suelos aptos para cultivo | Extensas zonas tienen suelos con estructura y minerales adecuados para cultivar especies terrestres. |
| Desfavorable | Fallas activas | Los terremotos obligan a reforzar las construcciones en las regiones afectadas. |
| Desfavorable | Temporada de huracanes | Tormentas estacionales intensas amenazan los asentamientos de algunas costas. |
| Desfavorable | Minerales dispersos | Los minerales de interés industrial están en concentraciones bajas y procesarlos resulta costoso. |
| Neutra | Luna solitaria | Una única luna acompaña al planeta. |
| Neutra | Cordilleras antiguas | Cadenas montañosas erosionadas recorren parte de los continentes. |
| Neutra | Playas oscuras | Algunos tramos de costa tienen arena de color oscuro. |

Las tres cartas neutras no suman ni restan puntos y no añaden efectos mecánicos.

Compatibilidad revisada: presión atmosférica moderada, agua accesible, clima templado y suelos cultivables son aspectos distintos y compatibles. Un clima de temperaturas moderadas puede tener huracanes estacionales en algunas costas. Las fallas afectan regiones concretas. Suelos aptos para agricultura no implican yacimientos concentrados de minerales industriales. Ninguna carta exige que otra esté entre las cinco seleccionadas.

El autor consideró excesiva la atmósfera respirable. Se sustituye por la propuesta más moderada «Presión atmosférica moderada», sin permitir respirar directamente al aire libre. No se establece todavía vida autóctona, seguridad biológica total, puntuación base ni magnitudes de los modificadores.


## Poseidón — propuesta completa de diez cartas

Mundo oceánico. El autor autorizó completar y guardar el paquete corregido con tres favorables, cuatro desfavorables y tres neutras. Sin referencias a vida existente. Magnitudes de puntos pendientes.

| Tipo | Carta | Texto propuesto |
| --- | --- | --- |
| Favorable | Minerales disueltos | El agua oceánica contiene concentraciones aprovechables de minerales útiles para abastecer la industria. |
| Favorable | Bahías resguardadas | Algunas costas protegen sectores de agua del oleaje habitual y facilitan instalar plataformas flotantes. |
| Favorable | Refugios insulares | Algunas islas ofrecen terreno elevado y firme para instalar asentamientos por encima de las mareas habituales. |
| Desfavorable | Tormentas intensas | Los temporales exigen reforzar las instalaciones y suspender operaciones expuestas. |
| Desfavorable | Corrosión salina | Las sales del agua y de la bruma aceleran el deterioro de equipos y estructuras. |
| Desfavorable | Fondos abisales | La gran profundidad de extensas regiones encarece el acceso al fondo y el anclaje de instalaciones. |
| Desfavorable | Mareas extremas | Las grandes variaciones del nivel del mar complican los desembarcos y las instalaciones costeras. |
| Neutra | Corrientes definidas | Las corrientes oceánicas siguen recorridos reconocibles a gran escala. |
| Neutra | Archipiélagos dispersos | Grupos de islas aparecen separados a lo largo del océano. |
| Neutra | Cielo cubierto | Una cubierta persistente de nubes domina el cielo del planeta. |

Las tres neutras no modifican puntos ni añaden efectos mecánicos. La extracción de minerales no implica recursos biológicos.

Compatibilidad revisada: las bahías protegen del oleaje habitual, sin eliminar temporales ni variaciones del nivel del mar; el terreno insular elevado puede quedar por encima de mareas habituales y aun requerir defensas frente a episodios extremos. Los fondos abisales ocupan extensas regiones sin excluir costas y bahías menos profundas. La nubosidad no niega concentraciones minerales ni refugios insulares. Ninguna carta requiere que otra haya sido seleccionada.

## Atenea — primera propuesta de diez cartas

Planeta rocoso y templado, con estaciones marcadas y terreno estable. Distribución indicada por el autor: tres favorables, tres desfavorables y cuatro neutras. Textos propuestos, sin valores de puntos asignados y sin referencias a vida existente.

| Tipo | Carta | Texto propuesto |
| --- | --- | --- |
| Favorable | Roca firme | Amplias regiones ofrecen un sustrato resistente y tectónicamente estable para cimentar asentamientos. |
| Favorable | Minerales superficiales | Afloramientos de minerales útiles permiten obtener materiales de construcción con poca excavación. |
| Favorable | Llanuras extensas | Grandes superficies de relieve suave facilitan ampliar los asentamientos y conectar sus instalaciones. |
| Desfavorable | Gravedad elevada | La gravedad dificulta mover cargas y exige estructuras más resistentes. |
| Desfavorable | Inviernos prolongados | En latitudes medias y altas, los inviernos largos aumentan las necesidades de calefacción y almacenamiento. |
| Desfavorable | Acuíferos profundos | Las reservas de agua subterránea aprovechables requieren perforaciones profundas. |
| Neutra | Dos lunas | Dos satélites naturales acompañan al planeta. |
| Neutra | Mesetas rojizas | Algunas mesetas presentan tonos rojizos por la composición de sus rocas. |
| Neutra | Cráter anular | Un antiguo impacto dejó un cráter con varios anillos concéntricos. |
| Neutra | Capas sedimentarias | Algunos escarpes muestran sucesiones de capas de sedimentos minerales. |

Las cuatro neutras no modifican puntos ni añaden efectos mecánicos. Los sedimentos son minerales y no implican restos biológicos.

Compatibilidad revisada: los minerales superficiales y el agua profunda son recursos diferentes; las llanuras pueden coexistir con mesetas y un cráter en otras regiones; terreno firme no elimina las exigencias de la gravedad; un mundo templado puede tener inviernos prolongados en latitudes medias y altas. Ninguna carta necesita otra para tener sentido.

## Hades — primera propuesta de diez cartas

El planeta más lejano y frío. Distribución inicial: una favorable, cuatro desfavorables y cinco neutras. Tras la corrección del autor, se interpreta provisionalmente que una neutra pasa a desfavorable: una favorable, cinco desfavorables y cuatro neutras. La frase oral «otra neutra adversa» requiere confirmar esta interpretación si el autor pretendía conservar el reparto anterior. Sin referencias a vida existente. Textos propuestos; puntos pendientes.

| Tipo | Carta | Texto propuesto |
| --- | --- | --- |
| Favorable | Hielo de agua accesible | Depósitos de hielo de agua cercanos a la superficie proporcionan una fuente local de agua al extraerlos y fundirlos. |
| Desfavorable | Frío extremo | Las temperaturas exigen calefacción continua y aislamiento reforzado en los hábitats. |
| Desfavorable | Luz solar escasa | La débil iluminación limita la energía obtenida mediante paneles solares. |
| Desfavorable | Atmósfera tenue | La baja presión exterior obliga a usar hábitats sellados y equipos presurizados para trabajar al aire libre. |
| Desfavorable | Superficie fracturada | Grietas y desniveles dificultan trasladar equipos y conectar instalaciones sobre el terreno. |
| Neutra | Llanuras grisáceas | Amplias regiones presentan una superficie de tonos grises. |
| Neutra | Cráteres superpuestos | Algunos impactos antiguos quedaron parcialmente cubiertos por cráteres posteriores. |
| Neutra | Luna irregular | Un satélite de contorno irregular acompaña al planeta. |
| Desfavorable | Escasez de metales útiles | Las bajas concentraciones de metales aprovechables dificultan producir equipos y estructuras con recursos locales. |
| Neutra | Colinas redondeadas | Grupos de colinas de perfil suave interrumpen las llanuras. |

Las cuatro neutras no modifican puntos ni añaden efectos mecánicos.

Compatibilidad revisada: el hielo accesible puede existir en un entorno de frío extremo; disponer del recurso no elimina el costo de fundirlo. La escasa luz solar no impide usar otras fuentes de energía. Las llanuras pueden tener grietas y coexistir con colinas en otras regiones. La atmósfera tenue es compatible con hielo superficial en este mundo frío; la escasez de metales no niega la disponibilidad de agua congelada. Se eliminan las referencias a rutas de abastecimiento. Ninguna carta niega las condiciones afirmadas por otra ni exige otra carta seleccionada.

## Artemisa — primera propuesta de diez cartas

Mundo de corteza helada, con posibilidades de agua líquida subterránea y actividad interna. Distribución actualizada por el autor: dos favorables, cinco desfavorables y tres neutras. Una neutra y una favorable pasan a desfavorables. Sin vida existente; puntos pendientes.

| Tipo | Carta | Texto propuesto |
| --- | --- | --- |
| Desfavorable | Hundimientos de la corteza | Algunas zonas heladas colapsan bajo cargas y obligan a reforzar los cimientos o reubicar instalaciones. |
| Favorable | Calor interno aprovechable | En determinados sectores, el flujo de calor del interior permite instalar sistemas de aprovechamiento geotérmico. |
| Favorable | Bolsas de agua subterránea | Depósitos localizados de agua líquida bajo la corteza ofrecen una fuente de abastecimiento mediante perforación. |
| Desfavorable | Corteza difícil de perforar | Capas de hielo compacto con inclusiones minerales desgastan las herramientas y encarecen las perforaciones. |
| Desfavorable | Fracturas móviles | El desplazamiento de bloques de la corteza amenaza cimientos y conexiones entre instalaciones. |
| Desfavorable | Géiseres intermitentes | Algunas zonas expulsan chorros de vapor y partículas de hielo que obligan a establecer perímetros de seguridad. |
| Neutra | Hielo azulado | Algunas superficies de hielo presentan tonalidades azules. |
| Desfavorable | Polvo mineral abrasivo | Las partículas minerales presentes sobre el hielo desgastan juntas y mecanismos de los equipos que trabajan en superficie. |
| Neutra | Cráter de borde doble | Un antiguo impacto dejó dos bordes concéntricos. |
| Neutra | Luna pequeña | Un satélite natural de pequeño tamaño acompaña al planeta. |

Las tres neutras no modifican puntos ni añaden efectos mecánicos.

Compatibilidad revisada: los hundimientos locales bajo cargas pueden coexistir con bolsas de agua líquida y calor interno. Se distinguen de las fracturas móviles: unos son colapsos locales y las otras desplazamientos de bloques. El polvo mineral abrasivo afecta equipos de superficie y puede coexistir con dificultades de perforación. El calor aprovechable no elimina los peligros de fracturas y géiseres. Sin referencias a vida existente.

## Zeus — primera propuesta de diez cartas

Gigante gaseoso sin superficie sólida accesible. La presencia representa instalaciones orbitales, operaciones atmosféricas o bases en sus lunas. Distribución definida por el autor: cuatro favorables, cuatro desfavorables y dos neutras. Textos propuestos; puntos pendientes. Sin vida existente.

| Tipo | Carta | Texto propuesto |
| --- | --- | --- |
| Favorable | Hidrógeno aprovechable | Las capas atmosféricas accesibles ofrecen hidrógeno para procesos industriales y producción de propelentes. |
| Favorable | Hielos en las lunas | Algunos satélites conservan depósitos de hielo de agua que pueden abastecer instalaciones locales. |
| Favorable | Lunas metalíferas | Algunos satélites rocosos presentan concentraciones aprovechables de metales. |
| Favorable | Refugios orbitales | Existen órbitas estables fuera de las principales zonas de radiación donde instalar hábitats con menor exposición. |
| Desfavorable | Tormentas colosales | Las tormentas dificultan las operaciones de recolección y vuelo dentro de la atmósfera. |
| Desfavorable | Cinturones de radiación | Las regiones internas del entorno orbital exigen blindaje reforzado y limitan la permanencia de personal. |
| Desfavorable | Gravedad intensa | Ascender desde las capas atmosféricas de operación requiere un gran gasto de energía. |
| Desfavorable | Gases corrosivos | Compuestos presentes en ciertas capas atmosféricas deterioran las sondas y los equipos de recolección. |
| Neutra | Bandas de nubes | Franjas de nubes de distintos tonos rodean el planeta. |
| Neutra | Óvalo de nubes oscuras | Una formación ovalada oscura destaca entre las nubes al observar el planeta desde la órbita. |

Las dos neutras no modifican puntos ni añaden efectos mecánicos; el óvalo es un rasgo visual sin peligro adicional establecido.

Compatibilidad revisada: los refugios orbitales quedan fuera de las principales zonas de radiación, sin eliminar los riesgos de entrar en ellas. Los recursos de las lunas no implican una superficie accesible en Zeus. El hidrógeno aprovechable puede coexistir con compuestos corrosivos; obtener un recurso no elimina las dificultades de recolección. No se presupone oxígeno respirable, combustible listo para usar ni vida.

## Hera — primera propuesta de diez cartas

Planeta con anillos. El paquete se centra en recursos y condiciones del entorno orbital, sin establecer todavía si el planeta es rocoso o gaseoso. Distribución actualizada por el autor: tres favorables, cuatro desfavorables y tres neutras. Una neutra pasa a desfavorable. Sin referencias a vida existente; puntos pendientes.

| Tipo | Carta | Texto propuesto |
| --- | --- | --- |
| Favorable | Hielo en los anillos | Algunos sectores de los anillos contienen fragmentos de hielo de agua aprovechables para abastecimiento. |
| Favorable | Fragmentos metalíferos | Entre los materiales de los anillos hay fragmentos rocosos con concentraciones útiles de metales. |
| Favorable | Luna de baja gravedad | Un satélite rocoso de baja gravedad ofrece una base donde manipular cargas y realizar despegues con menor esfuerzo. |
| Desfavorable | Impactos de partículas | Las partículas de los anillos amenazan las instalaciones y los equipos que operan en sus regiones densas. |
| Desfavorable | Sombras prolongadas | Algunas órbitas de trabajo atraviesan largos períodos de sombra que exigen almacenar energía o usar fuentes alternativas. |
| Desfavorable | Polvo electrostático | En las zonas de recolección, el polvo cargado se adhiere a superficies y dificulta mantener sensores y mecanismos. |
| Neutra | Anillos inclinados | El plano de los anillos está inclinado respecto del plano orbital de Hera alrededor de la estrella. |
| Neutra | Bandas de distinto brillo | Los anillos presentan franjas de diferente brillo al observarlos desde la órbita. |
| Desfavorable | Acumulaciones densas de escombros | Algunos arcos de los anillos concentran fragmentos grandes que obligan a desviar trayectorias y restringen las zonas donde instalar equipos. |
| Neutra | Luna alargada | Otro satélite presenta un contorno alargado. |

Las tres neutras no modifican puntos ni añaden efectos mecánicos.

Compatibilidad revisada: los fragmentos de hielo y los fragmentos rocosos pueden coexistir en sectores distintos o mezclados. Que sean aprovechables no elimina los riesgos de impacto y polvo al recolectarlos. Las sombras afectan algunas órbitas, sin impedir operaciones en otras. La luna de baja gravedad y la luna alargada son satélites distintos. No se presupone atmósfera respirable, vida ni una superficie accesible en Hera.

## Modificadores de puntos — regla aprobada

Todas las cartas favorables suman +1 punto al valor del planeta, todas las desfavorables restan −1 y todas las neutras aportan 0. La regla se aplica a los ocho planetas.

El modificador de las cinco cartas seleccionadas al preparar la partida es: cantidad de favorables menos cantidad de desfavorables. Las otras cinco cartas de la reserva no aportan modificadores en esa partida. Mirar una carta sigue siendo una acción de información; no se establece que mirarla active su modificador.

Ejemplo: dos favorables, dos desfavorables y una neutra dan un modificador total de 0.

Esta regla resuelve las magnitudes que figuraban como pendientes en las propuestas anteriores. Siguen pendientes el valor base de cada planeta, si se permiten valores finales negativos y el método de cobro por presencia de los jugadores. El modificador de cartas puede ser negativo; su traducción al valor final depende de esas decisiones.

Se confirma el reemplazo de «Hielo con sales atrapadas» por «Hundimientos de la corteza» en Artemisa, conservando su reparto de dos favorables, cinco desfavorables y tres neutras.

## Valor base — regla aprobada

Todos los planetas tienen un valor base de 5 puntos. Valor final del planeta = 5 + número de cartas favorables seleccionadas − número de cartas desfavorables seleccionadas. Las neutras aportan 0. Se cuentan las cinco cartas seleccionadas al preparar la partida.

Con cinco cartas de modificadores +1, −1 o 0, el valor final nunca es negativo: el rango general teórico es de 0 a 10 puntos. Los extremos alcanzables de cada planeta dependen de su reserva particular. No hace falta aplicar un mínimo adicional de cero bajo estas reglas.

Ejemplo: dos favorables, dos desfavorables y una neutra dejan el planeta en 5 puntos. Queda pendiente cómo cobran ese valor los jugadores según sus discos o cartas de participación. Esta decisión reemplaza las menciones anteriores a valor base pendiente.

## Puntuación por influencia — regla aprobada

Al final se ordena a los jugadores por su influencia en cada planeta. El primero recibe el valor completo del planeta; el segundo recibe la mitad de ese premio redondeada hacia arriba; el tercero recibe la mitad del premio del segundo redondeada hacia arriba, y así sucesivamente. El redondeo es siempre hacia arriba.

Ejemplo del autor: si el planeta vale 9 puntos, los premios son 9, 5, 3, 2, 1 y luego 1 para cada puesto adicional. Si vale 5: 5, 3, 2, 1. Si vale 0, todos los premios son 0.

La influencia determina el puesto y no multiplica directamente los puntos. Esta decisión sustituye la propuesta anterior de cobrar el valor por cada disco.

Interpretación del valor a repartir: el valor final del planeta (base 5 más los modificadores de las cinco cartas), coherente con el ejemplo de 9 puntos; no solamente el valor base fijo de 5.

Pendiente: definición exacta de influencia, resolución de empates y elegibilidad de jugadores sin influencia. El umbral de 60 puntos fue mencionado como hipótesis y no está aprobado como regla de cierre.

## Empates y participación — regla aprobada

Si dos jugadores empatan en influencia, se suman los premios de las dos posiciones que ocupan y cada uno recibe la mitad de esa suma. Ambas posiciones quedan consumidas: si empatan en primero, el siguiente jugador cobra el premio de tercero.

Ejemplo: para un planeta de valor 9, los premios por posición son 9, 5, 3, 2. Dos jugadores empatados primeros reciben (9 + 5) / 2 = 7 puntos cada uno; el siguiente cobra 3.

Un jugador con cero influencia no cobra nada, aunque queden premios por posición.

Queda pendiente cómo redondear el reparto de un empate si la suma no es divisible por dos y cómo resolver empates de tres o más jugadores. El redondeo hacia arriba aprobado para generar los premios sucesivos se mantiene; no se extiende automáticamente al reparto de empates. Esta sección resuelve las menciones anteriores a empates de dos jugadores y elegibilidad con cero influencia pendientes.

## Empates de cualquier tamaño y redondeo — aclaración definitiva

Para cualquier grupo de jugadores empatados con influencia positiva, sumar los premios de todas las posiciones que ocupa el grupo, dividir esa suma por la cantidad de empatados y redondear el resultado hacia arriba. Cada empatado cobra ese resultado. Las posiciones ocupadas se consumen; el siguiente jugador continúa en la posición posterior al grupo. No redondear promedios parciales antes de completar la suma y división.

Ejemplo: planeta de valor 9, premios 9, 5, 3, 2. Si tres jugadores empatan primeros, cada uno recibe techo((9 + 5 + 3) / 3) = 6 puntos. El siguiente jugador ocupa el cuarto puesto y recibe 2.

Si dos empatan segundos, cada uno recibe techo((5 + 3) / 2) = 4; el siguiente cobra el cuarto premio, 2. Con cero influencia se mantiene el cobro de 0 puntos y no se participa del reparto.

Esta regla reemplaza las menciones anteriores a redondeo de empates y empates de tres o más jugadores pendientes. Tanto los premios sucesivos como el reparto de empates usan siempre redondeo hacia arriba.

## Fuentes de influencia — conexión aprobada

Las cartas de Reclamo planetario obtenidas por los jugadores dan influencia en los planetas representados por sus símbolos. Los discos colocados por un jugador en un planeta también dan influencia en ese planeta. Ambas fuentes contribuyen a determinar su posición en el reparto final.

Una carta con dos símbolos planetarios aporta influencia en cada uno de los dos planetas representados. Los discos aquí mencionados son los colocados en los planetas, no cualquier disco de la esfera.

Queda pendiente fijar la cantidad de influencia por símbolo y por disco; no se ha establecido que ambos valgan una unidad ni que tengan el mismo peso. La mecánica de colocar discos en los planetas también sigue pendiente. Se conserva la regla de poder elegir una carta del planeta para mirar cada vez que se coloca un disco allí.

## Orden orbital y zona habitable — propuesta aceptada

Orden desde la estrella, sin distancias ni tamaños a escala:

| Orden | Planeta | Zona habitable | Favorables (+1) | Desfavorables (−1) | Neutras (0) |
| --- | --- | --- | ---: | ---: | ---: |
| 1 | Apolo | Fuera | 2 | 4 | 4 |
| 2 | Atenea | Borde interior | 3 | 3 | 4 |
| 3 | Hestia | Centro | 4 | 3 | 3 |
| 4 | Poseidón | Borde exterior | 3 | 4 | 3 |
| 5 | Zeus | Fuera | 4 | 4 | 2 |
| 6 | Hera | Fuera | 3 | 4 | 3 |
| 7 | Artemisa | Fuera | 2 | 5 | 3 |
| 8 | Hades | Fuera | 1 | 5 | 4 |

La zona habitable indica condiciones potenciales para agua líquida, sin afirmar vida existente. Las distribuciones incorporan los últimos cambios aprobados en Hera y Artemisa. Las secciones de reglas aprobadas y aclaraciones definitivas prevalecen sobre propuestas y pendientes anteriores.

## Hospitabilidad e influencia — símbolos

**HP (hospitabilidad)** mide la compatibilidad de un planeta con la vida humana. El valor del planeta en puntos es igual a su HP final. Los modificadores de sus cartas afectan esa hospitabilidad.

**IN (influencia)** mide el reclamo de un jugador sobre algo; en los planetas determina su posición en el reparto de puntos según las reglas de influencia anteriores. La cantidad de IN que aportan los discos y los símbolos de las cartas sigue pendiente.

Los iconos están en `iconos/HP-hospitabilidad.svg` e `iconos/IN-influencia.svg`.

Al final de la partida, en cada planeta, el jugador con más IN recibe tantos puntos de victoria como la HP final del planeta. El segundo recibe la mitad de ese premio, redondeada hacia arriba; cada jugador siguiente recibe la mitad del premio del puesto anterior, también redondeada hacia arriba. Los empates y los jugadores sin IN se resuelven según las reglas de puntuación por influencia anteriores.


## Selección vigente de cartas planetarias

Cada planeta tiene cinco cartas. Esta selección reemplaza las reservas de diez y las distribuciones anteriores. Los valores de HP son:

- **Apolo:** +2, +1, -3, -2, 0.
- **Atenea:** +2, +1, -2, -1, 0.
- **Hestia:** +3, +2, +2, +1, -1.
- **Poseidón:** +3, +2, +1, 0, -1.
- **Zeus:** +3, +2, 0, -1, -2.
- **Hera:** -2, -2, 0, 0, +1.
- **Artemisa:** +2, +1, -1, 0, -1.
- **Hades:** +2, 0, -1, -2, -3.

Las cinco cartas de cada planeta figuran en `cartas-planetas.html`; sus valores también aparecen en `planetas.html`.
