export type TaskCategory = 'Work' | 'Personal' | 'Others';

export interface Task {
  id: number;
  title: string;
  description?: string;
  isCompleted: boolean;
  category: TaskCategory;
}
