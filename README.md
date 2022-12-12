# onlyfy Tech Challenge for Backend Developers

## Backstory

Our friends at kununu asked us to build a _next-gen_ company review API in order to help people around the world finding their **Best Place to Work**.

Now we would like you to take a look at it and give us your feedback!

## Requirements

We have created a REST-API with the following endpoints:

1. Submit a review for a company
   - A review cannot be created without: `title`, `user` and `rating` (`culture`, `management`, `work_life_balance`, `career_development)`.
   - A review `title` must have between 10 and 200 characters.
   - A `rating` must be a number between 0 and 5.
2. List of top 10 recommended companies
   - Company rating is calculated based on the average of all dimensions.

---

## Technology

This API is written in [TypeScript](https://www.typescriptlang.org/) with the [NestJS framework](https://nestjs.com/).

The data is stored in a provided MySQL database and is pre-loaded via a json array in [seed.data.ts](./src/migration/seed.data.ts) file.

### Basic Tooling

To save you trouble all components were set up inside Docker containers. So make sure you have [Docker](https://www.docker.com) and [Docker Compose](https://github.com/docker/compose) installed on your system.

Then inside the main project directory just run

_Linux or Mac_

```sh
./run.sh
```

_Windows_

```bash
run
```

Or inside `docker` directory:

```sh
docker-compose --profile=dev up --build
```

#### Endpoints

The API would be available at http://localhost:3000

Take a look at the [Postman](https://www.postman.com/) collection [here](./doc/postman/tech_challenge.postman_collection.json) to see and try the available endpoints described in the Requirements section.

#### Database

You can access the MySQL database console by running:

```sh
docker exec -it onlyfy_test_database mysql -u root -ppassword onlyfy_test
```

If you want to use another local client _outside of Docker_ then just use `localhost` instead of `onlyfy_test_database` as the hostname when configuring the connection.

#### Tests

Additionally, the tests can be executed with the following command (after the application is already running):

```sh
docker exec onlyfy_test_app npm run test
```

#### Command Line

If you want to enter the container of the application then execute the following command (after the application is already running):

```sh
docker exec -ti onlyfy_test_app sh
```

---

> ### ⚠️ Tips
>
> - We tried to implement the best code practices and standards but we all are humans, you know?
> - Experiment with the endpoints first using Postman
> - Take a look at the code to grasp the different parts/components
> - Be critic of the implementation
> - Take notes on your findings
> - Be prepared as we will ask you on your thoughts and findings in the interview
> - Have fun with this challenge! :-)
