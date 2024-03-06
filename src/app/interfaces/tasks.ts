export interface Task {
    name: string;
    list: string;
    description: string;
    dueDate: Date;
}

export interface TaskList {
    name: string;
    tasks: Task[];
}