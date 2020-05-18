import { getCustomRepository, getRepository } from 'typeorm';

import AppError from '../errors/AppError';
import Task from '../models/Task';
import User from '../models/User';
import TasksRepository from '../repositories/TasksRepository';

interface Request {
  authorId: string;
  keyword: string;
  subKeywords: string;
  website: string;
  status: 'available';
}

class CreateTaskService {
  public async execute({
    authorId,
    keyword,
    subKeywords,
    website,
    status,
  }: Request): Promise<Task> {
    const tasksRepository = getCustomRepository(TasksRepository);
    const usersRepository = getRepository(User);

    const author = await usersRepository.findOne(authorId);

    if (!author) {
      throw new AppError('Invalid author ID.');
    }

    if (
      author.permission !== 'editor' &&
      author.permission !== 'administrator'
    ) {
      throw new AppError(
        'Only editors and administrators can create tasks.',
        401,
      );
    }

    const task = tasksRepository.create({
      fk_author: authorId,
      keyword,
      sub_keywords: subKeywords,
      website,
      status,
    });

    await tasksRepository.save(task);

    return task;
  }
}

export default CreateTaskService;
