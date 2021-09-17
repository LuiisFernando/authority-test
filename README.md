# Authority test #

Follow the instructions to run the program.

1. Install and run a postgress image with the following command ```docker run --name database -e POSTGRESS_PASSWORD=docker -p 5432:5432 -d postgres:11.5-alpine```
 
2. Create a new file with name ```.env``` with same informations as ```.env.example``` and input informations needed to connect with database in the root of the project.

3. Create a new database and tables to run the program, the file createDbAndTables.sql contains the queries.

4. Install dependencies with ```npm install``` or  ```yarn```

5. Run the program with ```npm run dev``` or ```yarn dev```

6. Access the application at url http://localhost:3000/.


