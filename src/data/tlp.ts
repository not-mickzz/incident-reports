import type { TLP, TLPLevel } from '@/types';

export const TLP_LEVELS: Record<TLPLevel, TLP> = {
  RED: {
    level: 'RED',
    label: 'TLP:RED',
    color: '#ffffff',
    bgColor: '#dc2626',
    description: 'Solo para los ojos y oidos de los receptores individuales nombrados.',
  },
  'AMBER+STRICT': {
    level: 'AMBER+STRICT',
    label: 'TLP:AMBER+STRICT',
    color: '#000000',
    bgColor: '#f59e0b',
    description: 'Limitado a la organización de los receptores solamente.',
  },
  AMBER: {
    level: 'AMBER',
    label: 'TLP:AMBER',
    color: '#000000',
    bgColor: '#f59e0b',
    description: 'Limitado a la organización de los receptores y sus clientes.',
  },
  GREEN: {
    level: 'GREEN',
    label: 'TLP:GREEN',
    color: '#000000',
    bgColor: '#22c55e',
    description: 'Limitado a la comúnidad.',
  },
  CLEAR: {
    level: 'CLEAR',
    label: 'TLP:CLEAR',
    color: '#000000',
    bgColor: '#ffffff',
    description: 'Sin restricciones de divulgación.',
  },
};

export const TLP_LIST: TLPLevel[] = ['RED', 'AMBER+STRICT', 'AMBER', 'GREEN', 'CLEAR'];
