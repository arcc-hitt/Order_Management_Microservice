# Order Management Microservice with React Dashboard

A full-stack, production-style *Order Management System* built with *Spring Boot* and *React.js*. This project showcases a clean microservice architecture with a REST API backend, a responsive React dashboard, robust validation, error handling, and modern DevOps tooling for observability and documentation.

---

## ⭐ Features

### Backend (Spring Boot)
- *RESTful API* with full CRUD operations
- *Clean Architecture*: Controller → Service → Repository → Entity
- *DTO-based Validation* using @Valid, @NotBlank, @Min, etc.
- *Global Exception Handling* with @ControllerAdvice
- *Auto-generated Swagger Docs* using springdoc-openapi
- *In-memory H2 Database* for development & testing
- *Health Check & Metrics* with Spring Boot Actuator and Prometheus

### Frontend (React.js)
- *Modern React UI* with Vite for fast builds
- *Data Fetching & Caching* using React Query
- *Forms & Validation* with React Hook Form + Zod
- *Optimistic UI Updates* and *Toast Notifications*
- *Search, Pagination, Sorting* for improved UX
- *Environment-based Configuration* via .env

---

## 🧱 Tech Stack

| Layer        | Technology                       |
|--------------|----------------------------------|
| Backend      | Java 17, Spring Boot, Spring Data JPA |
| Database     | H2 (In-Memory)                   |
| API Docs     | OpenAPI/Swagger (springdoc-openapi) |
| Testing      | JUnit 5                          |
| Frontend     | React.js, Vite, Axios, React Query |
| Validation   | React Hook Form, Zod, Hibernate Validator |
| Monitoring   | Spring Boot Actuator, Prometheus |
| Dev Tools    | Maven, ESLint, Prettier          |

---