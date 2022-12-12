import { Company } from '../../entity/company.entity';
import { CompanyRepository } from '../../repository/company.repository';
import { CompanyService } from '../../service/company.service';

describe('Test the company service', () => {
  let companyService: CompanyService;
  let getTopRecommendedRepositoryMethod;

  beforeEach(() => {
    const companyRepository: CompanyRepository = {
      getTopRecommended: (limit: number) => {
        return new Promise((resolutionFunc) => {
          resolutionFunc([
            new Company(
              1,
              'First company',
              'first-company',
              'Vienna',
              'AT',
              'IT',
              1,
            ),
            new Company(
              4,
              'Second company',
              'second-company',
              'Berlin',
              'DE',
              'Medicine',
              1,
            ),
          ]);
        });
      },
      recalculateCompanyScore: () => {
        return;
      },
    };

    getTopRecommendedRepositoryMethod = jest.spyOn(
      companyRepository,
      'getTopRecommended',
    );

    companyService = new CompanyService(companyRepository);
  });

  it('returns top recommended companies', async () => {
    const topRecommendedCompanies = await companyService.getTopRecommended(5);

    expect(getTopRecommendedRepositoryMethod).toBeCalled();
    expect(topRecommendedCompanies).toHaveLength(2);
  });
});
