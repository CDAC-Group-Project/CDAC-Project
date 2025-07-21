# Medical Portal Setup Guide

This guide outlines the steps to create a Medical Portal project with a React frontend using Vite and JavaScript, and a backend using ASP.NET Core and Spring Boot. It includes a structured list of dependencies for each component, using Yarn as the package manager.

---

## 1. Frontend Setup (React with Vite and JavaScript)

### 1.1. Steps to Create the React Project

1. **Initialize the Vite + React Project**:
   - Create a new React project using Vite with the JavaScript template.
   - Run the following command in your terminal:
     ```bash
     yarn create vite medical-portal --template react
     cd medical-portal
     ```

2. **Install Dependencies**:
   - Install core dependencies for real-time communication, data fetching, UI components, and testing.
   - Execute:
     ```bash
     yarn add @microsoft/signalr @tanstack/react-query axios react-router-dom
     yarn add @mui/material @emotion/react @emotion/styled
     yarn add date-fns prop-types react-hook-form
     yarn add --dev prettier eslint-config-prettier vitest @testing-library/react msw
     ```

3. **Configure Project Structure**:
   - Set up a modular project structure for scalability and maintainability.
   - Create the following directory layout:
     ```plaintext
     src/
     ├── assets/
     ├── components/
     │   ├── common/
     │   ├── features/
     │   └── routing/
     ├── config/
     ├── hooks/
     ├── lib/
     ├── pages/
     ├── services/
     ├── store/
     ├── types/
     └── utils/
     ```
   - Description of directories:
     - `assets/`: Static assets (images, fonts).
     - `components/`: Reusable UI components, organized by type.
     - `config/`: API client and configuration settings.
     - `hooks/`: Custom React hooks for logic reuse.
     - `lib/`: Library integrations (e.g., SignalR, Axios).
     - `pages/`: Page-level components for routing.
     - `services/`: API service wrappers.
     - `store/`: State management (e.g., Context, Redux).
     - `types/`: PropTypes definitions.
     - `utils/`: Utility functions and helpers.

4. **Set Up Environment Variables**:
   - Create environment files for development and production configurations.
   - Create `.env.development`:
     ```plaintext
     VITE_API_URL=http://localhost:5000
     VITE_SIGNALR_URL=http://localhost:5000/hubs
     ```
   - Create `.env.production`:
     ```plaintext
     VITE_API_URL=https://api.medical-portal.com
     VITE_SIGNALR_URL=https://api.medical-portal.com/hubs
     ```

5. **Configure Vite**:
   - Update `vite.config.js` to proxy API and SignalR requests to the backend.
   - Example:
     ```javascript
     import { defineConfig } from 'vite';
     import react from '@vitejs/plugin-react';

     export default defineConfig({
       plugins: [react()],
       server: {
         proxy: {
           '/api': {
             target: 'http://localhost:5000',
             changeOrigin: true,
             rewrite: (path) => path.replace(/^\/api/, ''),
           },
           '/hubs': {
             target: 'http://localhost:5000',
             ws: true,
           },
         },
       },
     });
     ```

6. **Run the Development Server**:
   - Start the Vite development server to verify the setup.
   - Run:
     ```bash
     yarn dev
     ```
   - Access the frontend at `http://localhost:5173`.

### 1.2. Frontend Dependencies

The following dependencies are required for the React frontend:

- **Core Dependencies**:
  - `@microsoft/signalr`: Real-time communication for notifications and chat.
  - `@tanstack/react-query`: Data fetching and caching for API interactions.
  - `axios`: HTTP client for API requests.
  - `react-router-dom`: Client-side routing for navigation.
  - `@mui/material`, `@emotion/react`, `@emotion/styled`: Material-UI components for consistent UI.
  - `date-fns`: Date and time handling for scheduling features.
  - `prop-types`: Runtime type checking for React component props.
  - `react-hook-form`: Form management and validation.

- **Development Dependencies**:
  - `prettier`: Code formatting for consistent style.
  - `eslint-config-prettier`: Disables ESLint rules conflicting with Prettier.
  - `vitest`: Testing framework for unit and integration tests.
  - `@testing-library/react`: React testing utilities.
  - `msw`: Mock Service Worker for API mocking in tests.

- **Yarn Command**:
  ```bash
  yarn add @microsoft/signalr @tanstack/react-query axios react-router-dom @mui/material @emotion/react @emotion/styled date-fns prop-types react-hook-form
  yarn add --dev prettier eslint-config-prettier vitest @testing-library/react msw
  ```

---

## 2. Backend Setup (ASP.NET Core)

### 2.1. Steps to Create the ASP.NET Core Project

1. **Initialize the ASP.NET Core Project**:
   - Create a new ASP.NET Core Web API project for services like Health Records and Notification.
   - Run:
     ```bash
     dotnet new webapi -o HealthRecordsService
     cd HealthRecordsService
     ```

2. **Install Dependencies**:
   - Add NuGet packages for database access, real-time communication, and API documentation.
   - Add packages to the `.csproj` file or use `dotnet add package`:
     ```bash
     dotnet add package Microsoft.EntityFrameworkCore
     dotnet add package Microsoft.EntityFrameworkCore.SqlServer
     dotnet add package Microsoft.AspNetCore.SignalR
     dotnet add package RabbitMQ.Client
     dotnet add package Swashbuckle.AspNetCore
     ```

3. **Configure Project Structure**:
   - Organize the project into layers for maintainability:
     ```plaintext
     HealthRecordsService/
     ├── Controllers/
     ├── Models/
     ├── Services/
     ├── Repositories/
     ├── Hubs/
     └── appsettings.json
     ```
   - Description of directories:
     - `Controllers/`: API endpoints for RESTful interactions.
     - `Models/`: Data models for entities (e.g., HealthRecord).
     - `Services/`: Business logic for health records and notifications.
     - `Repositories/`: Data access logic using Entity Framework Core.
     - `Hubs/`: SignalR hubs for real-time communication.
     - `appsettings.json`: Configuration settings (e.g., database connection strings).

4. **Configure Database Connection**:
   - Update `appsettings.json` to include the SQL Server connection string:
     ```json
     {
       "ConnectionStrings": {
         "DefaultConnection": "Server=localhost,1433;Database=medical_db;User Id=sa;Password=YourStrong@Passw0rd;TrustServerCertificate=True;"
       }
     }
     ```

5. **Set Up SignalR Hub**:
   - Create a SignalR hub for real-time notifications (e.g., `NotificationHub.cs` in `Hubs/`):
     ```csharp
     using Microsoft.AspNetCore.SignalR;

     namespace HealthRecordsService.Hubs
     {
         public class NotificationHub : Hub
         {
             public async Task SendNotification(string userId, string message)
             {
                 await Clients.User(userId).SendAsync("ReceiveNotification", message);
             }
         }
     }
     ```

6. **Configure Swagger for API Documentation**:
   - Add Swagger configuration in `Program.cs`:
     ```csharp
     builder.Services.AddSwaggerGen(c =>
     {
         c.SwaggerDoc("v1", new() { Title = "HealthRecords API", Version = "v1" });
     });
     app.UseSwagger();
     app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "HealthRecords API v1"));
     ```

7. **Run the ASP.NET Core Service**:
   - Start the service to verify the setup.
   - Run:
     ```bash
     dotnet run
     ```
   - Access the API at `http://localhost:5000` and Swagger UI at `http://localhost:5000/swagger`.

### 2.2. ASP.NET Core Dependencies

The following NuGet packages are required for the ASP.NET Core backend:

- **Core Dependencies**:
  - `Microsoft.EntityFrameworkCore`: ORM for database operations.
  - `Microsoft.EntityFrameworkCore.SqlServer`: SQL Server provider for Entity Framework Core.
  - `Microsoft.AspNetCore.SignalR`: Real-time communication for notifications.
  - `RabbitMQ.Client`: Message broker integration for event-driven communication.
  - `Swashbuckle.AspNetCore`: Swagger for API documentation.

- **NuGet Commands**:
  ```bash
  dotnet add package Microsoft.EntityFrameworkCore
  dotnet add package Microsoft.EntityFrameworkCore.SqlServer
  dotnet add package Microsoft.AspNetCore.SignalR
  dotnet add package RabbitMQ.Client
  dotnet add package Swashbuckle.AspNetCore
  ```

---

## 3. Backend Setup (Spring Boot)

### 3.1. Steps to Create the Spring Boot Project

1. **Initialize the Spring Boot Project**:
   - Create a new Spring Boot project for services like Authentication and User Profile using Spring Initializer or CLI.
   - Run:
     ```bash
     curl https://start.spring.io/starter.zip -d dependencies=web,data-jpa,security,amqp,cloud-gateway -d type=maven-project -d name=user-service -o user-service.zip
     unzip user-service.zip -d user-service
     cd user-service
     ```

2. **Install Dependencies**:
   - Add dependencies to `pom.xml` for web, database access, security, and message brokering.
   - Example `pom.xml` snippet:
     ```xml
     <dependencies>
         <dependency>
             <groupId>org.springframework.boot</groupId>
             <artifactId>spring-boot-starter-web</artifactId>
         </dependency>
         <dependency>
             <groupId>org.springframework.boot</groupId>
             <artifactId>spring-boot-starter-data-jpa</artifactId>
         </dependency>
         <dependency>
             <groupId>org.springframework.boot</groupId>
             <artifactId>spring-boot-starter-security</artifactId>
         </dependency>
         <dependency>
             <groupId>org.springframework.boot</groupId>
             <artifactId>spring-boot-starter-amqp</artifactId>
         </dependency>
         <dependency>
             <groupId>org.springframework.cloud</groupId>
             <artifactId>spring-cloud-starter-gateway</artifactId>
         </dependency>
         <dependency>
             <groupId>io.jsonwebtoken</groupId>
             <artifactId>jjwt-api</artifactId>
             <version>0.11.5</version>
         </dependency>
         <dependency>
             <groupId>com.microsoft.sqlserver</groupId>
             <artifactId>mssql-jdbc</artifactId>
             <version>12.2.0</version>
         </dependency>
         <dependency>
             <groupId>org.springdoc</groupId>
             <artifactId>springdoc-openapi-starter-webmvc-ui</artifactId>
             <version>2.2.0</version>
         </dependency>
     </dependencies>
     ```

3. **Configure Project Structure**:
   - Organize the project into packages for maintainability:
     ```plaintext
     src/main/java/com/medical/userservice/
     ├── controller/
     ├── service/
     ├── repository/
     ├── model/
     └── config/
     ```
   - Description of packages:
     - `controller/`: REST endpoints for API interactions.
     - `service/`: Business logic for user and authentication services.
     - `repository/`: Data access using Spring Data JPA.
     - `model/`: Entity classes (e.g., User).
     - `config/`: Configuration for security, database, and RabbitMQ.

4. **Configure Database Connection**:
   - Update `application.yml` to include SQL Server connection settings:
     ```yaml
     spring:
       datasource:
         url: jdbc:sqlserver://localhost:1433;databaseName=medical_db;encrypt=true;trustServerCertificate=true
         username: sa
         password: YourStrong@Passw0rd
       jpa:
         hibernate:
           ddl-auto: update
     ```

5. **Set Up Authentication Controller**:
   - Create a REST controller for authentication (e.g., `AuthController.java` in `controller/`):
     ```java
     package com.medical.userservice.controller;

     import org.springframework.http.ResponseEntity;
     import org.springframework.web.bind.annotation.PostMapping;
     import org.springframework.web.bind.annotation.RequestBody;
     import org.springframework.web.bind.annotation.RequestMapping;
     import org.springframework.web.bind.annotation.RestController;

     @RestController
     @RequestMapping("/auth")
     public class AuthController {
         @PostMapping("/login")
         public ResponseEntity<String> login(@RequestBody LoginRequest request) {
             // Placeholder for JWT generation
             String jwt = "generated-jwt-token";
             return ResponseEntity.ok(jwt);
         }
     }

     class LoginRequest {
         private String username;
         private String password;

         public String getUsername() { return username; }
         public void setUsername(String username) { this.username = username; }
         public String getPassword() { return password; }
         public void setPassword(String password) { this.password = password; }
     }
     ```

6. **Configure Swagger for API Documentation**:
   - Add Swagger configuration in `application.yml`:
     ```yaml
     springdoc:
       swagger-ui:
         path: /swagger-ui.html
     ```

7. **Run the Spring Boot Service**:
   - Start the service to verify the setup.
   - Run:
     ```bash
     ./mvnw spring-boot:run
     ```
   - Access the API at `http://localhost:8080` and Swagger UI at `http://localhost:8080/swagger-ui.html`.

### 3.2. Spring Boot Dependencies

The following Maven dependencies are required for the Spring Boot backend:

- **Core Dependencies**:
  - `spring-boot-starter-web`: REST API development.
  - `spring-boot-starter-data-jpa`: Database access with JPA.
  - `spring-boot-starter-security`: Security features, including OAuth2 and JWT.
  - `spring-boot-starter-amqp`: RabbitMQ integration for event-driven communication.
  - `spring-cloud-starter-gateway`: API gateway for routing and authentication.
  - `io.jsonwebtoken:jjwt-api:0.11.5`: JWT token management.
  - `com.microsoft.sqlserver:mssql-jdbc:12.2.0`: SQL Server JDBC driver.
  - `org.springdoc:springdoc-openapi-starter-webmvc-ui:2.2.0`: Swagger for API documentation.

- **Maven Configuration** (add to `pom.xml`):
  ```xml
  <dependencies>
      <dependency>
          <groupId>org.springframework.boot</groupId>
          <artifactId>spring-boot-starter-web</artifactId>
      </dependency>
      <dependency>
          <groupId>org.springframework.boot</groupId>
          <artifactId>spring-boot-starter-data-jpa</artifactId>
      </dependency>
      <dependency>
          <groupId>org.springframework.boot</groupId>
          <artifactId>spring-boot-starter-security</artifactId>
      </dependency>
      <dependency>
          <groupId>org.springframework.boot</groupId>
          <artifactId>spring-boot-starter-amqp</artifactId>
      </dependency>
      <dependency>
          <groupId>org.springframework.cloud</groupId>
          <artifactId>spring-cloud-starter-gateway</artifactId>
      </dependency>
      <dependency>
          <groupId>io.jsonwebtoken</groupId>
          <artifactId>jjwt-api</artifactId>
          <version>0.11.5</version>
      </dependency>
      <dependency>
          <groupId>com.microsoft.sqlserver</groupId>
          <artifactId>mssql-jdbc</artifactId>
          <version>12.2.0</version>
      </dependency>
      <dependency>
          <groupId>org.springdoc</groupId>
          <artifactId>springdoc-openapi-starter-webmvc-ui</artifactId>
          <version>2.2.0</version>
      </dependency>
  </dependencies>
  ```

---

## 4. Additional Setup Notes

- **Docker for Infrastructure**:
  - Set up SQL Server, MongoDB, and RabbitMQ using Docker for local development.
  - Example `docker-compose.yml`:
    ```yaml
    version: '3.8'
    services:
      sqlserver:
        image: mcr.microsoft.com/mssql/server:2019-latest
        environment:
          - ACCEPT_EULA=Y
          - SA_PASSWORD=YourStrong@Passw0rd
        ports:
          - "1433:1433"
      mongodb:
        image: mongo:latest
        ports:
          - "27017:27017"
      rabbitmq:
        image: rabbitmq:3-management
        ports:
          - "5672:5672"
          - "15672:15672"
    ```
  - Run:
    ```bash
    docker-compose up -d
    ```

- **Development Tools**:
  - Use Visual Studio Code or IntelliJ IDEA for development.
  - Install recommended VS Code extensions:
    - `esbenp.prettier-vscode` (Prettier for formatting).
    - `dbaeumer.vscode-eslint` (ESLint for JavaScript linting).
    - `redhat.java` (Java support).
    - `ms-dotnettools.csharp` (C# support).
  - Configure Git with a `.gitignore`:
    ```plaintext
    node_modules/
    target/
    bin/
    *.log
    .env.local
    ```

- **Next Steps**:
  - Implement core services (e.g., Authentication, User Profile, Health Records, Notification) as described in section 4.1 of the provided documentation.
  - Set up SignalR for real-time features (section 5.2).
  - Configure CI/CD pipelines for automated builds and deployments (section 9.2).