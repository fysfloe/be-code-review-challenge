import { InvalidArgumentException } from '../exception/invalid-argument-exception';

export class Rating {
  constructor(
    public id: number,
    public reviewId: number,
    public culture: number,
    public management: number,
    public workLifeBalance: number,
    public careerDevelopment: number,
  ) {}

  static fromArray(data: any) {
    const culture = +data.culture;
    const management = +data.management;
    const workLifeBalance = +data.work_life_balance;
    const careerDevelopment = +data.career_development;

    if (!Rating.isValidRating(culture)) {
      throw new InvalidArgumentException('"culture" is invalid');
    }

    if (!Rating.isValidRating(management)) {
      throw new InvalidArgumentException('"management" is invalid');
    }

    if (!Rating.isValidRating(workLifeBalance)) {
      throw new InvalidArgumentException('"work_life_balance" is invalid');
    }

    return new Rating(
      +(data.id ?? 0),
      +(data.review_id ?? 0),
      culture,
      management,
      workLifeBalance,
      careerDevelopment,
    );
  }

  static isValidRating(value) {
    return value >= 0 && value <= 5;
  }
}
