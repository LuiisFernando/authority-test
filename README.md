# Authority test #

Follow the instructions to run the program.

1. Create a new file with name ```.env``` with same informations as ```.env.example``` and input informations needed to connect with database in the root of the project.

2. Create a new database and tables to run the program, the file createDbAndTables.sql contains the queries.

3. Install dependencies with ```npm install``` or  ```yarn```

4. Run the program with ```npm run dev``` or ```yarn dev```

5. Access the application at url http://localhost:3000/.

6. Install and run a postgress image with the following command ```docker run --name database -e POSTGRESS_PASSWORD=docker -p 5432:5432 -d postgres:11.5-alpine```
