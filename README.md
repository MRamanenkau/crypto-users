# Crypto Users REST API
This repository contains a REST API server built with NestJS and TypeScript, designed to manage user data with a PostgreSQL database. The API currently supports creating users with unique email addresses and querying all users, with plans to expand to approximately 20 endpoints and 10 database tables for production.

## Getting Started
### Prerequisites
* Node.js: v20 or higher
* npm: v10 or higher
* Docker v28 or higher
* Docker Compose v2.33.1 or higher
* Note: Lower versions of Node.js, npm, and Docker may work, but there is no guarantee of compatibility.

### Setup Development Environment
1. Clone the Repository
   ```
   git clone git@github.com:MRamanenkau/crypto-users.git
   cd crypto-users
   ```
2. Install Nest.js CLI globally
   ```
   npm install -g @nestjs/cli
   ```
3. Install Dependencies
   ```
   npm install
   ```
4. Configure Environment Variables
   ```
   cp .env.example .env
   ```
5. Set Up PostgreSQL
    ```
    docker compose up postgres 
    ```
6. Start the Development Server
   ```
   npm run start:dev
   ```
    * The API will be available at http://localhost:3000.
7. Optional: run both the Development Server and the Database with Docker Compose
   ```
   docker compose up
   ```
8. Run Integration Tests
   ```
   npm run test
   ```
   * Tests cover the user creation and retrieval endpoints, ensuring unique email constraints.

## Development Roadmap
The table below outlines the prioritized tasks to achieve a production-grade REST API. These tasks address security, performance, maintainability, scalability, and development experience to support sustainable development and maintenance.

| Item                                                                                 | Rationale                                                                                                                                                                                                                                                |
|--------------------------------------------------------------------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Enforce 2FA, limit write access to developers, and use branch protection for main    | Enforce two-factor (2FA) and restrict write access developers to prevent unauthorized changes. Branch protection ensures code reviews and CI checks pass before merging, enhancing security and code quality.                                            |
| Enable GHAS for CodeQL, secret scanning, and Dependabot. Set up GitGuardian and Snyk | GitHub Advanced Security (GHAS) with CodeQL scans for vulnerabilities like SQL injection and XSS. Secret scanning and GitGuardian detect exposed credentials in code. Dependabot and Snyk manage dependency vulnerabilities, ensuring a secure codebase. |
| Set up signed commits and artifacts                                                  | Require signed commits to verify authorship and integrity. Signed artifacts ensure deployed binaries are untampered, critical for secure CI/CD pipelines and auditability.                                                                               |
| Configure tslint, prettier, gitlint with company style guidelines                    | Standardize code formatting with tslint, prettier, and gitlint to align with company style, improving readability and speeding up code reviews by reducing stylistic debates.                                                                            |
| Configure pre-commit hooks for style and credential checks                           | Pre-commit hooks enforce style guidelines and scan for credentials before commits, reducing errors and security risks early in the development process.                                                                                                  |
| Establish code review policy and PR templates                                        | Define a code review policy requiring at least one senior developer approval. PR templates ensure reviews check for security, best practices, and optimization, improving development experience and code quality.                                       |
| Document (or use existing) branching strategy                                        | Working with branches and releases must be clear to speed up review process and avoid deployment mistakes.                                                                                                                                               |
| Set up development and testing environments                                          | Simplify development and testing processes.                                                                                                                                                                                                              |
| Add test coverage reporting                                                          | Integrate tools like Istanbul to generate test coverage reports, helping developers identify untested code paths and improve stability.                                                                                                                  |
| Set up API versioning                                                                | Allow evolve API safely.                                                                                                                                                                                                                                 |
| Enable HTTP Strict Transport Security (HSTS)                                         | Improve usability by forcing browsers to use HTTPS.                                                                                                                                                                                                      |
| Add input validation and sanitization                                                | Use class-validator to validate and sanitize inputs, preventing injection attacks and malformed data, enhancing security.                                                                                                                                |
| Limit Payload Size                                                                   | Prevent denial-of-service (DoS) attacks by limiting request body size.                                                                                                                                                                                   |
| Prevent Cross-Site Request Forgery (CSRF)                                            | Improve security of sensitive actions.                                                                                                                                                                                                                   |
| Configure CORS                                                                       | Improve security by restricting cross-origin requests to trusted domains.                                                                                                                                                                                |
| Implement Role-Based Access Control (RBAC)                                           | Improve security by protecting sensetive endpoints.                                                                                                                                                                                                      |
| Add logging                                                                          | Implement Winston for structured logging to capture API events, errors, and security incidents, aiding debugging and monitoring.                                                                                                                         |
| Set up production-grade containerized deployment                                     | Use Docker for reproducible, scalable deployments in a public cloud, ensuring security and consistency across environments.                                                                                                                              |
| Deploy database according to besect security practices                               | Store production users data.                                                                                                                                                                                                                             |
| CI/CD with pinned dependencies and encrypted secrets                                 | Configure CI/CD with GitHub Actions, using pinned dependencies to avoid supply chain attacks and encrypted secrets for secure configuration.                                                                                                             |
| Configure LB to terminate SSL                                                        | Secure users data in transit.                                                                                                                                                                                                                            |
| Add API documentation                                                                | Use Swagger/OpenAPI to generate interactive API documentation, improving developer experience for consumers and easing integration.                                                                                                                      |
| Set up solution for DB migrations                                                    | Use TypeORM migrations to manage database schema changes, ensuring consistency and stability across environments.                                                                                                                                        |
| Configure monitoring, request tracing, and alerting                                  | Implement Loki, Grafana, Jaeger, and Prometheus for monitoring and tracing, with PagerDuty for alerting, to ensure real-time visibility into performance and issues.                                                                                     |
| Set up on-call duty policy                                                           | Establish an on-call rotation to ensure rapid response to production incidents, improving reliability and customer trust.                                                                                                                                |
| Add API authorization                                                                | Implement authentication to secure endpoints, protecting sensitive user data like email addresses.                                                                                                                                                       |
| Implement rate limiting                                                              | Use rate limiting to prevent API abuse, ensuring performance and availability under high load or malicious activity.                                                                                                                                     |
| Optimize database connection pooling                                                 | Configure TypeORM connection pooling to manage database connections efficiently, improving performance under high concurrency.                                                                                                                           |
| Implement caching for frequently accessed data                                       | Use Redis for caching frequently accessed data, reducing database load and improving response times.                                                                                                                                                     |
| Implement database indexing                                                          | Add indexes on frequently queried fields like email to optimize query performance and scalability.                                                                                                                                                       |
| Implement pagination for user queries                                                | Add pagination to the user retrieval endpoint to reduce load and improve performance for large datasets.                                                                                                                                                 |
| Performance test                                                                     | Conduct load and stress tests with tools like Artillery to identify bottlenecks and ensure the API handles production traffic.                                                                                                                           |
| Implement scaling techniques                                                         | Use partitioning, replication, sharding, load balancing, and Kubernetes to scale the API and database for high availability and performance.                                                                                                             |
| Implement automated DB backup                                                        | Set up automated PostgreSQL backups with tools like pg_dump or AWS RDS snapshots to ensure data recovery in case of failures.                                                                                                                            |
| Document incident recovery plan                                                      | Create procedures for identifying, containing, and mitigating breaches, including revoking compromised tokens, rolling back malicious commits, and notifying stakeholders to ensure rapid recovery and compliance.                                       |
| Simulate incident and test recovery plan                                             | Verify if recovery mechanism works as expected.                                                                                                                                                                                                          |
| Usability test                                                                       | Conduct usability testing with API consumers to ensure endpoints are intuitive and meet customer needs, improving adoption and satisfaction.                                                                                                             |
| Internal security audit for common attacks                                           | Use tools like OWASP ZAP, Burp Suite, or cloud-native scanners (e.g., AWS Inspector) to identify vulnerabilities.                                                                                                                                        |
| External security audit                                                              | Engage third-party auditors to validate security measures, identifying blind spots and ensuring compliance with industry standards.                                                                                                                      |
