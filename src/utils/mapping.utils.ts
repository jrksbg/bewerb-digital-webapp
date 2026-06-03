import { Altersklasse, StationType } from '@/utils/enums';

export function mapStationType(stationType: StationType) {
  switch (stationType) {
    case StationType.PRACTICAL:
      return 'Praxisstation'
    case StationType.THEORY:
      return 'Theoriestation'
    case StationType.SOCIAL:
      return 'Sozialstation'
    case StationType.ZIVILCOURAGE:
      return 'Zivilcourage Station'
  }
}

export function mapAltersklasse(altersklasse: Altersklasse) {
  switch (altersklasse) {
    case Altersklasse.HELFI:
      return 'Helfi'
    case Altersklasse.JUGEND1:
      return 'Jugend 1'
    case Altersklasse.JUGEND2:
      return 'Jugend 2'
  }
}
