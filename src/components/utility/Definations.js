//Subcomponent report type, these will decide the action subComponentReportHandler will take when called
export const reportType = {
    CREATE: 'create',
    UPDATE: 'update',
    DELETE: 'delete'
}

export const priority = {
    LOW: 'low',
    MODERATE: 'moderate',
    HIGH: 'high'
}

export const todoSortType = {
    AGE: 'created_at',
    PRIORITY: 'priority'
}