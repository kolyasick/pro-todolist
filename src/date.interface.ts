export interface IDayItem {
  date: Date;
  tasks?: ITask[];
}

export interface ITask {
  id: string;
  title: string;
  description?: string;
  date: Date;
  is_done: boolean;

  created_at: Date;
}
