window.modulos = [
{
    "id": "P049",
    "descripcion": "Reactor que aprovecha el calor de la fusión de núcleos ligeros para generar electricidad.",
    "revisada": 0,
    "tecnica_requiere": ["NUC"],
    "tecnica_otorga": [],
    "tecnica_tokens": 1,

    "nombre": "Centro de fusión nuclear",
    "tipo": "economia",
    "puntos": "20 [PV]",
    "puntos_carta": 20,
    "puntos_capas": 0,
    "puntos_ingenieros": 0,
    "puntos_otros": 18,
    "copias": 1,
    "discos": 0,
    "bono": "[TJ] +3 [En] [=] +1 [PI] [OP]",
    "disco_soporte": 0,
    "efecto": "Todos los jugadores obtienen 3 [En] energía, no pueden negarse. Ganas 1 [PI] por cada oponente hasta un maximo de 4 [PI]. \nPuedes volver a colocar el cubo en la etapa 2.\nObten 1 [FT] ficha de técnica.",
    "destino": "etapa:2",
    "etapas": [
      {
        "m": {
          "Cu": 4,
          "Fe": 4,
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
          "Gd": 1
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
  {
    "id": "P033",
    "descripcion": "Lentes o espejos enfocan luz solar sobre celdas fotovoltaicas de alto rendimiento.",
    "revisada": 1,
    "tecnica_requiere": ["FOT"],
    "tecnica_otorga": ["FOT"],
    "tecnica_tokens": 1,
    "nombre": "Sistema fotovoltaico de concentración",
    "tipo": "fotovoltaico",
    "puntos": "15 [PV]",
    "puntos_carta": 15,
    "puntos_capas": 0,
    "puntos_ingenieros": 0,
    "puntos_otros": 0,
    "copias": 1,
    "discos": 4,
    "bono": "1-4 [DS][FV] [=][QU]",
    "disco_soporte": 0,
    "efecto": "Coloca un disco en cada celda libre de [FV] Fotovoltaica de un cuadrante.\nObten 1 [FT] ficha de técnica.",
    "etapas": [
      {
        "m": {
          "Al": 7,
          "Ti": 1,
          "Si": 4
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
          "Si": 5
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
    "id": "P034",
    "descripcion": "Capas semiconductoras aprovechan distintas partes del espectro solar en una misma celda.",
    "revisada": 1,
    "tecnica_requiere": ["FOT","MAT","MIN"],
    "tecnica_otorga": ["FOT"],
    "tecnica_tokens": 1,
    "nombre": "Células solares multiunión",
    "tipo": "fotovoltaico",
    "puntos": "15 [PV]",
    "puntos_carta": 15,
    "puntos_capas": 0,
    "puntos_ingenieros": 0,
    "puntos_otros": 0,
    "copias": 3,
    "discos": 4,
    "bono": "4 [DS][FV][AD] [=][QU]",
    "disco_soporte": 0,
    "efecto": "Coloca un disco en 4 celdas libres de [FV] Fotovoltaica adyacentes de un cuadrante.\nObten 1 [FT] ficha de técnica.",
    "etapas": [
      {
        "m": {
          "Si": 5,
          "Cu": 2,
          "Gd": 1
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
          "Al": 4
        },
        "o": {
          "IM": 1,
          "En": 3,
          "Tr": 2
        }
      }
    ],
    "destino": "completados"
  },
  {
    "id": "P054",
    "descripcion": "Centro que coordina energía, transporte y mantenimiento entre sectores.",
    "revisada": 1,
    "tecnica_requiere": ["DAT","PRE","HAB"],
    "tecnica_otorga": ["HAB"],
    "tecnica_tokens": 2,

    "nombre": "Centro de coordinación integral",
    "tipo": "control",
    "puntos": "1 [PV] [/] [DP]",
    "puntos_carta": 10,
    "puntos_capas": 0,
    "puntos_ingenieros": -4,
    "puntos_otros": 0,
    "copias": 1,
    "discos": 0,
    "bono": "2 [DP][CO]",
    "disco_soporte": 2,
    "efecto": "Coloca un disco en 2 celdas libres de [CO] Control de dos áreas de soporte distintas. Coloca el ingeniero de la última etapa junto a cualquiera de los discos colocados. \nConsulta la pérdida de puntos por personal anclado. \n[FJ] Gana 1 [PV] por cada [DP] disco de cualquier jugador en cualquier área de soporte.\nObten 2 [FT] fichas de técnica.",
    "etapas": [
      {
        "m": {
          "Fe": 5,
          "Cu": 5,
          "Er": 2
        },
        "o": {
          "IE": 1,
          "En": 2
        }
      },
      {
        "m": {
          "Cu": 5,
          "Al": 2
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
    "id": "P061",
    "descripcion": "Taller móvil que lleva repuestos y herramientas por rieles hasta las zonas dañadas.",
    "revisada": 1,
    "tecnica_requiere": ["HAB", "PRE", "ELE"],
    "tecnica_otorga": ["FAB"],
    "tecnica_tokens": 1,

    "nombre": "Plataforma de reparaciones sobre rieles",
    "tipo": "mantenimiento",
    "puntos": "15 [PV]",
    "puntos_carta": 15,
    "puntos_capas": 0,
    "puntos_ingenieros": -8,
    "puntos_otros": -2,
    "copias": 1,
    "discos": 0,
    "bono": "4 [DP][MN] [=] 2 [QU] \n -1 [PI] [ES][QU]",
    "disco_soporte": 4,
    "efecto": "Coloca un disco en 4 celdas libres de [MN] Mantenimiento de dos áreas de soporte, 2 en cada una, y los ingenieros de la última etapa junto a cualquiera de ellos.\nLuego pierde 1 [PI] por cada celda sin disco de [ES] Estructura en esos dos cuadrantes.\nConsulta la pérdida de puntos por personal anclado.\nObten 1 [FT] ficha de técnica.",
    "etapas": [
      {
        "m": {
          "Fe": 5,
          "Al": 5,
          "Ti": 5
        },
        "o": {
          "IE": 2,
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
          "Tr": 2,
          "AE": 2,
          "En": 2 
        }
      }
    ],
    "destino": "completados"
  },
  {
    "id": "P054",
    "descripcion": "Estación planetaria que impulsa vehículos equipados con velas mediante haces láser.",
    "revisada": 0,
    "tecnica_requiere": ["FOT","PROP"],
    "tecnica_otorga": [],
    "tecnica_tokens": 1,

    "nombre": "Estación planetaria de propulsión por láser dirigido",
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
    "efecto": "Obtén 6 [Tr] Transporte de la reserva. \nPuedes volver a colocar el cubo en la etapa 2.\nObten 1 [FT] ficha de técnica.",
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
    "id": "P012",
    "descripcion": "Entramado de nanotubos de carbono diseñado para soportar cargas con muy poca masa.",
    "revisada": 0,
    "tecnica_requiere": ["NANO"],
    "tecnica_otorga": ["NANO","MAT"],
    "tecnica_tokens": 1,

    "nombre": "Estructura de nanotubos de carbono",
    "tipo": "estructura",
    "puntos": "5 [PV]",
    "puntos_carta": 5,
    "puntos_capas": 0,
    "puntos_ingenieros": 0,
    "puntos_otros": 0,
    "copias": 1,
    "discos": 8,
    "bono": "8 [DS][ES]",
    "disco_soporte": 0,
    "efecto": "Coloca un disco en 8 celdas libres de [ES] Estructura.\nObten 1 [FT] ficha de técnica.",
    "etapas": [
      {
        "m": {
          "C": 6,
          "Nd": 1
        },
        "o": {
          "IQ": 1,
          "En": 2
        }
      },
      {
        "m": {
          "C": 6,
          "Al": 2
        },
        "o": {
          "IQ": 1,
          "En": 2
        }
      },
      {
        "m": {
          "C": 6
        },
        "o": {
          "IE": 1,
          "IS": 1,
          "En": 3,
          "Tr": 2
        }
      }
    ],
    "destino": "completados"
  },
  {
    "id": "P015",
    "descripcion": "Celdas de película delgada que usan perovskitas para absorber la luz solar.",
    "revisada": 0,
    "tecnica_requiere": [],
    "tecnica_otorga": ["FOT"],
    "tecnica_tokens": 1,

    "nombre": "Células solares de perovskita",
    "tipo": "fotovoltaico",
    "puntos": "10 [PV]",
    "puntos_carta": 10,
    "puntos_capas": 0,
    "puntos_ingenieros": 0,
    "puntos_otros": 0,
    "copias": 1,
    "discos": 8,
    "bono": "8 [DS][FV] [=<]3[QU][AD]",
    "disco_soporte": 0,
    "efecto": "Coloca un disco en 8 celdas libres de [FV] Fotovoltaica de hasta 3 cuadrantes adyacentes.\nObten 1 [FT] ficha de técnica.",
    "etapas": [
      {
        "m": {
          "Si": 11,
          "C": 12,
          "Al": 6
        },
        "o": {
          "IQ": 2,
          "En": 3
        }
      },
      {
        "m": {
          "Cu": 6,
          "Si": 4
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
    "id": "P018",
    "descripcion": "Celdas de arseniuro de galio que convierten luz solar en electricidad con alta eficiencia.",
    "revisada": 0,
    "tecnica_requiere": ["FOT"],
    "tecnica_otorga": ["FOT"],
    "tecnica_tokens": 1,

    "nombre": "Células solares de arseniuro de galio",
    "tipo": "fotovoltaico",
    "puntos": "10 [PV]",
    "puntos_carta": 10,
    "puntos_capas": 0,
    "puntos_ingenieros": 0,
    "puntos_otros": 0,
    "copias": 1,
    "discos": 7,
    "bono": "1-8 [DS][FV] [=<]2[QU][AD]",
    "disco_soporte": 0,
    "efecto": "Coloca un disco en cada celda libre de [FV] Fotovoltaica de hasta dos cuadrantes adyacentes.\nObten 1 [FT] ficha de técnica.",
    "etapas": [
      {
        "m": {
          "Ti": 2,
          "Si": 5,
          "Nd": 1,
          "Ce": 1
        },
        "o": {
          "IQ": 2,
          "IM": 1,
          "En": 2
        }
      },
      {
        "m": {
          "Si": 5,
          "Cu": 2,
          "Al": 2,
          "Nd": 1
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
    "id": "P069",
    "descripcion": "Sistema ficticio de mando remoto inspirado en la transferencia de estados cuánticos.",
    "revisada": 0,
    "tecnica_requiere": ["CUA"],
    "tecnica_otorga": ["CUA","SEN"],
    "tecnica_tokens": 1,

    "nombre": "Control remoto por teletransportación cuántica",
    "tipo": "control",
    "puntos": "10 [PV]",
    "puntos_carta": 10,
    "puntos_capas": 0,
    "puntos_ingenieros": 0,
    "puntos_otros": 0,
    "copias": 1,
    "discos": 3,
    "bono": "1 [DP][CO] + 3 [DS][MO] [=] [QU]",
    "disco_soporte": 1,
    "efecto": "Coloca un disco en una celda libre de [CO] Control de un área de soportey un disco en 3 celdas libres de [MO] Microondas del mismo cuadrante.\nObten 1 [FT] ficha de técnica.",
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
          "Al": 3,
          "Er": 1,
          "Si": 2
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
    "id": "P075",
    "descripcion": "Jardines que regulan luz, temperatura y riego para sostener su propio microclima.",
    "revisada": 0,
    "tecnica_requiere": [],
    "tecnica_otorga": ["BIO","IA"],
    "tecnica_tokens": 1,

    "nombre": "Jardines bioclimáticos inteligentes",
    "tipo": "mantenimiento",
    "puntos": "10 [PV]",
    "puntos_carta": 10,
    "puntos_capas": 0,
    "puntos_ingenieros": 0,
    "puntos_otros": 20,
    "copias": 1,
    "discos": 0,
    "bono": "2 [DH][MN] [=][QU] - 5 [AI]",
    "disco_soporte": 0,
    "efecto": "Coloca un disco en 2 celdas libres de [MN] Mantenimiento sin cobrar bonos de colocación.\nLuego retira hasta 5 [AI] ingenieros anclados de cualquier número de celdas y devuélvelos a la reserva de ingenieros correspondiente.\nObten 1 [FT] ficha de técnica.",
    "etapas": [
      {
        "m": {
          "Ti": 2,
          "Al": 2,
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
          "Cu": 2,
          "Nd": 1,
          "Si": 1,
          "Er": 1
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
    "id": "P060",
    "descripcion": "Instrumentos que miden la densidad, energía y composición de las partículas solares.",
    "revisada": 0,
    "tecnica_requiere": [],
    "tecnica_otorga": ["SEN"],
    "tecnica_tokens": 1,

    "nombre": "Analizadores de plasma solar",
    "tipo": "sensores",
    "puntos": "10 [PV]",
    "puntos_carta": 10,
    "puntos_capas": 0,
    "puntos_ingenieros": -4,
    "puntos_otros": 0,
    "copias": 1,
    "discos": 0,
    "bono": "2 [DP][SN]",
    "disco_soporte": 2,
    "efecto": "Coloca un disco en 2 celdas libres de [SN] Sensores de dos áreas de soporte distintas. Coloca el ingeniero de la última etapa junto a cualquiera de los discos colocados. \nConsulta la pérdida de puntos por personal anclado.\nObten 1 [FT] ficha de técnica.",
    "etapas": [
      {
        "m": {
          "Ti": 2,
          "Cu": 4,
          "Si": 5
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
    "id": "P078",
    "descripcion": "Sensores detectan actividad solar y activan la protección de sectores expuestos.",
    "revisada": 0,
    "tecnica_requiere": [],
    "tecnica_otorga": ["MAT"],
    "tecnica_tokens": 1,

    "nombre": "Anticipación y blindaje contra llamaradas solares",
    "tipo": "mantenimiento",
    "puntos": "20 [PV]",
    "puntos_carta": 20,
    "puntos_capas": 0,
    "puntos_ingenieros": -8,
    "puntos_otros": -2,
    "copias": 1,
    "discos": 4,
    "bono": "4 [DP][MN] 4[DS][ES] [=]2[QU]",
    "disco_soporte": 4,
    "efecto": "Coloca un disco en 4 celdas libres de [MN] Mantenimiento y un disco en 4 celdas libres de [ES] Estructura de dos cuadrantes, 2 de cada tipo en cada cuadrante. Si el mapa tiene más de 3 cuadrantes, estos no pueden ser adyacentes.\nConsulta la pérdida de puntos por personal anclado.\nObten 1 [FT] ficha de técnica.",
    "etapas": [
      {
        "m": {
          "Gd": 3,
          "Cu": 6,
          "Si": 11
        },
        "o": {
          "IQ": 2,
          "IS": 1,
          "En": 2
        }
      },
      {
        "m": {
          "Ti": 8,
          "Al": 3,
          "Nd": 3
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
    "descripcion": "Sensores rastrean micrometeoritos y un láser vaporiza parte de su superficie para desviarlos.",
    "revisada": 0,
    "tecnica_requiere": ["FOT"],
    "tecnica_otorga": ["FOT"],
    "tecnica_tokens": 1,

    "nombre": "Detección y ablación láser de micrometeoritos",
    "tipo": "mantenimiento",
    "puntos": "20 [PV]",
    "puntos_carta": 20,
    "puntos_capas": 0,
    "puntos_ingenieros": -8,
    "puntos_otros": 0,
    "copias": 1,
    "discos": 4,
    "bono": "2 [DP][MN]  [=][QU] \n 1-4 [DS][MO] [=][QU]",
    "disco_soporte": 2,
    "efecto": "Coloca un disco en 2 celdas libres de [MN] Mantenimiento de un área de soporte y un disco en cada celda libre de [MO] Microondas de otro cuadrante.\nConsulta la pérdida de puntos por personal anclado.\nObten 1 [FT] ficha de técnica.",
    "etapas": [
      {
        "m": {
          "Si": 10,
          "Cu": 7,
          "Nd": 4
        },
        "o": {
          "IM": 1,
          "IS": 1,
          "En": 2
        }
      },
      {
        "m": {
          "Ti": 2,
          "Al": 6,
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
    "id": "P074",
    "descripcion": "Instalación con equipos adaptados al ejercicio y al descanso en microgravedad.",
    "revisada": 0,
    "tecnica_requiere": [],
    "tecnica_otorga": ["HAB"],
    "tecnica_tokens": 1,

    "nombre": "Gimnasio y spa de gravedad cero",
    "tipo": "mantenimiento",
    "puntos": "2 [PV] [/] [AI]",
    "puntos_carta": 0,
    "puntos_capas": 0,
    "puntos_ingenieros": 0,
    "puntos_otros": 20,
    "copias": 1,
    "discos": 0,
    "bono": "2 [DH][MN]",
    "disco_soporte": 0,
    "efecto": "Coloca un disco en 2 celdas libres de [MN] Mantenimiento sin cobrar bonos de colocación.\n[FJ] Gana 2 [PV] por [AI] ingeniero anclado de cualquier jugador.\nObten 1 [FT] ficha de técnica.",
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
    "id": "P040",
    "descripcion": "Un motor Stirling transforma calor solar concentrado en movimiento para generar electricidad.",
    "revisada": 1,
    "tecnica_requiere": ["FOT","FAB"],
    "tecnica_otorga": ["TER"],
    "tecnica_tokens": 1,
    "nombre": "Motor Stirling de concentración solar",
    "tipo": "refrigeracion",
    "puntos": "10 [PV]",
    "puntos_carta": 10,
    "puntos_capas": 0,
    "puntos_ingenieros": 0,
    "puntos_otros": 0,
    "copias": 2,
    "discos": 12,
    "bono": "4 [DS][FV] [AD] 4 [DS][RF] [AD] 4 [DS][TS]",
    "disco_soporte": 0,
    "efecto": "Coloca un disco en 4 celdas libres de [FV] Fotovoltaica, un disco en 4 celdas libres de [RF] Refrigeración y un disco en 4 celdas libres de [TS] Transmisión; cada disco debe ser adyacente a otro disco colocado por este proyecto.\nObten 1 [FT] ficha de técnica.",
    "etapas": [
      {
        "m": {
          "Fe": 5,
          "Cu": 5,
          "Si": 5
        },
        "o": {
          "IM": 2,
          "En": 3
        }
      },
      {
        "m": {
          "Ti": 5,
          "Al": 7,
          "Ce": 2
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
  },
  {
    "id": "P031",
    "descripcion": "Óptica de precisión mantiene el haz láser concentrado hasta un receptor lejano.",
    "revisada": 0,
    "tecnica_requiere": ["FOT"],
    "tecnica_otorga": ["FOT"],
    "tecnica_tokens": 1,

    "nombre": "Transmisor láser de haz estrecho",
    "tipo": "microondas",
    "puntos": "20 [PV]",
    "puntos_carta": 20,
    "puntos_capas": 0,
    "puntos_ingenieros": 0,
    "puntos_otros": 0,
    "copias": 2,
    "discos": 8,
    "bono": "1-8 [DS][MO] [=] 2 [QU][AD]",
    "disco_soporte": 0,
    "efecto": "Coloca un disco en todas las celdas libres de [MO] Microondas de dos cuadrantes distintos adyacentes\nObten 1 [FT] ficha de técnica.",
    "etapas": [
      {
        "m": {
          "Si": 9,
          "Cu": 6,
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
          "Ti": 3,
          "Al": 6,
          "Nd": 2
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
  },
  {
    "id": "P084",
    "descripcion": "Complejo residencial con servicios de alta gama dentro de la esfera.",
    "revisada": 0,
    "tecnica_requiere": [],
    "tecnica_otorga": [],
    "tecnica_tokens": 1,

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
    "efecto": "[QD] Retira uno de tus discos de una celda de [ES] Estructura o [FV] Fotovoltaico y devuelve hasta 4 [AI] ingenieros anclados a la reserva. \nOtros jugadores pueden ofrecete $7 para que quites sus ingenieros (si aceptas es vinculante).\nPuedes volver a colocar el cubo en la etapa 2.\nObten 1 [FT] ficha de técnica.",
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
  }
];