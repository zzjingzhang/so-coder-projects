import { Atom } from './atom.model';
import { Bond } from './bond.model';

export interface Molecule {
  id: string;
  name: string;
  formula: string;
  description: string;
  atoms: Atom[];
  bonds: Bond[];
  rotationX: number;
  rotationY: number;
  rotationZ: number;
}

export const PRESET_MOLECULES: Molecule[] = [
  {
    id: 'water',
    name: 'Water',
    formula: 'H₂O',
    description: '水分子 - 由两个氢原子和一个氧原子组成',
    atoms: [
      { id: 'o1', symbol: 'O', name: 'Oxygen', atomicNumber: 8, color: '#EF4444', radius: 30, mass: 15.999, x: 0, y: 0, z: 0, velocityX: 0, velocityY: 0, velocityZ: 0 },
      { id: 'h1', symbol: 'H', name: 'Hydrogen', atomicNumber: 1, color: '#FFFFFF', radius: 25, mass: 1.008, x: -60, y: 40, z: 0, velocityX: 0, velocityY: 0, velocityZ: 0 },
      { id: 'h2', symbol: 'H', name: 'Hydrogen', atomicNumber: 1, color: '#FFFFFF', radius: 25, mass: 1.008, x: 60, y: 40, z: 0, velocityX: 0, velocityY: 0, velocityZ: 0 }
    ],
    bonds: [
      { id: 'b1', atom1Id: 'o1', atom2Id: 'h1', type: 'single', bondLength: 96, stiffness: 50 },
      { id: 'b2', atom1Id: 'o1', atom2Id: 'h2', type: 'single', bondLength: 96, stiffness: 50 }
    ],
    rotationX: 0,
    rotationY: 0,
    rotationZ: 0
  },
  {
    id: 'methane',
    name: 'Methane',
    formula: 'CH₄',
    description: '甲烷分子 - 由一个碳原子和四个氢原子组成',
    atoms: [
      { id: 'c1', symbol: 'C', name: 'Carbon', atomicNumber: 6, color: '#333333', radius: 35, mass: 12.011, x: 0, y: 0, z: 0, velocityX: 0, velocityY: 0, velocityZ: 0 },
      { id: 'h1', symbol: 'H', name: 'Hydrogen', atomicNumber: 1, color: '#FFFFFF', radius: 25, mass: 1.008, x: 60, y: 60, z: 60, velocityX: 0, velocityY: 0, velocityZ: 0 },
      { id: 'h2', symbol: 'H', name: 'Hydrogen', atomicNumber: 1, color: '#FFFFFF', radius: 25, mass: 1.008, x: -60, y: -60, z: 60, velocityX: 0, velocityY: 0, velocityZ: 0 },
      { id: 'h3', symbol: 'H', name: 'Hydrogen', atomicNumber: 1, color: '#FFFFFF', radius: 25, mass: 1.008, x: -60, y: 60, z: -60, velocityX: 0, velocityY: 0, velocityZ: 0 },
      { id: 'h4', symbol: 'H', name: 'Hydrogen', atomicNumber: 1, color: '#FFFFFF', radius: 25, mass: 1.008, x: 60, y: -60, z: -60, velocityX: 0, velocityY: 0, velocityZ: 0 }
    ],
    bonds: [
      { id: 'b1', atom1Id: 'c1', atom2Id: 'h1', type: 'single', bondLength: 109, stiffness: 45 },
      { id: 'b2', atom1Id: 'c1', atom2Id: 'h2', type: 'single', bondLength: 109, stiffness: 45 },
      { id: 'b3', atom1Id: 'c1', atom2Id: 'h3', type: 'single', bondLength: 109, stiffness: 45 },
      { id: 'b4', atom1Id: 'c1', atom2Id: 'h4', type: 'single', bondLength: 109, stiffness: 45 }
    ],
    rotationX: 0,
    rotationY: 0,
    rotationZ: 0
  },
  {
    id: 'carbon-dioxide',
    name: 'Carbon Dioxide',
    formula: 'CO₂',
    description: '二氧化碳分子 - 线性分子，碳原子在中心',
    atoms: [
      { id: 'c1', symbol: 'C', name: 'Carbon', atomicNumber: 6, color: '#333333', radius: 35, mass: 12.011, x: 0, y: 0, z: 0, velocityX: 0, velocityY: 0, velocityZ: 0 },
      { id: 'o1', symbol: 'O', name: 'Oxygen', atomicNumber: 8, color: '#EF4444', radius: 30, mass: 15.999, x: -80, y: 0, z: 0, velocityX: 0, velocityY: 0, velocityZ: 0 },
      { id: 'o2', symbol: 'O', name: 'Oxygen', atomicNumber: 8, color: '#EF4444', radius: 30, mass: 15.999, x: 80, y: 0, z: 0, velocityX: 0, velocityY: 0, velocityZ: 0 }
    ],
    bonds: [
      { id: 'b1', atom1Id: 'c1', atom2Id: 'o1', type: 'double', bondLength: 116, stiffness: 80 },
      { id: 'b2', atom1Id: 'c1', atom2Id: 'o2', type: 'double', bondLength: 116, stiffness: 80 }
    ],
    rotationX: 0,
    rotationY: 0,
    rotationZ: 0
  },
  {
    id: 'ammonia',
    name: 'Ammonia',
    formula: 'NH₃',
    description: '氨分子 - 三角锥形结构',
    atoms: [
      { id: 'n1', symbol: 'N', name: 'Nitrogen', atomicNumber: 7, color: '#3B82F6', radius: 32, mass: 14.007, x: 0, y: 0, z: 0, velocityX: 0, velocityY: 0, velocityZ: 0 },
      { id: 'h1', symbol: 'H', name: 'Hydrogen', atomicNumber: 1, color: '#FFFFFF', radius: 25, mass: 1.008, x: 70, y: 40, z: 0, velocityX: 0, velocityY: 0, velocityZ: 0 },
      { id: 'h2', symbol: 'H', name: 'Hydrogen', atomicNumber: 1, color: '#FFFFFF', radius: 25, mass: 1.008, x: -35, y: 40, z: 60, velocityX: 0, velocityY: 0, velocityZ: 0 },
      { id: 'h3', symbol: 'H', name: 'Hydrogen', atomicNumber: 1, color: '#FFFFFF', radius: 25, mass: 1.008, x: -35, y: 40, z: -60, velocityX: 0, velocityY: 0, velocityZ: 0 }
    ],
    bonds: [
      { id: 'b1', atom1Id: 'n1', atom2Id: 'h1', type: 'single', bondLength: 101, stiffness: 55 },
      { id: 'b2', atom1Id: 'n1', atom2Id: 'h2', type: 'single', bondLength: 101, stiffness: 55 },
      { id: 'b3', atom1Id: 'n1', atom2Id: 'h3', type: 'single', bondLength: 101, stiffness: 55 }
    ],
    rotationX: 0,
    rotationY: 0,
    rotationZ: 0
  }
];
