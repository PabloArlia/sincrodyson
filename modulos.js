// Syncrodyson — datos de proyectos. Las recetas nuevas no acordadas se identifican en nota_balance.
// bono: texto e iconos entre corchetes, p. ej. "3 [DS]", "+3 [BT]", "+18 [Di][RE]".
window.modulos = [
  {
    "nombre": "Batería de gravedad sólida",
    "tipo": "bateria",
    "puntos": "0 [PV]",
    "copias": 1,
    "discos": 0,
    "bono": "+1 [BT]",
    "efecto": "Aumenta en 1 tu energía máxima",
    "etapas": [
      {
        "m": {
          "Fe": 5,
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
    "nombre": "Batería de hidruro metálico",
    "tipo": "bateria",
    "puntos": "1 [PV]",
    "copias": 1,
    "discos": 0,
    "bono": "+4 [BT]",
    "efecto": "Aumenta en 4 tu energía máxima",
    "etapas": [
      {
        "m": {
          "Fe": 2,
          "Cu": 2,
          "Ce": 1,
          "Al": 2
        },
        "o": {
          "IM": 1
        }
      }
    ],
    "destino": "completados"
  },
  {
    "nombre": "Banco de supercondensadores",
    "tipo": "bateria",
    "puntos": "2 [PV]",
    "copias": 1,
    "discos": 0,
    "bono": "+3 [BT]",
    "efecto": "Aumenta en 3 tu energía máxima",
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
    "nombre": "Volante de inercia magnético",
    "tipo": "bateria",
    "puntos": "0 [PV]",
    "copias": 1,
    "discos": 0,
    "bono": "+6 [BT]",
    "efecto": "Aumenta en 6 tu energía máxima",
    "etapas": [
      {
        "m": {
          "Fe": 5,
          "Ti": 2,
          "Cu": 2,
          "Nd": 1
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
    "nombre": "Acumulador térmico de grafito",
    "tipo": "bateria",
    "puntos": "3 [PV]",
    "copias": 1,
    "discos": 0,
    "bono": "+3 [BT]",
    "efecto": "Aumenta en 3 tu energía máxima",
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
  {
    "nombre": "Centro de blockchain",
    "tipo": "economia",
    "puntos": "0 [PV]",
    "copias": 1,
    "discos": 0,
    "bono": "+18 [Di][RE]",
    "efecto": "Gana $18. Puedes volver a colocar el cubo en la etapa 2.",
    "etapas": [
      {
        "m": {
          "Si": 6,
          "Cu": 4,
          "Al": 3,
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
    "nombre": "Estructura de fibra de carbono",
    "tipo": "estructura",
    "puntos": "9 [PV]",
    "copias": 1,
    "discos": 2,
    "bono": "2 [DS]",
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
    "nombre": "Estructura de titanio",
    "tipo": "estructura",
    "puntos": "9 [PV]",
    "copias": 1,
    "discos": 2,
    "bono": "2 [DS]",
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
    "nombre": "Estructura de acero reforzado",
    "tipo": "estructura",
    "puntos": "5 [PV]",
    "copias": 1,
    "discos": 1,
    "bono": "1 [DS]",
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
    "nombre": "Estructura alveolar de aluminio",
    "tipo": "estructura",
    "puntos": "6 [PV]",
    "copias": 1,
    "discos": 3,
    "bono": "3 [DS]",
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
    "nombre": "Estructura de vidrio metálico",
    "tipo": "estructura",
    "puntos": "10 [PV]",
    "copias": 1,
    "discos": 3,
    "bono": "3 [DS]",
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
    "nombre": "Estructura de nanotubos de carbono",
    "tipo": "estructura",
    "puntos": "25 [PV]",
    "copias": 1,
    "discos": 5,
    "bono": "5 [DS]",
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
  {
    "nombre": "Paneles fotovoltaicos de película delgada",
    "tipo": "fotovoltaico",
    "puntos": "5 [PV]",
    "copias": 1,
    "discos": 1,
    "bono": "1 [DS]",
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
    "nombre": "Paneles de silicio monocristalino",
    "tipo": "fotovoltaico",
    "puntos": "12 [PV]",
    "copias": 1,
    "discos": 3,
    "bono": "3 [DS]",
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
    "nombre": "Células solares de perovskita",
    "tipo": "fotovoltaico",
    "puntos": "10 [PV]",
    "copias": 1,
    "discos": 4,
    "bono": "4 [DS]",
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
    "nombre": "Sistema fotovoltaico de concentración",
    "tipo": "fotovoltaico",
    "puntos": "15 [PV]",
    "copias": 1,
    "discos": 3,
    "bono": "3 [DS]",
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
    "nombre": "Células solares multiunión",
    "tipo": "fotovoltaico",
    "puntos": "16 [PV]",
    "copias": 1,
    "discos": 3,
    "bono": "3 [DS]",
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
    "nombre": "Células solares de arseniuro de galio",
    "tipo": "fotovoltaico",
    "puntos": "30 [PV]",
    "copias": 1,
    "discos": 7,
    "bono": "7 [DS]",
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
          "Tr": 4
        }
      }
    ],
    "destino": "completados"
  },
  {
    "nombre": "Red HVDC de cobre",
    "tipo": "transmision",
    "puntos": "0 [PV]",
    "copias": 1,
    "discos": 1,
    "bono": "1 [DS]",
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
    "nombre": "Red HVDC ultraligera",
    "tipo": "transmision",
    "puntos": "0 [PV]",
    "copias": 1,
    "discos": 2,
    "bono": "2 [DS]",
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
    "nombre": "Red superconductora criogénica",
    "tipo": "transmision",
    "puntos": "15 [PV]",
    "copias": 1,
    "discos": 3,
    "bono": "3 [DS]",
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
    "nombre": "Superconductores de hidruros a alta presión",
    "tipo": "transmision",
    "puntos": "20 [PV]",
    "copias": 1,
    "discos": 6,
    "bono": "6 [DS]",
    "efecto": "Coloca un disco en 3 celdas distintas de [TS] Transmisión de un mismo cuadrante. \nLuego, coloca un disco en 1 celda de [RF] Refrigeración adyacente a cada una de ellas.",
    "etapas": [
      {
        "m": {
          "Ti": 1,
          "Ce": 1,
          "Si": 4,
          "Cu": 1
        },
        "o": {
          "IQ": 2,
          "IM": 1,
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
          "IQ": 2,
          "IM": 1,
          "IS": 1,
          "En": 5,
          "Tr": 4
        }
      }
    ],
    "destino": "completados"
  },
  {
    "nombre": "Transmisor láser de alta potencia",
    "tipo": "transmision",
    "puntos": "24 [PV]",
    "copias": 1,
    "discos": 3,
    "bono": "3 [DS] 2 [DH]",
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
  {
    "nombre": "Radiadores térmicos de aluminio",
    "tipo": "refrigeracion",
    "puntos": "1 [PV]",
    "copias": 1,
    "discos": 1,
    "bono": "1 [DS]",
    "efecto": "Coloca un disco en 1 celda de [RF] Refrigeración.",
    "etapas": [
      {
        "m": {
          "Al": 2,
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
    "nombre": "Red de tubos de calor",
    "tipo": "refrigeracion",
    "puntos": "1 [PV]",
    "copias": 1,
    "discos": 2,
    "bono": "2 [DS]",
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
    "nombre": "Radiadores de nanotubos de carbono alineados",
    "tipo": "refrigeracion",
    "puntos": "14 [PV]",
    "copias": 1,
    "discos": 3,
    "bono": "3 [DS]",
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
    "nombre": "Radiadores de grafeno multicapa",
    "tipo": "refrigeracion",
    "puntos": "20 [PV]",
    "copias": 1,
    "discos": 4,
    "bono": "4 [DS]",
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
    "nombre": "Motor Stirling de concentración solar",
    "tipo": "refrigeracion",
    "puntos": "12 [PV]",
    "copias": 1,
    "discos": 6,
    "bono": "6 [DS]",
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
  },
  {
    "nombre": "Antena parabólica de microondas",
    "tipo": "microondas",
    "puntos": "4 [PV]",
    "copias": 1,
    "discos": 1,
    "bono": "1 [DS] 2 [DH]",
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
    "nombre": "Matriz de antenas en fase",
    "tipo": "microondas",
    "puntos": "5 [PV]",
    "copias": 1,
    "discos": 4,
    "bono": "4 [DS]",
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
    "nombre": "Transmisor láser de haz estrecho",
    "tipo": "microondas",
    "puntos": "20 [PV]",
    "copias": 1,
    "discos": 5,
    "bono": "3-5 [DS]",
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
          "IS": 1,
          "En": 4,
          "Tr": 3
        }
      }
    ],
    "destino": "completados"
  },
  {
    "nombre": "Paneles solares",
    "tipo": "generador",
    "puntos": "0 [PV]",
    "copias": 1,
    "discos": 0,
    "bono": "+1 [PE]",
    "efecto": "Aumenta en 1 tu [PE] producción de energía.",
    "destino": "completados",
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
    "nombre": "Generador de radioisótopos (RTG)",
    "tipo": "generador",
    "puntos": "0 [PV]",
    "copias": 1,
    "discos": 0,
    "bono": "+1 [PE]",
    "efecto": "Aumenta en 1 tu [PE] producción de energía.",
    "destino": "completados",
    "etapas": [
      {
        "m": {
          "Ti": 1,
          "Cu": 2,
          "Ce": 1
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
    "nombre": "Concentrador solar Stirling",
    "tipo": "generador",
    "puntos": "0 [PV]",
    "copias": 1,
    "discos": 0,
    "bono": "+2 [PE]",
    "efecto": "Aumenta en 2 tu [PE] producción de energía.",
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
    "nombre": "Central solar de ciclo Brayton",
    "tipo": "generador",
    "puntos": "0 [PV]",
    "copias": 1,
    "discos": 0,
    "bono": "+4 [PE]",
    "efecto": "Aumenta en 4 tu [PE] producción de energía.",
    "destino": "completados",
    "etapas": [
      {
        "m": {
          "Ti": 2,
          "Al": 4,
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
          "Cu": 2
        },
        "o": {
          "IM": 2,
          "IQ": 1,
          "En": 4
        }
      },
      {
        "m": {
          "Ti": 2,
          "Al": 3,
          "Ce": 1
        },
        "o": {
          "IM": 2,
          "IS": 1,
          "En": 5
        }
      }
    ]
  },
  {
    "nombre": "Centro de telemarketing",
    "tipo": "mejora_soporte_externo",
    "puntos": "0 [PV]",
    "copias": 1,
    "discos": 0,
    "bono": "+3 [Di] [MS]",
    "efecto": "Cada ingeniero en Soporte externo genera $3 en lugar de $1. Coloca esta carta a la derecha de tu zona de [SP]. Si ya tienes otra [MS] activa allí, muévela a proyectos completados. Esta [MS] entra en vigor inmediatamente.",
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
    "nombre": "Centro de investigación y tecnología",
    "tipo": "mejora_soporte_externo",
    "puntos": "0 [PV]",
    "copias": 1,
    "discos": 0,
    "bono": "+1 [CP] [MS]",
    "efecto": "Cada ingeniero en Soporte externo obtiene 1 carta de proyecto en lugar de $1. Coloca esta carta a la derecha de tu zona de [SP]. Si ya tienes otra [MS] activa allí, muévela a proyectos completados. Esta [MS] entra en vigor inmediatamente.",
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
    "nombre": "Centro de expedición de cráteres",
    "tipo": "mejora_soporte_externo",
    "puntos": "0 [PV]",
    "copias": 1,
    "discos": 0,
    "bono": "+1 Fe [MS]",
    "efecto": "Cada ingeniero en Soporte externo obtiene 1 Fe en lugar de $1. Coloca esta carta a la derecha de tu zona de [SP]. Si ya tienes otra [MS] activa allí, muévela a proyectos completados. Esta [MS] entra en vigor inmediatamente.",
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
    "nombre": "Caminadoras",
    "tipo": "mejora_soporte_externo",
    "puntos": "0 [PV]",
    "copias": 1,
    "discos": 0,
    "bono": "+1 [En] [MS]",
    "efecto": "Cada ingeniero en Soporte externo obtiene 1 [En] Energia en lugar de $1. La energía que exceda la capacidad de tus baterías se pierde. Coloca esta carta a la derecha de tu zona de [SP]. Si ya tienes otra [MS] activa allí, muévela a proyectos completados. Esta [MS] entra en vigor inmediatamente.",
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
    "nombre": "Estacion de coordinacion Orbital",
    "tipo": "mejora_soporte_externo",
    "puntos": "1 [PV] / [EI]",
    "copias": 1,
    "discos": 0,
    "bono": "-$1 / [EI] [MS]",
    "efecto": "Cada ingeniero en [SP] Soporte externo genera $1, como de costumbre. Debes pagar $1 por cada [EI] ingeniero anclado en la esfera de Dyson, de cualquier jugador. \nColoca esta carta a la derecha de tu área de [SP] Soporte externo. Si ya tienes otra [MS] activa allí, muévela a proyectos completados. Esta [MS] entra en vigor inmediatamente. \nAl final de la partida, esta carta otorga 1 [PV] por cada [EI] ingeniero anclado de cualquier jugador.",
    "destino": "mejora",
    "etapas": [
      {
        "m": {
          "Ti": 5,
          "Al": 3,
          "Er": 1
        },
        "o": {
          "IE": 2,
          "En": 2,
          "Tr": 2
        }
      }
    ]
  },
  {
    "nombre": "Pasantía",
    "tipo": "recursoshumanos",
    "puntos": "0 [PV]",
    "copias": 1,
    "discos": 0,
    "bono": "+1 [IQ] [CN]",
    "efecto": "Coloca 1 [IQ] Ingeniero Químico de la reserva en tus barracas sin gastar ninguna ficha de contratación. Si no hay IQ disponibles en la reserva, obtén 1 [CN] ficha de contratación.",
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
    "nombre": "Programador de IA",
    "tipo": "recursoshumanos",
    "puntos": "0 [PV]",
    "copias": 1,
    "discos": 0,
    "bono": "+3 [IS] [CN]",
    "efecto": "Coloca hasta 3 [IS] Ingeniero en Ssistemas en tus barracas sin gastar fichas de contratación. Por cada uno que no este disponible, obtén 1 [CN] ficha de contratación.",
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
    "nombre": "Desregulación de sueldos",
    "tipo": "recursoshumanos",
    "puntos": "0 [PV]",
    "copias": 1,
    "discos": 0,
    "bono": "[TJ] [CN]",
    "efecto": "Cada jugador que tenga menos de 7 [CN] fichas de contratación obtiene 1 [CN]. Ganas 1 PV por cada [CN] efectivamente entregada, hasta un máximo de 3 PV.",
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
    "nombre": "Robots multipropósito",
    "tipo": "recursoshumanos",
    "puntos": "0 [PV]",
    "copias": 1,
    "discos": 0,
    "bono": "[IQ] [IE] [IS] [IM]",
    "efecto": "Coloca hasta 1 [IQ] Ingeniero Químico, 1 [IE] Ingeniero Electrónico, 1 [IS] Ingeniero en Ssistemas y 1 [IM] Ingeniero Mecánico de la reserva en tus barracas sin gastar fichas de contratación; por cada ingeniero obtenido disminuye en 1 tu [PE].",
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
    "nombre": "Mercado negro",
    "tipo": "economia",
    "puntos": "0 [PV]",
    "copias": 1,
    "discos": 0,
    "bono": "[ME] [RE]",
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
    "nombre": "Consorcio de minerales estratégicos",
    "tipo": "economia",
    "puntos": "0 [PV]",
    "copias": 1,
    "discos": 0,
    "bono": "[TJ] [ME] [RR]",
    "efecto": "Cada jugador puede vender hasta 3 [RR] tierras raras a $15 cada una, independientemente del tipo. \nGanas 1 PV por cada 2 [RR] vendidas entre todos los jugadores, redondeando hacia abajo. Puedes volver a colocar el cubo en la etapa 1.",
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
    "nombre": "Hotel solar",
    "tipo": "economia",
    "puntos": "0 [PV]",
    "copias": 1,
    "discos": 0,
    "bono": "+5 [Di] [RE]",
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
          "Si": 1
        },
        "o": {
          "IS": 1,
          "En": 2
        }
      }
    ]
  },
  {
    "nombre": "Centro de fusión nuclear",
    "tipo": "economia",
    "puntos": "0 [PV]",
    "copias": 1,
    "discos": 0,
    "bono": "+X [En]",
    "efecto": "Todos los jugadores obtienen hasta 3 [En] energia, sin superar la capacidad de sus [BT] baterías. Ganas 1 PV por cada unidad de energía efectivamente obtenida entre todos los jugadores, hasta un máximo de 8 PV. \nPuedes volver a colocar el cubo en la etapa 2.",
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
        "m": {
        },
        "o": {
          "IQ": 1,
          "IS": 1
        }
      }
    ]
  },
  {
    "nombre": "Refinería de escoria por intercambio iónico",
    "tipo": "produccion",
    "puntos": "0 [PV]",
    "copias": 1,
    "discos": 0,
    "bono": "+4 [RR]",
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
    "nombre": "Laboratorio móvil",
    "tipo": "produccion",
    "puntos": "0 [PV]",
    "copias": 1,
    "discos": 0,
    "bono": "[RQ]",
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
    "nombre": "Cohete de combustible sólido",
    "tipo": "produccion",
    "puntos": "0 [PV]",
    "copias": 1,
    "discos": 0,
    "bono": "+2 [Tr]",
    "efecto": "Obtén 2 [Tr] Transporte de la reserva. Puedes devolver esta carta a tu mano.",
    "destino": "mano",
    "etapas": [
      {
        "m": {
          "Fe": 3,
          "Al": 2
        },
        "o": {
          "IM": 1,
          "En": 1
        }
      },
      {
        "m": {
          "Al": 3,
          "C": 4
        },
        "o": {
          "IQ": 1,
          "En": 2
        }
      }
    ]
  },
  {
    "nombre": "Catapulta electromagnética",
    "tipo": "produccion",
    "puntos": "0 [PV]",
    "copias": 1,
    "discos": 0,
    "bono": "+5 [Tr] [RE]",
    "efecto": "Obtén 5 [Tr] Transporte de la reserva. Puedes volver a colocar el cubo en la etapa 3.",
    "destino": "etapa:3",
    "etapas": [
      {
        "m": {
          "Fe": 5,
          "Cu": 4,
          "Al": 3
        },
        "o": {
          "IE": 2,
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
          "IM": 2,
          "IS": 1,
          "En": 4
        }
      },
      {
        "m": {
          "Cu": 2,
          "Si": 1
        },
        "o": {
          "IM": 2,
          "En": 5
        }
      }
    ]
  },
  {
    "nombre": "Propulsor láser",
    "tipo": "produccion",
    "puntos": "0 [PV]",
    "copias": 1,
    "discos": 0,
    "bono": "+6 [Tr] [RE]",
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
          "IE": 2,
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
          "IM": 2,
          "IS": 1,
          "En": 4
        }
      },
      {
        "m": {
          "Si": 2,
          "Cu": 2
        },
        "o": {
          "IS": 2,
          "En": 6
        }
      }
    ]
  },
  {
    "nombre": "Gancho orbital (Skyhook)",
    "tipo": "produccion",
    "puntos": "0 [PV]",
    "copias": 1,
    "discos": 0,
    "bono": "+7 [Tr] [RE]",
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
  }
];


window.sensores = [
  {
    "nombre": "Extensómetros de fibra óptica",
    "tipo": "sensores",
    "puntos": "0 [PV]",
    "copias": 1,
    "discos": 1,
    "bono": "1 [DP]",
    "efecto": "Coloca un disco en una celda libre de [SN] Sensores de un área de soporte. \nLuego, pierde 2 PV por cada celda de [ES] Estructura sin disco, considerando todos los cuadrantes.",
    "etapas": [
      {
        "m": { "Si": 2, "Cu": 2, "C": 2 },
        "o": { "IE": 1, "IM": 1, "En": 1, "Tr": 2 }
      }
    ],
    "destino": "completados"
  },
  {
    "nombre": "Termografía infrarroja",
    "tipo": "sensores",
    "puntos": "0 [PV]",
    "copias": 1,
    "discos": 1,
    "bono": "1 [DP]",
    "efecto": "Coloca un disco en una celda libre de [SN] Sensores de un área de soporte. \nLuego, pierde 1 PV por cada celda de [ES] Estructura y cada celda [FV] Fotovoltaica sin disco, considerando todos los cuadrantes.",
    "etapas": [
      {
        "m": { "Si": 3, "Cu": 2, "Al": 2 },
        "o": { "IM": 1, "IS": 1, "En": 2, "Tr": 1 }
      }
    ],
    "destino": "completados"
  },
  {
    "nombre": "Dosímetros de radiación",
    "tipo": "sensores",
    "puntos": "-10 [PV]",
    "copias": 1,
    "discos": 1,
    "bono": "1 [DP]",
    "efecto": "Coloca un disco en una celda libre de [SN] Sensores de un área de soporte. \nLuego, pierde 12 PV por cada espacio de [MN] Mantenimiento sin disco en esa misma área de soporte.",
    "etapas": [
      {
        "m": { "Si": 2, "Al": 2, "Ce": 1 },
        "o": { "IQ": 1, "IS": 1, "En": 1, "Tr": 1 }
      }
    ],
    "destino": "completados"
  },
  {
    "nombre": "Detectores de micrometeoritos",
    "tipo": "sensores",
    "puntos": "0 [PV]",
    "copias": 1,
    "discos": 1,
    "bono": "1 [DP]",
    "efecto": "Coloca un disco en una celda libre de [SN] Sensores de un área de soporte. \nLuego, paga $10 por cada celda de [MO] Microondas sin disco, considerando todos los cuadrantes. Puedes pagar parcialmente; por cada $10 que no puedas pagar, pierde 3 PV.",
    "etapas": [
      {
        "m": { "Fe": 2, "Cu": 2, "Si": 2 },
        "o": { "IE": 1, "IS": 1, "En": 2, "Tr": 1 }
      }
    ],
    "destino": "completados"
  },
  {
    "nombre": "Analizadores de plasma solar",
    "tipo": "sensores",
    "puntos": "0 [PV]",
    "copias": 1,
    "discos": 1,
    "bono": "1 [DP]",
    "efecto": "Coloca un disco y los ingenieros de la ultima etapa en una celda libre de [SN] Sensores de un área de soporte. \nConsulta la pérdida de puntos por personal anclado.",
    "etapas": [
      {
        "m": { "Ti": 4, "Cu": 7, "Si": 6, "Ce": 1 },
        "o": { "IQ": 2, "IS": 1, "En": 6 }
      },
      {
        "m": { "Al": 3, "Nd": 1, "Gd": 1, "Er": 1 },
        "o": { "EE": 1, "EM": 1, "En": 5, "Tr": 3 }
      }
    ],
    "destino": "completados"
  },
  {
    "nombre": "Red de interferometría láser",
    "tipo": "sensores",
    "puntos": "-7 [PV]",
    "copias": 1,
    "discos": 1,
    "bono": "1 [DP]",
    "efecto": "Coloca un disco en una celda libre de [SN] Sensores de un área de soporte. \nLuego, pierde 7 PV por cada cuadrante que no tenga un disco en la celda de [SN] Sensores en su área de soporte.",
    "etapas": [
      {
        "m": { "Si": 3, "Cu": 2, "Er": 1 },
        "o": { "IS": 1, "IM": 1, "En": 2, "Tr": 1 }
      }
    ],
    "destino": "completados"
  },
  {
    "nombre": "Monitores de calidad eléctrica",
    "tipo": "sensores",
    "puntos": "0 [PV]",
    "copias": 1,
    "discos": 1,
    "bono": "1 [DP]",
    "efecto": "Coloca un disco en una celda libre de [SN] Sensores de un área de soporte.  \nLuego, pierde 2 PV por cada celda de [TS] Transmisión sin disco, considerando todos los cuadrantes.",
    "etapas": [
      {
        "m": { "Cu": 3, "Si": 2 },
        "o": { "IM": 1, "IS": 1, "En": 2 }
      },
      {
        "m": { "Cu": 2, "Al": 2, "Gd": 1 },
        "o": { "IM": 1, "IS": 1, "En": 2, "Tr": 1 }
      }
    ],
    "destino": "completados"
  },
  {
    "nombre": "Red de relojes atómicos de sincronización",
    "tipo": "sensores",
    "puntos": "0 [PV]",
    "copias": 1,
    "discos": 1,
    "bono": "1 [DP]",
    "efecto": "Coloca un disco en una celda libre de [SN] Sensores de un área de soporte.",
    "etapas": [
      {
        "m": { "Si": 4, "Cu": 3, "Nd": 1 },
        "o": { "IS": 2, "En": 3 }
      },
      {
        "m": { "Ti": 2, "Er": 1, "Gd": 1 },
        "o": { "IQ": 1, "IS": 2, "En": 4 }
      },
      {
        "m": { "Cu": 3, "Er": 1, "Nd": 1 },
        "o": { "IQ": 1, "IS": 2, "En": 5, "Tr": 1 }
      }
    ],
    "destino": "completados"
  }
];

// Agregar las nuevas cartas al conjunto existente:
window.modulos.push(...window.sensores);

