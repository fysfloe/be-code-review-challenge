export class Company {
  constructor(
    private id: number,
    private name: string,
    private slug: string,
    private city: string,
    private country: string,
    private industry: string,
    private score: number,
  ) {}
}
