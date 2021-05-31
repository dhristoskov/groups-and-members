import { Group } from "src/interfaces/group";

export const initialGroupsData: Group[] = [
    {
        id: '01',
        name: 'Sport Together',
        members: [
            {
                id: '001',
                first_name: 'Alex',
                last_name: 'Peters',
                userGroups: ['01']
            },
            {
                id: '002',
                first_name: 'Ivan',
                last_name: 'Stafanov',
                userGroups: ['01']
            },
            {
                id: '011',
                first_name: 'Peter',
                last_name: 'De Silva',
                userGroups: ['01', '02', '03']
            },
            {
                id: '004',
                first_name: 'Stefani',
                last_name: 'Cooper',
                userGroups: ['01']
            }
        ]
    },
    {
        id: '02',
        name: 'Outdoor Party',
        members: [
            {
                id: '005',
                first_name: 'Lidia',
                last_name: 'Olivera',
                userGroups: ['02']
            },
            {
                id: '006',
                first_name: 'Olaf',
                last_name: 'Thomas',
                userGroups: ['02', '03']
            },
            {
                id: '011',
                first_name: 'Peter',
                last_name: 'De Silva',
                userGroups: ['01', '02', '03']
            },
            {
                id: '012',
                first_name: 'Maria',
                last_name: 'Magdalena',
                userGroups: ['02', '03']
            }
        ]
    },
    {
        id: '03',
        name: 'Office Party',
        members: [
            {
                id: '009',
                first_name: 'Livia',
                last_name: 'Snatos',
                userGroups: ['03']
            },
            {
                id: '006',
                first_name: 'Olaf',
                last_name: 'Thomas',
                userGroups: ['02', '03']
            },
            {
                id: '011',
                first_name: 'Peter',
                last_name: 'De Silva',
                userGroups: ['01', '02', '03']
            },
            {
                id: '012',
                first_name: 'Maria',
                last_name: 'Magdalena',
                userGroups: ['02', '03']
            },
            {
                id: '013',
                first_name: 'Julia',
                last_name: 'Hristova',
                userGroups: ['03']
            }
        ]
    }
]