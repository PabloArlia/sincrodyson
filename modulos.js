// Syncrodyson — datos de proyectos. Las recetas nuevas no acordadas se identifican en nota_balance.
// bono: texto e iconos entre corchetes, p. ej. "3 [DS]", "+3 [BT]", "+18 [Di][RE]".
// Balance: suma puntos_carta + puntos_capas + puntos_ingenieros + puntos_otros.
// puntos_ingenieros usa -4 por anclado; balance.js permite ajustar ese supuesto.
// puntos_otros: null indica una estimación pendiente; 0 indica que no se suma otro efecto.
// Los puntos por discos de sector y soporte se agregan aparte en balance.js.
// Tipos sin puntos impresos primero; IDs y orden interno de cada tipo conservados.
window.modulos = [
  // Proyectos iniciales: circulan obligatoriamente hacia la derecha.
  {
    "id": "I01",
    "nombre": "Armazón modular",
    "tipo": "estructura",
    "inicial": true,
    "puntos": "0 [PV]",
    "puntos_carta": 0,
    "puntos_capas": 0,
    "puntos_ingenieros": 0,
    "puntos_otros": 0,
    "copias": 1,
    "discos": 2,
    "bono": "2 [DS]",
    "disco_soporte": 0,
    "efecto": "Coloca 2 discos en celdas libres de [ES] estructura, en secciones distintas. Entrega esta carta al jugador de tu derecha.",
    "etapas": [
      {
        "m": {
          "Fe": 7
        },
        "o": {
          "IE": 1,
          "En": 1
        }
      },
      {
        "m": {
          "Fe": 7
        },
        "o": {
          "IE": 1,
          "En": 1
        }
      }
    ],
    "destino": "derecha"
  },
  {
    "id": "I02",
    "nombre": "Vigas de unión",
    "tipo": "estructura",
    "inicial": true,
    "puntos": "0 [PV]",
    "puntos_carta": 0,
    "puntos_capas": 0,
    "puntos_ingenieros": 0,
    "puntos_otros": 0,
    "copias": 1,
    "discos": 2,
    "bono": "2 [DS]",
    "disco_soporte": 0,
    "efecto": "Coloca 2 discos en celdas libres de [ES] estructura, en secciones distintas. Entrega esta carta al jugador de tu derecha.",
    "etapas": [
      {
        "m": {
          "Al": 2,
          "Fe": 1
        },
        "o": {
          "IE": 1,
          "En": 1
        }
      },
      {
        "m": {
          "Al": 2,
          "Fe": 1
        },
        "o": {
          "IE": 1,
          "En": 1
        }
      }
    ],
    "destino": "derecha"
  },
  {
    "id": "I03",
    "nombre": "Paneles de captación",
    "tipo": "fotovoltaico",
    "inicial": true,
    "puntos": "0 [PV]",
    "puntos_carta": 0,
    "puntos_capas": 0,
    "puntos_ingenieros": 0,
    "puntos_otros": 0,
    "copias": 1,
    "discos": 2,
    "bono": "2 [DS]",
    "disco_soporte": 0,
    "efecto": "Coloca 2 discos en celdas libres de [FV] fotovoltaico, en secciones distintas. Entrega esta carta al jugador de tu derecha.",
    "etapas": [
      {
        "m": {
          "Si": 3
        },
        "o": {
          "IE": 1,
          "En": 1
        }
      },
      {
        "m": {
          "Si": 4
        },
        "o": {
          "IE": 1,
          "En": 1
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
    "bono": "2 [DS]",
    "disco_soporte": 0,
    "efecto": "Coloca 2 discos en celdas libres de [FV] fotovoltaico, en secciones distintas. Entrega esta carta al jugador de tu derecha.",
    "etapas": [
      {
        "m": {
          "Cu": 2,
          "Fe": 1
        },
        "o": {
          "IE": 1,
          "En": 1
        }
      },
      {
        "m": {
          "Cu": 2,
          "Fe": 1
        },
        "o": {
          "IE": 1,
          "En": 1
        }
      }
    ],
    "destino": "derecha"
  },
  {
    "id": "I05",
    "nombre": "Emisores de microondas",
    "tipo": "microondas",
    "inicial": true,
    "puntos": "0 [PV]",
    "puntos_carta": 0,
    "puntos_capas": 0,
    "puntos_ingenieros": 0,
    "puntos_otros": 0,
    "copias": 1,
    "discos": 2,
    "bono": "2 [DS]",
    "disco_soporte": 0,
    "efecto": "Coloca 2 discos en celdas libres de [MO] microondas, en secciones distintas. Entrega esta carta al jugador de tu derecha.",
    "etapas": [
      {
        "m": {
          "Cu": 2,
          "Fe": 1
        },
        "o": {
          "IE": 1,
          "En": 1
        }
      },
      {
        "m": {
          "Cu": 2,
          "Fe": 1
        },
        "o": {
          "IE": 1,
          "En": 1
        }
      }
    ],
    "destino": "derecha"
  },
  {
    "id": "I06",
    "nombre": "Red de antenas",
    "tipo": "microondas",
    "inicial": true,
    "puntos": "0 [PV]",
    "puntos_carta": 0,
    "puntos_capas": 0,
    "puntos_ingenieros": 0,
    "puntos_otros": 0,
    "copias": 1,
    "discos": 2,
    "bono": "2 [DS]",
    "disco_soporte": 0,
    "efecto": "Coloca 2 discos en celdas libres de [MO] microondas, en secciones distintas. Entrega esta carta al jugador de tu derecha.",
    "etapas": [
      {
        "m": {
          "Si": 3
        },
        "o": {
          "IE": 1,
          "En": 1
        }
      },
      {
        "m": {
          "Si": 4
        },
        "o": {
          "IE": 1,
          "En": 1
        }
      }
    ],
    "destino": "derecha"
  },
  {
    "id": "I07",
    "nombre": "Circuitos térmicos",
    "tipo": "refrigeracion",
    "inicial": true,
    "puntos": "0 [PV]",
    "puntos_carta": 0,
    "puntos_capas": 0,
    "puntos_ingenieros": 0,
    "puntos_otros": 0,
    "copias": 1,
    "discos": 2,
    "bono": "2 [DS]",
    "disco_soporte": 0,
    "efecto": "Coloca 2 discos en celdas libres de [RF] refrigeracion, en secciones distintas. Entrega esta carta al jugador de tu derecha.",
    "etapas": [
      {
        "m": {
          "Al": 2,
          "Fe": 1
        },
        "o": {
          "IE": 1,
          "En": 1
        }
      },
      {
        "m": {
          "Al": 2,
          "Fe": 1
        },
        "o": {
          "IE": 1,
          "En": 1
        }
      }
    ],
    "destino": "derecha"
  },
  {
    "id": "I08",
    "nombre": "Radiadores orbitales",
    "tipo": "refrigeracion",
    "inicial": true,
    "puntos": "0 [PV]",
    "puntos_carta": 0,
    "puntos_capas": 0,
    "puntos_ingenieros": 0,
    "puntos_otros": 0,
    "copias": 1,
    "discos": 2,
    "bono": "2 [DS]",
    "disco_soporte": 0,
    "efecto": "Coloca 2 discos en celdas libres de [RF] refrigeracion, en secciones distintas. Entrega esta carta al jugador de tu derecha.",
    "etapas": [
      {
        "m": {
          "Fe": 7
        },
        "o": {
          "IE": 1,
          "En": 1
        }
      },
      {
        "m": {
          "Fe": 7
        },
        "o": {
          "IE": 1,
          "En": 1
        }
      }
    ],
    "destino": "derecha"
  },
  {
    "id": "I09",
    "nombre": "Red de transmisión",
    "tipo": "transmision",
    "inicial": true,
    "puntos": "0 [PV]",
    "puntos_carta": 0,
    "puntos_capas": 0,
    "puntos_ingenieros": 0,
    "puntos_otros": 0,
    "copias": 1,
    "discos": 2,
    "bono": "2 [DS]",
    "disco_soporte": 0,
    "efecto": "Coloca 2 discos en celdas libres de [TS] transmision, en secciones distintas. Entrega esta carta al jugador de tu derecha.",
    "etapas": [
      {
        "m": {
          "Cu": 2,
          "Fe": 1
        },
        "o": {
          "IE": 1,
          "En": 1
        }
      },
      {
        "m": {
          "Cu": 2,
          "Fe": 1
        },
        "o": {
          "IE": 1,
          "En": 1
        }
      }
    ],
    "destino": "derecha"
  },
  {
    "id": "I10",
    "nombre": "Conductores orbitales",
    "tipo": "transmision",
    "inicial": true,
    "puntos": "0 [PV]",
    "puntos_carta": 0,
    "puntos_capas": 0,
    "puntos_ingenieros": 0,
    "puntos_otros": 0,
    "copias": 1,
    "discos": 2,
    "bono": "2 [DS]",
    "disco_soporte": 0,
    "efecto": "Coloca 2 discos en celdas libres de [TS] transmision, en secciones distintas. Entrega esta carta al jugador de tu derecha.",
    "etapas": [
      {
        "m": {
          "Si": 3
        },
        "o": {
          "IE": 1,
          "En": 1
        }
      },
      {
        "m": {
          "Si": 4
        },
        "o": {
          "IE": 1,
          "En": 1
        }
      }
    ],
    "destino": "derecha"
  },
  {
    "id": "I11",
    "nombre": "Talleres de mantenimiento",
    "tipo": "mantenimiento",
    "inicial": true,
    "puntos": "0 [PV]",
    "puntos_carta": 0,
    "puntos_capas": 0,
    "puntos_ingenieros": 0,
    "puntos_otros": 0,
    "copias": 1,
    "discos": 0,
    "bono": "2 [DP]",
    "disco_soporte": 2,
    "efecto": "Coloca 2 discos en celdas libres de [MN] Mantenimiento. Entrega esta carta al jugador de tu derecha.",
    "etapas": [
      {
        "m": {
          "Ti": 2,
          "Cu": 2,
          "Si": 3
        },
        "o": {
          "IE": 1,
          "En": 2,
          "Tr": 1
        }
      },
      {
        "m": {
          "Ti": 2,
          "Cu": 2,
          "Si": 3
        },
        "o": {
          "IE": 1,
          "En": 2,
          "Tr": 1
        }
      }
    ],
    "destino": "derecha"
  },
  {
    "id": "I12",
    "nombre": "Instrumentación y mando",
    "tipo": "sensores",
    "inicial": true,
    "puntos": "0 [PV]",
    "puntos_carta": 0,
    "puntos_capas": 0,
    "puntos_ingenieros": 0,
    "puntos_otros": 0,
    "copias": 1,
    "discos": 0,
    "bono": "2 [DP]",
    "disco_soporte": 2,
    "efecto": "Coloca 1 disco en una celda libre de [SN] Sensores y 1 disco en una celda libre de [CO] Control. Entrega esta carta al jugador de tu derecha.",
    "etapas": [
      {
        "m": {
          "Ti": 2,
          "Cu": 2,
          "Si": 3
        },
        "o": {
          "IS": 1,
          "En": 2,
          "Tr": 1
        }
      },
      {
        "m": {
          "Ti": 2,
          "Cu": 2,
          "Si": 3
        },
        "o": {
          "IS": 1,
          "En": 2,
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
    "puntos_otros": 0,
    "copias": 1,
    "discos": 0,
    "bono": "+10 [Di][RE]",
    "disco_soporte": 0,
    "efecto": "Gana $10. Puedes volver a colocar el cubo en la etapa 2.",
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
          "En": 6
        }
      }
    ],
    "destino": "etapa:2"
  },
  {
    "id": "P046",
    "nombre": "Mercado negro",
    "tipo": "economia",
    "puntos": "0 [PV]",
    "puntos_carta": 0,
    "puntos_capas": 0,
    "puntos_ingenieros": 0,
    "puntos_otros": 0,
    "copias": 3,
    "discos": 0,
    "bono": "[ME] [RE]",
    "disco_soporte": 0,
    "efecto": "Puedes comprar hasta 8 recursos en total a estos precios: Fe $1, Cu $2, Si $1, Ti $4, Al $2, C $1, Nd $5, Gd $5, Er $8, Ce $5. Puedes asignarlos inmediatamente a proyectos o colocarlos en tu almacén. Puedes volver a colocar el cubo en la etapa 1.",
    "destino": "etapa:1",
    "etapas": [
      {
        "m": {
          "Cu": 2,
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
    "id": "P047",
    "nombre": "Consorcio de minerales estratégicos",
    "tipo": "economia",
    "puntos": "0 [PV]",
    "puntos_carta": 0,
    "puntos_capas": 0,
    "puntos_ingenieros": 0,
    "puntos_otros": null,
    "balance_pendiente": [
      "Los PI dependen de ventas y del número de repeticiones del proyecto."
    ],
    "copias": 1,
    "discos": 0,
    "bono": "[TJ] [ME] [RR]",
    "disco_soporte": 0,
    "efecto": "Cada jugador (incluso tu) puede vender hasta 3 [RR] tierras raras a $15 cada una, independientemente del tipo. \nGanas 1 [PI] por cada 2 [RR] vendidas entre todos los jugadores, redondeando hacia abajo. Puedes volver a colocar el cubo en la etapa 1.",
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
          "Si": 2
        },
        "o": {
          "IQ": 1,
          "En": 2
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
    "puntos_otros": 0,
    "copias": 1,
    "discos": 0,
    "bono": "+5 [Di] [RE]",
    "disco_soporte": 0,
    "efecto": "Elige: \n(1) Si hay menos de $5 sobre esta carta, coloca $1 de tu dinero sobre ella; o \n(2) cobra del banco $5 más $1 por cada $1 sobre esta carta. El dinero invertido permanece. \nEn ambos casos, puedes volver a colocar el cubo en la etapa 2.",
    "destino": "etapa:2",
    "etapas": [
      {
        "m": {
          "Al": 3,
          "Si": 3,
          "Cu": 2
        },
        "o": {
          "IE": 1,
          "En": 2
        }
      },
      {
        "m": {
          "Al": 1
        },
        "o": {
          "IS": 1,
          "En": 2
        }
      }
    ]
  },
  {
    "id": "P049",
    "nombre": "Centro de fusión nuclear",
    "tipo": "economia",
    "puntos": "0 [PV]",
    "puntos_carta": 0,
    "puntos_capas": 0,
    "puntos_ingenieros": 0,
    "puntos_otros": null,
    "balance_pendiente": [
      "Los PI dependen de la energía entregada y del número de repeticiones."
    ],
    "copias": 1,
    "discos": 0,
    "bono": "+X [En]",
    "disco_soporte": 0,
    "efecto": "Todos los jugadores obtienen hasta 3 [En] energía, sin superar la capacidad de sus [BT] baterías, no pueden negarse. Ganas 1 [PI] por cada 2 [En] energía efectivamente obtenida entre todos los jugadores redondeado hacia arriba, hasta un máximo de 4 [PI]. \nPuedes volver a colocar el cubo en la etapa 2.",
    "destino": "etapa:2",
    "etapas": [
      {
        "m": {
          "Cu": 5,
          "Fe": 5,
          "Nd": 3,
          "Ti": 3,
          "Gd": 1,
          "Al": 2
        },
        "o": {
          "IQ": 1,
          "IE": 2,
          "IM": 2,
          "En": 6
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
    "puntos": "0 [PV]",
    "puntos_carta": 0,
    "puntos_capas": 0,
    "puntos_ingenieros": 0,
    "puntos_otros": 0,
    "copias": 4,
    "discos": 0,
    "bono": "",
    "disco_soporte": 0,
    "efecto": "Retira un [AI] ingeniero anclado de cualquier celda y colócalo en tu reserva.\nLuego entrega esta carta al jugador de tu derecha, que la incorpora a su mano sin coste.",
    "etapas": [
      {
        "m": {
          "Ti": 2,
          "Si": 2,
          "Cu": 2,
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
    "destino": "especial"
  },
  {
    "id": "P042",
    "nombre": "Pasantía",
    "tipo": "recursoshumanos",
    "puntos": "0 [PV]",
    "puntos_carta": 0,
    "puntos_capas": 0,
    "puntos_ingenieros": 0,
    "puntos_otros": 0,
    "copias": 3,
    "discos": 0,
    "bono": "+1 [IQ] [CN]",
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
    "puntos_otros": 0,
    "copias": 2,
    "discos": 0,
    "bono": "+3 [IS] [CN]",
    "disco_soporte": 0,
    "efecto": "Coloca hasta 3 [IS] ingenieros en sistemas en tus barracas sin gastar fichas de contratación. Por cada uno que no esté disponible, obtén 1 [CN] ficha de contratación. Por cada ingeniero y ficha obtenido disminuye en 1 tu [PE] en 1.",
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
    "puntos_otros": null,
    "balance_pendiente": [
      "Los PI dependen de las fichas de contratación entregadas; no hay cantidad estimada."
    ],
    "copias": 1,
    "discos": 0,
    "bono": "[TJ] [CN]",
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
    "puntos": "0 [PV]",
    "puntos_carta": 0,
    "puntos_capas": 0,
    "puntos_ingenieros": 0,
    "puntos_otros": 0,
    "copias": 3,
    "discos": 0,
    "bono": "[IQ] [IE] [IS] [IM]",
    "disco_soporte": 0,
    "efecto": "Coloca hasta 1 [IQ] ingeniero químico, 1 [IE] ingeniero estructural, 1 [IS] ingeniero en sistemas y 1 [IM] ingeniero electromecánico de la reserva en tus barracas sin gastar fichas de contratación; por cada ingeniero obtenido disminuye en 1 tu [PE].",
    "destino": "completados",
    "etapas": [
      {
        "m": {
          "Ti": 2,
          "Al": 3,
          "Fe": 3,
          "Si": 4
        },
        "o": {
          "IE": 2,
          "IM": 2,
          "En": 3
        }
      },
      {
        "m": {
          "Si": 3,
          "Cu": 2,
          "Nd": 2
        },
        "o": {
          "IS": 2,
          "IQ": 1,
          "En": 5
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
    "puntos_capas": 0,
    "puntos_ingenieros": 0,
    "puntos_otros": 0,
    "copias": 1,
    "discos": 0,
    "bono": "",
    "disco_soporte": 0,
    "efecto": "Cada jugador (incluso tu) puede pagarte $5 para mover un [AI] ingeniero anclado de cualquier celda a esta carta\nMáximo uno por jugador por ronda.\nSi hay 4 o más ingenieros en esta carta, [QD] retira 1 disco propio de una celda de [ES] Estructura o [FV] Fotovoltaico y devuelve 4 ingenieros de esta carta a la reserva.\nNo puedes mover los ingeneiros de esta carta.",
    "etapas": [
      {
        "m": {
          "Fe": 8,
          "Al": 6,
          "Ti": 8,
          "Si": 8,
          "Nd": 2,
          "Er": 1
        },
        "o": {
          "IE": 2,
          "IM": 1,
          "IS": 1,
          "En": 4
        }
      },
      {
        "m": {},
        "o": {
          "En": 2
        }
      }
    ],
    "destino": "etapa:3"
  },

  // Producción
  {
    "id": "P090",
    "nombre": "Oficina de diseño",
    "tipo": "produccion",
    "puntos": "0 [PV]",
    "puntos_carta": 0,
    "puntos_capas": 0,
    "puntos_ingenieros": 0,
    "puntos_otros": 0,
    "copias": 1,
    "discos": 0,
    "bono": "? [CP]",
    "disco_soporte": 0,
    "efecto": "Todos los jugadores (incluso tu) pueden pagarte $3 para descartar cualquier cnatidad de [CP] cartas de proyecto de su mano y obtener 1 [CP] carta de proyecto de la reserva por cada carta descartada. Por cada jugador que los haga obtienes 1 [PI]. \n Puedes volver a colocar el cubo en la etapa 2.",
    "destino": "etapa:2",
    "etapas": [
      {
        "m": {
          "Fe": 4,
          "Cu": 2,
          "Si": 2
        },
        "o": {
          "IE": 1,
          "En": 2
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
    "bono": "? [CP]",
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
    "puntos_otros": 0,
    "copias": 2,
    "discos": 0,
    "bono": "+4 [RR]",
    "disco_soporte": 0,
    "efecto": "Obtén de la reserva hasta 4 [RR] tierras raras presentes en yacimientos revelados (aun si no tienen [LE] licencias). Por cada yacimiento ajeno utilizado, paga $5 a su propietario; no puede negarse. Puedes volver a colocar el cubo en la etapa 2.",
    "destino": "etapa:2",
    "etapas": [
      {
        "m": {
          "Ti": 3,
          "Cu": 2,
          "Si": 2,
          "Nd": 1,
          "Ce": 1
        },
        "o": {
          "IQ": 1,
          "En": 2
        }
      },
      {
        "m": {},
        "o": {
          "IQ": 2,
          "En": 4
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
    "bono": "[RQ]",
    "disco_soporte": 0,
    "efecto": "Elige: \n(1) coloca esta carta en proyectos completados; o \n(2) paga $6 para obtener 4 reactivos de tu elección y entrega esta carta al jugador de tu izquierda, que la incorpora a su mano sin costo.",
    "destino": "especial",
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
    "puntos_otros": 0,
    "copias": 6,
    "discos": 0,
    "bono": "+3 [Tr]",
    "disco_soporte": 0,
    "efecto": "Obtén 3 [Tr] Transporte de la reserva. Puedes devolver esta carta a tu mano.",
    "destino": "mano",
    "etapas": [
      {
        "m": {
          "Fe": 3,
          "Al": 2,
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
    "puntos_otros": 0,
    "copias": 1,
    "discos": 0,
    "bono": "+5 [Tr] [RE]",
    "disco_soporte": 0,
    "efecto": "Obtén 5 [Tr] Transporte de la reserva. Puedes volver a colocar el cubo en la etapa 3.",
    "destino": "etapa:3",
    "etapas": [
      {
        "m": {
          "Fe": 3,
          "Cu": 3,
          "Al": 2
        },
        "o": {
          "IE": 1,
          "En": 3
        }
      },
      {
        "m": {
          "Ti": 2,
          "Nd": 1,
          "Si": 3
        },
        "o": {
          "IM": 1,
          "IS": 1,
          "En": 3
        }
      },
      {
        "m": {
          "Cu": 2,
          "Si": 1
        },
        "o": {
          "IM": 1,
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
    "puntos_otros": 0,
    "copias": 1,
    "discos": 0,
    "bono": "+6 [Tr] [RE]",
    "disco_soporte": 0,
    "efecto": "Obtén 6 [Tr] Transporte de la reserva. Puedes volver a colocar el cubo en la etapa 3.",
    "destino": "etapa:3",
    "etapas": [
      {
        "m": {
          "Si": 5,
          "Cu": 3,
          "Er": 1
        },
        "o": {
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
          "IM": 1,
          "IS": 1,
          "En": 4
        }
      },
      {
        "m": {},
        "o": {
          "IS": 2,
          "En": 6
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
    "puntos_otros": 0,
    "copias": 1,
    "discos": 0,
    "bono": "+7 [Tr] [RE]",
    "disco_soporte": 0,
    "efecto": "Obtén 7 [Tr] Transporte de la reserva. Puedes volver a colocar el cubo en la etapa 3.",
    "destino": "etapa:3",
    "etapas": [
      {
        "m": {
          "Ti": 4,
          "Fe": 5,
          "C": 5
        },
        "o": {
          "IE": 2,
          "En": 4
        }
      },
      {
        "m": {
          "Cu": 4,
          "Nd": 2,
          "Al": 3
        },
        "o": {
          "IM": 2,
          "IS": 1,
          "En": 5
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
          "IM": 2,
          "En": 6
        }
      }
    ]
  },

  // Baterías
  {
    "id": "P001",
    "nombre": "Batería de gravedad sólida",
    "tipo": "bateria",
    "puntos": "0 [PV]",
    "puntos_carta": 0,
    "puntos_capas": 0,
    "puntos_ingenieros": 0,
    "puntos_otros": 0,
    "copias": 2,
    "discos": 0,
    "bono": "+1 [BT]",
    "disco_soporte": 0,
    "efecto": "Aumenta en 2 la energía máxima de tus [BT] Baterías.",
    "etapas": [
      {
        "m": {
          "Fe": 2,
          "Cu": 1,
          "Si": 2
        },
        "o": {
          "IM": 1
        }
      }
    ],
    "destino": "completados"
  },
  {
    "id": "P002",
    "nombre": "Batería de hidruro metálico",
    "tipo": "bateria",
    "puntos": "1 [PV]",
    "puntos_carta": 1,
    "puntos_capas": 0,
    "puntos_ingenieros": 0,
    "puntos_otros": 0,
    "copias": 4,
    "discos": 0,
    "bono": "+4 [BT]",
    "disco_soporte": 0,
    "efecto": "Aumenta en 4 la energía máxima de tus [BT] Baterías.",
    "etapas": [
      {
        "m": {
          "Fe": 2,
          "Cu": 3,
          "Ce": 1,
          "Al": 2,
          "Gd": 2
        },
        "o": {
          "IM": 1
        }
      }
    ],
    "destino": "completados"
  },
  {
    "id": "P003",
    "nombre": "Banco de supercondensadores",
    "tipo": "bateria",
    "puntos": "1 [PV]",
    "puntos_carta": 1,
    "puntos_capas": 0,
    "puntos_ingenieros": 0,
    "puntos_otros": 0,
    "copias": 2,
    "discos": 0,
    "bono": "+3 [BT]",
    "disco_soporte": 0,
    "efecto": "Aumenta en 3 la energía máxima de tus [BT] Baterías.",
    "etapas": [
      {
        "m": {
          "C": 8,
          "Al": 2,
          "Cu": 2,
          "Gd": 1
        },
        "o": {
          "IM": 2,
          "En": 1
        }
      }
    ],
    "destino": "completados"
  },
  {
    "id": "P004",
    "nombre": "Volante de inercia magnético",
    "tipo": "bateria",
    "puntos": "0 [PV]",
    "puntos_carta": 0,
    "puntos_capas": 0,
    "puntos_ingenieros": 0,
    "puntos_otros": 0,
    "copias": 2,
    "discos": 0,
    "bono": "+6 [BT]",
    "disco_soporte": 0,
    "efecto": "Aumenta en 6 la energía máxima de tus [BT] Baterías.",
    "etapas": [
      {
        "m": {
          "Fe": 5,
          "Ti": 2,
          "Cu": 2,
          "Nd": 3
        },
        "o": {
          "IM": 2,
          "En": 2
        }
      }
    ],
    "destino": "completados"
  },
  {
    "id": "P005",
    "nombre": "Acumulador térmico de grafito",
    "tipo": "bateria",
    "puntos": "2 [PV]",
    "puntos_carta": 2,
    "puntos_capas": 0,
    "puntos_ingenieros": 0,
    "puntos_otros": 0,
    "copias": 1,
    "discos": 0,
    "bono": "+3 [BT]",
    "disco_soporte": 0,
    "efecto": "Aumenta en 3 la energía máxima de tus [BT] Baterías.",
    "etapas": [
      {
        "m": {
          "C": 12,
          "Fe": 4,
          "Al": 3,
          "Si": 2
        },
        "o": {
          "IQ": 1,
          "IM": 1,
          "En": 2
        }
      }
    ],
    "destino": "completados"
  },

  // Generadores
  {
    "id": "P032",
    "nombre": "Paneles solares",
    "tipo": "generador",
    "puntos": "1 [PV]",
    "puntos_carta": 1,
    "puntos_capas": 0,
    "puntos_ingenieros": 0,
    "puntos_otros": 0,
    "copias": 4,
    "discos": 0,
    "bono": "+1 [PE]",
    "disco_soporte": 0,
    "efecto": "Aumenta en 1 tu [PE] producción de energía.\nPuedes devolver esta carta a tu mano.",
    "destino": "mano",
    "etapas": [
      {
        "m": {
          "Si": 3,
          "Al": 2,
          "Cu": 1
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
    "id": "P033",
    "nombre": "Generador de radioisótopos (RTG)",
    "tipo": "generador",
    "puntos": "1 [PV]",
    "puntos_carta": 1,
    "puntos_capas": 0,
    "puntos_ingenieros": 0,
    "puntos_otros": 0,
    "copias": 2,
    "discos": 0,
    "bono": "+1 [PE]",
    "disco_soporte": 0,
    "efecto": "Aumenta en 1 tu [PE] producción de energía.",
    "destino": "completados",
    "etapas": [
      {
        "m": {
          "Ti": 1,
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
    "puntos": "2 [PV]",
    "puntos_carta": 2,
    "puntos_capas": 0,
    "puntos_ingenieros": 0,
    "puntos_otros": 0,
    "copias": 2,
    "discos": 0,
    "bono": "+3 [PE]",
    "disco_soporte": 0,
    "efecto": "Aumenta en 3 tu [PE] producción de energía.",
    "destino": "completados",
    "etapas": [
      {
        "m": {
          "Al": 3,
          "Cu": 2,
          "Si": 2
        },
        "o": {
          "IE": 1,
          "IM": 1,
          "En": 2
        }
      },
      {
        "m": {
          "Fe": 2,
          "Ti": 1
        },
        "o": {
          "IM": 2,
          "En": 2
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
    "puntos_otros": 0,
    "copias": 1,
    "discos": 0,
    "bono": "+5 [PE]",
    "disco_soporte": 0,
    "efecto": "Aumenta en 5 tu [PE] producción de energía.",
    "destino": "completados",
    "etapas": [
      {
        "m": {
          "Ti": 2,
          "Al": 2,
          "Cu": 3
        },
        "o": {
          "IE": 2,
          "En": 3
        }
      },
      {
        "m": {
          "Si": 4,
          "Nd": 1,
          "Cu": 2,
          "Ti": 1
        },
        "o": {
          "IM": 2,
          "IQ": 1,
          "En": 4
        }
      }
    ]
  },

  // Mejoras de soporte externo
  {
    "id": "P036",
    "nombre": "Centro de telemarketing",
    "tipo": "mejora_soporte_externo",
    "puntos": "0 [PV]",
    "puntos_carta": 0,
    "puntos_capas": 0,
    "puntos_ingenieros": 0,
    "puntos_otros": 0,
    "copias": 1,
    "discos": 0,
    "bono": "+3 [Di] [MS]",
    "disco_soporte": 0,
    "efecto": "Cada ingeniero en Soporte externo genera $3 en lugar de $1. \nColoca esta carta a la derecha de tu zona de [SP]. Si ya tienes otra [MS] activa allí, muévela a proyectos completados. Esta [MS] entra en vigor inmediatamente.",
    "destino": "mejora",
    "etapas": [
      {
        "m": {
          "Si": 3,
          "Cu": 2
        },
        "o": {
          "IS": 1,
          "En": 1
        }
      }
    ]
  },
  {
    "id": "P037",
    "nombre": "Centro de investigación y tecnología",
    "tipo": "mejora_soporte_externo",
    "puntos": "0 [PV]",
    "puntos_carta": 0,
    "puntos_capas": 0,
    "puntos_ingenieros": 0,
    "puntos_otros": 0,
    "copias": 1,
    "discos": 0,
    "bono": "+1 [CP] [MS]",
    "disco_soporte": 0,
    "efecto": "Cada ingeniero en Soporte externo obtiene 1 carta de proyecto en lugar de $1. \nColoca esta carta a la derecha de tu zona de [SP]. Si ya tienes otra [MS] activa allí, muévela a proyectos completados. Esta [MS] entra en vigor inmediatamente.",
    "destino": "mejora",
    "etapas": [
      {
        "m": {
          "Si": 4,
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
    "id": "P038",
    "nombre": "Centro de expedición de cráteres",
    "tipo": "mejora_soporte_externo",
    "puntos": "0 [PV]",
    "puntos_carta": 0,
    "puntos_capas": 0,
    "puntos_ingenieros": 0,
    "puntos_otros": 0,
    "copias": 1,
    "discos": 0,
    "bono": "+1 Fe [MS]",
    "disco_soporte": 0,
    "efecto": "Cada ingeniero en Soporte externo obtiene 1 Fe en lugar de $1. \nColoca esta carta a la derecha de tu zona de [SP]. Si ya tienes otra [MS] activa allí, muévela a proyectos completados. Esta [MS] entra en vigor inmediatamente.",
    "destino": "mejora",
    "etapas": [
      {
        "m": {
          "Fe": 3,
          "Ti": 1,
          "Al": 2
        },
        "o": {
          "IE": 1,
          "En": 2
        }
      }
    ]
  },
  {
    "id": "P039",
    "nombre": "Caminadoras",
    "tipo": "mejora_soporte_externo",
    "puntos": "0 [PV]",
    "puntos_carta": 0,
    "puntos_capas": 0,
    "puntos_ingenieros": 0,
    "puntos_otros": 0,
    "copias": 1,
    "discos": 0,
    "bono": "+1 [En] [MS]",
    "disco_soporte": 0,
    "efecto": "Cada ingeniero en Soporte externo obtiene 1 [En] energía en lugar de $1. La energía que exceda la capacidad de tus baterías se pierde. \nColoca esta carta a la derecha de tu zona de [SP]. Si ya tienes otra [MS] activa allí, muévela a proyectos completados. Esta [MS] entra en vigor inmediatamente.",
    "destino": "mejora",
    "etapas": [
      {
        "m": {
          "Fe": 3,
          "Cu": 2,
          "C": 2
        },
        "o": {
          "IM": 1,
          "En": 1
        }
      }
    ]
  },
  {
    "id": "P040",
    "nombre": "Estación de coordinación orbital",
    "tipo": "mejora_soporte_externo",
    "puntos": "1 [PV] / [AI]",
    "puntos_carta": 0,
    "puntos_capas": 0,
    "puntos_ingenieros": 0,
    "puntos_otros": null,
    "balance_pendiente": [
      "La ganancia final depende del total de ingenieros anclados de todos los jugadores."
    ],
    "copias": 1,
    "discos": 0,
    "bono": "-$1 / [AI] [MS]",
    "disco_soporte": 0,
    "efecto": "Cada ingeniero en [SP] Soporte externo genera $1, como de costumbre. Debes pagar $1 por cada [AI] ingeniero anclado en la esfera de Dyson, de cualquier jugador. \nColoca esta carta a la derecha de tu área de [SP] Soporte externo. Si ya tienes otra [MS] activa allí, muévela a proyectos completados. Esta [MS] entra en vigor inmediatamente. \n[FJ] Gana 1 [PV] por cada [AI] ingeniero anclado de cualquier jugador.",
    "destino": "mejora",
    "etapas": [
      {
        "m": {
          "Ti": 5,
          "Al": 3,
          "Er": 2
        },
        "o": {
          "IE": 2,
          "En": 2,
          "Tr": 2
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
    "bono": "[RE] [DS] [ES]",
    "disco_soporte": 0,
    "efecto": "Coloca aquí 1 Fe de la reserva por cada ingeniero [AI] anclado en la esfera, de todos los jugadores e incluido el soporte. Luego puedes gastar 10 Fe de esta carta para colocar 1 disco en [ES] Estructura, con sus reglas normales (máximo 1 por activación). Conserva el Fe sobrante. Puedes volver a colocar el cubo en la etapa 2. Mientras esté en etapa 2, solo pueden entrar o salir recursos mediante este efecto.",
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
    "bono": "2 [DS]",
    "disco_soporte": 0,
    "efecto": "Coloca un disco en 2 celdas distintas de [ES] Estructura de un mismo cuadrante.",
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
    "id": "P008",
    "nombre": "Estructura de titanio",
    "tipo": "estructura",
    "puntos": "9 [PV]",
    "puntos_carta": 9,
    "puntos_capas": 0,
    "puntos_ingenieros": 0,
    "puntos_otros": 0,
    "copias": 3,
    "discos": 2,
    "bono": "2 [DS]",
    "disco_soporte": 0,
    "efecto": "Coloca un disco en 2 celdas distintas de [ES] Estructura de un mismo cuadrante.",
    "etapas": [
      {
        "m": {
          "Ti": 9
        },
        "o": {
          "IE": 2,
          "En": 2,
          "Tr": 2
        }
      }
    ],
    "destino": "completados"
  },
  {
    "id": "P009",
    "nombre": "Estructura de acero reforzado",
    "tipo": "estructura",
    "puntos": "5 [PV]",
    "puntos_carta": 5,
    "puntos_capas": 0,
    "puntos_ingenieros": 0,
    "puntos_otros": 0,
    "copias": 4,
    "discos": 1,
    "bono": "1 [DS]",
    "disco_soporte": 0,
    "efecto": "Coloca un disco en 1 celda de [ES] Estructura de un cuadrante.",
    "etapas": [
      {
        "m": {
          "Fe": 14,
          "C": 6,
          "Ti": 1
        },
        "o": {
          "IE": 2,
          "En": 2,
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
    "bono": "3 [DS]",
    "disco_soporte": 0,
    "efecto": "Coloca un disco en 3 celdas distintas de [ES] Estructura de un mismo cuadrante.",
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
    "bono": "3 [DS]",
    "disco_soporte": 0,
    "efecto": "Coloca un disco en 3 celdas distintas de [ES] Estructura de un mismo cuadrante.",
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
    "bono": "5 [DS]",
    "disco_soporte": 0,
    "efecto": "Coloca un disco en 5 celdas distintas de [ES] Estructura de un mismo cuadrante.",
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
    "id": "P013",
    "nombre": "Paneles fotovoltaicos de película delgada",
    "tipo": "fotovoltaico",
    "puntos": "5 [PV]",
    "puntos_carta": 5,
    "puntos_capas": 0,
    "puntos_ingenieros": 0,
    "puntos_otros": 0,
    "copias": 4,
    "discos": 1,
    "bono": "1 [DS]",
    "disco_soporte": 0,
    "efecto": "Coloca un disco en 1 celda de [FV] Fotovoltaica de un cuadrante.",
    "etapas": [
      {
        "m": {
          "Cu": 3,
          "Al": 4,
          "Si": 3
        },
        "o": {
          "IE": 1,
          "IM": 1,
          "En": 2,
          "Tr": 1
        }
      }
    ],
    "destino": "completados"
  },
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
    "bono": "3 [DS]",
    "disco_soporte": 0,
    "efecto": "Coloca un disco en 3 celdas distintas de [FV] Fotovoltaica de un mismo cuadrante.",
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
    "bono": "4 [DS]",
    "disco_soporte": 0,
    "efecto": "Coloca un disco en 4 celdas distintas de [FV] Fotovoltaica de un mismo cuadrante.",
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
    "bono": "3 [DS]",
    "disco_soporte": 0,
    "efecto": "Coloca un disco en 3 celdas distintas de [FV] Fotovoltaica de un mismo cuadrante.",
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
    "bono": "3 [DS]",
    "disco_soporte": 0,
    "efecto": "Coloca un disco en 3 celdas distintas de [FV] Fotovoltaica de un mismo cuadrante.",
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
    "puntos": "30 [PV]",
    "puntos_carta": 30,
    "puntos_capas": 0,
    "puntos_ingenieros": 0,
    "puntos_otros": 0,
    "copias": 1,
    "discos": 7,
    "bono": "7 [DS]",
    "disco_soporte": 0,
    "efecto": "Coloca un disco en 7 celdas distintas de [FV] Fotovoltaica de hasta dos cuadrantes.",
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
          "IQ": 1,
          "IS": 1,
          "En": 3,
          "Tr": 3
        }
      }
    ],
    "destino": "completados"
  },

  // Transmisión
  {
    "id": "P019",
    "nombre": "Red HVDC de cobre",
    "tipo": "transmision",
    "puntos": "0 [PV]",
    "puntos_carta": 0,
    "puntos_capas": 0,
    "puntos_ingenieros": 0,
    "puntos_otros": 0,
    "copias": 8,
    "discos": 1,
    "bono": "1 [DS]",
    "disco_soporte": 0,
    "efecto": "Coloca un disco en 1 celda de [TS] Transmisión.",
    "etapas": [
      {
        "m": {
          "Cu": 2,
          "Si": 1
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
    "id": "P020",
    "nombre": "Red HVDC ultraligera",
    "tipo": "transmision",
    "puntos": "0 [PV]",
    "puntos_carta": 0,
    "puntos_capas": 0,
    "puntos_ingenieros": 0,
    "puntos_otros": 0,
    "copias": 4,
    "discos": 2,
    "bono": "2 [DS]",
    "disco_soporte": 0,
    "efecto": "Coloca un disco en 2 celdas distintas de [TS] Transmisión de un mismo cuadrante.",
    "etapas": [
      {
        "m": {
          "Al": 4,
          "C": 3,
          "Si": 2
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
    "id": "P021",
    "nombre": "Red superconductora criogénica",
    "tipo": "transmision",
    "puntos": "15 [PV]",
    "puntos_carta": 15,
    "puntos_capas": 0,
    "puntos_ingenieros": 0,
    "puntos_otros": 0,
    "copias": 2,
    "discos": 3,
    "bono": "3 [DS]",
    "disco_soporte": 0,
    "efecto": "Coloca un disco en 3 celdas distintas de [TS] Transmisión de un mismo cuadrante. \nCada disco debe ser adyacente a una celda de [RF] Refrigeración que ya tenga un disco.",
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
    "bono": "6 [DS]",
    "disco_soporte": 0,
    "efecto": "Coloca un disco en 3 celdas distintas de [TS] Transmisión de un mismo cuadrante. \nLuego, coloca un disco en 1 celda de [RF] Refrigeración adyacente a cada una de ellas.",
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
    "bono": "3 [DS] 2 [DH]",
    "disco_soporte": 0,
    "efecto": "En un cuadrante sin discos en las celdas de [TS] Transmisión, coloca un disco en 3 celdas de [TS] Transmisión: la central y las dos extremas, con beneficios normales de colocación. Después, coloca un disco en las otras 2 celdas de [TS] Transmisión sin obtener bonificaciones de colocación.",
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
    "id": "P024",
    "nombre": "Radiadores térmicos de aluminio",
    "tipo": "refrigeracion",
    "puntos": "1 [PV]",
    "puntos_carta": 1,
    "puntos_capas": 0,
    "puntos_ingenieros": 0,
    "puntos_otros": 0,
    "copias": 5,
    "discos": 1,
    "bono": "1 [DS]",
    "disco_soporte": 0,
    "efecto": "Coloca un disco en 1 celda de [RF] Refrigeración.",
    "etapas": [
      {
        "m": {
          "Al": 3,
          "Cu": 1
        },
        "o": {
          "IM": 1,
          "Tr": 1
        }
      }
    ],
    "destino": "completados"
  },
  {
    "id": "P025",
    "nombre": "Red de tubos de calor",
    "tipo": "refrigeracion",
    "puntos": "1 [PV]",
    "puntos_carta": 1,
    "puntos_capas": 0,
    "puntos_ingenieros": 0,
    "puntos_otros": 0,
    "copias": 3,
    "discos": 2,
    "bono": "2 [DS]",
    "disco_soporte": 0,
    "efecto": "Coloca un disco en 2 celdas distintas de [RF] Refrigeración de un mismo cuadrante.",
    "etapas": [
      {
        "m": {
          "Cu": 3,
          "Al": 4
        },
        "o": {
          "IM": 2,
          "En": 1,
          "Tr": 1
        }
      }
    ],
    "destino": "completados"
  },
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
    "bono": "3 [DS]",
    "disco_soporte": 0,
    "efecto": "Coloca un disco en 3 celdas consecutivas de [RF] Refrigeración de un mismo cuadrante.",
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
    "bono": "4 [DS]",
    "disco_soporte": 0,
    "efecto": "Coloca un disco en 4 celdas distintas de [RF] Refrigeración de hasta 2 cuadrantes.",
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
    "bono": "6 [DS]",
    "disco_soporte": 0,
    "efecto": "Coloca un disco en 1 celda de [FV] Fotovoltaica, un disco en 1 celda de [RF] Refrigeración y un disco en 1 celda de [TS] Transmisión, todas de un mismo sector. Luego, repite en otro sector. \nSi en un sector no entran los 3 discos, se considera que no entra ninguno.",
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
  "discos": 4,
  "bono": "4 [DS]",
  "disco_soporte": 0,
  "efecto": "Coloca 1 disco en una celda libre de [RF] Refrigeración y otro en una celda libre de [MO] Microondas de un mismo sector. Repite el procedimiento en otro sector de un cuadrante distinto. Si el mapa tiene más de 3 cuadrantes, los cuadrantes elegidos no pueden ser adyacentes.",
  "etapas": [
    {
      "m": {
        "Si": 4,
        "Al": 3,
        "Fe": 3
      },
      "o": {
        "IM": 1,
        "En": 2
      }
    },
    {
      "m": {
        "Ti": 1,
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
  "destino": "completados"
},

  // Microondas
  {
    "id": "P029",
    "nombre": "Antena parabólica de microondas",
    "tipo": "microondas",
    "puntos": "4 [PV]",
    "puntos_carta": 4,
    "puntos_capas": 0,
    "puntos_ingenieros": 0,
    "puntos_otros": 0,
    "copias": 4,
    "discos": 1,
    "bono": "1 [DS] 2 [DH]",
    "disco_soporte": 0,
    "efecto": "Coloca 1 disco en [MO] Microondas. \nLuego, sin obtener bonos de colocación; coloca un disco en las celdas libres de [MO] Microondas adyacentes a la que colocaste inicialmente.",
    "etapas": [
      {
        "m": {
          "Al": 3,
          "Cu": 2,
          "Si": 4
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
    "bono": "4 [DS]",
    "disco_soporte": 0,
    "efecto": "Coloca un disco en 4 celdas distintas de [MO] Microondas: dos en un cuadrante y dos en otro cuadrante adyacente.",
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
    "bono": "3-5 [DS]",
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
  "discos": 1,
  "bono": "1 [DS] [RE]",
  "disco_soporte": 0,
  "efecto": "Si el nivel de [NC] cobertura de la capa [MO] Microondas es 2 o más, coloca 1 disco en una celda libre de [MO] Microondas de cualquier cuadrante. Puedes volver a colocar el cubo en la etapa 2.",
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
        "Fe": 5,
        "Ti": 2
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
    "bono": "1 [DP]",
    "disco_soporte": 1,
    "efecto": "Coloca un disco en una celda libre de [SN] Sensores de un área de soporte. \nLuego, pierde 2 [PI] por cada celda de [ES] Estructura sin disco en el mismo cuadrante.",
    "etapas": [
      {
        "m": {
          "Fe": 2,
          "Si": 4,
          "Cu": 4,
          "C": 8
        },
        "o": {
          "IE": 1,
          "IM": 2,
          "En": 3,
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
    "puntos": "1 [PV]",
    "puntos_carta": 1,
    "puntos_capas": 0,
    "puntos_ingenieros": 0,
    "puntos_otros": -2,
    "copias": 2,
    "discos": 0,
    "bono": "1 [DP]",
    "disco_soporte": 1,
    "efecto": "Coloca un disco en una celda libre de [SN] Sensores de un área de soporte. \nLuego, pierde 1 [PI] por cada celda de [ES] Estructura y cada celda [FV] Fotovoltaica sin disco en el mismo cuadrante.",
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
    "puntos": "0 [PV]",
    "puntos_carta": 0,
    "puntos_capas": 0,
    "puntos_ingenieros": 0,
    "puntos_otros": -5,
    "copias": 1,
    "discos": 0,
    "bono": "1 [DP]",
    "disco_soporte": 1,
    "efecto": "Coloca un disco en una celda libre de [SN] Sensores de un área de soporte. \nLuego, pierde 5 [PI] por cada espacio de [MN] Mantenimiento sin disco en esa misma área de soporte.",
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
    "puntos_otros": -5,
    "copias": 2,
    "discos": 0,
    "bono": "1 [DP]",
    "disco_soporte": 1,
    "efecto": "Coloca un disco en una celda libre de [SN] Sensores de un área de soporte. \nLuego, paga $3 por cada celda de [MO] Microondas sin disco, considerando todos los cuadrantes. Puedes pagar parcialmente; por cada $3 que no puedas pagar, pierde 1 PV.",
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
    "puntos": "25 [PV]",
    "puntos_carta": 25,
    "puntos_capas": 0,
    "puntos_ingenieros": -8,
    "puntos_otros": 0,
    "copias": 1,
    "discos": 0,
    "bono": "1 [DP]",
    "disco_soporte": 1,
    "efecto": "Coloca un disco y los ingenieros de la última etapa en una celda libre de [SN] Sensores de un área de soporte. \nConsulta la pérdida de puntos por personal anclado.",
    "etapas": [
      {
        "m": {
          "Ti": 4,
          "Cu": 7,
          "Si": 6
        },
        "o": {
          "IQ": 2,
          "IS": 1,
          "En": 3
        }
      },
      {
        "m": {
          "Al": 3,
          "Nd": 1,
          "Gd": 1
        },
        "o": {
          "AE": 1,
          "AM": 1,
          "En": 5,
          "Tr": 3
        }
      }
    ],
    "destino": "completados"
  },
  {
    "id": "P061",
    "nombre": "Red de interferometría láser",
    "tipo": "sensores",
    "puntos": "0 [PV]",
    "puntos_carta": 0,
    "puntos_capas": 0,
    "puntos_ingenieros": 0,
    "puntos_otros": -4,
    "copias": 1,
    "discos": 0,
    "bono": "1 [DP]",
    "disco_soporte": 1,
    "efecto": "Coloca un disco en una celda libre de [SN] Sensores de un área de soporte. \nLuego, pierde 2 [PI] por cada cuadrante que no tenga un disco en la celda de [SN] Sensores en su área de soporte.",
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
    "puntos": "-2 [PV] [/] [NC][TS]",
    "puntos_carta": 0,
    "puntos_capas": -4,
    "puntos_ingenieros": 0,
    "puntos_otros": 0,
    "balance_pendiente": [
      "Se estiman 2 niveles faltantes según el criterio indicado; nivel final 4 y máximo 5 dejarían solo 1. Confirmar este supuesto."
    ],
    "copias": 2,
    "discos": 0,
    "bono": "1 [DP]",
    "disco_soporte": 1,
    "efecto": "Coloca un disco en una celda libre de [SN] Sensores de un área de soporte.\n[FJ] Pierde 2 [PV] por cada [NC] nivel de cobertura que falte para alcanzar el máximo de 5 en [TS] Transmisión.",
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
    "puntos": "20 [PV]",
    "puntos_carta": 20,
    "puntos_capas": 0,
    "puntos_ingenieros": 0,
    "puntos_otros": 0,
    "copias": 1,
    "discos": 0,
    "bono": "1 [DP]",
    "disco_soporte": 1,
    "efecto": "Coloca un disco en una celda libre de [SN] Sensores de un área de soporte.",
    "etapas": [
      {
        "m": {
          "Si": 4,
          "Cu": 3,
          "Nd": 1
        },
        "o": {
          "IS": 1,
          "En": 3
        }
      },
      {
        "m": {
          "Ti": 1,
          "Fe": 1,
          "Gd": 1
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
    "id": "P064",
    "nombre": "Control autónomo por IA",
    "tipo": "control",
    "puntos": "+1 [PV] [/] [NC]",
    "puntos_carta": 0,
    "puntos_capas": 20,
    "puntos_ingenieros": 0,
    "puntos_otros": 0,
    "copias": 4,
    "discos": 0,
    "bono": "1 [DP]",
    "disco_soporte": 1,
    "efecto": "Coloca un disco en una celda libre de [CO] Control de un área de soporte.\n[FJ] Gana 2 [PV] por cada [NC] nivel de todas las capas [ES] [FV] [TS] [RF] [MO].",
    "etapas": [
      {
        "m": {
          "Nd": 1,
          "Fe": 3,
          "Gd": 1,
          "Al": 4,
          "Cu": 3,
          "Si": 3
        },
        "o": {
          "IS": 3,
          "IE": 1,
          "IQ": 1,
          "En": 5
        }
      },
      {
        "m": {
          "Al": 4,
          "Cu": 3,
          "Er": 1,
          "Si": 3,
          "Ti": 2,
          "Nd": 1
        },
        "o": {
          "IS": 2,
          "En": 5,
          "Tr": 3
        }
      }
    ],
    "destino": "completados"
  },
  {
    "id": "P065",
    "nombre": "Centro de supervisión orbital",
    "tipo": "control",
    "puntos": "0 [PV]",
    "puntos_carta": 0,
    "puntos_capas": 0,
    "puntos_ingenieros": -4,
    "puntos_otros": +6,
    "copias": 1,
    "discos": 0,
    "bono": "1 [DP]",
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
          "Ti": 3,
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
    "puntos_ingenieros": -8,
    "puntos_otros": 0,
    "copias": 1,
    "discos": 0,
    "bono": "1 [DP]",
    "disco_soporte": 1,
    "efecto": "Coloca un disco y los ingenieros de la última etapa en una celda libre de [CO] Control de un área de soporte. \nConsulta la pérdida de puntos por personal anclado.",
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
          "En": 4
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
          "AS": 1,
          "En": 4,
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
    "puntos": "20 [PV]",
    "puntos_carta": 20,
    "puntos_capas": 0,
    "puntos_ingenieros": -12,
    "puntos_otros": 0,
    "copias": 1,
    "discos": 0,
    "bono": "1 [DP]",
    "disco_soporte": 1,
    "efecto": "Coloca un disco y los ingenieros de la última etapa en una celda libre de [CO] Control de un área de soporte. \nConsulta la pérdida de puntos por personal anclado.",
    "etapas": [
      {
        "m": {
          "Al": 4,
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
          "Ti": 2,
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
    "puntos_otros": 10,
    "copias": 1,
    "discos": 0,
    "bono": "1 [DP]",
    "disco_soporte": 1,
    "efecto": "Coloca un disco y los ingenieros de la última etapa en una celda libre de [CO] Control de un área de soporte. \nConsulta la pérdida de puntos por personal anclado. \n[FJ] Gana 1 [PV] por cada [DP] disco de cualquier jugador en cualquier área de soporte.",
    "etapas": [
      {
        "m": {
          "Fe": 5,
          "Cu": 4,
          "Er": 2
        },
        "o": {
          "IE": 1,
          "IM": 1,
          "En": 3
        }
      },
      {
        "m": {
          "Gd": 2,
          "Cu": 3,
          "Ti": 4
        },
        "o": {
          "AE": 1,
          "En": 4,
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
    "discos": 1,
    "bono": "1 [DP]",
    "disco_soporte": 1,
    "efecto": "Coloca un disco en una celda libre de [CO] Control de un área de soporte y un disco en una celda libre de [MO] Microondas del mismo cuadrante.",
    "etapas": [
      {
        "m": {
          "Ti": 4,
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
    "puntos": "-2 [PV]",
    "puntos_carta": -2,
    "puntos_capas": 0,
    "puntos_ingenieros": -4,
    "puntos_otros": 0,
    "copias": 1,
    "discos": 0,
    "bono": "1 [DP]",
    "disco_soporte": 1,
    "efecto": "Coloca un disco y el ingeniero de la última etapa en una celda libre de [CO] Control de un área de soporte. \nConsulta la pérdida de puntos por personal anclado.",
    "etapas": [
      {
        "m": {
          "Al": 2,
          "Fe": 3,
          "Cu": 4
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
    "puntos": "3 [PV] [/] [NC] [MO]",
    "puntos_carta": 0,
    "puntos_capas": 12,
    "puntos_ingenieros": 0,
    "puntos_otros": 0,
    "copias": 1,
    "discos": -1,
    "bono": "1 [DP] + [QD][MO]",
    "disco_soporte": 1,
    "efecto": "[QD] Retira un disco de cualquier celda de [MO] Microondas para colocar un disco en una celda libre de [CO] Control en el área de soporte del mismo cuadrante.\n[FJ] Gana 3 [PV] por cada [NC] nivel de [MO] Microondas.\nConsulta la pérdida de puntos por personal anclado.",
    "etapas": [
      {
        "m": {
          "Al": 5,
          "Nd": 2,
          "Fe": 2
        },
        "o": {
          "IS": 2,
          "IQ": 1,
          "En": 2
        }
      },
      {
        "m": {
          "Ti": 1,
          "Si": 4,
          "Ce": 2
        },
        "o": {
          "MO": 1,
          "IS": 1,
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
    "puntos": "3 [PV] [/] [NC] [ES]",
    "puntos_carta": 0,
    "puntos_capas": 12,
    "puntos_ingenieros": -8,
    "puntos_otros": 0,
    "copias": 1,
    "discos": -1,
    "bono": "1 [DP] + [QD][ES]",
    "disco_soporte": 1,
    "efecto": "[QD] Retira un disco de cualquier celda de [ES] Estructura para colocar un disco en una celda libre de [MN] Mantenimiento en el área de soporte del mismo cuadrante.\n[FJ] Gana 3 [PV] por cada [NC] nivel de [ES] Estructura.\nConsulta la pérdida de puntos por personal anclado.",
    "etapas": [
      {
        "m": {
          "Fe": 2,
          "Ti": 4
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
    "puntos_otros": 0,
    "copias": 3,
    "discos": -1,
    "bono": "1 [DP] + [QD][FV]",
    "disco_soporte": 1,
    "efecto": "[QD] Retira un disco de cualquier celda de [FV] Fotovoltaica para colocar un disco en una celda libre de [MN] Mantenimiento en el área de soporte del mismo cuadrante.\nConsulta la pérdida de puntos por personal anclado.",
    "etapas": [
      {
        "m": {
          "Fe": 2,
          "Ti": 2,
          "Al": 1,
          "Cu": 2
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
    "puntos": "+2 [PV] / [AI]",
    "puntos_carta": 0,
    "puntos_capas": 0,
    "puntos_ingenieros": 0,
    "puntos_otros": 20,
    "copias": 1,
    "discos": 0,
    "bono": "1 [DH]",
    "disco_soporte": 0,
    "efecto": "Coloca un disco en una celda libre de [MN] Mantenimiento sin cobrar los bonos por colocación.\n[FJ] Gana 2 [PV] por [AI] ingeniero anclado de cualquier jugador.",
    "etapas": [
      {
        "m": {
          "Ti": 3,
          "Al": 3,
          "Fe": 3,
          "Cu": 2,
          "Si": 2
        },
        "o": {
          "IE": 1,
          "IS": 1,
          "IQ": 1,
          "En": 3
        }
      },
      {
        "m": {
          "Ti": 3,
          "Al": 3,
          "Cu": 2,
          "Si": 2
        },
        "o": {
          "IE": 1,
          "En": 3,
          "Tr": 3
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
    "puntos_otros": 12,
    "copias": 1,
    "discos": 0,
    "bono": "1 [DH]",
    "disco_soporte": 0,
    "efecto": "Coloca un disco en una celda libre de [MN] Mantenimiento sin cobrar bonos de colocación.\nLuego retira hasta 4 [AI] ingenieros anclados de cualquier número de celdas y devuélvelos a la reserva de ingenieros correspondiente.",
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
    "puntos": "3 [PV] [/] [NC] [RF]",
    "puntos_carta": 0,
    "puntos_capas": 12,
    "puntos_ingenieros": -4,
    "puntos_otros": 0,
    "copias": 1,
    "discos": -1,
    "bono": "1 [DP] + [QD][RF]",
    "disco_soporte": 1,
    "efecto": "[QD] Retira un disco de cualquier celda de [RF] Refrigeración para colocar un disco en una celda libre de [MN] Mantenimiento en el área de soporte del mismo cuadrante.\n[FJ] Gana 3 [PV] por cada [NC] nivel de [RF] Refrigeración.\nConsulta la pérdida de puntos por personal anclado.",
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
          "RF": 1,
          "AQ": 1,
          "Tr": 3
        }
      }
    ],
    "destino": "completados"
  },
  {
    "id": "P077",
    "nombre": "Núcleo de estabilización multifísica",
    "tipo": "mantenimiento",
    "puntos": "15 [PV]",
    "puntos_carta": 15,
    "puntos_capas": 0,
    "puntos_ingenieros": 0,
    "puntos_otros": 0,
    "copias": 1,
    "discos": -3,
    "bono": "1 [DP] + 3[QD]",
    "disco_soporte": 1,
    "efecto": "[QD] Retira un disco de [ES] Estructura, uno de [TS] Transmisión y uno de [RF] Refrigeración de un mismo sector para colocar un disco en una celda libre de [MN] Mantenimiento del mismo cuadrante.",
    "etapas": [
      {
        "m": {
          "Cu": 4,
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
    "puntos": "-1 [PV] [/] [NC] [ES]",
    "puntos_carta": 0,
    "puntos_capas": -6,
    "puntos_ingenieros": -8,
    "puntos_otros": -2,
    "copias": 1,
    "discos": 2,
    "bono": "2 [DP] 2 [DS]",
    "disco_soporte": 2,
    "efecto": "Coloca 1 disco en una celda libre de [MN] Mantenimiento y 1 disco en una celda libre de [ES] Estructura, del mismo cuadrante y luego haz lo mismo en otro cuadrante. Si el mapa tiene más de 3 cuadrantes, estos no pueden ser adyacentes.\n[FJ] Pierde 1 [PV] por cada [NC] nivel de cobertura que falte para alcanzar el máximo de 5 en [ES] Estructura.",
    "etapas": [
      {
        "m": {
          "Gd": 1,
          "Cu": 2,
          "Si": 4
        },
        "o": {
          "En": 4
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
          "Tr": 2
        }
      }
    ],
    "destino": "completados"
  },
  {
    "id": "P079",
    "nombre": "Detección y ablación láser de micrometeoritos",
    "tipo": "mantenimiento",
    "puntos": "3 [PV] [/] [NC] [MO]",
    "puntos_carta": 0,
    "puntos_capas": 12,
    "puntos_ingenieros": -8,
    "puntos_otros": 0,
    "copias": 1,
    "discos": 2,
    "bono": "1 [DP] 2 [DS]",
    "disco_soporte": 1,
    "efecto": "Coloca 1 disco en una celda libre de [MN] Mantenimiento de un área de soporte y un disco en cada una de 2 celdas libres de [MO] Microondas de otro cuadrante. \n[FJ] Gana 3 [PV] por cada [NC] nivel de cobertura de [MO] Microondas.\nConsulta la pérdida de puntos por personal anclado.",
    "etapas": [
      {
        "m": {
          "Si": 5,
          "Cu": 4,
          "Nd": 2
        },
        "o": {
          "En": 3
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
          "Tr": 2
        }
      }
    ],
    "destino": "completados"
  },
  {
    "id": "P080",
    "nombre": "Plataforma de reparaciones sobre rieles",
    "tipo": "mantenimiento",
    "puntos": "10 [PV]",
    "puntos_carta": 10,
    "puntos_capas": 0,
    "puntos_ingenieros": -8,
    "puntos_otros": -2,
    "copias": 1,
    "discos": 2,
    "bono": "2 [DP]",
    "disco_soporte": 2,
    "efecto": "Coloca un disco en cada una de las 2 celdas libres de [MN] Mantenimiento de una misma área de soporte y los ingenieros de la última etapa junto a cualquiera de ellos.\nLuego pierde 1 [PI] por cada celda sin disco de [ES] Estructura en ese cuadrante.\nConsulta la pérdida de puntos por personal anclado.",
    "etapas": [
      {
        "m": {
          "Fe": 8,
          "Al": 3,
          "Ti": 4
        },
        "o": {
          "IE": 2,
          "En": 3
        }
      },
      {
        "m": {
          "Fe": 3,
          "Cu": 6,
          "Nd": 3
        },
        "o": {
          "Tr": 2,
          "AE": 2
        }
      }
    ],
    "destino": "completados"
  },
  {
    "id": "P081",
    "nombre": "Drones de inspección autónoma",
    "tipo": "mantenimiento",
    "puntos": "2 [PV]",
    "puntos_carta": 2,
    "puntos_capas": 0,
    "puntos_ingenieros": 0,
    "puntos_otros": 0,
    "copias": 2,
    "discos": 0,
    "bono": "1 [DP]",
    "disco_soporte": 1,
    "efecto": "Coloca 1 disco en una celda libre de [MN] Mantenimiento de un área de soporte.",
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
          "Cu": 3,
          "Ti": 2,
          "C": 2
        },
        "o": {
          "En": 1,
          "Tr": 1,
          "IS": 1
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
    "discos": -2,
    "bono": "2 [DP]",
    "disco_soporte": 2,
    "efecto": "[QD] Retira un disco de cualquier celda de [ES] Estructura para colocar un disco en una celda libre de [MN] Mantenimiento en el área de soporte del mismo cuadrante. Repite este procedimiento en un cuadrante distinto y coloca los ingenieros de la última etapa junto a cualquiera de ellos. Si el mapa tiene 3 cuadrantes o más, ambos cuadrantes no pueden ser adyacentes.\nConsulta la pérdida de puntos por personal anclado.",
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
    "puntos": "5 [PV]",
    "puntos_carta": 5,
    "puntos_capas": 0,
    "puntos_ingenieros": -12,
    "puntos_otros": 0,
    "copias": 5,
    "discos": 0,
    "bono": "1 [DP]",
    "disco_soporte": 1,
    "efecto": "Coloca 1 disco en una celda libre de [MN] Mantenimiento de un área de soporte, junto con los 3 ingenieros anclados de la última etapa.\nConsulta la pérdida de puntos por personal anclado.",
    "etapas": [
      {
        "m": {
          "Fe": 4,
          "Ti": 2
        },
        "o": {
          "AE": 1,
          "AM": 1,
          "AS": 1,
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
