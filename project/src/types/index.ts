export interface Employee {
  id: string;
  firstName: string;
  lastName: string;
  individualNumber: string;
  teamId: string;
  rank: string;
  status: 'free' | 'busy' | 'standby';
  avatar?: string;
}

export interface Team {
  id: string;
  name: string;
  shift: 'morning' | 'afternoon' | 'night';
  vehicleId?: string;
  status: 'free' | 'busy' | 'standby';
  members: string[];
}

export interface Vehicle {
  id: string;
  name: string;
  type: 'fire_truck' | 'rescue_vehicle' | 'support_vehicle';
  plateNumber: string;
  status: 'available' | 'in_use' | 'maintenance';
  location: {
    lat: number;
    lng: number;
    address: string;
  };
  teamId?: string;
}

export interface Incident {
  id: string;
  type: 'fire' | 'accident' | 'rescue' | 'other';
  location: {
    lat: number;
    lng: number;
    address: string;
  };
  reportedAt: Date;
  resolvedAt?: Date;
  assignedTeams: string[];
  assignedVehicles: string[];
  status: 'reported' | 'responding' | 'on_scene' | 'resolved';
  severity: 'low' | 'medium' | 'high' | 'critical';
  description: string;
}

export interface FireCenter {
  id: string;
  name: string;
  address: string;
  location: {
    lat: number;
    lng: number;
  };
  teams: string[];
  vehicles: string[];
}