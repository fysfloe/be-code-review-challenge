export interface RatingRepository {
  insertRating(
    reviewId: number,
    culture: number,
    management: number,
    workLifeBalance: number,
    careerDevelopment: number,
  ): Promise<number>;
}
