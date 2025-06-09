// Main Application JavaScript

// Global Variables
let map;
let currentSection = 'dashboard';

// Initialize Application
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
    showSection('dashboard');
    updateStatistics();
    
    // Set up event listeners
    setupEventListeners();
    
    // Initialize charts
    setTimeout(initializeCharts, 500);
});

// Initialize Application
function initializeApp() {
    console.log('Fire Safety Management System Initialized');
    
    // Load initial data
    loadDashboardData();
    
    // Set up periodic updates
    setInterval(updateStatistics, 30000); // Update every 30 seconds
}

// Setup Event Listeners
function setupEventListeners() {
    // Search filters
    const incidentSearch = document.getElementById('incidentSearch');
    const incidentTypeFilter = document.getElementById('incidentTypeFilter');
    const incidentStatusFilter = document.getElementById('incidentStatusFilter');
    
    if (incidentSearch) {
        incidentSearch.addEventListener('input', () => loadIncidentsData());
    }
    if (incidentTypeFilter) {
        incidentTypeFilter.addEventListener('change', () => loadIncidentsData());
    }
    if (incidentStatusFilter) {
        incidentStatusFilter.addEventListener('change', () => loadIncidentsData());
    }
    
    // Team search
    const teamSearch = document.getElementById('teamSearch');
    if (teamSearch) {
        teamSearch.addEventListener('input', () => loadTeamsData());
    }
    
    // Vehicle filters
    const vehicleSearch = document.getElementById('vehicleSearch');
    const vehicleStatusFilter = document.getElementById('vehicleStatusFilter');
    
    if (vehicleSearch) {
        vehicleSearch.addEventListener('input', () => loadVehiclesData());
    }
    if (vehicleStatusFilter) {
        vehicleStatusFilter.addEventListener('change', () => loadVehiclesData());
    }
    
    // Employee filters
    const employeeSearch = document.getElementById('employeeSearch');
    const employeeStatusFilter = document.getElementById('employeeStatusFilter');
    
    if (employeeSearch) {
        employeeSearch.addEventListener('input', () => loadEmployeesData());
    }
    if (employeeStatusFilter) {
        employeeStatusFilter.addEventListener('change', () => loadEmployeesData());
    }
}

// Navigation Functions
function showSection(sectionName) {
    // Hide all sections
    const sections = document.querySelectorAll('.content-section');
    sections.forEach(section => {
        section.classList.add('d-none');
    });
    
    // Show selected section
    const targetSection = document.getElementById(sectionName + '-section');
    if (targetSection) {
        targetSection.classList.remove('d-none');
        targetSection.classList.add('fade-in');
    }
    
    // Update navigation
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('data-section') === sectionName) {
            link.classList.add('active');
        }
    });
    
    currentSection = sectionName;
    
    // Load section-specific data
    switch(sectionName) {
        case 'dashboard':
            loadDashboardData();
            break;
        case 'incidents':
            loadIncidentsData();
            break;
        case 'teams':
            loadTeamsData();
            break;
        case 'vehicles':
            loadVehiclesData();
            break;
        case 'employees':
            loadEmployeesData();
            break;
        case 'map':
            setTimeout(initializeMap, 100);
            break;
        case 'statistics':
            setTimeout(initializeCharts, 100);
            break;
    }
}

// Language Toggle
function toggleLanguage() {
    currentLanguage = currentLanguage === 'en' ? 'bg' : 'en';
    document.getElementById('currentLang').textContent = currentLanguage.toUpperCase();
    
    // Reload current section to apply translations
    showSection(currentSection);
}

// Update Statistics
function updateStatistics() {
    const stats = getStatistics();
    
    // Update dashboard stats
    const activeIncidentsCount = document.getElementById('activeIncidentsCount');
    const totalTeamsCount = document.getElementById('totalTeamsCount');
    const availableVehiclesCount = document.getElementById('availableVehiclesCount');
    const employeesOnDutyCount = document.getElementById('employeesOnDutyCount');
    
    if (activeIncidentsCount) activeIncidentsCount.textContent = stats.activeIncidents;
    if (totalTeamsCount) totalTeamsCount.textContent = stats.totalTeams;
    if (availableVehiclesCount) availableVehiclesCount.textContent = stats.availableVehicles;
    if (employeesOnDutyCount) employeesOnDutyCount.textContent = stats.employeesOnDuty;
    
    // Update map stats
    const mapAvailableVehicles = document.getElementById('mapAvailableVehicles');
    const mapActiveIncidents = document.getElementById('mapActiveIncidents');
    
    if (mapAvailableVehicles) mapAvailableVehicles.textContent = stats.availableVehicles;
    if (mapActiveIncidents) mapActiveIncidents.textContent = stats.activeIncidents;
    
    // Update statistics page
    const totalIncidentsCount = document.getElementById('totalIncidentsCount');
    const resolvedIncidentsCount = document.getElementById('resolvedIncidentsCount');
    const activeIncidentsStatsCount = document.getElementById('activeIncidentsStatsCount');
    
    if (totalIncidentsCount) totalIncidentsCount.textContent = stats.totalIncidents;
    if (resolvedIncidentsCount) resolvedIncidentsCount.textContent = stats.resolvedIncidents;
    if (activeIncidentsStatsCount) activeIncidentsStatsCount.textContent = stats.activeIncidents;
}

// Load Dashboard Data
function loadDashboardData() {
    loadActiveIncidents();
    loadTeamStatus();
}

// Load Active Incidents for Dashboard
function loadActiveIncidents() {
    const container = document.getElementById('activeIncidentsList');
    if (!container) return;
    
    const activeIncidents = incidents.filter(i => i.status !== 'resolved');
    
    if (activeIncidents.length === 0) {
        container.innerHTML = `
            <div class="text-center py-4">
                <i class="bi bi-check-circle text-success fs-1"></i>
                <p class="text-muted mt-2">No active incidents</p>
            </div>
        `;
        return;
    }
    
    container.innerHTML = activeIncidents.map(incident => `
        <div class="border rounded-3 p-3 mb-3 hover-lift">
            <div class="d-flex justify-content-between align-items-start mb-2">
                <div class="d-flex align-items-center">
                    <span class="badge ${getSeverityClass(incident.severity)} me-2">
                        ${t('incident.severity.' + incident.severity)}
                    </span>
                    <span class="fw-medium">${t('incident.type.' + incident.type)}</span>
                </div>
                <span class="badge ${getStatusClass(incident.status)}">
                    ${t('status.' + incident.status)}
                </span>
            </div>
            <div class="d-flex align-items-center text-muted mb-1">
                <i class="bi bi-geo-alt me-1"></i>
                <small>${incident.location.address}</small>
            </div>
            <div class="d-flex align-items-center text-muted">
                <i class="bi bi-clock me-1"></i>
                <small>${formatTime(incident.reportedAt)}</small>
            </div>
        </div>
    `).join('');
}

// Load Team Status for Dashboard
function loadTeamStatus() {
    const container = document.getElementById('teamStatusList');
    if (!container) return;
    
    container.innerHTML = teams.map(team => `
        <div class="d-flex justify-content-between align-items-center p-3 border rounded-3 mb-3 hover-lift">
            <div>
                <h6 class="mb-1">${team.name}</h6>
                <small class="text-muted text-capitalize">${team.shift} Shift</small>
                <div class="text-muted">
                    <small>${team.members.length} members</small>
                </div>
            </div>
            <div class="text-end">
                <span class="badge ${getStatusClass(team.status)}">
                    ${t('status.' + team.status)}
                </span>
                ${team.status === 'busy' ? `
                    <div class="d-flex align-items-center justify-content-end mt-1">
                        <div class="bg-danger rounded-circle me-1" style="width: 6px; height: 6px;"></div>
                        <small class="text-danger">On call</small>
                    </div>
                ` : ''}
            </div>
        </div>
    `).join('');
}

// Load Incidents Data
function loadIncidentsData() {
    const container = document.getElementById('incidentsList');
    if (!container) return;
    
    const searchTerm = document.getElementById('incidentSearch')?.value || '';
    const typeFilter = document.getElementById('incidentTypeFilter')?.value || '';
    const statusFilter = document.getElementById('incidentStatusFilter')?.value || '';
    
    const filteredIncidents = filterIncidents(searchTerm, typeFilter, statusFilter);
    
    if (filteredIncidents.length === 0) {
        container.innerHTML = `
            <div class="text-center py-5">
                <i class="bi bi-exclamation-triangle text-muted" style="font-size: 3rem;"></i>
                <p class="text-muted mt-3">${t('common.noData')}</p>
            </div>
        `;
        return;
    }
    
    container.innerHTML = filteredIncidents.map(incident => `
        <div class="card mb-4 hover-lift">
            <div class="card-body">
                <div class="d-flex justify-content-between align-items-start mb-3">
                    <div class="d-flex align-items-center">
                        <div class="bg-danger bg-opacity-10 p-2 rounded me-3">
                            <i class="bi bi-exclamation-triangle text-danger"></i>
                        </div>
                        <div>
                            <h5 class="mb-1">${t('incident.type.' + incident.type)} - #${incident.id}</h5>
                            <div class="d-flex align-items-center">
                                <span class="badge ${getSeverityClass(incident.severity)} me-2">
                                    ${t('incident.severity.' + incident.severity)}
                                </span>
                                <span class="badge ${getStatusClass(incident.status)}">
                                    ${t('status.' + incident.status)}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="row mb-3">
                    <div class="col-md-6">
                        <div class="d-flex align-items-center text-muted mb-2">
                            <i class="bi bi-geo-alt me-2"></i>
                            <span>${incident.location.address}</span>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="d-flex align-items-center text-muted mb-2">
                            <i class="bi bi-clock me-2"></i>
                            <span>${formatDateTime(incident.reportedAt)}</span>
                        </div>
                    </div>
                </div>
                
                <p class="text-muted mb-3">${incident.description}</p>
                
                <div class="d-flex justify-content-between align-items-center pt-3 border-top">
                    <div class="text-muted">
                        <small>Teams: ${incident.assignedTeams.length} | Vehicles: ${incident.assignedVehicles.length}</small>
                    </div>
                    ${incident.resolvedAt ? `
                        <div class="text-success">
                            <small>Resolved: ${formatTime(incident.resolvedAt)}</small>
                        </div>
                    ` : ''}
                </div>
            </div>
        </div>
    `).join('');
}

// Load Teams Data
function loadTeamsData() {
    const container = document.getElementById('teamsGrid');
    if (!container) return;
    
    const searchTerm = document.getElementById('teamSearch')?.value || '';
    const filteredTeams = filterTeams(searchTerm);
    
    if (filteredTeams.length === 0) {
        container.innerHTML = `
            <div class="col-12 text-center py-5">
                <i class="bi bi-people text-muted" style="font-size: 3rem;"></i>
                <p class="text-muted mt-3">${t('common.noData')}</p>
            </div>
        `;
        return;
    }
    
    container.innerHTML = filteredTeams.map(team => {
        const teamMembers = getTeamMembers(team.id);
        
        return `
            <div class="col-lg-4 col-md-6 mb-4">
                <div class="card h-100 hover-lift">
                    <div class="card-body">
                        <div class="d-flex justify-content-between align-items-start mb-3">
                            <div class="d-flex align-items-center">
                                <div class="bg-primary bg-opacity-10 p-2 rounded me-3">
                                    <i class="bi bi-people text-primary"></i>
                                </div>
                                <div>
                                    <h5 class="mb-1">${team.name}</h5>
                                    <div class="d-flex align-items-center text-muted">
                                        <i class="bi bi-clock me-1"></i>
                                        <small class="text-capitalize">${team.shift} Shift</small>
                                    </div>
                                </div>
                            </div>
                            <span class="badge ${getStatusClass(team.status)}">
                                ${t('status.' + team.status)}
                            </span>
                        </div>
                        
                        <div class="mb-3">
                            <h6 class="text-muted mb-2">Team Members (${teamMembers.length})</h6>
                            ${teamMembers.length > 0 ? `
                                <div class="list-group list-group-flush">
                                    ${teamMembers.map(member => `
                                        <div class="list-group-item d-flex justify-content-between align-items-center px-0 py-2">
                                            <div class="d-flex align-items-center">
                                                <i class="bi bi-person me-2 text-muted"></i>
                                                <div>
                                                    <div class="fw-medium">${member.firstName} ${member.lastName}</div>
                                                    <small class="text-muted">${member.rank} - ${member.individualNumber}</small>
                                                </div>
                                            </div>
                                            <span class="badge ${getStatusClass(member.status)} badge-sm">
                                                ${t('status.' + member.status)}
                                            </span>
                                        </div>
                                    `).join('')}
                                </div>
                            ` : `
                                <p class="text-muted text-center py-3">No assigned members</p>
                            `}
                        </div>
                        
                        ${team.vehicleId ? `
                            <div class="border-top pt-3">
                                <small class="text-muted">Assigned Vehicle: <span class="fw-medium">${team.vehicleId}</span></small>
                            </div>
                        ` : ''}
                    </div>
                </div>
            </div>
        `;
    }).join('');
}

// Load Vehicles Data
function loadVehiclesData() {
    const container = document.getElementById('vehiclesGrid');
    if (!container) return;
    
    const searchTerm = document.getElementById('vehicleSearch')?.value || '';
    const statusFilter = document.getElementById('vehicleStatusFilter')?.value || '';
    const filteredVehicles = filterVehicles(searchTerm, statusFilter);
    
    if (filteredVehicles.length === 0) {
        container.innerHTML = `
            <div class="col-12 text-center py-5">
                <i class="bi bi-truck text-muted" style="font-size: 3rem;"></i>
                <p class="text-muted mt-3">${t('common.noData')}</p>
            </div>
        `;
        return;
    }
    
    container.innerHTML = filteredVehicles.map(vehicle => {
        const assignedTeam = getTeamById(vehicle.teamId);
        
        return `
            <div class="col-lg-6 mb-4">
                <div class="card h-100 hover-lift">
                    <div class="card-body">
                        <div class="d-flex justify-content-between align-items-start mb-3">
                            <div class="d-flex align-items-center">
                                <div class="bg-danger bg-opacity-10 p-2 rounded me-3">
                                    <i class="bi bi-truck text-danger"></i>
                                </div>
                                <div>
                                    <h5 class="mb-1">${vehicle.name}</h5>
                                    <small class="text-muted">${vehicle.plateNumber}</small>
                                </div>
                            </div>
                            <div class="text-end">
                                <span class="badge ${getStatusClass(vehicle.status)} mb-1">
                                    ${t('status.' + (vehicle.status === 'in_use' ? 'in_use' : vehicle.status))}
                                </span>
                                <div>
                                    <span class="badge bg-secondary text-uppercase" style="font-size: 0.65em;">
                                        ${vehicle.type.replace('_', ' ')}
                                    </span>
                                </div>
                            </div>
                        </div>
                        
                        <div class="d-flex align-items-center text-muted mb-3">
                            <i class="bi bi-geo-alt me-2"></i>
                            <span>${vehicle.location.address}</span>
                        </div>
                        
                        <div class="mb-3">
                            ${vehicle.status === 'maintenance' ? `
                                <div class="alert alert-warning py-2">
                                    <div class="d-flex align-items-center">
                                        <i class="bi bi-wrench me-2"></i>
                                        <small>Vehicle under maintenance</small>
                                    </div>
                                </div>
                            ` : ''}
                            
                            ${assignedTeam ? `
                                <div class="alert alert-info py-2">
                                    <div class="d-flex align-items-center">
                                        <i class="bi bi-people me-2"></i>
                                        <div>
                                            <small>Assigned to: <strong>${assignedTeam.name}</strong></small>
                                            <div class="text-muted" style="font-size: 0.75em;">
                                                ${assignedTeam.shift} shift - ${assignedTeam.members.length} members
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ` : ''}
                            
                            ${vehicle.status === 'available' ? `
                                <div class="alert alert-success py-2">
                                    <div class="d-flex align-items-center">
                                        <div class="bg-success rounded-circle me-2" style="width: 8px; height: 8px;"></div>
                                        <small>Ready for deployment</small>
                                    </div>
                                </div>
                            ` : ''}
                        </div>
                        
                        <div class="border-top pt-3">
                            <div class="row text-center">
                                <div class="col-6">
                                    <small class="text-muted">Type</small>
                                    <div class="fw-medium text-capitalize">${vehicle.type.replace('_', ' ')}</div>
                                </div>
                                <div class="col-6">
                                    <small class="text-muted">Coordinates</small>
                                    <div class="fw-medium">${vehicle.location.lat.toFixed(4)}, ${vehicle.location.lng.toFixed(4)}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }).join('');
}

// Load Employees Data
function loadEmployeesData() {
    const container = document.getElementById('employeesGrid');
    if (!container) return;
    
    const searchTerm = document.getElementById('employeeSearch')?.value || '';
    const statusFilter = document.getElementById('employeeStatusFilter')?.value || '';
    const filteredEmployees = filterEmployees(searchTerm, statusFilter);
    
    if (filteredEmployees.length === 0) {
        container.innerHTML = `
            <div class="col-12 text-center py-5">
                <i class="bi bi-person-badge text-muted" style="font-size: 3rem;"></i>
                <p class="text-muted mt-3">${t('common.noData')}</p>
            </div>
        `;
        return;
    }
    
    container.innerHTML = filteredEmployees.map(employee => {
        const team = getTeamById(employee.teamId);
        
        return `
            <div class="col-lg-4 col-md-6 mb-4">
                <div class="card h-100 hover-lift">
                    <div class="card-body">
                        <div class="d-flex justify-content-between align-items-start mb-3">
                            <div class="d-flex align-items-center">
                                <div class="bg-primary bg-opacity-10 p-2 rounded me-3">
                                    <i class="bi bi-person text-primary"></i>
                                </div>
                                <div>
                                    <h5 class="mb-1">${employee.firstName} ${employee.lastName}</h5>
                                    <small class="text-muted">ID: ${employee.individualNumber}</small>
                                </div>
                            </div>
                            <span class="badge ${getStatusClass(employee.status)}">
                                ${t('status.' + employee.status)}
                            </span>
                        </div>
                        
                        <div class="d-flex align-items-center mb-3">
                            <i class="bi bi-shield text-muted me-2"></i>
                            <span class="badge bg-secondary">${employee.rank}</span>
                        </div>
                        
                        ${team ? `
                            <div class="alert alert-light py-2 mb-3">
                                <div class="d-flex align-items-center">
                                    <i class="bi bi-people me-2 text-muted"></i>
                                    <div>
                                        <div class="fw-medium">${team.name}</div>
                                        <small class="text-muted text-capitalize">
                                            ${team.shift} shift - ${t('status.' + team.status)}
                                        </small>
                                    </div>
                                </div>
                            </div>
                        ` : ''}
                        
                        <div class="mb-3">
                            ${employee.status === 'busy' ? `
                                <div class="alert alert-danger py-2">
                                    <div class="d-flex align-items-center">
                                        <div class="bg-danger rounded-circle me-2 pulse-gentle" style="width: 8px; height: 8px;"></div>
                                        <small>Currently on emergency call</small>
                                    </div>
                                </div>
                            ` : ''}
                            
                            ${employee.status === 'standby' ? `
                                <div class="alert alert-warning py-2">
                                    <div class="d-flex align-items-center">
                                        <div class="bg-warning rounded-circle me-2" style="width: 8px; height: 8px;"></div>
                                        <small>On standby - ready for deployment</small>
                                    </div>
                                </div>
                            ` : ''}
                            
                            ${employee.status === 'free' ? `
                                <div class="alert alert-success py-2">
                                    <div class="d-flex align-items-center">
                                        <div class="bg-success rounded-circle me-2" style="width: 8px; height: 8px;"></div>
                                        <small>Available for assignment</small>
                                    </div>
                                </div>
                            ` : ''}
                        </div>
                        
                        <div class="border-top pt-3">
                            <small class="text-muted">Years of Service</small>
                            <div class="fw-medium">${Math.floor(Math.random() * 15) + 1} years</div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }).join('');
}

// Initialize Map
function initializeMap() {
    if (map) {
        map.remove();
    }
    
    // Initialize map
    map = L.map('map').setView([42.6977, 23.3219], 12);
    
    // Add tile layer
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
    }).addTo(map);
    
    // Fire center marker
    const fireCenterIcon = L.divIcon({
        html: `<div class="d-flex align-items-center justify-content-center bg-danger text-white rounded-circle shadow" style="width: 40px; height: 40px;">
                 <i class="bi bi-star-fill"></i>
               </div>`,
        className: 'custom-marker',
        iconSize: [40, 40],
        iconAnchor: [20, 20]
    });
    
    L.marker([fireCenter.location.lat, fireCenter.location.lng], { icon: fireCenterIcon })
        .addTo(map)
        .bindPopup(`
            <div class="p-2">
                <h6 class="fw-bold mb-1">${fireCenter.name}</h6>
                <p class="mb-1 text-muted">${fireCenter.address}</p>
                <small class="text-danger">
                    <i class="bi bi-star-fill me-1"></i>Fire Station Headquarters
                </small>
            </div>
        `);
    
    // Vehicle markers
    vehicles.forEach(vehicle => {
        const isAvailable = vehicle.status === 'available';
        const isInUse = vehicle.status === 'in_use';
        const statusColor = isAvailable ? 'success' : isInUse ? 'danger' : 'warning';
        
        const vehicleIcon = L.divIcon({
            html: `<div class="d-flex align-items-center justify-content-center bg-${statusColor} text-white rounded-circle shadow" style="width: 32px; height: 32px;">
                     <i class="bi bi-truck"></i>
                   </div>`,
            className: 'custom-marker',
            iconSize: [32, 32],
            iconAnchor: [16, 16]
        });
        
        L.marker([vehicle.location.lat, vehicle.location.lng], { icon: vehicleIcon })
            .addTo(map)
            .bindPopup(`
                <div class="p-2">
                    <h6 class="fw-bold mb-1">${vehicle.name}</h6>
                    <p class="mb-1">${vehicle.plateNumber}</p>
                    <span class="badge ${getStatusClass(vehicle.status)} mb-1">
                        ${t('status.' + (vehicle.status === 'in_use' ? 'in_use' : vehicle.status))}
                    </span>
                    <p class="mb-0 text-muted small">${vehicle.location.address}</p>
                </div>
            `);
    });
    
    // Incident markers
    incidents.forEach(incident => {
        const isActive = incident.status !== 'resolved';
        const severityColor = 
            incident.severity === 'critical' ? 'danger' :
            incident.severity === 'high' ? 'warning' :
            incident.severity === 'medium' ? 'info' : 'primary';
        
        const incidentIcon = L.divIcon({
            html: `<div class="d-flex align-items-center justify-content-center bg-${severityColor} text-white rounded-circle shadow ${isActive ? 'pulse-gentle' : ''}" style="width: 32px; height: 32px; opacity: ${isActive ? '1' : '0.7'};">
                     <i class="bi bi-exclamation-triangle"></i>
                   </div>`,
            className: 'custom-marker',
            iconSize: [32, 32],
            iconAnchor: [16, 16]
        });
        
        L.marker([incident.location.lat, incident.location.lng], { icon: incidentIcon })
            .addTo(map)
            .bindPopup(`
                <div class="p-2">
                    <h6 class="fw-bold mb-1">${t('incident.type.' + incident.type).toUpperCase()} #${incident.id}</h6>
                    <p class="mb-2">${incident.description}</p>
                    <p class="mb-2 text-muted small">${incident.location.address}</p>
                    <div class="d-flex justify-content-between mb-2">
                        <span class="badge ${getSeverityClass(incident.severity)}">${t('incident.severity.' + incident.severity)}</span>
                        <span class="badge ${getStatusClass(incident.status)}">${t('status.' + incident.status)}</span>
                    </div>
                    <small class="text-muted">${formatDateTime(incident.reportedAt)}</small>
                </div>
            `);
    });
}

// Initialize Charts
function initializeCharts() {
    // Incident Types Chart
    const incidentTypesCtx = document.getElementById('incidentTypesChart');
    if (incidentTypesCtx) {
        new Chart(incidentTypesCtx, {
            type: 'doughnut',
            data: {
                labels: ['Fire', 'Accident', 'Rescue', 'Other'],
                datasets: [{
                    data: [
                        incidents.filter(i => i.type === 'fire').length,
                        incidents.filter(i => i.type === 'accident').length,
                        incidents.filter(i => i.type === 'rescue').length,
                        incidents.filter(i => i.type === 'other').length
                    ],
                    backgroundColor: [
                        '#dc3545',
                        '#fd7e14',
                        '#0d6efd',
                        '#6c757d'
                    ],
                    borderWidth: 2,
                    borderColor: '#fff'
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'right'
                    }
                }
            }
        });
    }
    
    // Response Time Chart
    const responseTimeCtx = document.getElementById('responseTimeChart');
    if (responseTimeCtx) {
        new Chart(responseTimeCtx, {
            type: 'bar',
            data: {
                labels: ['< 5 min', '5-10 min', '10-15 min', '15-20 min', '> 20 min'],
                datasets: [{
                    label: 'Response Times',
                    data: [25, 35, 20, 15, 5],
                    backgroundColor: [
                        '#198754',
                        '#0d6efd',
                        '#ffc107',
                        '#fd7e14',
                        '#dc3545'
                    ],
                    borderRadius: 4
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        beginAtZero: true
                    }
                },
                plugins: {
                    legend: {
                        display: false
                    }
                }
            }
        });
    }
    
    // Monthly Trend Chart
    const monthlyTrendCtx = document.getElementById('monthlyTrendChart');
    if (monthlyTrendCtx) {
        new Chart(monthlyTrendCtx, {
            type: 'line',
            data: {
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
                datasets: [
                    {
                        label: 'Fire Incidents',
                        data: [12, 8, 15, 10, 6, 9],
                        borderColor: '#dc3545',
                        backgroundColor: 'rgba(220, 53, 69, 0.1)',
                        tension: 0.4,
                        fill: true
                    },
                    {
                        label: 'Other Incidents',
                        data: [5, 7, 3, 8, 4, 6],
                        borderColor: '#0d6efd',
                        backgroundColor: 'rgba(13, 110, 253, 0.1)',
                        tension: 0.4,
                        fill: true
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    }
}

// Incident Report Functions
function getCurrentLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                document.getElementById('incidentLat').value = position.coords.latitude.toFixed(6);
                document.getElementById('incidentLng').value = position.coords.longitude.toFixed(6);
            },
            (error) => {
                console.error('Error getting location:', error);
                alert('Unable to get current location. Please enter coordinates manually.');
            }
        );
    } else {
        alert('Geolocation is not supported by this browser.');
    }
}

function submitIncidentReport() {
    const form = document.getElementById('incidentReportForm');
    if (!form.checkValidity()) {
        form.reportValidity();
        return;
    }
    
    const newIncident = {
        id: (incidents.length + 1).toString(),
        type: document.getElementById('incidentType').value,
        severity: document.getElementById('incidentSeverity').value,
        location: {
            address: document.getElementById('incidentAddress').value,
            lat: parseFloat(document.getElementById('incidentLat').value) || (42.6977 + (Math.random() - 0.5) * 0.1),
            lng: parseFloat(document.getElementById('incidentLng').value) || (23.3219 + (Math.random() - 0.5) * 0.1)
        },
        description: document.getElementById('incidentDescription').value,
        reportedAt: new Date(),
        status: 'reported',
        assignedTeams: [],
        assignedVehicles: [],
        reporter: {
            name: document.getElementById('reporterName').value,
            phone: document.getElementById('reporterPhone').value
        }
    };
    
    incidents.unshift(newIncident);
    
    // Close modal
    const modal = bootstrap.Modal.getInstance(document.getElementById('reportIncidentModal'));
    modal.hide();
    
    // Reset form
    form.reset();
    
    // Show success message
    alert('Incident reported successfully! Emergency services have been notified.');
    
    // Refresh data
    updateStatistics();
    if (currentSection === 'incidents') {
        loadIncidentsData();
    }
    if (currentSection === 'dashboard') {
        loadDashboardData();
    }
}