window.tecnicas = [
  { id: 'FAB', nombre: 'Fabricación', icono: '🏭' },
  { id: 'MAT', nombre: 'Materiales avanzados', icono: '💎' },
  { id: 'NANO', nombre: 'Nanotecnología', icono: '🔬' },
  { id: 'BIO', nombre: 'Biotecnología', icono: '🧬' },
  { id: 'MAG', nombre: 'Electromagnetismo', icono: '🧲' },
  { id: 'FOT', nombre: 'Fotónica', icono: '💡' },
  { id: 'IA', nombre: 'Inteligencia artificial', icono: '🧠' },
  { id: 'NUC', nombre: 'Tecnología nuclear', icono: '☢️' },
  { id: 'TER', nombre: 'Ingeniería térmica', icono: '🌡️' },
  { id: 'SEN', nombre: 'Sensores y control', icono: '📡' },
  { id: 'HAB', nombre: 'Habitabilidad', icono: '🏠' },
  { id: 'CUA', nombre: 'Cuántica', icono: '⚛️' },
  { id: 'PROP', nombre: 'Propulsión', icono: '🚀' },
  { id: 'FIN', nombre: 'Finanzas', icono: '💰' },
  { id: 'DAT', nombre: 'Datos', icono: '🗄️' },
  { id: 'INI', nombre: 'Inicial', icono: '🚩' },
  { id: 'MIN', nombre: 'Miniaturización', icono: '🤖' },
  { id: 'ELE', nombre: 'Electrónica', icono: '🤖' },
  { id: 'PRE', nombre: 'Precision', icono: '🤖' },
  { id: 'MEG', nombre: 'Megaproyecto', icono: '🤖' },
];

// Syncrodyson — datos de proyectos. Las recetas nuevas no acordadas se identifican en nota_balance.
// bono: texto e iconos entre corchetes, p. ej. "3 [DS]", "+3 [En]", "+18 [Di][RE]".
// Duplicación: materiales ajustados al incremento proporcional de PV totales, manteniendo
// operativos y otros premios. Las decisiones especiales figuran bajo revisada en nota_duplicacion.
// Balance: suma puntos_carta + puntos_capas + puntos_ingenieros + puntos_otros.
// puntos_ingenieros usa -4 por anclado; balance.js permite ajustar ese supuesto.
// puntos_otros: null indica una estimación pendiente; 0 indica que no se suma otro efecto.
// Los puntos por discos de sector y soporte se agregan aparte en balance.js.
// Tipos sin puntos impresos primero; IDs y orden interno de cada tipo conservados.
// PLANTILLA PARA NUEVAS CARTAS (ejemplo comentado; no se incorpora al juego):
// {
//   "id": "PXXX",                  // Identificador único
//   "revisada": 0,                 // 0 = pendiente de revision; 1 = revisada
//   "nombre": "Nombre del proyecto",
//   "tipo": "microondas",         // Categoría de la carta
//   "inicial": false,            // Opcional; true si es una carta inicial
//   "puntos": "0 [PI]",          // Texto visible en la carta
//   "puntos_carta": 0,           // PV impresos
//   "puntos_capas": 0,           // PV estimados por efectos sobre capas
//   "puntos_ingenieros": 0,      // Penalización estimada por anclados (-4 por ingeniero)
//   "puntos_otros": 0,           // Otros efectos estimados; null si está pendiente
//   "copias": 1,
//   "discos": 1,                // Discos colocados en sectores (no en soporte)
//   "bono": "1 [DP][MO] [RE]", // Iconos/texto visibles en la carta
//   "disco_soporte": 0,         // Discos colocados en áreas de soporte
//   "efecto": "Coloca un disco en 1 celda libre de [MO]. Puedes volver a colocar el cubo en la etapa 2.",
//   "etapas": [                 // m = materiales; o = operativos, energía y transporte
//     { "m": { "Fe": 3, "Ti": 1 }, "o": { "IE": 1, "En": 2 } },
//     { "m": { "Fe": 7, "Ti": 2 }, "o": { "IE": 1, "En": 2 } }
//   ],
//   "destino": "etapa:2"       // O "completados", "mano", "derecha", etc.
// },
// Nota: balance.js calcula por separado el valor de discos y el costo por etapas.
// -----------------------------------------------------------------------------
window.modulos = [
  {
    "id": "P001",
    "descripcion": "IA que coordina equipos de la esfera y responde automáticamente a fallas.",
    "revisada": 1,
    "tecnica_requiere": {
      "IA": 1
    },
    "tecnica_otorga": {
      "INI": 1
    },
    "tecnica_tokens": 1,
    "nombre": "Control autónomo por IA",
    "tipo": "control_sensores",
    "inicial": true,
    "puntos": "0 [PI]",
    "puntos_carta": 0,
    "puntos_capas": 0,
    "puntos_ingenieros": 0,
    "puntos_otros": 0,
    "copias": 1,
    "discos": 0,
    "bono": "2 [DP][CO] [/] 2[DP][SN] [/] 1[DP][CO]+1[DP][SN]",
    "disco_soporte": 2,
    "efecto": "Coloca un disco en 2 celdas libres de [CO] Control o [SN] Sensores de una o varias áreas de soporte.\nObtén 1 [FT] ficha de técnica, luego debes darle esta carta al jugador a tu derecha.",
    "etapas": [
      {
        "m": {
          "Nd": 1,
          "Fe": 6,
          "Si": 5,
          "Cu": 2
        },
        "o": {
          "IS": 1,
          "En": 2
        }
      },
      {
        "m": {
          "Nd": 1,
          "Al": 4,
          "Cu": 3
        },
        "o": {
          "IS": 1,
          "En": 1,
          "Tr": 2
        }
      }
    ],
    "destino": "derecha"
  },
  {
    "id": "P002",
    "descripcion": "Drones con cámaras y sensores que recorren la estructura en busca de daños.",
    "revisada": 1,
    "tecnica_requiere": {
      "IA": 1,
      "PROP": 1
    },
    "tecnica_otorga": {
      "INI": 1
    },
    "tecnica_tokens": 2,
    "nombre": "Drones de inspección autónoma",
    "tipo": "mantenimiento",
    "inicial": true,
    "puntos": "0 [PI]",
    "puntos_carta": 0,
    "puntos_capas": 0,
    "puntos_ingenieros": 0,
    "puntos_otros": 0,
    "copias": 1,
    "discos": 0,
    "bono": "2 [DP][MN]",
    "disco_soporte": 2,
    "efecto": "Coloca un disco en 2 celdas libres de [MN] Mantenimiento de una o varias áreas de soporte.\nObtén 2 [FT] fichas de técnica, luego debes darle esta carta al jugador a tu derecha.",
    "etapas": [
      {
        "m": {
          "Fe": 5,
          "Al": 5,
          "Si": 2
        },
        "o": {
          "En": 2,
          "IM": 1
        }
      },
      {
        "m": {
          "Cu": 3,
          "Ti": 2,
          "C": 5,
          "Si": 4
        },
        "o": {
          "En": 1,
          "Tr": 2,
          "IS": 1
        }
      }
    ],
    "destino": "derecha"
  },
  {
    "id": "P003",
    "descripcion": "Conductores de cobre que distribuyen electricidad a alta tensión por la esfera.",
    "revisada": 1,
    "tecnica_requiere": {},
    "tecnica_otorga": {
      "INI": 1
    },
    "tecnica_tokens": 1,
    "nombre": "Red de alto voltaje de cobre",
    "tipo": "transmision",
    "inicial": true,
    "puntos": "0 [PI]",
    "puntos_carta": 0,
    "puntos_capas": 0,
    "puntos_ingenieros": 0,
    "puntos_otros": 0,
    "copias": 1,
    "discos": 2,
    "bono": "2 [DS][TS] [=]1[QU]",
    "disco_soporte": 0,
    "efecto": "Coloca un disco en 2 celdas libres de [TS] Transmisión del mismo cuadrante.\nObtén 1 [FT] ficha de técnica, luego debes darle esta carta al jugador a tu derecha.",
    "etapas": [
      {
        "m": {
          "Fe": 5,
          "Cu": 5,
          "Si": 2
        },
        "o": {
          "IM": 2,
          "En": 3,
          "Tr": 2
        }
      }
    ],
    "destino": "derecha"
  },
  {
    "id": "P004",
    "descripcion": "Conductores livianos que reducen la masa del tendido de alta tensión.",
    "revisada": 1,
    "tecnica_requiere": {},
    "tecnica_otorga": {
      "INI": 1
    },
    "tecnica_tokens": 1,
    "nombre": "Red de alto voltaje ultraligera",
    "tipo": "transmision",
    "inicial": true,
    "puntos": "0 [PI]",
    "puntos_carta": 0,
    "puntos_capas": 0,
    "puntos_ingenieros": 0,
    "puntos_otros": 0,
    "copias": 1,
    "discos": 4,
    "bono": "4 [DS][TS] [=<]2[QU]",
    "disco_soporte": 0,
    "efecto": "Coloca un disco en 4 celdas libres de [TS] Transmisión de hasta 2 cuadrantes distintos.\nObtén 1 [FT] ficha de técnica, luego debes darle esta carta al jugador a tu derecha.",
    "etapas": [
      {
        "m": {
          "Al": 7,
          "Ti": 5,
          "C": 3
        },
        "o": {
          "IM": 2,
          "En": 2,
          "Tr": 4
        }
      }
    ],
    "destino": "derecha"
  },
  {
    "id": "P005",
    "descripcion": "Un reflector parabólico concentra microondas y las dirige hacia un receptor.",
    "revisada": 1,
    "tecnica_requiere": {},
    "tecnica_otorga": {
      "INI": 1
    },
    "tecnica_tokens": 1,
    "nombre": "Antena parabólica de microondas",
    "tipo": "microondas",
    "inicial": true,
    "puntos": "0 [PI]",
    "puntos_carta": 0,
    "puntos_capas": 0,
    "puntos_ingenieros": 0,
    "puntos_otros": 0,
    "copias": 1,
    "discos": 4,
    "bono": "4 [DS][MO][AD]",
    "disco_soporte": 0,
    "efecto": "Coloca un disco en 4 celdas libres y adyacentes de [MO] Microondas.\nObtén 1 [FT] ficha de técnica, luego debes darle esta carta al jugador a tu derecha.",
    "etapas": [
      {
        "m": {
          "Al": 4,
          "Cu": 4,
          "Ti": 5,
          "Si": 2
        },
        "o": {
          "IM": 1,
          "En": 4,
          "Tr": 3
        }
      }
    ],
    "destino": "derecha"
  },
  {
    "id": "P006",
    "descripcion": "Capas de distintos materiales que absorben impactos y protegen la estructura.",
    "revisada": 1,
    "tecnica_requiere": {},
    "tecnica_otorga": {
      "INI": 1
    },
    "tecnica_tokens": 1,
    "nombre": "Blindaje compuesto",
    "tipo": "microondas",
    "inicial": true,
    "puntos": "0 [PI]",
    "puntos_carta": 0,
    "puntos_capas": 0,
    "puntos_ingenieros": 0,
    "puntos_otros": 0,
    "copias": 1,
    "discos": 2,
    "bono": "2 [DS][MO] [=][QU]",
    "disco_soporte": 0,
    "efecto": "Coloca un disco en 2 celdas libres de [MO] Microondas del mismo cuadrante.\nObtén 1 [FT] ficha de técnica, luego debes darle esta carta al jugador a tu derecha.",
    "etapas": [
      {
        "m": {
          "Fe": 10,
          "C": 1,
          "Ti": 3
        },
        "o": {
          "IE": 1,
          "En": 2,
          "Tr": 2
        }
      }
    ],
    "destino": "derecha"
  },
  {
    "id": "P007",
    "descripcion": "Superficies de aluminio que dispersan el calor y lo irradian al espacio.",
    "revisada": 1,
    "tecnica_requiere": {},
    "tecnica_otorga": {
      "INI": 1
    },
    "tecnica_tokens": 1,
    "nombre": "Radiadores térmicos de aluminio",
    "tipo": "refrigeracion",
    "inicial": true,
    "puntos": "0 [PI]",
    "puntos_carta": 0,
    "puntos_capas": 0,
    "puntos_ingenieros": 0,
    "puntos_otros": 0,
    "copias": 1,
    "discos": 2,
    "bono": "2 [DS][RF] [=][QU]",
    "disco_soporte": 0,
    "efecto": "Coloca un disco en 2 celdas libres de [RF] Refrigeración del mismo cuadrante.\nObtén 1 [FT] ficha de técnica, luego debes darle esta carta al jugador a tu derecha.",
    "etapas": [
      {
        "m": {
          "Al": 8,
          "Cu": 3
        },
        "o": {
          "IM": 1,
          "Tr": 2
        }
      }
    ],
    "destino": "derecha"
  },
  {
    "id": "P008",
    "descripcion": "Tubos sellados donde un fluido se evapora y condensa para transportar calor.",
    "revisada": 1,
    "tecnica_requiere": {},
    "tecnica_otorga": {
      "INI": 1
    },
    "tecnica_tokens": 1,
    "nombre": "Red de tubos de calor",
    "tipo": "refrigeracion",
    "inicial": true,
    "puntos": "0 [PI]",
    "puntos_carta": 0,
    "puntos_capas": 0,
    "puntos_ingenieros": 0,
    "puntos_otros": 0,
    "copias": 1,
    "discos": 4,
    "bono": "4 [DS][RF]",
    "disco_soporte": 0,
    "efecto": "Coloca un disco en 4 celdas libres de [RF] Refrigeración.\nObtén 1 [FT] ficha de técnica, luego debes darle esta carta al jugador a tu derecha.",
    "etapas": [
      {
        "m": {
          "Cu": 5,
          "Al": 5,
          "Fe": 2,
          "Ti": 3
        },
        "o": {
          "IM": 2,
          "En": 4,
          "Tr": 3
        }
      }
    ],
    "destino": "derecha"
  },
  {
    "id": "P009",
    "descripcion": "Capas semiconductoras delgadas que convierten luz solar en electricidad.",
    "revisada": 1,
    "tecnica_requiere": {},
    "tecnica_otorga": {
      "INI": 1
    },
    "tecnica_tokens": 1,
    "nombre": "Paneles fotovoltaicos de película delgada",
    "tipo": "fotovoltaica",
    "inicial": true,
    "puntos": "0 [PI]",
    "puntos_carta": 0,
    "puntos_capas": 0,
    "puntos_ingenieros": 0,
    "puntos_otros": 0,
    "copias": 1,
    "discos": 2,
    "bono": "2 [DS][FV] [=][QU]",
    "disco_soporte": 0,
    "efecto": "Coloca un disco en 2 celdas libres de [FV] Fotovoltaica de un cuadrante.\nObtén 1 [FT] ficha de técnica, luego debes darle esta carta al jugador a tu derecha.",
    "etapas": [
      {
        "m": {
          "Cu": 4,
          "Al": 2,
          "Fe": 4,
          "Ce": 1
        },
        "o": {
          "IM": 1,
          "En": 2,
          "Tr": 2
        }
      }
    ],
    "destino": "derecha"
  },
  {
    "id": "P010",
    "descripcion": "Celdas de silicio que convierten directamente la luz solar en corriente eléctrica.",
    "revisada": 1,
    "tecnica_requiere": {},
    "tecnica_otorga": {
      "INI": 1
    },
    "tecnica_tokens": 1,
    "nombre": "Celdas solares de silicio",
    "tipo": "fotovoltaico",
    "inicial": true,
    "puntos": "0 [PI]",
    "puntos_carta": 0,
    "puntos_capas": 0,
    "puntos_ingenieros": 0,
    "puntos_otros": 0,
    "copias": 1,
    "discos": 4,
    "bono": "4 [DS][FV] [=<]2[QU][AD]",
    "disco_soporte": 0,
    "efecto": "Coloca un disco en 4 celdas libres de [FV] Fotovoltaica de hasta 2 cuadrantes distintos adyacentes.\nObtén 1 [FT] ficha de técnica, luego debes darle esta carta al jugador a tu derecha.",
    "etapas": [
      {
        "m": {
          "Nd": 2,
          "Ti": 1,
          "Cu": 2,
          "Si": 10
        },
        "o": {
          "IQ": 1,
          "IM": 1,
          "En": 4,
          "Tr": 4
        }
      }
    ],
    "destino": "derecha"
  },
  {
    "id": "P011",
    "descripcion": "Armazón de titanio que combina resistencia mecánica y bajo peso.",
    "revisada": 1,
    "tecnica_requiere": {},
    "tecnica_otorga": {
      "INI": 1
    },
    "tecnica_tokens": 1,
    "nombre": "Estructura de titanio",
    "tipo": "estructura",
    "inicial": true,
    "puntos": "0 [PI]",
    "puntos_carta": 0,
    "puntos_capas": 0,
    "puntos_ingenieros": 0,
    "puntos_otros": 0,
    "copias": 1,
    "discos": 4,
    "bono": "4 [DS][ES]",
    "disco_soporte": 0,
    "efecto": "Coloca un disco en 4 celdas libres de [ES] Estructura.\nObtén 1 [FT] ficha de técnica, luego debes darle esta carta al jugador a tu derecha.",
    "etapas": [
      {
        "m": {
          "Ti": 10,
          "Al": 1
        },
        "o": {
          "IE": 2,
          "En": 1,
          "Tr": 2
        }
      }
    ],
    "destino": "derecha"
  },
  {
    "id": "P012",
    "descripcion": "Vigas y uniones de acero reforzado que soportan las cargas de la esfera.",
    "revisada": 1,
    "tecnica_requiere": {},
    "tecnica_otorga": {
      "INI": 1
    },
    "tecnica_tokens": 1,
    "nombre": "Estructura de acero reforzado",
    "tipo": "estructura",
    "inicial": true,
    "puntos": "0 [PI]",
    "puntos_carta": 0,
    "puntos_capas": 0,
    "puntos_ingenieros": 0,
    "puntos_otros": 0,
    "copias": 1,
    "discos": 2,
    "bono": "2 [DS][ES][AD] [=][QU]",
    "disco_soporte": 0,
    "efecto": "Coloca un disco en 2 celdas libres de [ES] Estructura adyacentes de un mismo cuadrante.\nObtén 1 [FT] ficha de técnica, luego debes darle esta carta al jugador a tu derecha.",
    "etapas": [
      {
        "m": {
          "Fe": 10,
          "Al": 2,
          "C": 1
        },
        "o": {
          "IE": 2,
          "En": 3,
          "Tr": 3
        }
      }
    ],
    "destino": "derecha"
  },
  {
    "id": "P013",
    "descripcion": "Sistema que registra transacciones en un libro contable compartido y verificable.",
    "revisada": 0,
    "tecnica_requiere": {
      "DAT": 1
    },
    "tecnica_otorga": {
      "FIN": 1
    },
    "tecnica_tokens": 0,
    "nombre": "Centro de blockchain",
    "tipo": "economia",
    "puntos": "0 [PI]",
    "puntos_carta": 0,
    "puntos_capas": 0,
    "puntos_ingenieros": 0,
    "puntos_otros": 16,
    "copias": 1,
    "discos": 0,
    "bono": "+25 [Di][RE]",
    "disco_soporte": 0,
    "efecto": "Gana $25. \nPuedes volver a colocar el cubo en la etapa 2.",
    "etapas": [
      {
        "m": {
          "Si": 5,
          "Cu": 2,
          "Al": 2,
          "Nd": 1
        },
        "o": {
          "IS": 2,
          "IM": 1,
          "En": 2
        }
      },
      {
        "m": {},
        "o": {
          "En": 3
        }
      }
    ],
    "destino": "etapa:2"
  },
  {
    "id": "P014",
    "descripcion": "Alianza comercial que reúne a proveedores y compradores de tierras raras.",
    "revisada": 0,
    "tecnica_requiere": {},
    "tecnica_otorga": {
      "FIN": 1
    },
    "tecnica_tokens": 0,
    "nombre": "Consorcio de minerales estratégicos",
    "tipo": "economia",
    "puntos": "0 [PI]",
    "puntos_carta": 0,
    "puntos_capas": 0,
    "puntos_ingenieros": 0,
    "puntos_otros": 9,
    "copias": 1,
    "discos": 0,
    "bono": "[TJ] [RR]=15[Di] [=] +1 [PI][/]2[RR]",
    "disco_soporte": 0,
    "efecto": "Cada jugador (incluso tú) puede vender hasta 3 [RR] tierras raras a $15 cada una, independientemente del tipo. \nGanas 1 [PI] por cada 2 [RR] vendidas entre todos los jugadores, redondeando hacia abajo. \nPuedes volver a colocar el cubo en la etapa 2.",
    "destino": "etapa:2",
    "etapas": [
      {
        "m": {
          "Cu": 3,
          "Al": 3,
          "Ce": 1
        },
        "o": {
          "IS": 1,
          "En": 1
        }
      },
      {
        "m": {},
        "o": {
          "IQ": 1,
          "En": 1
        }
      }
    ]
  },
  {
    "id": "P015",
    "descripcion": "Alojamiento orbital para visitantes de las instalaciones de la esfera.",
    "revisada": 0,
    "tecnica_requiere": {
      "HAB": 3
    },
    "tecnica_otorga": {
      "FIN": 1
    },
    "tecnica_tokens": 0,
    "nombre": "Hotel solar",
    "tipo": "economia",
    "puntos": "0 [PI]",
    "puntos_carta": 0,
    "puntos_capas": 0,
    "puntos_ingenieros": 0,
    "puntos_otros": 6,
    "copias": 1,
    "discos": 0,
    "bono": "+10 [Di] [RE]",
    "disco_soporte": 0,
    "efecto": "Cobra del banco $10. \nPuedes volver a colocar el cubo en la etapa 2.",
    "destino": "etapa:2",
    "etapas": [
      {
        "m": {
          "Al": 2,
          "fe": 2,
          "Cu": 1
        },
        "o": {
          "IE": 1,
          "En": 1
        }
      },
      {
        "m": {},
        "o": {
          "IS": 1,
          "En": 1
        }
      }
    ]
  },
  {
    "id": "P016",
    "descripcion": "Un robot autónomo asume tareas rutinarias del personal técnico.",
    "revisada": 0,
    "tecnica_requiere": {
      "IA": 1
    },
    "tecnica_otorga": {},
    "tecnica_tokens": 1,
    "nombre": "Reemplazo por asistente robótico autónomo",
    "tipo": "recursoshumanos",
    "puntos": "1 [PI]",
    "puntos_carta": 0,
    "puntos_capas": 0,
    "puntos_ingenieros": 4,
    "puntos_otros": 1,
    "copias": 4,
    "discos": 0,
    "bono": "-1 [AI] [=] +1 [II] +1 [PI]",
    "disco_soporte": 0,
    "efecto": "Retira un [AI] ingeniero anclado de cualquier celda y colócalo en tus barracas.\nObtén 1 [PI] punto y 1 [FT] ficha de técnica, luego debes darle esta carta al jugador a tu derecha.",
    "etapas": [
      {
        "m": {
          "Si": 2,
          "Cu": 1,
          "Nd": 1
        },
        "o": {
          "IS": 1,
          "En": 1,
          "Tr": 1
        }
      }
    ],
    "destino": "derecha"
  },
  {
    "id": "P017",
    "descripcion": "Formación práctica que incorpora personal a los equipos técnicos.",
    "revisada": 0,
    "tecnica_requiere": {},
    "tecnica_otorga": {},
    "tecnica_tokens": 0,
    "nombre": "Pasantía",
    "tipo": "recursoshumanos",
    "puntos": "0 [PI]",
    "puntos_carta": 0,
    "puntos_capas": 0,
    "puntos_ingenieros": 0,
    "puntos_otros": 0,
    "copias": 3,
    "discos": 0,
    "bono": "+1 [IQ] [/] [CN]",
    "disco_soporte": 0,
    "efecto": "Coloca 1 [IQ] ingeniero químico de la reserva en tus barracas sin gastar ninguna ficha de contratación. Si no hay [IQ] disponibles en la reserva, obtén 1 [CN] ficha de contratación.",
    "destino": "completados",
    "etapas": [
      {
        "m": {},
        "o": {
          "IQ": 2
        }
      }
    ]
  },
  {
    "id": "P018",
    "descripcion": "Especialista que desarrolla y ajusta la IA que opera los sistemas de la esfera.",
    "revisada": 0,
    "tecnica_requiere": {
      "ELE": 1,
      "IA": 1,
      "DAT": 2
    },
    "tecnica_otorga": {
      "IA": 1,
      "DAT": 1
    },
    "tecnica_tokens": 1,
    "nombre": "Programador de IA",
    "tipo": "recursoshumanos",
    "puntos": "0 [PI]",
    "puntos_carta": 0,
    "puntos_capas": 0,
    "puntos_ingenieros": 0,
    "puntos_otros": 12,
    "copias": 2,
    "discos": 0,
    "bono": "-3[PE] +3 [IS][/][CN]",
    "disco_soporte": 0,
    "efecto": "Disminuye en 3 tu [PE] y coloca hasta 3 [IS] ingenieros en sistemas de la reserva en tus barracas sin gastar fichas de contratación. \n Por cada uno que no esté disponible, obtén 1 [CN] ficha de contratación.\nObtén 1 [FT] ficha de técnica.",
    "destino": "completados",
    "etapas": [
      {
        "m": {
          "Si": 3,
          "Cu": 1,
          "Nd": 1
        },
        "o": {
          "IS": 1,
          "En": 1
        }
      },
      {
        "m": {
          "Si": 2,
          "Gd": 1
        },
        "o": {
          "IS": 1,
          "En": 2
        }
      }
    ]
  },
  {
    "id": "P019",
    "descripcion": "Reforma laboral que permite a los operadores negociar sus propias escalas salariales.",
    "revisada": 0,
    "tecnica_requiere": {
      "FIN": 1
    },
    "tecnica_otorga": {
      "FIN": 1
    },
    "tecnica_tokens": 0,
    "nombre": "Desregulación de sueldos",
    "tipo": "recursoshumanos",
    "puntos": "0 [PI]",
    "puntos_carta": 0,
    "puntos_capas": 0,
    "puntos_ingenieros": 0,
    "puntos_otros": 0,
    "copias": 1,
    "discos": 0,
    "bono": "[TJ] +1[CN] [=] +1[PI] [/] [TJ]",
    "disco_soporte": 0,
    "efecto": "Cada jugador obtiene 1 [CN]. Ganas 1 [PI] por cada [CN] entregada.",
    "destino": "completados",
    "etapas": [
      {
        "m": {
          "Si": 2
        },
        "o": {
          "IS": 1,
          "En": 1
        }
      }
    ]
  },
  {
    "id": "P020",
    "descripcion": "Robots con herramientas intercambiables para inspección, montaje y reparación.",
    "revisada": 0,
    "tecnica_requiere": {
      "IA": 3,
      "MIN": 1,
      "ELE": 1,
      "BIO": 3
    },
    "tecnica_otorga": {
      "IA": 1,
      "MIN": 1
    },
    "tecnica_tokens": 1,
    "nombre": "Robots multipropósito",
    "tipo": "recursoshumanos",
    "puntos": "5 [PI]",
    "puntos_carta": 5,
    "puntos_capas": 0,
    "puntos_ingenieros": 0,
    "puntos_otros": 8,
    "copias": 2,
    "discos": 0,
    "bono": "-4 [PE] + 4[II] [/] [CN]",
    "disco_soporte": 0,
    "efecto": "Disminuye en 4 tu [PE] y coloca hasta 4 [II] ingenieros a elección de la reserva en tus barracas sin gastar fichas de contratación; por cada ingeniero no disponible obtén 1 ficha de contratación [CN].\nObtén 5 [PI] puntos y 1 [FT] ficha de técnica.",
    "destino": "completados",
    "etapas": [
      {
        "m": {
          "Ti": 1,
          "Al": 1,
          "Fe": 1,
          "Si": 1
        },
        "o": {
          "IE": 1,
          "IM": 1,
          "En": 3
        }
      },
      {
        "m": {
          "C": 1,
          "Cu": 1,
          "Nd": 1
        },
        "o": {
          "IS": 2,
          "En": 3
        }
      }
    ]
  },
  {
    "id": "P021",
    "descripcion": "Programa que apoya equipos para llevar proyectos experimentales a la práctica.",
    "revisada": 0,
    "tecnica_requiere": {},
    "tecnica_otorga": {},
    "tecnica_tokens": 3,
    "nombre": "Incubadora de proyectos",
    "tipo": "produccion",
    "puntos": "0 [PI]",
    "puntos_carta": 0,
    "puntos_capas": 0,
    "puntos_ingenieros": 0,
    "puntos_otros": 0,
    "copias": 3,
    "discos": 0,
    "bono": "[TJ] +1 [CP]",
    "disco_soporte": 0,
    "efecto": "Roba 1 [CP] carta de proyecto de la reserva por cada jugador, dale una a cada oponente y conserva la otra.\nPuedes devolver esta carta a tu mano.\nObtén 3 [FT] fichas de técnica.",
    "destino": "mano",
    "etapas": [
      {
        "m": {},
        "o": {
          "IS": 1,
          "En": 1
        }
      }
    ]
  },
  {
    "id": "P022",
    "descripcion": "Resinas de intercambio iónico separan tierras raras recuperadas de la escoria.",
    "revisada": 0,
    "tecnica_requiere": {
      "MAT": 2
    },
    "tecnica_otorga": {
      "MAT": 1
    },
    "tecnica_tokens": 0,
    "nombre": "Refinería de escoria por intercambio iónico",
    "tipo": "produccion",
    "puntos": "0 [PI]",
    "puntos_carta": 0,
    "puntos_capas": 0,
    "puntos_ingenieros": 0,
    "puntos_otros": 0,
    "copias": 2,
    "discos": 0,
    "bono": "+4 [RR][RE]",
    "disco_soporte": 0,
    "efecto": "Obtén de la reserva hasta 4 [RR] tierras raras a elección. \nPuedes volver a colocar el cubo en la etapa 2.",
    "destino": "etapa:2",
    "etapas": [
      {
        "m": {
          "Ti": 2,
          "Cu": 4,
          "Si": 2,
          "Nd": 1
        },
        "o": {
          "IQ": 1,
          "En": 2
        }
      },
      {
        "m": {},
        "o": {
          "IQ": 1,
          "En": 3
        }
      }
    ]
  },
  {
    "id": "P023",
    "descripcion": "Unidad portátil que analiza muestras y prepara reactivos en el lugar.",
    "revisada": 0,
    "tecnica_requiere": {},
    "tecnica_otorga": {},
    "tecnica_tokens": 1,
    "nombre": "Laboratorio móvil",
    "tipo": "produccion",
    "puntos": "0 [PI]",
    "puntos_carta": 0,
    "puntos_capas": 0,
    "puntos_ingenieros": 0,
    "puntos_otros": 0,
    "copias": 5,
    "discos": 0,
    "bono": "-6[Di] +4[RQ]",
    "disco_soporte": 0,
    "efecto": "Paga $6 para obtener 4 reactivos de tu elección.\nObtén 1 [FT] ficha de técnica, luego debes darle esta carta al jugador a tu derecha.",
    "destino": "derecha",
    "etapas": [
      {
        "m": {},
        "o": {
          "IQ": 2
        }
      }
    ]
  },
  {
    "id": "P024",
    "descripcion": "Una pista electromagnética acelera y lanza cargamentos sin un cohete.",
    "revisada": 0,
    "tecnica_requiere": {
      "MAG": 4
    },
    "tecnica_otorga": {
      "PROP": 1
    },
    "tecnica_tokens": 0,
    "nombre": "Catapulta electromagnética",
    "tipo": "produccion",
    "puntos": "0 [PI]",
    "puntos_carta": 0,
    "puntos_capas": 0,
    "puntos_ingenieros": 0,
    "puntos_otros": 15,
    "copias": 1,
    "discos": 0,
    "bono": "+5 [Tr] [RE]",
    "disco_soporte": 0,
    "efecto": "Obtén 5 [Tr] Transporte de la reserva. \nPuedes volver a colocar el cubo en la etapa 2.",
    "destino": "etapa:2",
    "etapas": [
      {
        "m": {
          "Cu": 2,
          "Al": 2,
          "Ti": 1,
          "Nd": 1
        },
        "o": {
          "IM": 1,
          "IE": 1,
          "En": 2
        }
      },
      {
        "m": {
          "Cu": 1
        },
        "o": {
          "IS": 1,
          "En": 3
        }
      }
    ]
  },
  {
    "id": "P025",
    "descripcion": "Un cable orbital giratorio recoge y transfiere cargas entre trayectorias.",
    "revisada": 0,
    "tecnica_requiere": {
      "PROP": 3,
      "MAT": 1
    },
    "tecnica_otorga": {
      "PROP": 1
    },
    "tecnica_tokens": 0,
    "nombre": "Gancho orbital",
    "tipo": "produccion",
    "puntos": "0 [PI]",
    "puntos_carta": 0,
    "puntos_capas": 0,
    "puntos_ingenieros": 0,
    "puntos_otros": 21,
    "copias": 1,
    "discos": 0,
    "bono": "+7 [Tr] [RE]",
    "disco_soporte": 0,
    "efecto": "Obtén 7 [Tr] Transporte de la reserva. \nPuedes volver a colocar el cubo en la etapa 2.",
    "destino": "etapa:2",
    "etapas": [
      {
        "m": {
          "Ti": 2,
          "Fe": 3,
          "C": 3
        },
        "o": {
          "IE": 2,
          "En": 2
        }
      },
      {
        "m": {
          "Ti": 2,
          "Cu": 3,
          "Nd": 1
        },
        "o": {
          "IE": 1,
          "IM": 1,
          "En": 1
        }
      }
    ]
  },
  {
    "id": "P026",
    "descripcion": "Paneles que alimentan los equipos locales con electricidad de origen solar.",
    "revisada": 0,
    "tecnica_requiere": {
      "FOT": 1
    },
    "tecnica_otorga": {},
    "tecnica_tokens": 1,
    "nombre": "Paneles solares",
    "tipo": "generador",
    "puntos": "0 [PI]",
    "puntos_carta": 0,
    "puntos_capas": 0,
    "puntos_ingenieros": 0,
    "puntos_otros": 2,
    "copias": 4,
    "discos": 0,
    "bono": "+2 [PE]",
    "disco_soporte": 0,
    "efecto": "Aumenta en 2 tu [PE] producción de energía.\nObtén 1 [FT] ficha de técnica, luego puedes devolver esta carta a tu mano.",
    "destino": "mano",
    "etapas": [
      {
        "m": {
          "Si": 2,
          "Al": 1,
          "Cu": 1
        },
        "o": {
          "IM": 1,
          "En": 1
        }
      }
    ]
  },
  {
    "id": "P027",
    "descripcion": "Termopares convierten en electricidad el calor de la desintegración radiactiva.",
    "revisada": 0,
    "tecnica_requiere": {
      "NUC": 1,
      "MAT": 1
    },
    "tecnica_otorga": {
      "NUC": 1
    },
    "tecnica_tokens": 1,
    "nombre": "Generador de radioisótopos (RTG)",
    "tipo": "generador",
    "puntos": "3 [PI]",
    "puntos_carta": 3,
    "puntos_capas": 0,
    "puntos_ingenieros": 0,
    "puntos_otros": 2,
    "copias": 2,
    "discos": 0,
    "bono": "+2 [PE]",
    "disco_soporte": 0,
    "efecto": "Aumenta en 2 tu [PE] producción de energía.\nObtén 3 [PI] puntos y 1 [FT] ficha de técnica.",
    "destino": "completados",
    "etapas": [
      {
        "m": {
          "Cu": 2,
          "Nd": 1
        },
        "o": {
          "IQ": 1,
          "IM": 1,
          "En": 2
        }
      }
    ]
  },
  {
    "id": "P028",
    "descripcion": "Espejos concentran luz solar en un motor Stirling que acciona un generador.",
    "revisada": 0,
    "tecnica_requiere": {
      "TER": 2
    },
    "tecnica_otorga": {
      "FOT": 1
    },
    "tecnica_tokens": 1,
    "nombre": "Concentrador solar Stirling",
    "tipo": "generador",
    "puntos": "3 [PI]",
    "puntos_carta": 3,
    "puntos_capas": 0,
    "puntos_ingenieros": 0,
    "puntos_otros": 5,
    "copias": 2,
    "discos": 0,
    "bono": "+5 [PE]",
    "disco_soporte": 0,
    "efecto": "Aumenta en 5 tu [PE] producción de energía.\nObtén 3 [PI] puntos y 1 [FT] ficha de técnica.",
    "destino": "completados",
    "etapas": [
      {
        "m": {
          "Cu": 1,
          "Si": 1,
          "Ce": 1
        },
        "o": {
          "IM": 1,
          "En": 1
        }
      },
      {
        "m": {
          "Fe": 2,
          "C": 1
        },
        "o": {
          "IM": 1,
          "En": 1
        }
      }
    ]
  },
  {
    "id": "P029",
    "descripcion": "El calor solar expande un gas comprimido que mueve una turbina y genera electricidad.",
    "revisada": 0,
    "tecnica_requiere": {},
    "tecnica_otorga": {
      "TER": 1
    },
    "tecnica_tokens": 1,
    "nombre": "Central solar de ciclo Brayton",
    "tipo": "generador",
    "puntos": "0 [PI]",
    "puntos_carta": 0,
    "puntos_capas": 0,
    "puntos_ingenieros": 0,
    "puntos_otros": 5,
    "copias": 1,
    "discos": 0,
    "bono": "+5 [PE]",
    "disco_soporte": 0,
    "efecto": "Aumenta en 5 tu [PE] producción de energía.\nObtén 1 [FT] ficha de técnica.",
    "destino": "completados",
    "etapas": [
      {
        "m": {
          "Al": 2,
          "Cu": 2,
          "Si": 2,
          "Nd": 1
        },
        "o": {
          "IM": 1,
          "En": 2
        }
      }
    ]
  },
  {
    "id": "P030",
    "descripcion": "Un compuesto de fibras fúngicas forma piezas livianas para la estructura.",
    "revisada": 0,
    "tecnica_requiere": {
      "BIO": 2
    },
    "tecnica_otorga": {
      "BIO": 1
    },
    "tecnica_tokens": 1,
    "nombre": "Micelio estructural",
    "tipo": "estructura",
    "puntos": "0 [PI]",
    "puntos_carta": 0,
    "puntos_capas": 0,
    "puntos_ingenieros": 0,
    "puntos_otros": 0,
    "copias": 1,
    "discos": 4,
    "bono": "(4[AI]) [=] 1 [DS] [ES] [RE]",
    "disco_soporte": 0,
    "efecto": "Si hay 4 o más [AI] ingenieros anclados en la esfera, coloca un disco en 1 celda libre de [ES] Estructura y obtén 1 [FT] ficha de técnica.\nPuedes volver a colocar el cubo en la etapa 2.",
    "etapas": [
      {
        "m": {
          "Ti": 1,
          "C": 5,
          "Si": 2,
          "Al": 1
        },
        "o": {
          "IE": 1,
          "IQ": 1,
          "Tr": 2,
          "En": 2
        }
      },
      {
        "m": {},
        "o": {
          "IQ": 1,
          "En": 2
        }
      }
    ],
    "destino": "etapa:2"
  },
  {
    "id": "P031",
    "descripcion": "Un compuesto de fibra de carbono aporta rigidez con poca masa.",
    "revisada": 0,
    "ignorar_15el": true,
    "tecnica_requiere": {
      "MAT": 1,
      "FAB": 2
    },
    "tecnica_otorga": {
      "MAT": 1
    },
    "tecnica_tokens": 1,
    "nombre": "Estructura de fibra de carbono",
    "tipo": "estructura",
    "puntos": "8 [PI]",
    "puntos_carta": 8,
    "puntos_capas": 0,
    "puntos_ingenieros": 0,
    "puntos_otros": 0,
    "copias": 2,
    "discos": 5,
    "bono": "5 [DS][ES] [=<]2[QU]",
    "disco_soporte": 0,
    "efecto": "Coloca un disco en 5 celdas libres de [ES] Estructura de hasta 2 cuadrantes distintos.\nObtén 8 [PI] puntos y 1 [FT] ficha de técnica.",
    "etapas": [
      {
        "m": {
          "C": 20,
          "Ti": 1
        },
        "o": {
          "IQ": 2,
          "En": 4
        }
      },
      {
        "m": {
          "C": 10,
          "Ti": 1
        },
        "o": {
          "IQ": 2,
          "En": 3,
          "Tr": 1
        }
      }
    ],
    "destino": "completados"
  },
  {
    "id": "P032",
    "descripcion": "Un núcleo en forma de panal da rigidez a paneles livianos de aluminio.",
    "revisada": 0,
    "tecnica_requiere": {
      "MAT": 1,
      "PRE": 2
    },
    "tecnica_otorga": {
      "FAB": 1,
      "PRE": 1
    },
    "tecnica_tokens": 0,
    "nombre": "Estructura alveolar de aluminio",
    "tipo": "estructura",
    "puntos": "3 [PI]",
    "puntos_carta": 3,
    "puntos_capas": 0,
    "puntos_ingenieros": 0,
    "puntos_otros": 0,
    "copias": 3,
    "discos": 6,
    "bono": "6 [DS][ES][AD]",
    "disco_soporte": 0,
    "efecto": "Coloca un disco en 6 celdas libres de [ES] Estructura adyacentes.\nObtén 3 [PI] puntos.",
    "etapas": [
      {
        "m": {
          "Al": 5,
          "Si": 5
        },
        "o": {
          "IE": 1,
          "En": 2
        }
      },
      {
        "m": {
          "Al": 5,
          "Ti": 1
        },
        "o": {
          "IE": 1,
          "En": 1,
          "Tr": 1
        }
      }
    ],
    "destino": "completados"
  },
  {
    "id": "P033",
    "descripcion": "Aleaciones metálicas amorfas forman piezas resistentes a la deformación.",
    "revisada": 0,
    "tecnica_requiere": {
      "MAT": 1,
      "TER": 1
    },
    "tecnica_otorga": {
      "MAT": 1,
      "FAB": 1
    },
    "tecnica_tokens": 2,
    "nombre": "Estructura de vidrio metálico",
    "tipo": "estructura",
    "puntos": "3 [PI]",
    "puntos_carta": 3,
    "puntos_capas": 0,
    "puntos_ingenieros": 0,
    "puntos_otros": 0,
    "copias": 1,
    "discos": 6,
    "bono": "6 [DS][ES]",
    "disco_soporte": 0,
    "efecto": "Coloca un disco en 6 celdas libres de [ES] Estructura.\nObtén 3 [PI] puntos y 2 [FT] fichas de técnica.",
    "etapas": [
      {
        "m": {
          "Fe": 5,
          "Cu": 2,
          "Si": 4
        },
        "o": {
          "IQ": 2,
          "IE": 1,
          "En": 3
        }
      },
      {
        "m": {
          "Fe": 5,
          "Ti": 1,
          "Cu": 2
        },
        "o": {
          "IQ": 1,
          "IE": 1,
          "En": 2,
          "Tr": 2
        }
      }
    ],
    "destino": "completados"
  },
  {
    "id": "P034",
    "descripcion": "Celdas hechas de un solo cristal de silicio convierten luz solar en electricidad.",
    "revisada": 0,
    "tecnica_requiere": {
      "FAB": 1,
      "PRE": 2,
      "MIN": 1
    },
    "tecnica_otorga": {
      "FOT": 1
    },
    "tecnica_tokens": 2,
    "nombre": "Paneles de silicio monocristalino",
    "tipo": "fotovoltaico",
    "puntos": "3 [PI]",
    "puntos_carta": 3,
    "puntos_capas": 0,
    "puntos_ingenieros": 0,
    "puntos_otros": 0,
    "copias": 3,
    "discos": 4,
    "bono": "4 [DS][FV] [=][QU]",
    "disco_soporte": 0,
    "efecto": "Coloca un disco en 4 celdas libres de [FV] Fotovoltaica del mismo cuadrante.\nObtén 3 [PI] puntos y 2 [FT] fichas de técnica.",
    "etapas": [
      {
        "m": {
          "Si": 5,
          "Al": 2
        },
        "o": {
          "IQ": 1,
          "En": 2
        }
      },
      {
        "m": {
          "Si": 2,
          "Cu": 3
        },
        "o": {
          "IM": 1,
          "En": 2,
          "Tr": 1
        }
      }
    ],
    "destino": "completados"
  },
  {
    "id": "P035",
    "descripcion": "Conductores criogénicos transmiten corriente eléctrica sin resistencia.",
    "revisada": 0,
    "tecnica_requiere": {
      "MAG": 2,
      "TER": 2
    },
    "tecnica_otorga": {
      "MAG": 1
    },
    "tecnica_tokens": 1,
    "nombre": "Red superconductora criogénica",
    "tipo": "transmision",
    "puntos": "4 [PI]",
    "puntos_carta": 4,
    "puntos_capas": 0,
    "puntos_ingenieros": 0,
    "puntos_otros": 0,
    "copias": 2,
    "discos": 2,
    "bono": "1[QD][RF] + 3 [DS][TS] [=][QU]",
    "disco_soporte": 0,
    "efecto": "[QD] Retira 1 de tus discos de celdas de [RF] Refrigeración y coloca un disco en 3 celdas libres de [TS] Transmisión del mismo cuadrante.\nObtén 4 [PI] puntos y 1 [FT] ficha de técnica.",
    "etapas": [
      {
        "m": {
          "Cu": 1,
          "Gd": 1,
          "Al": 2,
          "Si": 3
        },
        "o": {
          "IQ": 1,
          "IM": 1,
          "En": 2,
          "Tr": 2
        }
      }
    ],
    "destino": "completados"
  },
  {
    "id": "P036",
    "descripcion": "Hidruros sometidos a presiones extremas actúan como conductores superconductores.",
    "revisada": 0,
    "tecnica_requiere": {
      "MAG": 2,
      "MAT": 1,
      "CUA": 2
    },
    "tecnica_otorga": {
      "CUA": 1
    },
    "tecnica_tokens": 2,
    "nombre": "Superconductores de hidruros a alta presión",
    "tipo": "transmision",
    "puntos": "4 [PI]",
    "puntos_carta": 4,
    "puntos_capas": 0,
    "puntos_ingenieros": 0,
    "puntos_otros": 0,
    "copias": 1,
    "discos": 8,
    "bono": "4[DS][TS] [AD] 4 [DS][RF]",
    "disco_soporte": 0,
    "efecto": "Coloca un disco en 4 celdas libres de [TS] Transmisión adyacentes.\nLuego, coloca un disco en 1 celda libre de [RF] Refrigeración adyacente a cada una de ellas.\nObtén 4 [PI] puntos y 2 [FT] fichas de técnica.",
    "etapas": [
      {
        "m": {
          "Ti": 1,
          "Ce": 1,
          "Cu": 2,
          "Al": 2
        },
        "o": {
          "IQ": 2,
          "IM": 1,
          "En": 2
        }
      },
      {
        "m": {
          "Gd": 1,
          "Nd": 1,
          "Al": 2
        },
        "o": {
          "IQ": 1,
          "IM": 1,
          "En": 2,
          "Tr": 2
        }
      }
    ],
    "destino": "completados"
  },
  {
    "id": "P037",
    "descripcion": "Un láser de alta potencia envía energía a un receptor óptico distante.",
    "revisada": 0,
    "tecnica_requiere": {
      "FOT": 3,
      "CUA": 1
    },
    "tecnica_otorga": {
      "FOT": 1
    },
    "tecnica_tokens": 4,
    "nombre": "Transmisor láser de alta potencia",
    "tipo": "transmision",
    "puntos": "5 [PI]",
    "puntos_carta": 5,
    "puntos_capas": 0,
    "puntos_ingenieros": 0,
    "puntos_otros": 0,
    "copias": 1,
    "discos": 6,
    "bono": "6 [DS][TS] + 4 [DH][RF] [=] 2 [QU]",
    "disco_soporte": 0,
    "efecto": "Coloca un disco en 6 celdas libres de [TS] Transmisión de dos cuadrantes distintos con beneficios normales de colocación. Después, coloca un disco en otras 4 celdas libres de [RF] Refrigeración de los mismos dos cuadrantes sin cobrar bonos de colocación.\nObtén 5 [PI] puntos y 4 [FT] fichas de técnica.",
    "etapas": [
      {
        "m": {
          "Si": 4,
          "Cu": 3,
          "Er": 1
        },
        "o": {
          "IE": 1,
          "IM": 1,
          "En": 2
        }
      },
      {
        "m": {
          "Al": 2,
          "Ti": 2,
          "Nd": 1
        },
        "o": {
          "IE": 1,
          "En": 1,
          "Tr": 2
        }
      }
    ],
    "destino": "completados"
  },
  {
    "id": "P038",
    "descripcion": "Nanotubos alineados conducen calor hacia las superficies que lo irradian al espacio.",
    "revisada": 0,
    "ignorar_15el": true,
    "tecnica_requiere": {
      "NANO": 2,
      "TER": 2
    },
    "tecnica_otorga": {
      "NANO": 1,
      "MAT": 1
    },
    "tecnica_tokens": 1,
    "nombre": "Radiadores de nanotubos de carbono alineados",
    "tipo": "refrigeracion",
    "puntos": "5 [PI]",
    "puntos_carta": 5,
    "puntos_capas": 0,
    "puntos_ingenieros": 0,
    "puntos_otros": 0,
    "copias": 2,
    "discos": 6,
    "bono": "6 [DS][RF] [AD]",
    "disco_soporte": 0,
    "efecto": "Coloca un disco en 6 celdas libres y adyacentes de [RF] Refrigeración.\nObtén 5 [PI] puntos y 1 [FT] ficha de técnica.",
    "etapas": [
      {
        "m": {
          "C": 15,
          "Si": 5,
          "Ce": 2
        },
        "o": {
          "IQ": 2,
          "IE": 1,
          "En": 2
        }
      },
      {
        "m": {
          "C": 15,
          "Al": 5
        },
        "o": {
          "IQ": 1,
          "IM": 1,
          "En": 2,
          "Tr": 2
        }
      }
    ],
    "destino": "completados"
  },
  {
    "id": "P039",
    "descripcion": "Láminas de grafeno reparten el calor sobre las superficies que lo irradian al espacio.",
    "revisada": 0,
    "tecnica_requiere": {
      "NANO": 2,
      "MAT": 1
    },
    "tecnica_otorga": {
      "NANO": 1,
      "MAT": 1
    },
    "tecnica_tokens": 1,
    "ignorar_15el": true,
    "nombre": "Radiadores de grafeno multicapa",
    "tipo": "refrigeracion",
    "puntos": "3 [PI]",
    "puntos_carta": 3,
    "puntos_capas": 0,
    "puntos_ingenieros": 0,
    "puntos_otros": 0,
    "copias": 1,
    "discos": 8,
    "bono": "8 [DS][RF] [=<]3[QU]",
    "disco_soporte": 0,
    "efecto": "Coloca un disco en 8 celdas libres de [RF] Refrigeración de hasta 3 cuadrantes.\nObtén 3 [PI] puntos y 1 [FT] ficha de técnica.",
    "etapas": [
      {
        "m": {
          "C": 5,
          "Cu": 2,
          "Gd": 2
        },
        "o": {
          "IQ": 2,
          "En": 3
        }
      },
      {
        "m": {
          "C": 10,
          "Al": 3
        },
        "o": {
          "IQ": 2,
          "IE": 1,
          "En": 3,
          "Tr": 2
        }
      }
    ],
    "destino": "completados"
  },
  {
    "id": "P040",
    "descripcion": "Membranas delgadas que ajustan su forma en respuesta a cambios del entorno.",
    "revisada": 0,
    "tecnica_requiere": {
      "MIN": 2,
      "BIO": 2
    },
    "tecnica_otorga": {
      "MIN": 1
    },
    "tecnica_tokens": 1,
    "nombre": "Micromembranas adaptativas",
    "tipo": "refrigeracion",
    "puntos": "0 [PI]",
    "puntos_carta": 0,
    "puntos_capas": 0,
    "puntos_ingenieros": 0,
    "puntos_otros": 0,
    "copias": 1,
    "discos": 10,
    "bono": "2 [DS][RF] 2 [DS][MO] [=] 2 [SC] [RE]",
    "disco_soporte": 0,
    "efecto": "Coloca un disco en 2 celdas libres de [RF] Refrigeración y un disco en 2 celdas libres de [MO] Microondas de los mismos dos sectores, uno de cada capa por sector y obtén 1 [FT] ficha de técnica.\nPuedes volver a colocar el cubo en la etapa 2.",
    "etapas": [
      {
        "m": {
          "Si": 5,
          "Al": 5,
          "Fe": 5
        },
        "o": {
          "IM": 1,
          "En": 2
        }
      },
      {
        "m": {
          "Fe": 5,
          "Cu": 5,
          "Nd": 3
        },
        "o": {
          "IS": 1,
          "En": 1,
          "Tr": 2
        }
      }
    ],
    "destino": "etapa:2"
  },
  {
    "id": "P041",
    "descripcion": "Antenas sincronizadas orientan un haz de microondas ajustando la fase de sus señales.",
    "revisada": 0,
    "tecnica_requiere": {
      "MAG": 1,
      "ELE": 1,
      "MIN": 1
    },
    "tecnica_otorga": {
      "MAG": 1
    },
    "tecnica_tokens": 1,
    "nombre": "Matriz de antenas en fase",
    "tipo": "microondas",
    "puntos": "0 [PI]",
    "puntos_carta": 0,
    "puntos_capas": 0,
    "puntos_ingenieros": 0,
    "puntos_otros": 0,
    "copias": 3,
    "discos": 7,
    "bono": "7 [DS][MO] [=][QU] [AD] [QU]",
    "disco_soporte": 0,
    "efecto": "Coloca un disco en 7 celdas libres de [MO] Microondas en dos cuadrantes adyacentes.\nObtén 1 [FT] ficha de técnica.",
    "etapas": [
      {
        "m": {
          "Al": 2,
          "Cu": 2,
          "Si": 2
        },
        "o": {
          "IM": 1,
          "IS": 1,
          "En": 2
        }
      },
      {
        "m": {
          "Cu": 3
        },
        "o": {
          "IM": 1,
          "IS": 1,
          "En": 2,
          "Tr": 2
        }
      }
    ],
    "destino": "completados"
  },
  {
    "nombre": "Fábrica de blindaje exterior",
    "id": "P042",
    "descripcion": "Planta que fabrica paneles para proteger la cara exterior de la esfera.",
    "revisada": 0,
    "tecnica_requiere": {
      "FAB": 2
    },
    "tecnica_otorga": {
      "FAB": 1
    },
    "tecnica_tokens": 1,
    "tipo": "microondas",
    "puntos": "0 [PI]",
    "puntos_carta": 0,
    "puntos_capas": 0,
    "puntos_ingenieros": 0,
    "puntos_otros": 0,
    "copias": 3,
    "discos": 6,
    "bono": "2 [DS][MO] [RE]",
    "disco_soporte": 0,
    "efecto": "Coloca un disco en 2 celdas libres de [MO] Microondas de cualquier cuadrante y obtén 1 [FT] ficha de técnica.\nPuedes volver a colocar el cubo en la etapa 2.",
    "etapas": [
      {
        "m": {
          "Fe": 5,
          "Ti": 2
        },
        "o": {
          "IE": 1,
          "En": 2
        }
      },
      {
        "m": {
          "Fe": 9,
          "Ti": 3
        },
        "o": {
          "IE": 1,
          "En": 2
        }
      }
    ],
    "destino": "etapa:2"
  },
  {
    "id": "P043",
    "descripcion": "Fibras ópticas detectan deformaciones de la estructura mediante cambios en la luz.",
    "revisada": 0,
    "tecnica_requiere": {
      "FOT": 1,
      "MAT": 1,
      "MIN": 1
    },
    "tecnica_otorga": {
      "FOT": 1
    },
    "tecnica_tokens": 1,
    "nombre": "Extensómetros de fibra óptica",
    "tipo": "sensores",
    "puntos": "0 [PI]",
    "puntos_carta": 0,
    "puntos_capas": 0,
    "puntos_ingenieros": 0,
    "puntos_otros": -2,
    "copias": 1,
    "discos": 0,
    "bono": "2 [DP][SN] \n -1 [PI] [/] [NO] [ES] [=][QU]",
    "disco_soporte": 2,
    "efecto": "Coloca un disco en 2 celdas libres de [SN] Sensores de dos áreas de soporte distintas.\nLuego pierde 1 [PI] por cada celda de [ES] Estructura sin disco en cada cuadrante donde colocaste un disco de soporte.\nObtén 1 [FT] ficha de técnica.",
    "etapas": [
      {
        "m": {
          "Fe": 2,
          "Si": 2,
          "Cu": 1,
          "C": 5
        },
        "o": {
          "IM": 1,
          "En": 1
        }
      },
      {
        "m": {
          "Si": 3,
          "Cu": 1,
          "C": 5
        },
        "o": {
          "IM": 1,
          "En": 1,
          "Tr": 1
        }
      }
    ],
    "destino": "completados"
  },
  {
    "id": "P044",
    "descripcion": "Cámaras infrarrojas revelan zonas de sobrecalentamiento a distancia.",
    "revisada": 0,
    "tecnica_requiere": {
      "FOT": 1,
      "TER": 1,
      "ELE": 1
    },
    "tecnica_otorga": {
      "FOT": 1
    },
    "tecnica_tokens": 2,
    "nombre": "Termografía infrarroja",
    "tipo": "sensores",
    "puntos": "0 [PI]",
    "puntos_carta": 0,
    "puntos_capas": 0,
    "puntos_ingenieros": 0,
    "puntos_otros": 0,
    "copias": 2,
    "discos": 0,
    "bono": "2 [DP][SN]",
    "disco_soporte": 2,
    "efecto": "Coloca un disco en 2 celdas libres de [SN] Sensores de dos áreas de soporte distintas.\nObtén 2 [FT] fichas de técnica.",
    "etapas": [
      {
        "m": {
          "Si": 3,
          "Cu": 2,
          "Nd": 2
        },
        "o": {
          "IM": 1,
          "En": 1
        }
      },
      {
        "m": {
          "Si": 3
        },
        "o": {
          "IM": 1,
          "IS": 1,
          "En": 1,
          "Tr": 1
        }
      }
    ],
    "destino": "completados"
  },
  {
    "id": "P045",
    "descripcion": "Instrumentos registran la dosis de radiación que acumulan equipos y personas.",
    "revisada": 0,
    "tecnica_requiere": {
      "NUC": 1,
      "ELE": 1
    },
    "tecnica_otorga": {
      "NUC": 1
    },
    "tecnica_tokens": 1,
    "nombre": "Dosímetros de radiación",
    "tipo": "sensores",
    "puntos": "0 [PI]",
    "puntos_carta": 0,
    "puntos_capas": 0,
    "puntos_ingenieros": 0,
    "puntos_otros": -5,
    "copias": 1,
    "discos": 0,
    "bono": "2 [DP][SN] \n -5[PI] [/] [NO][MN] [=][QU]",
    "disco_soporte": 2,
    "efecto": "Coloca un disco en 2 celdas libres de [SN] Sensores de dos áreas de soporte distintas. \nLuego, pierde 5 [PI] por cada celda de [MN] Mantenimiento sin disco en cada cuadrante donde colocaste un disco de soporte.\nObtén 1 [FT] ficha de técnica.",
    "etapas": [
      {
        "m": {
          "Si": 5,
          "Al": 5,
          "Ce": 3
        },
        "o": {
          "IQ": 1,
          "IS": 1,
          "En": 1,
          "Tr": 1
        }
      }
    ],
    "destino": "completados"
  },
  {
    "id": "P046",
    "descripcion": "Sensores detectan micrometeoritos o registran sus impactos en el revestimiento.",
    "revisada": 0,
    "tecnica_requiere": {
      "ELE": 1,
      "FAB": 1,
      "MIN": 1
    },
    "tecnica_otorga": {
      "ELE": 1
    },
    "tecnica_tokens": 2,
    "nombre": "Detectores de micrometeoritos",
    "tipo": "sensores",
    "puntos": "0 [PI]",
    "puntos_carta": 0,
    "puntos_capas": 0,
    "puntos_ingenieros": 0,
    "puntos_otros": -2,
    "copias": 2,
    "discos": 0,
    "bono": "1 [DP][SN] \n -1[PI][/][NO][MO] [=][QU]",
    "disco_soporte": 1,
    "efecto": "Coloca un disco en 1 celda libre de [SN] Sensores de un área de soporte. \nLuego pierde 1 [PI] por cada celda de [MO] Microondas sin disco en cada cuadrante donde colocaste un disco de soporte.\nObtén 2 [FT] fichas de técnica.",
    "etapas": [
      {
        "m": {
          "Fe": 3,
          "Cu": 2,
          "Si": 2,
          "Nd": 1
        },
        "o": {
          "IE": 1,
          "IS": 1,
          "En": 2,
          "Tr": 1
        }
      }
    ],
    "destino": "completados"
  },
  {
    "id": "P047",
    "descripcion": "Haces láser comparan distancias para detectar desplazamientos diminutos en la estructura.",
    "revisada": 0,
    "tecnica_requiere": {
      "FOT": 1,
      "PRE": 1,
      "CUA": 1
    },
    "tecnica_otorga": {
      "FOT": 1
    },
    "tecnica_tokens": 3,
    "nombre": "Red de interferometría láser",
    "tipo": "sensores",
    "puntos": "0 [PI]",
    "puntos_carta": 0,
    "puntos_capas": 0,
    "puntos_ingenieros": 0,
    "puntos_otros": -2,
    "copias": 1,
    "discos": 0,
    "bono": "1 [DP][SN] [=] -1 [PI] [NO][SN]",
    "disco_soporte": 1,
    "efecto": "Coloca un disco en 1 celda libre de [SN] Sensores de un área de soporte. \nLuego, pierde 1 [PI] por cada celda de [SN] Sensores que no tenga un disco.\nObtén 3 [FT] fichas de técnica.",
    "etapas": [
      {
        "m": {
          "Si": 2,
          "Cu": 1,
          "Er": 1
        },
        "o": {
          "IS": 1,
          "IM": 1,
          "En": 2,
          "Tr": 1
        }
      }
    ],
    "destino": "completados"
  },
  {
    "id": "P048",
    "descripcion": "Equipos que registran variaciones de tensión y frecuencia en la red eléctrica.",
    "revisada": 0,
    "tecnica_requiere": {
      "ELE": 1,
      "PRE": 1,
      "MIN": 1
    },
    "tecnica_otorga": {
      "ELE": 1
    },
    "tecnica_tokens": 3,
    "nombre": "Monitores de calidad eléctrica",
    "tipo": "sensores",
    "puntos": "0 [PI]",
    "puntos_carta": 0,
    "puntos_capas": 0,
    "puntos_ingenieros": 0,
    "puntos_otros": 0,
    "balance_pendiente": [
      "Se estiman 2 niveles faltantes según el criterio indicado; nivel final 4 y máximo 5 dejarían solo 1. Confirmar este supuesto."
    ],
    "copias": 2,
    "discos": 0,
    "bono": "2 [DP][SN]",
    "disco_soporte": 2,
    "efecto": "Coloca un disco en 2 celdas libres de [SN] Sensores de dos áreas de soporte distintas.\nObtén 3 [FT] fichas de técnica.",
    "etapas": [
      {
        "m": {
          "Cu": 1,
          "Al": 2,
          "Si": 1,
          "Ce": 1
        },
        "o": {
          "IM": 1,
          "En": 2
        }
      },
      {
        "m": {
          "Cu": 2,
          "Fe": 2,
          "Si": 6
        },
        "o": {
          "IS": 1,
          "En": 2,
          "Tr": 2
        }
      }
    ],
    "destino": "completados"
  },
  {
    "id": "P049",
    "descripcion": "Relojes atómicos dan una referencia común de tiempo a estaciones distantes.",
    "revisada": 0,
    "tecnica_requiere": {
      "CUA": 1,
      "PRE": 1,
      "MIN": 1
    },
    "tecnica_otorga": {
      "CUA": 1
    },
    "tecnica_tokens": 3,
    "nombre": "Red de relojes atómicos de sincronización",
    "tipo": "sensores",
    "puntos": "0 [PI]",
    "puntos_carta": 0,
    "puntos_capas": 0,
    "puntos_ingenieros": 0,
    "puntos_otros": 0,
    "copias": 1,
    "discos": 0,
    "bono": "2 [DP][SN]",
    "disco_soporte": 2,
    "efecto": "Coloca un disco en 2 celdas libres de [SN] Sensores de dos áreas de soporte distintas.\nObtén 3 [FT] fichas de técnica.",
    "etapas": [
      {
        "m": {
          "Al": 2,
          "Gd": 1,
          "Cu": 2,
          "Nd": 1
        },
        "o": {
          "IQ": 1,
          "IS": 1,
          "En": 1
        }
      },
      {
        "m": {
          "Cu": 2,
          "Nd": 1
        },
        "o": {
          "IQ": 1,
          "IS": 1,
          "En": 1,
          "Tr": 1
        }
      }
    ],
    "destino": "completados"
  },
  {
    "id": "P050",
    "descripcion": "Estación que sigue la posición de sectores, vehículos y cargas en órbita.",
    "revisada": 0,
    "tecnica_requiere": {
      "DAT": 1,
      "ELE": 1,
      "HAB": 1
    },
    "tecnica_otorga": {
      "DAT": 1
    },
    "tecnica_tokens": 2,
    "nombre": "Centro de supervisión orbital",
    "tipo": "control",
    "puntos": "0 [PI]",
    "puntos_carta": 0,
    "puntos_capas": 0,
    "puntos_ingenieros": -4,
    "puntos_otros": 6,
    "copias": 1,
    "discos": 0,
    "bono": "1 [DP][CO] \n +3 [PI] [/][SI][SN]",
    "disco_soporte": 1,
    "efecto": "Coloca un disco en 1 celda libre de [CO] Control de un área de soporte. Coloca el ingeniero de la última etapa junto al disco colocado. \nLuego gana 3 [PI] por cada celda de [SN] Sensores con un disco de cualquier jugador. \nConsulta la pérdida de puntos por personal anclado.\nObtén 2 [FT] fichas de técnica.",
    "etapas": [
      {
        "m": {
          "Nd": 1,
          "Fe": 2
        },
        "o": {
          "IS": 1,
          "En": 1
        }
      },
      {
        "m": {
          "Cu": 1,
          "Si": 3
        },
        "o": {
          "AS": 1,
          "En": 1,
          "Tr": 1
        }
      }
    ],
    "destino": "completados"
  },
  {
    "id": "P051",
    "descripcion": "Centro que ajusta la generación y el reparto de electricidad según la demanda.",
    "revisada": 0,
    "tecnica_requiere": {
      "DAT": 1,
      "HAB": 1
    },
    "tecnica_otorga": {},
    "tecnica_tokens": 2,
    "nombre": "Centro de regulación de potencia",
    "tipo": "control",
    "puntos": "5 [PI]",
    "puntos_carta": 5,
    "puntos_capas": 0,
    "puntos_ingenieros": -4,
    "puntos_otros": 0,
    "copias": 1,
    "discos": 0,
    "bono": "2 [DP][CO]",
    "disco_soporte": 2,
    "efecto": "Coloca un disco en 2 celdas libres de [CO] Control de dos áreas de soporte distintas. Coloca el ingeniero de la última etapa junto a cualquiera de los discos colocados. \nConsulta la pérdida de puntos por personal anclado.\nObtén 5 [PI] puntos y 2 [FT] fichas de técnica.",
    "etapas": [
      {
        "m": {
          "Al": 2,
          "Gd": 1
        },
        "o": {
          "IM": 2,
          "En": 2
        }
      },
      {
        "m": {
          "Ti": 1,
          "Cu": 2
        },
        "o": {
          "AM": 1,
          "En": 2,
          "Tr": 2
        }
      }
    ],
    "destino": "completados"
  },
  {
    "id": "P052",
    "descripcion": "Centro que analiza datos de equipos para prever fallas y programar reparaciones.",
    "revisada": 0,
    "tecnica_requiere": {
      "DAT": 1,
      "ELE": 1,
      "HAB": 1
    },
    "tecnica_otorga": {
      "DAT": 1,
      "HAB": 1
    },
    "tecnica_tokens": 4,
    "nombre": "Centro de mantenimiento predictivo",
    "tipo": "control",
    "puntos": "5 [PI]",
    "puntos_carta": 5,
    "puntos_capas": 0,
    "puntos_ingenieros": -8,
    "puntos_otros": 0,
    "copias": 1,
    "discos": 0,
    "bono": "2 [DP][CO]",
    "disco_soporte": 2,
    "efecto": "Coloca un disco en 2 celdas libres de [CO] Control de dos áreas de soporte distintas. Coloca los ingenieros de la última etapa junto a cualquiera de los discos colocados. \nConsulta la pérdida de puntos por personal anclado.\nObtén 5 [PI] puntos y 4 [FT] fichas de técnica.",
    "etapas": [
      {
        "m": {
          "Ti": 1,
          "Al": 2,
          "Ce": 1,
          "Fe": 2
        },
        "o": {
          "IM": 1,
          "IQ": 1,
          "En": 3
        }
      },
      {
        "m": {},
        "o": {
          "AM": 1,
          "AS": 1,
          "En": 4,
          "Tr": 2
        }
      }
    ],
    "destino": "completados"
  },
  {
    "id": "P053",
    "descripcion": "Centro que ajusta los controles a partir de los datos de operación de la esfera.",
    "revisada": 0,
    "tecnica_requiere": {
      "DAT": 1,
      "IA": 1,
      "HAB": 1
    },
    "tecnica_otorga": {
      "IA": 1,
      "HAB": 1
    },
    "tecnica_tokens": 1,
    "nombre": "Centro de control por mejora permanente",
    "tipo": "control",
    "puntos": "-1 [PI]",
    "puntos_carta": -1,
    "puntos_capas": 0,
    "puntos_ingenieros": -4,
    "puntos_otros": 0,
    "copias": 1,
    "discos": 0,
    "bono": "1 [DP][CO]",
    "disco_soporte": 1,
    "efecto": "Coloca un disco en 1 celda libre de [CO] Control de un área de soporte. Coloca el ingeniero de la última etapa junto al disco colocado. \nConsulta la pérdida de puntos por personal anclado.\nPierde 1 [PI] punto y obtén 1 [FT] ficha de técnica.",
    "etapas": [
      {
        "m": {
          "Al": 2,
          "Fe": 2
        },
        "o": {
          "AS": 1,
          "En": 1,
          "Tr": 1
        }
      }
    ],
    "destino": "completados"
  },
  {
    "id": "P054",
    "descripcion": "Centro que usa registros históricos para detectar y corregir errores de calibración.",
    "revisada": 0,
    "tecnica_requiere": {
      "DAT": 1,
      "PRE": 1
    },
    "tecnica_otorga": {
      "PRE": 1
    },
    "tecnica_tokens": 1,
    "nombre": "Centro de calibración retroactiva",
    "tipo": "control",
    "puntos": "5 [PI]",
    "puntos_carta": 5,
    "puntos_capas": 0,
    "puntos_ingenieros": 0,
    "puntos_otros": 0,
    "copias": 1,
    "discos": -2,
    "bono": "2 [DP][CO] +2 [QD][MO] [=] 2[QU]",
    "disco_soporte": 2,
    "efecto": "[QD] Retira 2 de tus discos de celdas de [MO] Microondas de dos cuadrantes distintos para colocar un disco en la celda de [CO] Control del área de soporte de cada uno de esos cuadrantes.\nObtén 5 [PI] puntos y 1 [FT] ficha de técnica.",
    "etapas": [
      {
        "m": {
          "Al": 2,
          "Nd": 1,
          "Fe": 2
        },
        "o": {
          "IS": 1,
          "IQ": 1,
          "En": 2
        }
      },
      {
        "m": {
          "Ce": 1
        },
        "o": {
          "MO": 2,
          "IS": 1,
          "En": 2,
          "Tr": 1
        }
      }
    ],
    "destino": "completados"
  },
  {
    "id": "P055",
    "descripcion": "Pasadizos internos que dan acceso a los equipos para inspección y reparación.",
    "revisada": 0,
    "tecnica_requiere": {
      "FAB": 1,
      "HAB": 1
    },
    "tecnica_otorga": {
      "FAB": 1
    },
    "tecnica_tokens": 3,
    "nombre": "Red de túneles de servicio",
    "tipo": "mantenimiento",
    "puntos": "0 [PI]",
    "puntos_carta": 0,
    "puntos_capas": 0,
    "puntos_ingenieros": -8,
    "puntos_otros": 0,
    "copias": 1,
    "discos": -2,
    "bono": "2 [DP][MN] +2 [QD][ES] [=][QU]",
    "disco_soporte": 2,
    "efecto": "[QD] Retira 2 de tus discos de celdas de [ES] Estructura de un cuadrante para colocar un disco en cada una de las dos celdas de [MN] Mantenimiento del área de soporte de ese cuadrante, coloca los ingenieros de la última etapa junto a cualquiera de ellos.\nConsulta la pérdida de puntos por personal anclado.\nObtén 3 [FT] fichas de técnica.",
    "etapas": [
      {
        "m": {
          "Fe": 3,
          "Ti": 1,
          "Cu": 2
        },
        "o": {
          "ES": 1,
          "AE": 2,
          "Tr": 1
        }
      }
    ],
    "destino": "completados"
  },
  {
    "id": "P056",
    "descripcion": "Brigada que se desplaza entre sectores en vehículos de propulsión iónica.",
    "revisada": 0,
    "tecnica_requiere": {
      "PROP": 1,
      "ELE": 1
    },
    "tecnica_otorga": {
      "PROP": 1
    },
    "tecnica_tokens": 0,
    "nombre": "Brigada de propulsión iónica",
    "tipo": "mantenimiento",
    "puntos": "+2 [PI][/] [SI][ES][=][QU]",
    "puntos_carta": 0,
    "puntos_capas": 0,
    "puntos_ingenieros": -8,
    "puntos_otros": 6,
    "copias": 3,
    "discos": -2,
    "bono": "2 [DP][MN] +2 [QD][FV] \n ",
    "disco_soporte": 2,
    "efecto": "[QD] Retira 2 de tus discos de celdas de [FV] Fotovoltaica de un cuadrante para colocar un disco en ambas celdas de [MN] Mantenimiento del área de soporte de ese cuadrante, coloca los ingenieros de la última etapa junto a cualquiera de ellos.\nLuego gana 2 [PI] por cada celda de [ES] Estructura con un disco en ese cuadrante.\nConsulta la pérdida de puntos por personal anclado.",
    "etapas": [
      {
        "m": {
          "Fe": 4,
          "Ti": 2,
          "Al": 1,
          "Cu": 2,
          "Ce": 1
        },
        "o": {
          "FV": 1,
          "AE": 2,
          "Tr": 1
        }
      }
    ],
    "destino": "completados"
  },
  {
    "id": "P057",
    "descripcion": "Aditivo ficticio con actuadores diminutos que compensan microdeformaciones en los materiales.",
    "revisada": 0,
    "tecnica_requiere": {
      "NANO": 2,
      "MAT": 1
    },
    "tecnica_otorga": {
      "NANO": 1,
      "MAT": 1
    },
    "tecnica_tokens": 4,
    "nombre": "Aditivo de nanobots microactuadores",
    "tipo": "mantenimiento",
    "puntos": "+3 [PI] [/] [SI][RF] [=][QU]",
    "puntos_carta": 0,
    "puntos_capas": 0,
    "puntos_ingenieros": -4,
    "puntos_otros": 9,
    "copias": 1,
    "discos": -2,
    "bono": "2 [DP][MN] +2 [QD][ES] [=][QU]",
    "disco_soporte": 2,
    "efecto": "[QD] Retira 2 de tus discos de celdas de [ES] Estructura de un cuadrante para colocar un disco en las 2 celdas libres de [MN] Mantenimiento del área de soporte de ese cuadrante y gana 3 [PI] por cada celda de [RF] Refrigeración con un disco en el mismo cuadrante. Luego obtén 4 [FT] fichas de técnica.\nConsulta la pérdida de puntos por personal anclado.",
    "etapas": [
      {
        "m": {
          "Si": 3,
          "Cu": 2,
          "Nd": 1
        },
        "o": {
          "IE": 1
        }
      },
      {
        "m": {
          "Al": 2,
          "Si": 3,
          "Ce": 1
        },
        "o": {
          "ES": 1,
          "AQ": 1,
          "Tr": 3
        }
      }
    ],
    "destino": "completados"
  },
  {
    "id": "P058",
    "descripcion": "Sistema que coordina la respuesta estructural, térmica y eléctrica de la esfera.",
    "revisada": 0,
    "tecnica_requiere": {
      "MAT": 1,
      "TER": 1,
      "ELE": 1
    },
    "tecnica_otorga": {
      "ELE": 1
    },
    "tecnica_tokens": 1,
    "nombre": "Núcleo de control multifísico",
    "tipo": "mantenimiento",
    "puntos": "10 [PI]",
    "puntos_carta": 10,
    "puntos_capas": 0,
    "puntos_ingenieros": 0,
    "puntos_otros": 0,
    "copias": 1,
    "discos": -3,
    "bono": "1[QD][ES]+1[QD][TS]+1[QD][RF][=][SC]\n 2[DP][MN] [=][QU]",
    "disco_soporte": 2,
    "efecto": "[QD] Retira uno de tus discos de cada una de las capas [ES] Estructura, [TS] Transmisión y [RF] Refrigeración de un sector, para colocar un disco en 2 celdas libres de [MN] Mantenimiento del área de soporte de ese cuadrante.\nObtén 10 [PI] puntos y 1 [FT] ficha de técnica.",
    "etapas": [
      {
        "m": {
          "Gd": 1,
          "Al": 1,
          "Fe": 3
        },
        "o": {
          "IS": 1,
          "IE": 1,
          "En": 2
        }
      },
      {
        "m": {
          "Ti": 1,
          "Cu": 1,
          "Al": 1
        },
        "o": {
          "ES": 1,
          "TS": 1,
          "RF": 1,
          "Tr": 1,
          "En": 1
        }
      }
    ],
    "destino": "completados"
  },
  {
    "id": "P059",
    "descripcion": "Ascensores que trasladan técnicos y herramientas entre las capas de la esfera.",
    "revisada": 0,
    "tecnica_requiere": {
      "FAB": 1,
      "HAB": 1,
      "MAG": 1
    },
    "tecnica_otorga": {
      "PRE": 1
    },
    "tecnica_tokens": 0,
    "nombre": "Ascensores de mantenimiento radial",
    "tipo": "mantenimiento",
    "puntos": "3 [PI]",
    "puntos_carta": 3,
    "puntos_capas": 0,
    "puntos_ingenieros": -8,
    "puntos_otros": 0,
    "copias": 1,
    "discos": 0,
    "bono": "3 [DP][MN] [=] 3[QU]",
    "disco_soporte": 3,
    "efecto": "Coloca un disco en 3 celdas libres de [MN] Mantenimiento. Coloca los ingenieros de la última etapa junto a cualquiera de ellos. Si el mapa tiene 3 cuadrantes o más, debe ser en 3 cuadrantes distintos.\nConsulta la pérdida de puntos por personal anclado.\nObtén 3 [PI] puntos.",
    "etapas": [
      {
        "m": {
          "Fe": 3,
          "Al": 3,
          "Cu": 3,
          "Ti": 6
        },
        "o": {
          "En": 4,
          "Tr": 3,
          "AE": 2
        }
      }
    ],
    "destino": "completados"
  }
];

// Conservar los conjuntos originales aunque alguna carta haya cambiado de tipo.
window.sensores = ["P054","P055","P056","P057","P058","P061","P059","P063"].map(id => window.modulos.find(carta => carta.id === id));
window.control = ["P064","P065","P066","P067","P068","P069","P070","P071"].map(id => window.modulos.find(carta => carta.id === id));
window.mantenimiento = ["P072","P073","P074","P075","P076","P077","P078","P079","P080","P081","P082","P083"].map(id => window.modulos.find(carta => carta.id === id));
