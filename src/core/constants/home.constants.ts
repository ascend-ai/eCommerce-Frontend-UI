import {
  JewelleryCareInterface
} from '../interfaces';

export const JW_CARE: readonly JewelleryCareInterface[] = [
  {
    icon: 'fa-solid fa-dumbbell',
    description: 'Take off when working out'
  },
  {
    icon: 'fa-solid fa-bed',
    description: 'Remove while sleeping'
  },
  {
    icon: 'fa-solid fa-gem',
    description: 'Clean and Polish with soft cloth'
  },
  {
    icon: 'fa-solid fa-shower',
    description: 'Avoid contact with water'
  },
  {
    icon: 'fa-solid fa-spray-can-sparkles',
    description: 'Avoid direct contact with perfume'
  },
  {
    icon: 'fa-solid fa-box',
    description: 'Store jewellery in bag or box'
  }
] as const;