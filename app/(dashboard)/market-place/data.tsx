import NissanPathfinder from '@/assets/images/nissan-pathfinder.png';
import Image from 'next/image';
import React from 'react';

export const marketPlace: {
  name: string;
  data: {
    image: React.ReactNode;
    name: string;
    price: string;
    id: string;
    selected?: boolean;
  }[];
}[] = [
  {
    name: 'Cars',
    data: [
      {
        image: <Image src={NissanPathfinder} alt="Nissan Pathfinder" />,
        name: 'Nissan Pathfinder 2020',
        price: '8000000',
        id: '1',
      },
      {
        image: <Image src={NissanPathfinder} alt="Nissan Pathfinder" />,
        name: 'Nissan Pathfinder 2020',
        price: '8000000',
        id: '2',
      },
      {
        image: <Image src={NissanPathfinder} alt="Nissan Pathfinder" />,
        name: 'Nissan Pathfinder 2020',
        price: '8000000',
        id: '3',
      },
      {
        image: <Image src={NissanPathfinder} alt="Nissan Pathfinder" />,
        name: 'Nissan Pathfinder 2020',
        price: '8000000',
        id: '4',
      },
      {
        image: <Image src={NissanPathfinder} alt="Nissan Pathfinder" />,
        name: 'Nissan Pathfinder 2020',
        price: '8000000',
        id: '5',
      },
      {
        image: <Image src={NissanPathfinder} alt="Nissan Pathfinder" />,
        name: 'Nissan Pathfinder 2020',
        price: '8000000',
        id: '6',
      },
      {
        image: <Image src={NissanPathfinder} alt="Nissan Pathfinder" />,
        name: 'Nissan Pathfinder 2020',
        price: '8000000',
        id: '7',
      },
      {
        image: <Image src={NissanPathfinder} alt="Nissan Pathfinder" />,
        name: 'Nissan Pathfinder 2020',
        price: '8000000',
        id: '8',
      },
      {
        image: <Image src={NissanPathfinder} alt="Nissan Pathfinder" />,
        name: 'Nissan Pathfinder 2020',
        price: '8000000',
        id: '9',
      },
    ],
  },
  {
    name: 'Electronics',
    data: [],
  },
  {
    name: 'Household Items',
    data: [],
  },
  {
    name: 'Investment',
    data: [],
  },
  {
    name: 'Properties',
    data: [],
  },
];
