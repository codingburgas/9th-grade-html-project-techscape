// Mock Data for Fire Safety Management System

// Fire Center Data
const fireCenter = {
    id: '1',
    name: 'Regional Fire Safety Center - Sofia',
    address: 'ul. Ivan Vazov 15, Sofia 1000, Bulgaria',
    location: { lat: 42.6977, lng: 23.3219 },
    teams: ['team1', 'team2', 'team3', 'team4'],
    vehicles: ['vehicle1', 'vehicle2', 'vehicle3', 'vehicle4', 'vehicle5']
};

// Employees Data
const employees = [
    {
        id: '1',
        firstName: 'Виктор',
        lastName: 'Стоев',
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
        firstName: 'Симеон',
        lastName: 'Николов',
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

// Teams Data
const teams = [
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

// Vehicles Data
const vehicles = [
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

// Incidents Data
const incidents = [
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
        description: 'Building fire in commercial area - multiple floors affected',
        reporter: {
            name: 'Ivan Petrov',
            phone: '+359 888 123 456'
        }
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
        description: 'Traffic accident with trapped victims - extraction required',
        reporter: {
            name: 'Maria Georgieva',
            phone: '+359 888 234 567'
        }
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
        description: 'Small vegetation fire in park area',
        reporter: {
            name: 'Georgi Dimitrov',
            phone: '+359 888 345 678'
        }
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
        description: 'Person trapped in elevator - technical rescue operation',
        reporter: {
            name: 'Elena Stoeva',
            phone: '+359 888 456 789'
        }
    },
    {
        id: '5',
        type: 'fire',
        location: {
            lat: 42.6950,
            lng: 23.3350,
            address: 'ul. Aleksandar Stamboliyski 25, Sofia'
        },
        reportedAt: new Date('2024-01-15T16:45:00'),
        assignedTeams: ['team2'],
        assignedVehicles: ['vehicle2'],
        status: 'responding',
        severity: 'critical',
        description: 'Apartment building fire - multiple residents evacuated',
        reporter: {
            name: 'Petar Nikolov',
            phone: '+359 888 567 890'
        }
    },
    {
        id: '6',
        type: 'rescue',
        location: {
            lat: 42.6800,
            lng: 23.3100,
            address: 'Vitosha Boulevard 150, Sofia'
        },
        reportedAt: new Date('2024-01-15T18:20:00'),
        assignedTeams: ['team3'],
        assignedVehicles: ['vehicle3'],
        status: 'reported',
        severity: 'high',
        description: 'Construction accident - worker trapped under debris',
        reporter: {
            name: 'Stefan Ivanov',
            phone: '+359 888 678 901'
        }
    }
];

// Language Translations
const translations = {
    en: {
        // Navigation
        'nav.dashboard': 'Dashboard',
        'nav.incidents': 'Incidents',
        'nav.teams': 'Teams',
        'nav.vehicles': 'Vehicles',
        'nav.employees': 'Employees',
        'nav.map': 'Map',
        'nav.statistics': 'Statistics',
        
        // Status
        'status.free': 'Free',
        'status.busy': 'Busy',
        'status.standby': 'Standby',
        'status.available': 'Available',
        'status.in_use': 'In Use',
        'status.maintenance': 'Maintenance',
        'status.reported': 'Reported',
        'status.responding': 'Responding',
        'status.on_scene': 'On Scene',
        'status.resolved': 'Resolved',
        
        // Incidents
        'incident.type.fire': 'Fire',
        'incident.type.accident': 'Accident',
        'incident.type.rescue': 'Rescue',
        'incident.type.other': 'Other',
        'incident.severity.low': 'Low',
        'incident.severity.medium': 'Medium',
        'incident.severity.high': 'High',
        'incident.severity.critical': 'Critical',
        
        // Common
        'common.search': 'Search...',
        'common.noData': 'No data available'
    },
    bg: {
        // Navigation
        'nav.dashboard': 'Табло',
        'nav.incidents': 'Произшествия',
        'nav.teams': 'Екипи',
        'nav.vehicles': 'Автомобили',
        'nav.employees': 'Служители',
        'nav.map': 'Карта',
        'nav.statistics': 'Статистика',
        
        // Status
        'status.free': 'Свободен',
        'status.busy': 'Зает',
        'status.standby': 'В очакване',
        'status.available': 'Наличен',
        'status.in_use': 'В употреба',
        'status.maintenance': 'Поддръжка',
        'status.reported': 'Докладван',
        'status.responding': 'Реагиране',
        'status.on_scene': 'На място',
        'status.resolved': 'Разрешен',
        
        // Incidents
        'incident.type.fire': 'Пожар',
        'incident.type.accident': 'Катастрофа',
        'incident.type.rescue': 'Спасяване',
        'incident.type.other': 'Друго',
        'incident.severity.low': 'Нисък',
        'incident.severity.medium': 'Среден',
        'incident.severity.high': 'Висок',
        'incident.severity.critical': 'Критичен',
        
        // Common
        'common.search': 'Търсене...',
        'common.noData': 'Няма данни'
    }
};

// Current language
let currentLanguage = 'en';

// Translation function
function t(key) {
    return translations[currentLanguage][key] || key;
}

// Utility Functions
function getStatusClass(status) {
    const statusClasses = {
        'free': 'status-free',
        'busy': 'status-busy',
        'standby': 'status-standby',
        'available': 'status-available',
        'in_use': 'status-in_use',
        'maintenance': 'status-maintenance',
        'reported': 'bg-primary',
        'responding': 'bg-warning',
        'on_scene': 'bg-danger',
        'resolved': 'bg-success'
    };
    return statusClasses[status] || 'bg-secondary';
}

function getSeverityClass(severity) {
    const severityClasses = {
        'critical': 'severity-critical',
        'high': 'severity-high',
        'medium': 'severity-medium',
        'low': 'severity-low'
    };
    return severityClasses[severity] || 'bg-secondary';
}

function formatDateTime(date) {
    return new Date(date).toLocaleString();
}

function formatTime(date) {
    return new Date(date).toLocaleTimeString();
}

function formatDate(date) {
    return new Date(date).toLocaleDateString();
}

// Get team members
function getTeamMembers(teamId) {
    const team = teams.find(t => t.id === teamId);
    if (!team) return [];
    return employees.filter(emp => team.members.includes(emp.id));
}

// Get team by ID
function getTeamById(teamId) {
    return teams.find(t => t.id === teamId);
}

// Get vehicle by ID
function getVehicleById(vehicleId) {
    return vehicles.find(v => v.id === vehicleId);
}

// Get employee by ID
function getEmployeeById(employeeId) {
    return employees.find(e => e.id === employeeId);
}

// Filter functions
function filterIncidents(searchTerm = '', typeFilter = '', statusFilter = '') {
    return incidents.filter(incident => {
        const matchesSearch = !searchTerm || 
            incident.location.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
            incident.description.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesType = !typeFilter || incident.type === typeFilter;
        const matchesStatus = !statusFilter || incident.status === statusFilter;
        
        return matchesSearch && matchesType && matchesStatus;
    });
}

function filterTeams(searchTerm = '') {
    return teams.filter(team => 
        !searchTerm || 
        team.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        team.shift.toLowerCase().includes(searchTerm.toLowerCase())
    );
}

function filterVehicles(searchTerm = '', statusFilter = '') {
    return vehicles.filter(vehicle => {
        const matchesSearch = !searchTerm || 
            vehicle.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            vehicle.plateNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
            vehicle.location.address.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = !statusFilter || vehicle.status === statusFilter;
        
        return matchesSearch && matchesStatus;
    });
}

function filterEmployees(searchTerm = '', statusFilter = '') {
    return employees.filter(employee => {
        const matchesSearch = !searchTerm || 
            employee.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            employee.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            employee.individualNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
            employee.rank.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = !statusFilter || employee.status === statusFilter;
        
        return matchesSearch && matchesStatus;
    });
}

// Statistics calculations
function getStatistics() {
    const activeIncidents = incidents.filter(i => i.status !== 'resolved').length;
    const resolvedIncidents = incidents.filter(i => i.status === 'resolved').length;
    const availableVehicles = vehicles.filter(v => v.status === 'available').length;
    const totalTeams = teams.length;
    const employeesOnDuty = employees.length;
    
    return {
        activeIncidents,
        resolvedIncidents,
        totalIncidents: incidents.length,
        availableVehicles,
        totalTeams,
        employeesOnDuty
    };
}