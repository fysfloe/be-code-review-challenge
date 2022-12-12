export interface ReviewRepository {
  insertReview(companyId, title, pro, contra, suggestions, user);
}
