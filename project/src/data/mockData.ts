import { Employee, Team, Vehicle, Incident, FireCenter } from '../types';

export const fireCenter: FireCenter = {
  id: '1',
  name: 'Regional Fire Safety Center - Sofia',
  address: 'ul. Ivan Vazov 15, Sofia 1000, Bulgaria',
  location: { lat: 42.6977, lng: 23.3219 },
  teams: ['team1', 'team2', 'team3', 'team4'],
  vehicles: ['vehicle1', 'vehicle2', 'vehicle3', 'vehicle4', 'vehicle5']
};

export const employees: Employee[] = [
  {
    id: '1',
    firstName: 'Димитър',
    lastName: 'Петров',
    individualNumber: 'FD001',
    teamId: 'team1',
    rank: 'Captain',
    status: 'busy'
  },
  {
    id: '2',
    firstName: 'Мария',
    lastName: 'Иванова',
    individualNumber: 'FD002',
    teamId: 'team1',
    rank: 'Lieutenant',
    status: 'busy'
  },
  {
    id: '3',
    firstName: 'Георги',
    lastName: 'Стоянов',
    individualNumber: 'FD003',
    teamId: 'team2',
    rank: 'Firefighter',
    status: 'free'
  },
  {
    id: '4',
    firstName: 'Елена',
    lastName: 'Николова',
    individualNumber: 'FD004',
    teamId: 'team2',
    rank: 'Firefighter',
    status: 'free'
  },
  {
    id: '5',
    firstName: 'Стефан',
    lastName: 'Димитров',
    individualNumber: 'FD005',
    teamId: 'team3',
    rank: 'Sergeant',
    status: 'standby'
  },
  {
    id: '6',
    firstName: 'Анна',
    lastName: 'Михайлова',
    individualNumber: 'FD006',
    teamId: 'team3',
    rank: 'Firefighter',
    status: 'standby'
  }
];

export const teams: Team[] = [
  {
    id: 'team1',
    name: 'Alpha Team',
    shift: 'morning',
    vehicleId: 'vehicle1',
    status: 'busy',
    members: ['1', '2']
  },
  {
    id: 'team2',
    name: 'Bravo Team',
    shift: 'afternoon',
    vehicleId: 'vehicle2',
    status: 'free',
    members: ['3', '4']
  },
  {
    id: 'team3',
    name: 'Charlie Team',
    shift: 'night',
    vehicleId: 'vehicle3',
    status: 'standby',
    members: ['5', '6']
  },
  {
    id: 'team4',
    name: 'Delta Team',
    shift: 'morning',
    status: 'free',
    members: []
  }
];

export const vehicles: Vehicle[] = [
  {
    id: 'vehicle1',
    name: 'Fire Engine 01',
    type: 'fire_truck',
    plateNumber: 'FD-001-SF',
    status: 'in_use',
    location: {
      lat: 42.7105,
      lng: 23.3281,
      address: 'ul. Vitosha 45, Sofia'
    },
    teamId: 'team1'
  },
  {
    id: 'vehicle2',
    name: 'Rescue Unit 02',
    type: 'rescue_vehicle',
    plateNumber: 'FD-002-SF',
    status: 'available',
    location: {
      lat: 42.6977,
      lng: 23.3219,
      address: 'Fire Station - ul. Ivan Vazov 15, Sofia'
    },
    teamId: 'team2'
  },
  {
    id: 'vehicle3',
    name: 'Ladder Truck 03',
    type: 'fire_truck',
    plateNumber: 'FD-003-SF',
    status: 'available',
    location: {
      lat: 42.6977,
      lng: 23.3219,
      address: 'Fire Station - ul. Ivan Vazov 15, Sofia'
    },
    teamId: 'team3'
  },
  {
    id: 'vehicle4',
    name: 'Support Vehicle 04',
    type: 'support_vehicle',
    plateNumber: 'FD-004-SF',
    status: 'maintenance',
    location: {
      lat: 42.6977,
      lng: 23.3219,
      address: 'Fire Station - Maintenance Bay'
    }
  },
  {
    id: 'vehicle5',
    name: 'Fire Engine 05',
    type: 'fire_truck',
    plateNumber: 'FD-005-SF',
    status: 'available',
    location: {
      lat: 42.6977,
      lng: 23.3219,
      address: 'Fire Station - ul. Ivan Vazov 15, Sofia'
    }
  }
];

export const incidents: Incident[] = [
  {
    id: '1',
    type: 'fire',
    location: {
      lat: 42.7105,
      lng: 23.3281,
      address: 'ul. Vitosha 45, Sofia'
    },
    reportedAt: new Date('2024-01-15T14:30:00'),
    assignedTeams: ['team1'],
    assignedVehicles: ['vehicle1'],
    status: 'on_scene',
    severity: 'high',
    description: 'Building fire in commercial area - multiple floors affected'
  },
  {
    id: '2',
    type: 'accident',
    location: {
      lat: 42.6505,
      lng: 23.3792,
      address: 'Ring Road Sofia, Exit 3'
    },
    reportedAt: new Date('2024-01-15T12:15:00'),
    resolvedAt: new Date('2024-01-15T13:45:00'),
    assignedTeams: ['team2'],
    assignedVehicles: ['vehicle2'],
    status: 'resolved',
    severity: 'medium',
    description: 'Traffic accident with trapped victims - extraction required'
  },
  {
    id: '3',
    type: 'fire',
    location: {
      lat: 42.6831,
      lng: 23.3040,
      address: 'Borisova Gradina Park, Sofia'
    },
    reportedAt: new Date('2024-01-14T16:20:00'),
    resolvedAt: new Date('2024-01-14T18:30:00'),
    assignedTeams: ['team3'],
    assignedVehicles: ['vehicle3'],
    status: 'resolved',
    severity: 'low',
    description: 'Small vegetation fire in park area'
  },
  {
    id: '4',
    type: 'rescue',
    location: {
      lat: 42.7014,
      lng: 23.3203,
      address: 'ul. Graf Ignatiev 83, Sofia'
    },
    reportedAt: new Date('2024-01-13T09:45:00'),
    resolvedAt: new Date('2024-01-13T11:20:00'),
    assignedTeams: ['team1'],
    assignedVehicles: ['vehicle1'],
    status: 'resolved',
    severity: 'medium',
    description: 'Person trapped in elevator - technical rescue operation'
  }
];