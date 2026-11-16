// Syncrodyson — datos de proyectos. Las recetas nuevas no acordadas se identifican en nota_balance.
// bono: texto e iconos entre corchetes, p. ej. "3 [DS]", "+3 [En]", "+18 [Di][RE]".
// Balance: suma puntos_carta + puntos_capas + puntos_ingenieros + puntos_otros.
// puntos_ingenieros usa -4 por anclado; balance.js permite ajustar ese supuesto.
// puntos_otros: null indica una estimación pendiente; 0 indica que no se suma otro efecto.
// Los puntos por discos de sector y soporte se agregan aparte en balance.js.
// Tipos sin puntos impresos primero; IDs y orden interno de cada tipo conservados.
// PLANTILLA PARA NUEVAS CARTAS (ejemplo comentado; no se incorpora al juego):
// {
//   "id": "PXXX",                  // Identificador único
//   "nombre": "Nombre del proyecto",
//   "tipo": "microondas",         // Categoría de la carta
//   "inicial": false,            // Opcional; true si es una carta inicial
//   "puntos": "0 [PV]",          // Texto visible en la carta
//   "puntos_carta": 0,           // PV impresos
//   "puntos_capas": 0,           // PV estimados por efectos sobre capas
//   "puntos_ingenieros": 0,      // Penalización estimada por anclados (-4 por ingeniero)
//   "puntos_otros": 0,           // Otros efectos estimados; null si está pendiente
//   "copias": 1,
//   "discos": 1,                // Discos colocados en sectores (no en soporte)
//   "bono": "1 [DP][MO] [RE]", // Iconos/texto visibles en la carta
//   "disco_soporte": 0,         // Discos colocados en áreas de soporte
//   "efecto": "Coloca 1 disco en [MO]. Puedes volver a colocar el cubo en la etapa 2.",
//   "etapas": [                 // m = materiales; o = operativos, energía y transporte
//     { "m": { "Fe": 3, "Ti": 1 }, "o": { "IE": 1, "En": 2 } },
//     { "m": { "Fe": 7, "Ti": 2 }, "o": { "IE": 1, "En": 2 } }
//   ],
//   "destino": "etapa:2"       // O "completados", "mano", "derecha", etc.
// },
// Nota: balance.js calcula por separado el valor de discos y el costo por etapas.
// -----------------------------------------------------------------------------
window.modulos = [
  // Proyectos iniciales: circulan obligatoriamente hacia la derecha.
  {
    "id": "P064",
    "nombre": "Control autónomo por IA",
    "tipo": "control_sensores",
    "inicial": true,
    "puntos": "0 [PV]",
    "puntos_carta": 0,
    "puntos_capas": 0,
    "puntos_ingenieros": 0,
    "puntos_otros": 0,
    "copias": 1,
    "discos": 0,
    "bono": "1 [DP][CO] [/] 1[DP][SN]",
    "disco_soporte": 1,
    "efecto": "Coloca 1 disco en una celda libre de [CO] Control o [SN] Sensores de un área de soporte.\nDebes darle esta carta al jugador a tu derecha.",
    "etapas": [
      {
        "m": {
          "Nd": 1,
          "Fe": 3,
          "Si": 2
        },
        "o": {
          "IS": 1,
          "En": 2
        }
      },
      {
        "m": {
          "Al": 2,
          "Cu": 1
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
    "id": "P081",
    "nombre": "Drones de inspección autónoma",
    "tipo": "mantenimiento",
    "inicial": true,
    "puntos": "0 [PV]",
    "puntos_carta": 0,
    "puntos_capas": 0,
    "puntos_ingenieros": 0,
    "puntos_otros": 0,
    "copias": 1,
    "discos": 0,
    "bono": "1 [DP][MN]",
    "disco_soporte": 1,
    "efecto": "Coloca 1 disco en una celda libre de [MN] Mantenimiento de un área de soporte.\nDebes darle esta carta al jugador a tu derecha.",
    "etapas": [
      {
        "m": {
          "Fe": 3,
          "Al": 2,
          "Si": 3
        },
        "o": {
          "En": 2,
          "IM": 1
        }
      },
      {
        "m": {
          "Cu": 2,
          "Ti": 1,
          "C": 2
        },
        "o": {
          "En": 1,
          "Tr": 1,
          "IS": 1
        }
      }
    ],
    "destino": "derecha"
  },
  {
    "id": "P019",
    "nombre": "Red HVDC de cobre",
    "tipo": "transmision",
    "inicial": true,
    "puntos": "0 [PV]",
    "puntos_carta": 0,
    "puntos_capas": 0,
    "puntos_ingenieros": 0,
    "puntos_otros": 0,
    "copias": 1,
    "discos": 1,
    "bono": "1 [DS][TS]",
    "disco_soporte": 0,
    "efecto": "Coloca un disco en 1 celda libre de [TS] Transmisión.\nDebes darle esta carta al jugador a tu derecha.",
    "etapas": [
      {
        "m": {
          "Fe": 1,
          "Cu": 3,
          "Si": 1
        },
        "o": {
          "IM": 1,
          "En": 1,
          "Tr": 1
        }
      }
    ],
    "destino": "derecha"
  },
  {
    "id": "P020",
    "nombre": "Red HVDC ultraligera",
    "tipo": "transmision",
    "inicial": true,
    "puntos": "0 [PV]",
    "puntos_carta": 0,
    "puntos_capas": 0,
    "puntos_ingenieros": 0,
    "puntos_otros": 0,
    "copias": 1,
    "discos": 2,
    "bono": "2 [DS][TS] [=][QU]",
    "disco_soporte": 0,
    "efecto": "Coloca un disco en 2 celdas libres de [TS] Transmisión de un mismo cuadrante.\nDebes darle esta carta al jugador a tu derecha.",
    "etapas": [
      {
        "m": {
          "Al": 4,
          "Ti": 2,
          "C": 3,
          "Si": 3
        },
        "o": {
          "IM": 1,
          "En": 2,
          "Tr": 1
        }
      }
    ],
    "destino": "derecha"
  },
  {
    "id": "P029",
    "nombre": "Antena parabólica de microondas",
    "tipo": "microondas",
    "inicial": true,
    "puntos": "0 [PV]",
    "puntos_carta": 0,
    "puntos_capas": 0,
    "puntos_ingenieros": 0,
    "puntos_otros": 0,
    "copias": 1,
    "discos": 2,
    "bono": "2 [DS][MO] [=][QU]",
    "disco_soporte": 0,
    "efecto": "Coloca un disco en 2 celdas libres y adyacentes de [MO] Microondas de un mismo cuadrante.\nDebes darle esta carta al jugador a tu derecha.",
    "etapas": [
      {
        "m": {
          "Al": 5,
          "Cu": 2,
          "Ti": 1,
          "Si": 4
        },
        "o": {
          "IM": 1,
          "En": 2,
          "Tr": 1
        }
      }
    ],
    "destino": "derecha"
  },
  {
    "id": "I05",
    "nombre": "Blindaje compuesto",
    "tipo": "microondas",
    "inicial": true,
    "puntos": "0 [PV]",
    "puntos_carta": 0,
    "puntos_capas": 0,
    "puntos_ingenieros": 0,
    "puntos_otros": 0,
    "copias": 1,
    "discos": 1,
    "bono": "1 [DS][MO]",
    "disco_soporte": 0,
    "efecto": "Coloca 1 disco en una celda libre de [MO] Microondas.\nDebes darle esta carta al jugador a tu derecha.",
    "etapas": [
      {
        "m": {"Fe": 3, "C": 2, "Ti": 1},
        "o": {"IE": 1, "En": 2, "Tr": 1}
      }
    ],
    "destino": "derecha"
  },
  {
    "id": "P024",
    "nombre": "Radiadores térmicos de aluminio",
    "tipo": "refrigeracion",
    "inicial": true,
    "puntos": "0 [PV]",
    "puntos_carta": 0,
    "puntos_capas": 0,
    "puntos_ingenieros": 0,
    "puntos_otros": 0,
    "copias": 1,
    "discos": 1,
    "bono": "1 [DS][RF]",
    "disco_soporte": 0,
    "efecto": "Coloca un disco en 1 celda de [RF] Refrigeración.\nDebes darle esta carta al jugador a tu derecha.",
    "etapas": [
      {
        "m": {
          "Al": 4,
          "Cu": 1
        },
        "o": {
          "IM": 1,
          "Tr": 1
        }
      }
    ],
    "destino": "derecha"
  },
  {
    "id": "P025",
    "nombre": "Red de tubos de calor",
    "tipo": "refrigeracion",
    "inicial": true,
    "puntos": "0 [PV]",
    "puntos_carta": 0,
    "puntos_capas": 0,
    "puntos_ingenieros": 0,
    "puntos_otros": 0,
    "copias": 1,
    "discos": 2,
    "bono": "2 [DS][RF] [=][QU]",
    "disco_soporte": 0,
    "efecto": "Coloca un disco en 2 celdas libres de [RF] Refrigeración de un mismo cuadrante.\nDebes darle esta carta al jugador a tu derecha.",
    "etapas": [
      {
        "m": {
          "Cu": 6,
          "Al": 3,
          "Fe": 4,
          "Si": 2
        },
        "o": {
          "IM": 2,
          "En": 1,
          "Tr": 1
        }
      }
    ],
    "destino": "derecha"
  },
  {
    "id": "P013",
    "nombre": "Paneles fotovoltaicos de película delgada",
    "tipo": "fotovoltaico",
    "inicial": true,
    "puntos": "0 [PV]",
    "puntos_carta": 0,
    "puntos_capas": 0,
    "puntos_ingenieros": 0,
    "puntos_otros": 0,
    "copias": 1,
    "discos": 1,
    "bono": "1 [DS][FV]",
    "disco_soporte": 0,
    "efecto": "Coloca un disco en 1 celda de [FV] Fotovoltaica de un cuadrante.\nDebes darle esta carta al jugador a tu derecha.",
    "etapas": [
      {
        "m": {
          "Cu": 2,
          "Al": 1,
          "Si": 2
        },
        "o": {
          "IM": 1,
          "En": 1,
          "Tr": 1
        }
      }
    ],
    "destino": "derecha"
  },
  {
    "id": "I04",
    "nombre": "Celdas solares",
    "tipo": "fotovoltaico",
    "inicial": true,
    "puntos": "0 [PV]",
    "puntos_carta": 0,
    "puntos_capas": 0,
    "puntos_ingenieros": 0,
    "puntos_otros": 0,
    "copias": 1,
    "discos": 2,
    "bono": "2 [DS][FV]",
    "disco_soporte": 0,
    "efecto": "Coloca 2 discos en celdas libres de [FV] fotovoltaico.\nDebes darle esta carta al jugador a tu derecha.",
    "etapas": [
      {
        "m": {"Nd": 1, "Fe": 4, "Cu": 4},
        "o": {"IQ": 1, "IM": 1, "En": 2, "Tr": 2}
      }
    ],
    "destino": "derecha"
  },
  {
    "id": "P008",
    "nombre": "Estructura de titanio",
    "tipo": "estructura",
    "inicial": true,
    "puntos": "0 [PV]",
    "puntos_carta": 0,
    "puntos_capas": 0,
    "puntos_ingenieros": 0,
    "puntos_otros": 0,
    "copias": 1,
    "discos": 2,
    "bono": "2 [DS][ES] [=][QU]",
    "disco_soporte": 0,
    "efecto": "Coloca un disco en 2 celdas libres de [ES] Estructura de un mismo cuadrante.\nDebes darle esta carta al jugador a tu derecha.",
    "etapas": [
      {
        "m": {
          "Ti": 4
        },
        "o": {
          "IE": 2,
          "En": 2,
          "Tr": 2
        }
      }
    ],
    "destino": "derecha"
  },
  {
    "id": "P009",
    "nombre": "Estructura de acero reforzado",
    "tipo": "estructura",
    "inicial": true,
    "puntos": "0 [PV]",
    "puntos_carta": 0,
    "puntos_capas": 0,
    "puntos_ingenieros": 0,
    "puntos_otros": 0,
    "copias": 1,
    "discos": 1,
    "bono": "1 [DS][ES]",
    "disco_soporte": 0,
    "efecto": "Coloca un disco en 1 celda de [ES] Estructura de un cuadrante.\nDebes darle esta carta al jugador a tu derecha.",
    "etapas": [
      {
        "m": {
          "Fe": 7,
          "Al": 1,
          "C": 3
        },
        "o": {
          "IE": 1,
          "En": 1,
          "Tr": 1
        }
      }
    ],
    "destino": "derecha"
  },













  // Economía
  {
    "id": "P006",
    "nombre": "Centro de blockchain",
    "tipo": "economia",
    "puntos": "0 [PV]",
    "puntos_carta": 0,
    "puntos_capas": 0,
    "puntos_ingenieros": 0,
    "puntos_otros": 16,
    "copias": 1,
    "discos": 0,
    "bono": "+20 [Di][RE]",
    "disco_soporte": 0,
    "efecto": "Gana $20. \nPuedes volver a colocar el cubo en la etapa 2.",
    "etapas": [
      {
        "m": {
          "Si": 6,
          "Cu": 4,
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
    "id": "P047",
    "nombre": "Consorcio de minerales estratégicos",
    "tipo": "economia",
    "puntos": "0 [PV]",
    "puntos_carta": 0,
    "puntos_capas": 0,
    "puntos_ingenieros": 0,
    "puntos_otros": 9,
    "copias": 1,
    "discos": 0,
    "bono": "[TJ] [RR]=15[Di] \n +1 [PI][/]2[RR]",
    "disco_soporte": 0,
    "efecto": "Cada jugador (incluso tu) puede vender hasta 3 [RR] tierras raras a $15 cada una, independientemente del tipo. \nGanas 1 [PI] por cada 2 [RR] vendidas entre todos los jugadores, redondeando hacia abajo. \nPuedes volver a colocar el cubo en la etapa 1.",
    "destino": "etapa:1",
    "etapas": [
      {
        "m": {
          "Cu": 2,
          "Al": 2,
          "Ce": 1
        },
        "o": {
          "IS": 1,
          "En": 1
        }
      },
      {
        "m": {
        },
        "o": {
          "IQ": 1
        }
      }
    ]
  },
  {
    "id": "P048",
    "nombre": "Hotel solar",
    "tipo": "economia",
    "puntos": "0 [PV]",
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
          "Al": 3,
          "fe": 2,
          "Cu": 1
        },
        "o": {
          "IE": 1,
          "En": 1
        }
      },
      {
        "m": {
        },
        "o": {
          "IS": 1,
          "En": 1
        }
      }
    ]
  },
  {
    "id": "P049",
    "nombre": "Centro de fusión nuclear",
    "tipo": "economia",
    "puntos": "20 [PV]",
    "puntos_carta": 20,
    "puntos_capas": 0,
    "puntos_ingenieros": 0,
    "puntos_otros": 24,
    "copias": 1,
    "discos": 0,
    "bono": "[TJ] +3 [En] [=] +1 [PI] [OP]",
    "disco_soporte": 0,
    "efecto": "Todos los jugadores obtienen 3 [En] energía, no pueden negarse. Ganas 1 [PI] por cada oponente hasta un maximo de 4 [PI]. \nPuedes volver a colocar el cubo en la etapa 2.",
    "destino": "etapa:2",
    "etapas": [
      {
        "m": {
          "Cu": 5,
          "Fe": 5,
          "Nd": 2
        },
        "o": {
          "IQ": 1,
          "IE": 1,
          "IM": 1,
          "En": 3
        }
      },
      {
        "m": {
          "Ti": 2,
          "Gd": 1,
          "Al": 2
        },
        "o": {
          "IQ": 1,
          "IE": 1,
          "IM": 1,
          "En": 3
        }
      },
      {
        "m": {},
        "o": {
          "IQ": 1,
          "IS": 1
        }
      }
    ]
  },

  // Recursos humanos
  {
    "id": "P041",
    "nombre": "Reemplazo por asistente robótico autónomo",
    "tipo": "recursoshumanos",
    "puntos": "1 [PV]",
    "puntos_carta": 0,
    "puntos_capas": 0,
    "puntos_ingenieros": +4,
    "puntos_otros": 1,
    "copias": 4,
    "discos": 0,
    "bono": "-1 [AI] [=] +1 [II] +1 [PI]",
    "disco_soporte": 0,
    "efecto": "Retira un [AI] ingeniero anclado de cualquier celda y colócalo en tus barracas, Leugo gana 1 [PI] punto.\nDebes darle esta carta al jugador a tu derecha.",
    "etapas": [
      {
        "m": {
          "Si": 2,
          "Cu": 1,
          "Nd": 1,
          "Si": 2
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
    "id": "P042",
    "nombre": "Pasantía",
    "tipo": "recursoshumanos",
    "puntos": "0 [PV]",
    "puntos_carta": 0,
    "puntos_capas": 0,
    "puntos_ingenieros": 1,
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
    "id": "P043",
    "nombre": "Programador de IA",
    "tipo": "recursoshumanos",
    "puntos": "0 [PV]",
    "puntos_carta": 0,
    "puntos_capas": 0,
    "puntos_ingenieros": 0,
    "puntos_otros": 12,
    "copias": 2,
    "discos": 0,
    "bono": "-3[PE] +3 [IS][/][CN]",
    "disco_soporte": 0,
    "efecto": "Disminuye en 3 tu [PE] y coloca hasta 3 [IS] ingenieros en sistemas de la reserva en tus barracas sin gastar fichas de contratación. \n Por cada uno que no esté disponible, obtén 1 [CN] ficha de contratación.",
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
    "id": "P044",
    "nombre": "Desregulación de sueldos",
    "tipo": "recursoshumanos",
    "puntos": "0 [PV]",
    "puntos_carta": 0,
    "puntos_capas": 0,
    "puntos_ingenieros": 0,
    "puntos_otros": 2,
    "copias": 1,
    "discos": 0,
    "bono": "[TJ] +1[CN]",
    "disco_soporte": 0,
    "efecto": "Cada jugador que tenga menos de 7 [CN] fichas de contratación obtiene 1 [CN]. Ganas 1 [PI] por cada [CN] efectivamente entregada, hasta un máximo de 3 [PI].",
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
    "id": "P045",
    "nombre": "Robots multipropósito",
    "tipo": "recursoshumanos",
    "puntos": "7 [PV]",
    "puntos_carta": 7,
    "puntos_capas": 0,
    "puntos_ingenieros": 0,
    "puntos_otros": 8,
    "copias": 3,
    "discos": 0,
    "bono": "-4 [PE] + 4[II] [/] [CN]",
    "disco_soporte": 0,
    "efecto": "Disminuye en 4 tu [PE] y coloca hasta 4 [II] ingenieros a eleccion de la reserva en tus barracas sin gastar fichas de contratación; por cada ingeniero no disponible obten 1 ficha de contratacion [CN].",
    "destino": "completados",
    "etapas": [
      {
        "m": {
          "Ti": 1,
          "Al": 2,
          "Fe": 2,
          "Si": 3
        },
        "o": {
          "IE": 1,
          "IM": 1,
          "En": 2
        }
      },
      {
        "m": {
          "Si": 1,
          "Cu": 2,
          "Nd": 1
        },
        "o": {
          "IS": 2,
          "En": 2
        }
      }
    ]
  },
  {
    "id": "P084",
    "nombre": "Urbanización de lujo interna",
    "tipo": "recursoshumanos",
    "puntos": "0 [PV]",
    "puntos_carta": 0,
    "puntos_capas": -9,
    "puntos_ingenieros": 24,
    "puntos_otros": 0,
    "copias": 1,
    "discos": 0,
    "bono": "-4 [AI] [RE] [=] [OP] +7 [Di]",
    "disco_soporte": 0,
    "efecto": "[QD] Retira uno de tus discos de una celda de [ES] Estructura o [FV] Fotovoltaico y devuelve hasta 4 [AI] ingenieros anclados a la reserva. \nOtros jugadores pueden ofrecete $7 para que quites sus ingenieros (si aceptas es vinculante).\nPuedes volver a colocar el cubo en la etapa 2.",
    "etapas": [
      {
        "m": {
          "Fe": 7,
          "Al": 3,
          "Ti": 1,
          "Si": 4,
          "Nd": 1
        },
        "o": {
          "IE": 2,
          "IS": 1,
          "En": 3
        }
      },
      {
        "m": {},
        "o": {
          "txt": "([ES][/][FV])",
          "En": 2
        }
      }
    ],
    "destino": "etapa:2"
  },

  {
    "id": "P091",
    "nombre": "Incubadora de proyectos",
    "tipo": "produccion",
    "puntos": "1 [PV]",
    "puntos_carta": 1,
    "puntos_capas": 0,
    "puntos_ingenieros": 0,
    "puntos_otros": 0,
    "copias": 3,
    "discos": 0,
    "bono": "[TJ] +1 [CP]",
    "disco_soporte": 0,
    "efecto": "Roba 1 [CP] carta de proyecto de la reserva por cada jugador, dale una a cada oponente y conserva la otra.\nPuedes devolver esta carta a tu mano.",
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
    "id": "P050",
    "nombre": "Refinería de escoria por intercambio iónico",
    "tipo": "produccion",
    "puntos": "0 [PV]",
    "puntos_carta": 0,
    "puntos_capas": 0,
    "puntos_ingenieros": 0,
    "puntos_otros": 12,
    "copias": 2,
    "discos": 0,
    "bono": "+4 [RR][RE]",
    "disco_soporte": 0,
    "efecto": "Obtén de la reserva hasta 4 [RR] tierras raras a eleccion. \nPuedes volver a colocar el cubo en la etapa 2.",
    "destino": "etapa:2",
    "etapas": [
      {
        "m": {
          "Ti": 2,
          "Cu": 2,
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
    "id": "P051",
    "nombre": "Laboratorio móvil",
    "tipo": "produccion",
    "puntos": "0 [PV]",
    "puntos_carta": 0,
    "puntos_capas": 0,
    "puntos_ingenieros": 0,
    "puntos_otros": 0,
    "copias": 5,
    "discos": 0,
    "bono": "-6[Di] +4[RQ]",
    "disco_soporte": 0,
    "efecto": "Paga $6 para obtener 4 reactivos de tu elección. \nDebes darle esta carta al jugador a tu derecha.",
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
    "id": "P052",
    "nombre": "Cohete de combustible sólido",
    "tipo": "produccion",
    "puntos": "0 [PV]",
    "puntos_carta": 0,
    "puntos_capas": 0,
    "puntos_ingenieros": 0,
    "puntos_otros": 4,
    "copias": 6,
    "discos": 0,
    "bono": "+4 [Tr]",
    "disco_soporte": 0,
    "efecto": "Obtén 4 [Tr] Transporte de la reserva. \nPuedes devolver esta carta a tu mano.",
    "destino": "mano",
    "etapas": [
      {
        "m": {
          "Fe": 3,
          "Al": 1,
          "C": 3
        },
        "o": {
          "IM": 1,
          "En": 1
        }
      }
    ]
  },
  {
    "id": "P053",
    "nombre": "Catapulta electromagnética",
    "tipo": "produccion",
    "puntos": "0 [PV]",
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
          "Fe": 3,
          "Cu": 2,
          "Al": 2,
          "Ti": 1,
          "Nd": 1,
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
    "id": "P054",
    "nombre": "Propulsor láser",
    "tipo": "produccion",
    "puntos": "0 [PV]",
    "puntos_carta": 0,
    "puntos_capas": 0,
    "puntos_ingenieros": 0,
    "puntos_otros": 21,
    "copias": 1,
    "discos": 0,
    "bono": "+6 [Tr] [RE]",
    "disco_soporte": 0,
    "efecto": "Obtén 6 [Tr] Transporte de la reserva. \nPuedes volver a colocar el cubo en la etapa 2.",
    "destino": "etapa:2",
    "etapas": [
      {
        "m": {
          "Si": 5,
          "Ti": 2,
          "Cu": 3,
          "Er": 1,
          "Nd": 1
        },
        "o": {
          "IM": 1,
          "En": 3
        }
      },
      {
        "m": {},
        "o": {
          "IS": 2,
          "En": 4
        }
      }
    ]
  },
  {
    "id": "P055",
    "nombre": "Gancho orbital (Skyhook)",
    "tipo": "produccion",
    "puntos": "0 [PV]",
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
          "Ti": 3,
          "Fe": 5,
          "C": 5
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
          "En": 2
        }
      }
    ]
  },

  // Generadores
  {
    "id": "P032",
    "nombre": "Paneles solares",
    "tipo": "generador",
    "puntos": "0 [PV]",
    "puntos_carta": 0,
    "puntos_capas": 0,
    "puntos_ingenieros": 0,
    "puntos_otros": 3,
    "copias": 4,
    "discos": 0,
    "bono": "+2 [PE]",
    "disco_soporte": 0,
    "efecto": "Aumenta en 2 tu [PE] producción de energía.\nPuedes devolver esta carta a tu mano.",
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
    "id": "P033",
    "nombre": "Generador de radioisótopos (RTG)",
    "tipo": "generador",
    "puntos": "5 [PV]",
    "puntos_carta": 5,
    "puntos_capas": 0,
    "puntos_ingenieros": 0,
    "puntos_otros": 2,
    "copias": 2,
    "discos": 0,
    "bono": "+2 [PE]",
    "disco_soporte": 0,
    "efecto": "Aumenta en 2 tu [PE] producción de energía.",
    "destino": "completados",
    "etapas": [
      {
        "m": {
          "Ti": 2,
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
    "id": "P034",
    "nombre": "Concentrador solar Stirling",
    "tipo": "generador",
    "puntos": "1 [PV]",
    "puntos_carta": 1,
    "puntos_capas": 0,
    "puntos_ingenieros": 0,
    "puntos_otros": 5,
    "copias": 2,
    "discos": 0,
    "bono": "+5 [PE]",
    "disco_soporte": 0,
    "efecto": "Aumenta en 5 tu [PE] producción de energía.",
    "destino": "completados",
    "etapas": [
      {
        "m": {
          "Cu": 1,
          "Si": 1
        },
        "o": {
          "IM": 1,
          "En": 1
        }
      },
      {
        "m": {
          "Fe": 2,
          "Al": 1
        },
        "o": {
          "IM": 1,
          "En": 1
        }
      }
    ]
  },
  {
    "id": "P035",
    "nombre": "Central solar de ciclo Brayton",
    "tipo": "generador",
    "puntos": "10 [PV]",
    "puntos_carta": 10,
    "puntos_capas": 0,
    "puntos_ingenieros": 0,
    "puntos_otros": 5,
    "copias": 1,
    "discos": 0,
    "bono": "+5 [PE]",
    "disco_soporte": 0,
    "efecto": "Aumenta en 5 tu [PE] producción de energía.",
    "destino": "completados",
    "etapas": [
      {
        "m": {
          "Ti": 1,
          "Al": 2,
          "Cu": 3
        },
        "o": {
          "IM": 1,
          "En": 2
        }
      },
      {
        "m": {
          "Si": 4,
          "Nd": 1,
          "Cu": 2
        },
        "o": {
          "IM": 1,
          "En": 2
        }
      }
    ]
  },


  // Estructura
  {
    "id": "P092",
    "nombre": "Micelio estructural",
    "tipo": "estructura",
    "puntos": "1 [PV]",
    "puntos_carta": 1,
    "puntos_capas": 0,
    "puntos_ingenieros": 0,
    "puntos_otros": 0,
    "copias": 1,
    "discos": 4,
    "bono": "1 [DS] [ES] [RE]",
    "disco_soporte": 0,
    "efecto": "Coloca aquí 1 Fe de la reserva por cada ingeniero [AI] anclado en la esfera, de todos los jugadores e incluido el soporte. Luego puedes gastar 10 Fe de esta carta para colocar 1 disco en [ES] Estructura, con sus reglas normales (máximo 1 por activación). Conserva el Fe sobrante. \nPuedes volver a colocar el cubo en la etapa 2. Mientras esté en etapa 2, solo pueden entrar o salir recursos mediante este efecto.",
    "etapas": [
      {
        "m": { "Ti": 1, "Cu": 2,"C": 3, "Si": 2, "Al":1  },
        "o": { "IE": 1, "IQ": 2, "Tr": 1, "En": 2 }
      },
      {
        "m": {},
        "o": {"En": 2}
      }
    ],
    "destino": "etapa:2"
  },
  {
    "id": "P007",
    "nombre": "Estructura de fibra de carbono",
    "tipo": "estructura",
    "puntos": "9 [PV]",
    "puntos_carta": 9,
    "puntos_capas": 0,
    "puntos_ingenieros": 0,
    "puntos_otros": 0,
    "copias": 2,
    "discos": 2,
    "bono": "2 [DS][ES] [=][QU]",
    "disco_soporte": 0,
    "efecto": "Coloca un disco en 2 celdas libres de [ES] Estructura de un mismo cuadrante.",
    "etapas": [
      {
        "m": {
          "C": 10,
          "Fe": 2
        },
        "o": {
          "IQ": 2,
          "En": 4
        }
      },
      {
        "m": {
          "C": 7,
          "Fe": 1
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
    "id": "P010",
    "nombre": "Estructura alveolar de aluminio",
    "tipo": "estructura",
    "puntos": "6 [PV]",
    "puntos_carta": 6,
    "puntos_capas": 0,
    "puntos_ingenieros": 0,
    "puntos_otros": 0,
    "copias": 3,
    "discos": 3,
    "bono": "3 [DS][ES] [=][QU]",
    "disco_soporte": 0,
    "efecto": "Coloca un disco en 3 celdas libres de [ES] Estructura de un mismo cuadrante.",
    "etapas": [
      {
        "m": {
          "Al": 4,
          "Si": 2
        },
        "o": {
          "IE": 1,
          "En": 2
        }
      },
      {
        "m": {
          "Al": 2,
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
    "id": "P011",
    "nombre": "Estructura de vidrio metálico",
    "tipo": "estructura",
    "puntos": "10 [PV]",
    "puntos_carta": 10,
    "puntos_capas": 0,
    "puntos_ingenieros": 0,
    "puntos_otros": 0,
    "copias": 1,
    "discos": 3,
    "bono": "3 [DS][ES] [=][QU]",
    "disco_soporte": 0,
    "efecto": "Coloca un disco en 3 celdas libres de [ES] Estructura de un mismo cuadrante.",
    "etapas": [
      {
        "m": {
          "Fe": 6,
          "Cu": 2,
          "Si": 2
        },
        "o": {
          "IQ": 1,
          "IE": 1,
          "En": 3
        }
      },
      {
        "m": {
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
    "id": "P012",
    "nombre": "Estructura de nanotubos de carbono",
    "tipo": "estructura",
    "puntos": "25 [PV]",
    "puntos_carta": 25,
    "puntos_capas": 0,
    "puntos_ingenieros": 0,
    "puntos_otros": 0,
    "copias": 1,
    "discos": 5,
    "bono": "5 [DS][ES] [=][QU]",
    "disco_soporte": 0,
    "efecto": "Coloca un disco en 5 celdas libres de [ES] Estructura de un mismo cuadrante.",
    "etapas": [
      {
        "m": {
          "C": 5,
          "Nd": 1
        },
        "o": {
          "IQ": 2,
          "En": 3
        }
      },
      {
        "m": {
          "C": 5,
          "Al": 1
        },
        "o": {
          "IQ": 1,
          "IE": 1,
          "En": 4
        }
      },
      {
        "m": {
          "C": 5
        },
        "o": {
          "IQ": 1,
          "IS": 1,
          "En": 3,
          "Tr": 2
        }
      }
    ],
    "destino": "completados"
  },

  // Fotovoltaica

  {
    "id": "P014",
    "nombre": "Paneles de silicio monocristalino",
    "tipo": "fotovoltaico",
    "puntos": "12 [PV]",
    "puntos_carta": 12,
    "puntos_capas": 0,
    "puntos_ingenieros": 0,
    "puntos_otros": 0,
    "copias": 3,
    "discos": 3,
    "bono": "3 [DS][FV] [=][QU]",
    "disco_soporte": 0,
    "efecto": "Coloca un disco en 3 celdas libres de [FV] Fotovoltaica de un mismo cuadrante.",
    "etapas": [
      {
        "m": {
          "Si": 8,
          "Al": 3
        },
        "o": {
          "IQ": 1,
          "En": 2
        }
      },
      {
        "m": {
          "Cu": 3,
          "Si": 2
        },
        "o": {
          "IM": 1,
          "En": 2,
          "Tr": 2
        }
      }
    ],
    "destino": "completados"
  },
  {
    "id": "P015",
    "nombre": "Células solares de perovskita",
    "tipo": "fotovoltaico",
    "puntos": "10 [PV]",
    "puntos_carta": 10,
    "puntos_capas": 0,
    "puntos_ingenieros": 0,
    "puntos_otros": 0,
    "copias": 1,
    "discos": 4,
    "bono": "4 [DS][FV] [=][QU]",
    "disco_soporte": 0,
    "efecto": "Coloca un disco en 4 celdas libres de [FV] Fotovoltaica de un mismo cuadrante.",
    "etapas": [
      {
        "m": {
          "Si": 5,
          "C": 6,
          "Al": 3
        },
        "o": {
          "IQ": 2,
          "En": 3
        }
      },
      {
        "m": {
          "Cu": 3,
          "Si": 2
        },
        "o": {
          "IM": 1,
          "En": 2,
          "Tr": 2
        }
      }
    ],
    "destino": "completados"
  },
  {
    "id": "P016",
    "nombre": "Sistema fotovoltaico de concentración",
    "tipo": "fotovoltaico",
    "puntos": "15 [PV]",
    "puntos_carta": 15,
    "puntos_capas": 0,
    "puntos_ingenieros": 0,
    "puntos_otros": 0,
    "copias": 1,
    "discos": 3,
    "bono": "3 [DS][FV] [=][QU]",
    "disco_soporte": 0,
    "efecto": "Coloca un disco en 3 celdas libres de [FV] Fotovoltaica de un mismo cuadrante.",
    "etapas": [
      {
        "m": {
          "Al": 5,
          "Ti": 1,
          "Si": 3
        },
        "o": {
          "IE": 1,
          "IM": 1,
          "En": 3
        }
      },
      {
        "m": {
          "Cu": 3,
          "Si": 3
        },
        "o": {
          "IE": 1,
          "IM": 1,
          "En": 2,
          "Tr": 2
        }
      }
    ],
    "destino": "completados"
  },
  {
    "id": "P017",
    "nombre": "Células solares multiunión",
    "tipo": "fotovoltaico",
    "puntos": "16 [PV]",
    "puntos_carta": 16,
    "puntos_capas": 0,
    "puntos_ingenieros": 0,
    "puntos_otros": 0,
    "copias": 3,
    "discos": 3,
    "bono": "3 [DS][FV] [=][QU]",
    "disco_soporte": 0,
    "efecto": "Coloca un disco en 3 celdas libres de [FV] Fotovoltaica de un mismo cuadrante.",
    "etapas": [
      {
        "m": {
          "Si": 5,
          "Cu": 3,
          "Gd": 1
        },
        "o": {
          "IQ": 2,
          "En": 3
        }
      },
      {
        "m": {
          "Ti": 1,
          "Al": 2
        },
        "o": {
          "IM": 2,
          "En": 3,
          "Tr": 2
        }
      }
    ],
    "destino": "completados"
  },
  {
    "id": "P018",
    "nombre": "Células solares de arseniuro de galio",
    "tipo": "fotovoltaico",
    "puntos": "20 [PV]",
    "puntos_carta": 20,
    "puntos_capas": 0,
    "puntos_ingenieros": 0,
    "puntos_otros": 0,
    "copias": 1,
    "discos": 7,
    "bono": "7 [DS][FV] [=] 2 [QU]",
    "disco_soporte": 0,
    "efecto": "Coloca un disco en 7 celdas libres de [FV] Fotovoltaica de hasta dos cuadrantes.",
    "etapas": [
      {
        "m": {
          "Si": 5,
          "Nd": 1
        },
        "o": {
          "IQ": 2,
          "En": 3
        }
      },
      {
        "m": {
          "Ti": 1,
          "Al": 2
        },
        "o": {
          "IQ": 1,
          "IM": 1,
          "En": 3
        }
      },
      {
        "m": {
          "Si": 5,
          "Cu": 2
        },
        "o": {
          "IS": 1,
          "En": 3,
          "Tr": 2
        }
      }
    ],
    "destino": "completados"
  },

  // Transmisión


  {
    "id": "P021",
    "nombre": "Red superconductora criogénica",
    "tipo": "transmision",
    "puntos": "15 [PV]",
    "puntos_carta": 15,
    "puntos_capas": 0,
    "puntos_ingenieros": 0,
    "puntos_otros": 0,
    "copias": 2,
    "discos": 2,
    "bono": "1[QD][RF] + 3 [DS][TS] [=][QU]",
    "disco_soporte": 0,
    "efecto": "[QD] Retira uno de tus discos de una celda de [RF] Refrigeración y coloca un disco en 3 celdas libres de [TS] Transmisión del mismo cuadrante de donde la quitaste.",
    "etapas": [
      {
        "m": {
          "Cu": 3,
          "Gd": 1,
          "Al": 2
        },
        "o": {
          "IQ": 1,
          "IM": 1,
          "En": 3
        }
      },
      {
        "m": {
          "Cu": 2,
          "Si": 2
        },
        "o": {
          "RF": 1,
          "IM": 2,
          "En": 3,
          "Tr": 2
        }
      }
    ],
    "destino": "completados"
  },
  {
    "id": "P022",
    "nombre": "Superconductores de hidruros a alta presión",
    "tipo": "transmision",
    "puntos": "20 [PV]",
    "puntos_carta": 20,
    "puntos_capas": 0,
    "puntos_ingenieros": 0,
    "puntos_otros": 0,
    "copias": 1,
    "discos": 6,
    "bono": "3[DS][TS] [AD] 3 [DS][RF]",
    "disco_soporte": 0,
    "efecto": "Coloca un disco en 3 celdas libres de [TS] Transmisión adyacentes. \nLuego, coloca un disco en 1 celda de [RF] Refrigeración adyacente a cada una de ellas.",
    "etapas": [
      {
        "m": {
          "Ti": 1,
          "Ce": 1,
          "Si": 4,
          "Cu": 1,
          "Al": 5
        },
        "o": {
          "IQ": 2,
          "IM": 2,
          "En": 4
        }
      },
      {
        "m": {
          "Gd": 1,
          "Ti": 1,
          "Nd": 1,
          "Al": 2
        },
        "o": {
          "IQ": 1,
          "IM": 1,
          "En": 5,
          "Tr": 3
        }
      }
    ],
    "destino": "completados"
  },
  {
    "id": "P023",
    "nombre": "Transmisor láser de alta potencia",
    "tipo": "transmision",
    "puntos": "22 [PV]",
    "puntos_carta": 22,
    "puntos_capas": 0,
    "puntos_ingenieros": 0,
    "puntos_otros": 0,
    "copias": 1,
    "discos": 3,
    "bono": "3 [DS][TS] + 2 [DH][TS] [=][QU]",
    "disco_soporte": 0,
    "efecto": "Coloca un disco en 3 celdas de [TS] Transmisión con beneficios normales de colocación. Después, coloca un disco en otras 2 celdas de [TS] Transmisión del mimso cuadrante sin cobrar bonos de colocación.\nLos discos sin bono restan puntos si no puedes colocarlos.",
    "etapas": [
      {
        "m": {
          "Si": 4,
          "Cu": 2,
          "Er": 1
        },
        "o": {
          "IE": 2,
          "IM": 1,
          "En": 3
        }
      },
      {
        "m": {
          "Al": 3,
          "Ti": 2,
          "Nd": 1
        },
        "o": {
          "IE": 2,
          "IS": 1,
          "En": 3,
          "Tr": 2
        }
      }
    ],
    "destino": "completados"
  },

  // Refrigeración


  {
    "id": "P026",
    "nombre": "Radiadores de nanotubos de carbono alineados",
    "tipo": "refrigeracion",
    "puntos": "14 [PV]",
    "puntos_carta": 14,
    "puntos_capas": 0,
    "puntos_ingenieros": 0,
    "puntos_otros": 0,
    "copias": 2,
    "discos": 3,
    "bono": "3 [DS][RF] [AD]",
    "disco_soporte": 0,
    "efecto": "Coloca un disco en 3 celdas adyacentes de [RF] Refrigeración.",
    "etapas": [
      {
        "m": {
          "C": 10,
          "Si": 3,
          "Ce": 1
        },
        "o": {
          "IQ": 2,
          "IE": 1,
          "En": 2
        }
      },
      {
        "m": {
          "C": 8,
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
    "id": "P027",
    "nombre": "Radiadores de grafeno multicapa",
    "tipo": "refrigeracion",
    "puntos": "20 [PV]",
    "puntos_carta": 20,
    "puntos_capas": 0,
    "puntos_ingenieros": 0,
    "puntos_otros": 0,
    "copias": 1,
    "discos": 4,
    "bono": "4 [DS][RF] [=] [QU] [/] 2[QU]",
    "disco_soporte": 0,
    "efecto": "Coloca un disco en 4 celdas libres de [RF] Refrigeración de hasta 2 cuadrantes.",
    "etapas": [
      {
        "m": {
          "C": 12,
          "Cu": 4,
          "Gd": 1
        },
        "o": {
          "IQ": 2,
          "En": 3
        }
      },
      {
        "m": {
          "C": 10,
          "Al": 4
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
    "id": "P028",
    "nombre": "Motor Stirling de concentración solar",
    "tipo": "refrigeracion",
    "puntos": "12 [PV]",
    "puntos_carta": 12,
    "puntos_capas": 0,
    "puntos_ingenieros": 0,
    "puntos_otros": 0,
    "copias": 2,
    "discos": 6,
    "bono": "2 [DS][FV] [AD] 2 [DS][RF] [AD] 2 [DS][TS]",
    "disco_soporte": 0,
    "efecto": "Coloca un disco en 2 celdas de [FV] Fotovoltaica, un disco en 2 celdas de [RF] Refrigeración y un disco en 2 celda de [TS] Transmisión, todos los discos deben ser adyacentesa toro disco colocado.",
    "etapas": [
      {
        "m": {
          "Fe": 5,
          "Cu": 3,
          "Si": 3
        },
        "o": {
          "IM": 2,
          "En": 3
        }
      },
      {
        "m": {
          "Ti": 2,
          "Al": 3,
          "Ce": 1
        },
        "o": {
          "IE": 1,
          "IM": 1,
          "En": 3,
          "Tr": 3
        }
      }
    ],
    "destino": "completados"
  },{
  "id": "P085",
  "nombre": "Micromembranas adaptativas",
  "tipo": "refrigeracion",
  "puntos": "0 [PV]",
  "puntos_carta": 0,
  "puntos_capas": 0,
  "puntos_ingenieros": 0,
  "puntos_otros": 0,
  "copias": 1,
  "discos": 5,
  "bono": "1 [DS][RF] 1 [DS][MO] [=][SC]",
  "disco_soporte": 0,
  "efecto": "Coloca 1 disco en una celda libre de [RF] Refrigeración y otro en una celda libre de [MO] Microondas de un mismo sector. \nPuedes volver a colocar el cubo en la etapa 2.",
  "etapas": [
    {
      "m": {
        "Si": 2,
        "Al": 2,
        "Fe": 3
      },
      "o": {
        "IM": 1,
        "En": 2
      }
    },
    {
      "m": {
        "Fe": 1,
        "Cu": 1,
        "Nd": 1
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

  // Microondas

  {
    "id": "P030",
    "nombre": "Matriz de antenas en fase",
    "tipo": "microondas",
    "puntos": "5 [PV]",
    "puntos_carta": 5,
    "puntos_capas": 0,
    "puntos_ingenieros": 0,
    "puntos_otros": 0,
    "copias": 3,
    "discos": 4,
    "bono": "4 [DS][MO] [=][QU] [AD] [QU] ",
    "disco_soporte": 0,
    "efecto": "Coloca un disco en 4 celdas libres de [MO] Microondas en dos cuadrantes adyacentes, por lo menos una en cada uno.",
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
          "En": 3
        }
      },
      {
        "m": {
          "Cu": 1
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
    "id": "P031",
    "nombre": "Transmisor láser de haz estrecho",
    "tipo": "microondas",
    "puntos": "20 [PV]",
    "puntos_carta": 20,
    "puntos_capas": 0,
    "puntos_ingenieros": 0,
    "puntos_otros": 0,
    "copias": 2,
    "discos": 5,
    "bono": "3-5 [DS][MO] [=][QU]",
    "disco_soporte": 0,
    "efecto": "Coloca un disco en todas las celdas libres de [MO] Microondas de un mismo cuadrante que tenga al menos 3 celdas de [MO] Microondas libres.",
    "etapas": [
      {
        "m": {
          "Si": 5,
          "Cu": 3,
          "Er": 1
        },
        "o": {
          "IQ": 1,
          "IE": 1,
          "IS": 1,
          "IM": 1,
          "En": 4
        }
      },
      {
        "m": {
          "Ti": 2,
          "Al": 3,
          "Nd": 1
        },
        "o": {
          "IE": 1,
          "IM": 1,
          "En": 4,
          "Tr": 3
        }
      }
    ],
    "destino": "completados"
  },{
  "nombre": "Fábrica de blindaje exterior",
    "id": "P089",
  "tipo": "microondas",
  "puntos": "0 [PV]",
  "puntos_carta": 0,
  "puntos_capas": 0,
  "puntos_ingenieros": 0,
  "puntos_otros": 0,
  "copias": 3,
  "discos": 3,
  "bono": "1 [DS][MO] [RE]",
  "disco_soporte": 0,
  "efecto": "Coloca 1 disco en una celda libre de [MO] Microondas de cualquier cuadrante. \nPuedes volver a colocar el cubo en la etapa 2.",
  "etapas": [
    {
      "m": {
        "Fe": 2,
        "Ti": 1
      },
      "o": {
        "IE": 1,
        "En": 2
      }
    },
    {
      "m": {
        "Fe": 3,
        "Ti": 1
      },
      "o": {
        "IE": 1,
        "En": 2
      }
    }
  ],
  "destino": "etapa:2"
},

  // Sensores
  {
    "id": "P056",
    "nombre": "Extensómetros de fibra óptica",
    "tipo": "sensores",
    "puntos": "0 [PV]",
    "puntos_carta": 0,
    "puntos_capas": 0,
    "puntos_ingenieros": 0,
    "puntos_otros": -2,
    "copias": 1,
    "discos": 0,
    "bono": "1 [DP][SN] \n -1 [PI] [/] [NO] [ES] [=][QU]",
    "disco_soporte": 1,
    "efecto": "Coloca un disco en una celda libre de [SN] Sensores de un área de soporte.\nLuego pierde 1 [PI] por cada celda de [ES] Estructura sin disco del cuadrante de esa area de soporte.",
    "etapas": [
      {
        "m": {
          "Fe": 2,
          "Si": 2,
          "Cu": 3,
          "C": 4
        },
        "o": {
          "IM": 1,
          "En": 2,
          "Tr": 2
        }
      }
    ],
    "destino": "completados"
  },
  {
    "id": "P057",
    "nombre": "Termografía infrarroja",
    "tipo": "sensores",
    "puntos": "3 [PV]",
    "puntos_carta": 3,
    "puntos_capas": 0,
    "puntos_ingenieros": 0,
    "puntos_otros": 0,
    "copias": 2,
    "discos": 0,
    "bono": "1 [DP][SN]",
    "disco_soporte": 1,
    "efecto": "Coloca un disco en una celda libre de [SN] Sensores de un área de soporte.",
    "etapas": [
      {
        "m": {
          "Si": 3,
          "Cu": 2,
          "Nd": 1
        },
        "o": {
          "IM": 1,
          "En": 1
        }
      },
      {
        "m": {
          "Si": 1
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
    "id": "P058",
    "nombre": "Dosímetros de radiación",
    "tipo": "sensores",
    "puntos": "3   [PV]",
    "puntos_carta": 3,
    "puntos_capas": 0,
    "puntos_ingenieros": 0,
    "puntos_otros": -5,
    "copias": 1,
    "discos": 0,
    "bono": "1 [DP][SN] \n -5[PI] [/] [NO][MN] [=][QU]",
    "disco_soporte": 1,
    "efecto": "Coloca un disco en una celda libre de [SN] Sensores de un área de soporte. \nLuego, pierde 5 [PI] por cada celda de [MN] Mantenimiento sin disco en esa misma área de soporte.",
    "etapas": [
      {
        "m": {
          "Si": 4,
          "Al": 2,
          "Ce": 1
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
    "id": "P059",
    "nombre": "Detectores de micrometeoritos",
    "tipo": "sensores",
    "puntos": "0 [PV]",
    "puntos_carta": 0,
    "puntos_capas": 0,
    "puntos_ingenieros": 0,
    "puntos_otros": -2,
    "copias": 2,
    "discos": 0,
    "bono": "1 [DP][SN] \n -1[PI][/][NO][MO] [=][QU]",
    "disco_soporte": 1,
    "efecto": "Coloca un disco en una celda libre de [SN] Sensores de un área de soporte. \nLuego pierde 1 [PI] por cada celda de [MO] Microondas sin disco del cuadrante de esa aera de soporte.",
    "etapas": [
      {
        "m": {
          "Fe": 2,
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
    "id": "P060",
    "nombre": "Analizadores de plasma solar",
    "tipo": "sensores",
    "puntos": "20 [PV]",
    "puntos_carta": 20,
    "puntos_capas": 0,
    "puntos_ingenieros": -4,
    "puntos_otros": 0,
    "copias": 1,
    "discos": 0,
    "bono": "1 [DP][SN]",
    "disco_soporte": 1,
    "efecto": "Coloca un disco y el ingeniero de la última etapa en una celda libre de [SN] Sensores de un área de soporte. \nConsulta la pérdida de puntos por personal anclado.",
    "etapas": [
      {
        "m": {
          "Ti": 2,
          "Cu": 3,
          "Si": 4
        },
        "o": {
          "IM": 1,
          "IS": 1,
          "En": 2
        }
      },
      {
        "m": {
          "Al": 2,
          "Nd": 1,
          "Gd": 1
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
    "id": "P061",
    "nombre": "Red de interferometría láser",
    "tipo": "sensores",
    "puntos": "1 [PV]",
    "puntos_carta": 1,
    "puntos_capas": 0,
    "puntos_ingenieros": 0,
    "puntos_otros": -2,
    "copias": 1,
    "discos": 0,
    "bono": "1 [DP][SN] \n -1 [PI] [NO][SN]",
    "disco_soporte": 1,
    "efecto": "Coloca un disco en una celda libre de [SN] Sensores de un área de soporte. \nLuego, pierde 1 [PI] por cada cuadrante que no tenga un disco en la celda de [SN] Sensores en su área de soporte.",
    "etapas": [
      {
        "m": {
          "Si": 3,
          "Cu": 2,
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
    "id": "P062",
    "nombre": "Monitores de calidad eléctrica",
    "tipo": "sensores",
    "puntos": "0 [PV]",
    "puntos_carta": 0,
    "puntos_capas": 0,
    "puntos_ingenieros": 0,
    "puntos_otros": 0,
    "balance_pendiente": [
      "Se estiman 2 niveles faltantes según el criterio indicado; nivel final 4 y máximo 5 dejarían solo 1. Confirmar este supuesto."
    ],
    "copias": 2,
    "discos": 0,
    "bono": "1 [DP][SN]",
    "disco_soporte": 1,
    "efecto": "Coloca un disco en una celda libre de [SN] Sensores de un área de soporte.",
    "etapas": [
      {
        "m": {
          "Cu": 2,
          "Al": 2,
          "Si": 2,
          "Ce": 1
        },
        "o": {
          "IM": 1,
          "IS": 1,
          "En": 2,
          "Tr": 1
        }
      }
    ],
    "destino": "completados"
  },
  {
    "id": "P063",
    "nombre": "Red de relojes atómicos de sincronización",
    "tipo": "sensores",
    "puntos": "15 [PV]",
    "puntos_carta": 15,
    "puntos_capas": 0,
    "puntos_ingenieros": 0,
    "puntos_otros": 0,
    "copias": 1,
    "discos": 0,
    "bono": "1 [DP][SN]",
    "disco_soporte": 1,
    "efecto": "Coloca un disco en una celda libre de [SN] Sensores de un área de soporte.",
    "etapas": [
      {
        "m": {
          "Ti": 1,
          "Fe": 1,
          "Gd": 1,
          "Cu": 3,
          "Nd": 1
        },
        "o": {
          "IQ": 1,
          "IS": 1,
          "En": 4
        }
      },
      {
        "m": {
          "Cu": 3,
          "Nd": 1
        },
        "o": {
          "IQ": 1,
          "IS": 1,
          "En": 5,
          "Tr": 1
        }
      }
    ],
    "destino": "completados"
  },

  // Control

  {
    "id": "P065",
    "nombre": "Centro de supervisión orbital",
    "tipo": "control",
    "puntos": "5 [PV]",
    "puntos_carta": 5,
    "puntos_capas": 0,
    "puntos_ingenieros": -4,
    "puntos_otros": +6,
    "copias": 1,
    "discos": 0,
    "bono": "1 [DP][CO] \n +3 [PI] [/][SI][SN]",
    "disco_soporte": 1,
    "efecto": "Coloca un disco y el ingeniero de la última etapa en una celda libre de [CO] Control de un área de soporte. \nLuego gana 3 [PI] por cada celda de [SN] Sensores con un disco de cualquier jugador. \nConsulta la pérdida de puntos por personal anclado.",
    "etapas": [
      {
        "m": {
          "Al": 1,
          "Nd": 1,
          "Fe": 1
        },
        "o": {
          "IS": 1,
          "IE": 1,
          "En": 2
        }
      },
      {
        "m": {
          "Ti": 2,
          "Cu": 1,
          "Si": 4
        },
        "o": {
          "AS": 1,
          "En": 2,
          "Tr": 1
        }
      }
    ],
    "destino": "completados"
  },
  {
    "id": "P066",
    "nombre": "Centro de regulación de potencia",
    "tipo": "control",
    "puntos": "20 [PV]",
    "puntos_carta": 20,
    "puntos_capas": 0,
    "puntos_ingenieros": -4,
    "puntos_otros": 0,
    "copias": 1,
    "discos": 0,
    "bono": "1 [DP][CO]",
    "disco_soporte": 1,
    "efecto": "Coloca un disco y el ingeniero de la última etapa en una celda libre de [CO] Control de un área de soporte. \nConsulta la pérdida de puntos por personal anclado.",
    "etapas": [
      {
        "m": {
          "Al": 2,
          "Gd": 2,
          "Fe": 1
        },
        "o": {
          "IM": 1,
          "IS": 1,
          "En": 2
        }
      },
      {
        "m": {
          "Ti": 3,
          "Cu": 3,
          "Nd": 1
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
    "id": "P067",
    "nombre": "Centro de mantenimiento predictivo",
    "tipo": "control",
    "puntos": "25 [PV]",
    "puntos_carta": 25,
    "puntos_capas": 0,
    "puntos_ingenieros": -12,
    "puntos_otros": 0,
    "copias": 1,
    "discos": 0,
    "bono": "1 [DP][CO]",
    "disco_soporte": 1,
    "efecto": "Coloca un disco y los ingenieros de la última etapa en una celda libre de [CO] Control de un área de soporte. \nConsulta la pérdida de puntos por personal anclado.",
    "etapas": [
      {
        "m": {
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
        "m": {
          "Ti": 1,
          "Cu": 3,
          "Nd": 1
        },
        "o": {
          "AM": 1,
          "AQ": 1,
          "AS": 1,
          "En": 4,
          "Tr": 2
        }
      }
    ],
    "destino": "completados"
  },
  {
    "id": "P068",
    "nombre": "Centro de coordinación integral",
    "tipo": "control",
    "puntos": "1 [PV] [/] [DP]",
    "puntos_carta": 10,
    "puntos_capas": 0,
    "puntos_ingenieros": -4,
    "puntos_otros": 0,
    "copias": 1,
    "discos": 0,
    "bono": "1 [DP][CO]",
    "disco_soporte": 1,
    "efecto": "Coloca un disco y los ingenieros de la última etapa en una celda libre de [CO] Control de un área de soporte. \nConsulta la pérdida de puntos por personal anclado. \n[FJ] Gana 1 [PV] por cada [DP] disco de cualquier jugador en cualquier área de soporte.",
    "etapas": [
      {
        "m": {
          "Fe": 5,
          "Cu": 2,
          "Er": 1
        },
        "o": {
          "IE": 1,
          "En": 2
        }
      },
      {
        "m": {
          "Cu": 1,
          "Al": 1
        },
        "o": {
          "AE": 1,
          "En": 2,
          "Tr": 2
        }
      }
    ],
    "destino": "completados"
  },
  {
    "id": "P069",
    "nombre": "Control remoto por teletransportación cuántica",
    "tipo": "control",
    "puntos": "10 [PV]",
    "puntos_carta": 10,
    "puntos_capas": 0,
    "puntos_ingenieros": 0,
    "puntos_otros": 0,
    "copias": 1,
    "discos": 3,
    "bono": "1 [DP][CO] 3 [DS][MO] [=][QU]",
    "disco_soporte": 1,
    "efecto": "Coloca un disco en una celda libre de [CO] Control de un área de soporte y un disco en 3 celdas libres de [MO] Microondas del mismo cuadrante.",
    "etapas": [
      {
        "m": {
          "Ti": 2,
          "Fe": 3,
          "Nd": 1,
          "Gd": 1
        },
        "o": {
          "IQ": 1,
          "IE": 1,
          "En": 3
        }
      },
      {
        "m": {
          "Al": 4,
          "Er": 1,
          "Si": 3
        },
        "o": {
          "IQ": 1,
          "IE": 1,
          "En": 4,
          "Tr": 2
        }
      }
    ],
    "destino": "completados"
  },
  {
    "id": "P070",
    "nombre": "Centro de control por mejora permanente",
    "tipo": "control",
    "puntos": "-1 [PV]",
    "puntos_carta": -1,
    "puntos_capas": 0,
    "puntos_ingenieros": -4,
    "puntos_otros": 0,
    "copias": 1,
    "discos": 0,
    "bono": "1 [DP][CO]",
    "disco_soporte": 1,
    "efecto": "Coloca un disco y el ingeniero de la última etapa en una celda libre de [CO] Control de un área de soporte. \nConsulta la pérdida de puntos por personal anclado.",
    "etapas": [
      {
        "m": {
          "Al": 1,
          "Fe": 3
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
    "id": "P071",
    "nombre": "Centro de calibración retroactiva",
    "tipo": "control",
    "puntos": "20 [PV]",
    "puntos_carta": 20,
    "puntos_capas": 0,
    "puntos_ingenieros": -4,
    "puntos_otros": 0,
    "copias": 1,
    "discos": -1,
    "bono": "1 [DP][CO] + [QD][MO] [=][QU]",
    "disco_soporte": 1,
    "efecto": "[QD] Retira uno de tus discos de una celda de [MO] Microondas para colocar un disco en una celda libre de [CO] Control en el área de soporte del mismo cuadrante.\nConsulta la pérdida de puntos por personal anclado.",
    "etapas": [
      {
        "m": {
          "Al": 3,
          "Nd": 2,
          "Fe": 2
        },
        "o": {
          "MO": 1,
          "IS": 2,
          "IQ": 1,
          "En": 2
        }
      },
      {
        "m": {
          "Si": 4,
          "Ce": 2
        },
        "o": {
          "MO": 1,
          "AS": 1,
          "En": 2,
          "Tr": 1
        }
      }
    ],
    "destino": "completados"
  },

  // Mantenimiento
  {
    "id": "P072",
    "nombre": "Red de túneles de servicio",
    "tipo": "mantenimiento",
    "puntos": "15 [PV]",
    "puntos_carta": 15,
    "puntos_capas": 0,
    "puntos_ingenieros": -8,
    "puntos_otros": 0,
    "copias": 1,
    "discos": -1,
    "bono": "1 [DP][MN] + [QD][ES] [=][QU]",
    "disco_soporte": 1,
    "efecto": "[QD] Retira uno de tus discos de una celda de [ES] Estructura para colocar un disco en una celda libre de [MN] Mantenimiento en el área de soporte del mismo cuadrante.\nConsulta la pérdida de puntos por personal anclado.",
    "etapas": [
      {
        "m": {
          "Fe": 2,
          "Ti": 2
        },
        "o": {
          "IE": 1
        }
      },
      {
        "m": {
          "Fe": 1,
          "Cu": 2
        },
        "o": {
          "ES": 1,
          "AE": 2,
          "Tr": 2
        }
      }
    ],
    "destino": "completados"
  },
  {
    "id": "P073",
    "nombre": "Brigada de propulsión iónica",
    "tipo": "mantenimiento",
    "puntos": "10 [PV]",
    "puntos_carta": 10,
    "puntos_capas": 0,
    "puntos_ingenieros": -12,
    "puntos_otros": 6,
    "copias": 3,
    "discos": -1,
    "bono": "1 [DP][MN] + [QD][FV] \n +2 [PI] [SI][ES][=][QU]",
    "disco_soporte": 1,
    "efecto": "[QD] Retira uno de tus discos de una celda de [FV] Fotovoltaica para colocar un disco en una celda libre de [MN] Mantenimiento en el área de soporte del mismo cuadrante.\nLuego gana 2 [PI] por cada celda de [ES] Estructura con un disco en el mimso cuadrante. \nConsulta la pérdida de puntos por personal anclado.",
    "etapas": [
      {
        "m": {
          "Fe": 2,
          "Ti": 2,
          "Al": 1,
          "Cu": 2,
          "Ce": 1
        },
        "o": {
          "FV": 1,
          "AE": 3,
          "Tr": 1
        }
      }
    ],
    "destino": "completados"
  },
  {
    "id": "P074",
    "nombre": "Gimnasio y spa de gravedad cero",
    "tipo": "mantenimiento",
    "puntos": "2 [PV] [/] [AI]",
    "puntos_carta": 0,
    "puntos_capas": 0,
    "puntos_ingenieros": 0,
    "puntos_otros": 20,
    "copias": 1,
    "discos": 0,
    "bono": "1 [DH][MN]",
    "disco_soporte": 0,
    "efecto": "Coloca un disco en una celda libre de [MN] Mantenimiento sin cobrar bonos de colocación.\n[FJ] Gana 2 [PV] por [AI] ingeniero anclado de cualquier jugador.",
    "etapas": [
      {
        "m": {
          "Ti": 1,
          "Al": 2,
          "Fe": 3,
          "Cu": 2
        },
        "o": {
          "IE": 1,
          "IS": 1,
          "En": 1
        }
      },
      {
        "m": {
          "Ti": 1,
          "Al": 2,
          "Cu": 2,
          "Si": 2
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
    "id": "P075",
    "nombre": "Jardines bioclimáticos inteligentes",
    "tipo": "mantenimiento",
    "puntos": "20 [PV]",
    "puntos_carta": 20,
    "puntos_capas": 0,
    "puntos_ingenieros": 0,
    "puntos_otros": 20,
    "copias": 1,
    "discos": 0,
    "bono": "1 [DH][MN] - 5 [AI]",
    "disco_soporte": 0,
    "efecto": "Coloca un disco en una celda libre de [MN] Mantenimiento sin cobrar bonos de colocación.\nLuego retira hasta 5 [AI] ingenieros anclados de cualquier número de celdas y devuélvelos a la reserva de ingenieros correspondiente.",
    "etapas": [
      {
        "m": {
          "Ti": 4,
          "Al": 5,
          "Si": 4
        },
        "o": {
          "IE": 1,
          "IQ": 1,
          "En": 4
        }
      },
      {
        "m": {
          "Cu": 4,
          "Nd": 2,
          "Si": 2,
          "Er": 1,
          "Ti": 2
        },
        "o": {
          "IE": 1,
          "IQ": 1,
          "En": 4,
          "Tr": 3
        }
      }
    ],
    "destino": "completados"
  },
  {
    "id": "P076",
    "nombre": "Aditivo de nanobots microactuadores",
    "tipo": "mantenimiento",
    "puntos": "10 [PV]",
    "puntos_carta": 10,
    "puntos_capas": 0,
    "puntos_ingenieros": -4,
    "puntos_otros": 9,
    "copias": 1,
    "discos": -1,
    "bono": "1 [DP][MN] + [QD][ES] \n +3[PI] [/] [SI][RF] [=][QU]",
    "disco_soporte": 1,
    "efecto": "[QD] Retira uno de tus discos de una celda de [ES] Estructura para colocar un disco en una celda libre de [MN] Mantenimiento en el área de soporte del mismo cuadrante.\nLuego gana 3[PI] por cada celda de [RF] Refrigeración con un disco \nConsulta la pérdida de puntos por personal anclado.",
    "etapas": [
      {
        "m": {
          "Si": 2,
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
          "Si": 2,
          "Ce": 2
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
    "id": "P077",
    "nombre": "Núcleo de control multifísico",
    "tipo": "mantenimiento",
    "puntos": "20 [PV]",
    "puntos_carta": 20,
    "puntos_capas": 0,
    "puntos_ingenieros": 0,
    "puntos_otros": 0,
    "copias": 1,
    "discos": -3,
    "bono": "[QD][ES]+[QD][TS]+[QD][RF]\n1 [DP][MN]",
    "disco_soporte": 1,
    "efecto": "[QD] Retira uno de tus discos de cada una de las capas [ES] Estructura, [TS] Transmisión y [RF] Refrigeración de un mismo sector para colocar un disco en una celda libre de [MN] Mantenimiento del mismo cuadrante.",
    "etapas": [
      {
        "m": {
          "Cu": 2,
          "Gd": 1,
          "Fe": 1
        },
        "o": {
          "IS": 1,
          "IE": 2,
          "En": 2
        }
      },
      {
        "m": {
          "Ti": 3,
          "Al": 1
        },
        "o": {
          "ES": 1,
          "TS": 1,
          "RF": 1,
          "IE": 1,
          "Tr": 1,
          "En": 2
        }
      }
    ],
    "destino": "completados"
  },
  {
    "id": "P078",
    "nombre": "Anticipación y blindaje contra llamaradas solares",
    "tipo": "mantenimiento",
    "puntos": "10 [PV]",
    "puntos_carta": 10,
    "puntos_capas": 0,
    "puntos_ingenieros": -8,
    "puntos_otros": -2,
    "copias": 1,
    "discos": 2,
    "bono": "2 [DP][MN] 2[DS][ES] [=]2[QU]",
    "disco_soporte": 2,
    "efecto": "Coloca 1 disco en 2 celdas libres de [MN] Mantenimiento y 1 disco en 2 celdas libres de [ES] Estructura de dos cuadrantes, 2 discos en cada cuadrante. Si el mapa tiene más de 3 cuadrantes, estos no pueden ser adyacentes.\nConsulta la pérdida de puntos por personal anclado.",
    "etapas": [
      {
        "m": {
          "Gd": 1,
          "Cu": 2,
          "Si": 4
        },
        "o": {
          "IQ": 2,
          "IS": 1,
          "En": 2
        }
      },
      {
        "m": {
          "Ti": 3,
          "Al": 1,
          "Nd": 1
        },
        "o": {
          "AM": 1,
          "AS": 1,
          "Tr": 2,
          "En": 2
        }
      }
    ],
    "destino": "completados"
  },
  {
    "id": "P079",
    "nombre": "Detección y ablación láser de micrometeoritos",
    "tipo": "mantenimiento",
    "puntos": "20 [PV]",
    "puntos_carta": 20,
    "puntos_capas": 0,
    "puntos_ingenieros": -8,
    "puntos_otros": 0,
    "copias": 1,
    "discos": 4,
    "bono": "1 [DP][MN] 4 [DS][MO] [=] 2 [QU]",
    "disco_soporte": 1,
    "efecto": "Coloca 1 disco en una celda libre de [MN] Mantenimiento de un área de soporte y un disco en 4 celdas libres de [MO] Microondas de ese cuadrante y otro cuadrante, por lo menos una en cada uno. \nConsulta la pérdida de puntos por personal anclado.",
    "etapas": [
      {
        "m": {
          "Si": 5,
          "Cu": 4,
          "Nd": 2
        },
        "o": {
          "IM": 1,
          "IS": 1,
          "En": 2
        }
      },
      {
        "m": {
          "Ti": 1,
          "Al": 3,
          "Er": 2
        },
        "o": {
          "AM": 1,
          "AS": 1,
          "Tr": 2,
          "En": 2
        }
      }
    ],
    "destino": "completados"
  },
  {
    "id": "P080",
    "nombre": "Plataforma de reparaciones sobre rieles",
    "tipo": "mantenimiento",
    "puntos": "15 [PV]",
    "puntos_carta": 15,
    "puntos_capas": 0,
    "puntos_ingenieros": -8,
    "puntos_otros": -2,
    "copias": 1,
    "discos": 0,
    "bono": "2 [DP][MN] [=][QU] \n -1 [PI] [ES][QU]",
    "disco_soporte": 2,
    "efecto": "Coloca un disco en cada una de las 2 celdas libres de [MN] Mantenimiento de una misma área de soporte y los ingenieros de la última etapa junto a cualquiera de ellos.\nLuego pierde 1 [PI] por cada celda sin disco de [ES] Estructura en ese cuadrante.\nConsulta la pérdida de puntos por personal anclado.",
    "etapas": [
      {
        "m": {
          "Fe": 8,
          "Al": 2,
          "Ti": 1
        },
        "o": {
          "IE": 2,
          "En": 2
        }
      },
      {
        "m": {
          "Fe": 3,
          "Cu": 6,
          "Nd": 1
        },
        "o": {
          "Tr": 2,
          "AE": 2,
          "En": 2 
        }
      }
    ],
    "destino": "completados"
  },

  {
    "id": "P082",
    "nombre": "Ascensores de mantenimiento radial",
    "tipo": "mantenimiento",
    "puntos": "3 [PV]",
    "puntos_carta": 3,
    "puntos_capas": 0,
    "puntos_ingenieros": -8,
    "puntos_otros": 0,
    "copias": 1,
    "discos": 0,
    "bono": "2 [DP][MN]",
    "disco_soporte": 2,
    "efecto": "coloca un disco en 2 celdas libres de [MN] Mantenimiento en el área de soporte de dos cuadrantes distintos. Coloca los ingenieros de la última etapa junto a cualquiera de ellos. Si el mapa tiene 3 cuadrantes o más, ambos cuadrantes no pueden ser adyacentes.\nConsulta la pérdida de puntos por personal anclado.",
    "etapas": [
      {
        "m": {
          "Fe": 4,
          "Al": 3,
          "Cu": 3,
          "Ti": 2,
          "Si": 3
        },
        "o": {
          "En": 3,
          "Tr": 2,
          "AE": 2
        }
      }
    ],
    "destino": "completados"
  },
  {
    "id": "P083",
    "nombre": "Centro de mantenimiento tradicional",
    "tipo": "mantenimiento",
    "puntos": "7 [PV]",
    "puntos_carta": 7,
    "puntos_capas": 0,
    "puntos_ingenieros": -8,
    "puntos_otros": 0,
    "copias": 5,
    "discos": 0,
    "bono": "1 [DP][MN]",
    "disco_soporte": 1,
    "efecto": "Coloca 1 disco en una celda libre de [MN] Mantenimiento de un área de soporte, junto con los ingenieros anclados de la última etapa.\nConsulta la pérdida de puntos por personal anclado.",
    "etapas": [
      {
        "m": {
          "Fe": 4,
          "Ti": 2,
          "Si": 2,
          "Al": 1
        },
        "o": {
          "AE": 1,
          "AM": 1,
          "Tr": 2
        }
      }
    ],
    "destino": "completados"
  }
];

// Conservar los conjuntos originales aunque alguna carta haya cambiado de tipo.
window.sensores = ["P056","P057","P058","P059","P060","P061","P062","P063"].map(id => window.modulos.find(carta => carta.id === id));
window.control = ["P064","P065","P066","P067","P068","P069","P070","P071"].map(id => window.modulos.find(carta => carta.id === id));
window.mantenimiento = ["P072","P073","P074","P075","P076","P077","P078","P079","P080","P081","P082","P083","P084"].map(id => window.modulos.find(carta => carta.id === id));
