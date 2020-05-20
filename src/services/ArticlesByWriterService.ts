import { getCustomRepository } from 'typeorm';

import Task from '../models/Task';
import TasksRepository from '../repositories/TasksRepository';

class ArticlesByThisWriterService {
  public async execute(writerId: string): Promise<Task[]> {
    const tasksRepository = getCustomRepository(TasksRepository);

    const tasksByWriter = await tasksRepository.find({
      where: { fk_writer: writerId },
    });

    return tasksByWriter;
  }
}

export default ArticlesByThisWriterService;
