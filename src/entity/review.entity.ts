import { InvalidArgumentException } from '../exception/invalid-argument-exception';
import { Company } from './company.entity';
import { Rating } from './rating.entity';

export class Review {
  constructor(
    public id: number,
    public companyId: number,
    public title: string,
    public pro?: string,
    public contra?: string,
    public suggestions?: string,
    public user?: string,
    public rating?: Rating,
    public company?: Company,
  ) {}

  static fromArray(data: any): Review {
    let title: string = data.title;

    if (!title) {
      throw new InvalidArgumentException('"title" is missing');
    }

    title = title.trim();
    if (title.length < 10 || title.length > 200) {
      throw new InvalidArgumentException(
        '"title" must have between 10 and 200 characters',
      );
    }

    const user: string = data.user;

    if (!user) {
      throw new InvalidArgumentException('"user" is missing');
    }

    const rating: [] = data['rating'];

    if (!rating || rating.length === 0) {
      throw new InvalidArgumentException('"rating" is missing');
    }

    return new Review(
      +(data.id ?? 0),
      +data.companyId,
      title,
      data.pro ?? null,
      data.contra ?? null,
      data.suggestions ?? null,
      user,
      Rating.fromArray(data.rating),
    );
  }
}
