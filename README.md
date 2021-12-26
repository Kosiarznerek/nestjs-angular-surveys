# Surveys
This is simple project which allows to create surveys and collect statistics.

## Requirements
- NodeJS v16.13.1
- Angular CLI v13.0.4
- NestJS CLI v8.1.6

## Project run
```bash
npm ci
npm run ci:backend
npm run ci:frontend
```

## Sample database
- Copy sample database
    ```
    cp backend/sample-database backend/dist/ 
    rm -rf backend/dist/database  
    mv backend/dist/sample-database backend/dist/database
    ```
- Use and enjoy sample survey
    ```
    Identifier: c6769b1a-17ca-41eb-b0be-6cea19f7a778
    Authentication token: e0e1b912-36b1-4e5a-b261-cd8c7971d4bf
    ```

## TODO
- Respect question time limit
- Add validation check on date questions
- Add calidation check on select questions