export interface Task {
    name: string;
    description: string;
    dueDate: Date;
}

export interface TaskList {
    name: string;
    tasks: Task[];
}