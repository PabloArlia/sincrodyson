window.modulos = [
{
    "id": "P100",
    "descripcion": "Reactor que aprovecha el calor de la fusión de núcleos ligeros para generar electricidad.",
    "revisada": 1,
    "tecnica_requiere": ["NUC","MAT","TER","PRE","MAG"],
    "tecnica_otorga": ["MEG"],
    "tecnica_tokens": "?",
    "nombre": "Centro de fusión nuclear",
    "tipo": "generador",
    "puntos": "[FJ] 20 [PV]",
    "puntos_carta": 20,
    "puntos_capas": 0,
    "puntos_ingenieros": 0,
    "puntos_otros": 20,
    "copias": 1,
    "discos": 0,
    "bono": "[TJ] [PE][=<]9 [=] +3 [PE] +2 [PI]",
    "disco_soporte": 0,
    "efecto": "Todos los jugadores con 9 [PE] o menos aumentan en 3 sus [PE] producción de energía, no pueden negarse. Ganas 2 [PI] y 1 [FT] ficha de técnica por cada jugador que lo haya echo.\nPuedes volver a colocar el cubo en la etapa 3.\n[FJ] Al final de la partida, obtén 20 [PV] puntos de victoria.",
    "destino": "etapa:3",
    "etapas": [
      {
        "m": {
          "Cu": 3,
          "Fe": 3
        },
        "o": {
          "IQ": 1,
          "IE": 1,
          "En": 1
        }
      },
      {
        "m": {
          "Ti": 2,
          "Gd": 1
        },
        "o": {
          "IE": 1,
          "IM": 1,
          "En": 1
        }
      },
      {
        "m": {
          "Al": 2,
          "Nd": 1
        },
        "o": {
          "IS": 1,
          "En": 1
        }
      }
    ]
  },
  {
    "id": "P101",
    "descripcion": "Lentes o espejos enfocan luz solar sobre celdas fotovoltaicas de alto rendimiento.",
    "revisada": 1,
    "tecnica_requiere": ["FOT","FOT","TER","MAT"],
    "tecnica_otorga": ["MEG","FOT"],
    "tecnica_tokens": 1,
    "nombre": "Sistema fotovoltaico de concentración",
    "tipo": "fotovoltaico",
    "puntos": "20 [PV]",
    "puntos_carta": 20,
    "puntos_capas": 0,
    "puntos_ingenieros": 0,
    "puntos_otros": 0,
    "copias": 1,
    "discos": 8,
    "bono": "1-8 [DS][FV] [=]2[QU]",
    "disco_soporte": 0,
    "efecto": "Coloca un disco en cada celda libre de [FV] Fotovoltaica de 2 cuadrantes.\nObten 1 [FT] ficha de técnica.\n[FJ] Al final de la partida, obtén 20 [PV] puntos de victoria.",
    "etapas": [
      {
        "m": {
          "Al": 5,
          "Ti": 5,
          "Si": 5
        },
        "o": {
          "IE": 1,
          "IM": 1,
          "En": 3
        }
      },
      {
        "m": {
          "Cu": 5,
          "Si": 10
        },
        "o": {
          "IE": 1,
          "IM": 1,
          "En": 1,
          "Tr": 3
        }
      }
    ],
    "destino": "completados"
  },
  {
    "id": "P102",
    "descripcion": "Capas semiconductoras aprovechan distintas partes del espectro solar en una misma celda.",
    "revisada": 1,
    "tecnica_requiere": ["FOT","MAT","MIN","PRE"],
    "tecnica_otorga": ["MEG"],
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
    "bono": "1-4 [DS][FV][AD] [=][QU]",
    "disco_soporte": 0,
    "efecto": "Coloca un disco en cada celda libre de [FV] Fotovoltaica de 1 cuadrante.\nObten 1 [FT] ficha de técnica.\n[FJ] Al final de la partida, obtén 15 [PV] puntos de victoria.",
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
          "Al": 2
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
    "id": "P103",
    "descripcion": "Centro que coordina energía, transporte y mantenimiento entre sectores.",
    "revisada": 1,
    "tecnica_requiere": ["DAT","PRE","HAB","ELE"],
    "tecnica_otorga": ["MEG"],
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
    "efecto": "Coloca un disco en 2 celdas libres de [CO] Control de dos áreas de soporte distintas. Coloca el ingeniero de la última etapa junto a cualquiera de los discos colocados. \nConsulta la pérdida de puntos por personal anclado. \nObten 2 [FT] fichas de técnica.\n[FJ] Al final de la partida, obtén 1 [PV] por cada [DP] disco de cualquier jugador en cualquier área de soporte.",
    "etapas": [
      {
        "m": {
          "Fe": 2,
          "Cu": 2,
          "Er": 2
        },
        "o": {
          "IE": 1,
          "En": 2
        }
      },
      {
        "m": {
          "Cu": 3,
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
    "id": "P104",
    "descripcion": "Taller móvil que lleva repuestos y herramientas por rieles hasta las zonas dañadas.",
    "revisada": 1,
    "tecnica_requiere": ["HAB", "PRE", "ELE"],
    "tecnica_otorga": ["MEG"],
    "tecnica_tokens": 0,
    "nombre": "Plataforma de reparaciones sobre rieles",
    "tipo": "mantenimiento",
    "puntos": "+1 [PV] [/] [SI][ES]",
    "puntos_carta": 16,
    "puntos_capas": 0,
    "puntos_ingenieros": -8,
    "puntos_otros": -2,
    "copias": 1,
    "discos": 0,
    "bono": "4 [DP][MN] [=] 2 [QU]",
    "disco_soporte": 4,
    "efecto": "Coloca un disco en 4 celdas libres de [MN] Mantenimiento de dos áreas de soporte, 2 en cada una, y los ingenieros de la última etapa junto a cualquiera de ellos.\n[FJ] Al final de la partida, obtén 1 [PV] punto de victoria por cada celda de [ES] Estructura con un disco en ella.\nConsulta la pérdida de puntos por personal anclado.",
    "etapas": [
      {
        "m": {
          "Fe": 5,
          "Al": 5,
          "Ti": 4
        },
        "o": {
          "IE": 2,
          "En": 2
        }
      },
      {
        "m": {
          "Fe": 5,
          "Cu": 4,
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
    "id": "P105",
    "descripcion": "Estación planetaria que impulsa vehículos equipados con velas mediante haces láser.",
    "revisada": 1,
    "tecnica_requiere": ["FOT","PRE","PRE","PROP"],
    "tecnica_otorga": ["MEG","PROP"],
    "tecnica_tokens": 1,
    "nombre": "Estación planetaria de propulsión por láser dirigido",
    "tipo": "produccion",
    "puntos": "+1 [PV] [/] [Tr] [=<] 10",
    "puntos_carta": 0,
    "puntos_capas": 0,
    "puntos_ingenieros": 0,
    "puntos_otros": 20,
    "copias": 1,
    "discos": 0,
    "bono": "+4 [Tr] [RE]",
    "disco_soporte": 0,
    "efecto": "Obtén 4 [Tr] Transporte de la reserva y 1 [FT] ficha de técnica. \nPuedes volver a colocar el cubo en la etapa 2.\n[FJ] Al final de la partida, obtén 1 [PV] punto de victoria por cada [Tr] Transporte en la reserva de trasporte de todos los jugadores hasta una maximo de 10.",
    "destino": "etapa:2",
    "etapas": [
      {
        "m": {
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
    "id": "P106",
    "descripcion": "Entramado de nanotubos de carbono diseñado para soportar cargas con muy poca masa.",
    "revisada": 1,
    "tecnica_requiere": ["NANO","PRE"],
    "tecnica_otorga": ["MEG"],
    "tecnica_tokens": 1,
    "nombre": "Estructura de nanotubos de carbono",
    "tipo": "estructura",
    "puntos": "10 [PV]",
    "puntos_carta": 10,
    "puntos_capas": 0,
    "puntos_ingenieros": 0,
    "puntos_otros": 0,
    "copias": 1,
    "discos": 8,
    "bono": "8 [DS][ES]",
    "disco_soporte": 0,
    "efecto": "Coloca un disco en 8 celdas libres de [ES] Estructura.\nObten 1 [FT] ficha de técnica.\n[FJ] Al final de la partida, obtén 10 [PV] puntos de victoria.",
    "etapas": [
      {
        "m": {
          "C": 5,
          "Nd": 1
        },
        "o": {
          "IQ": 1,
          "En": 2
        }
      },
      {
        "m": {
          "C": 5,
          "Al": 2
        },
        "o": {
          "IQ": 1,
          "En": 2
        }
      },
      {
        "m": {
          "C": 10,
          "Al": 1
        },
        "o": {
          "IE": 1,
          "Tr": 2
        }
      }
    ],
    "destino": "completados"
  },
  {
    "id": "P107",
    "descripcion": "Celdas de película delgada que usan perovskitas para absorber la luz solar.",
    "revisada": 1,
    "tecnica_requiere": ["FOT","MAT","NANO"],
    "tecnica_otorga": ["MEG"],
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
    "efecto": "Coloca un disco en 8 celdas libres de [FV] Fotovoltaica de hasta 3 cuadrantes adyacentes.\nObten 1 [FT] ficha de técnica.\n[FJ] Al final de la partida, obtén 10 [PV] puntos de victoria.",
    "etapas": [
      {
        "m": {
          "Si": 10,
          "C": 5
        },
        "o": {
          "IQ": 2,
          "En": 3
        }
      },
      {
        "m": {
          "Al": 6,
          "Cu": 6,
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
    "id": "P108",
    "descripcion": "Celdas de arseniuro de galio que convierten luz solar en electricidad con alta eficiencia.",
    "revisada": 1,
    "tecnica_requiere": ["FOT", "MAT", "PRE"],
    "tecnica_otorga": ["MEG"],
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
    "efecto": "Coloca un disco en cada celda libre de [FV] Fotovoltaica de hasta dos cuadrantes adyacentes.\nObten 1 [FT] ficha de técnica.\n[FJ] Al final de la partida, obtén 10 [PV] puntos de victoria.",
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
    "id": "P109",
    "descripcion": "Sistema ficticio de mando remoto inspirado en la transferencia de estados cuánticos.",
    "revisada": 1,
    "tecnica_requiere": ["CUA", "MAG", "FOT", "ELE"],
    "tecnica_otorga": ["MEG","CUA"],
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
    "efecto": "Coloca un disco en una celda libre de [CO] Control de un área de soportey un disco en 3 celdas libres de [MO] Microondas del mismo cuadrante.\nObten 1 [FT] ficha de técnica.\n[FJ] Al final de la partida, obtén 10 [PV] puntos de victoria.",
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
    "id": "P110",
    "descripcion": "Jardines que regulan luz, temperatura y riego para sostener su propio microclima.",
    "revisada": 0,
    "tecnica_requiere": [],
    "tecnica_otorga": ["HAB","MEG"],
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
    "efecto": "Coloca un disco en 2 celdas libres de [MN] Mantenimiento sin cobrar bonos de colocación.\nLuego retira hasta 5 [AI] ingenieros anclados de cualquier número de celdas y devuélvelos a la reserva de ingenieros correspondiente.\nObten 1 [FT] ficha de técnica.\n[FJ] Al final de la partida, obtén 10 [PV] puntos de victoria.",
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
    "id": "P111",
    "descripcion": "Instrumentos que miden la densidad, energía y composición de las partículas solares.",
    "revisada": 0,
    "tecnica_requiere": [],
    "tecnica_otorga": ["MEG"],
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
    "efecto": "Coloca un disco en 2 celdas libres de [SN] Sensores de dos áreas de soporte distintas. Coloca el ingeniero de la última etapa junto a cualquiera de los discos colocados. \nConsulta la pérdida de puntos por personal anclado.\nObten 1 [FT] ficha de técnica.\n[FJ] Al final de la partida, obtén 10 [PV] puntos de victoria.",
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
    "id": "P112",
    "descripcion": "Sensores detectan actividad solar y activan la protección de sectores expuestos.",
    "revisada": 0,
    "tecnica_requiere": [],
    "tecnica_otorga": ["MEG"],
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
    "efecto": "Coloca un disco en 4 celdas libres de [MN] Mantenimiento y un disco en 4 celdas libres de [ES] Estructura de dos cuadrantes, 2 de cada tipo en cada cuadrante. Si el mapa tiene más de 3 cuadrantes, estos no pueden ser adyacentes.\nConsulta la pérdida de puntos por personal anclado.\nObten 1 [FT] ficha de técnica.\n[FJ] Al final de la partida, obtén 20 [PV] puntos de victoria.",
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
    "id": "P113",
    "descripcion": "Sensores rastrean micrometeoritos y un láser vaporiza parte de su superficie para desviarlos.",
    "revisada": 0,
    "tecnica_requiere": ["FOT"],
    "tecnica_otorga": ["MEG"],
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
    "efecto": "Coloca un disco en 2 celdas libres de [MN] Mantenimiento de un área de soporte y un disco en cada celda libre de [MO] Microondas de otro cuadrante.\nConsulta la pérdida de puntos por personal anclado.\nObten 1 [FT] ficha de técnica.\n[FJ] Al final de la partida, obtén 20 [PV] puntos de victoria.",
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
    "id": "P114",
    "descripcion": "Instalación con equipos adaptados al ejercicio y al descanso en microgravedad.",
    "revisada": 0,
    "tecnica_requiere": [],
    "tecnica_otorga": ["MEG"],
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
    "efecto": "Coloca un disco en 2 celdas libres de [MN] Mantenimiento sin cobrar bonos de colocación.\nObten 1 [FT] ficha de técnica.\n[FJ] Al final de la partida, obtén 2 [PV] por cada [AI] ingeniero anclado de cualquier jugador.",
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
    "id": "P115",
    "descripcion": "Un motor Stirling transforma calor solar concentrado en movimiento para generar electricidad.",
    "revisada": 1,
    "tecnica_requiere": ["FOT","FAB"],
    "tecnica_otorga": ["MEG"],
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
    "efecto": "Coloca un disco en 4 celdas libres de [FV] Fotovoltaica, un disco en 4 celdas libres de [RF] Refrigeración y un disco en 4 celdas libres de [TS] Transmisión; cada disco debe ser adyacente a otro disco colocado por este proyecto.\nObten 1 [FT] ficha de técnica.\n[FJ] Al final de la partida, obtén 10 [PV] puntos de victoria.",
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
    "id": "P116",
    "descripcion": "Óptica de precisión mantiene el haz láser concentrado hasta un receptor lejano.",
    "revisada": 0,
    "tecnica_requiere": ["FOT"],
    "tecnica_otorga": ["MEG"],
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
    "efecto": "Coloca un disco en todas las celdas libres de [MO] Microondas de dos cuadrantes distintos adyacentes\nObten 1 [FT] ficha de técnica.\n[FJ] Al final de la partida, obtén 20 [PV] puntos de victoria.",
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
    "id": "P117",
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