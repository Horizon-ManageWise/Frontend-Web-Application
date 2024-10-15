export class Task {
  id: number;
  title: string;
  description: string;
  status: 'Pending' | 'In Progress' | 'Complete';
  creationDate: Date;
  userStory_id: number;
  sprint: number;

  constructor(
    id: number,
    title: string,
    description: string,
    status: 'Pending' | 'In Progress' | 'Complete',
    creationDate: Date,
    userStory_id: number,
    sprint: number
  ) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.status = status;
    this.creationDate = creationDate;
    this.userStory_id = userStory_id;
    this.sprint = sprint;
  }
}
