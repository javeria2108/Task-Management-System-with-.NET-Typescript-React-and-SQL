export type TaskDetails= {
    id: number;
    name: string;
    description: string;
    priority: string;
    category: string;
    duedate: Date;
    status: string;
  }

export type TasksState= {
  tasks: TaskDetails[];
}
