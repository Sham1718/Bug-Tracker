# IssueFlow – Jira-like Issue Tracking System (Microservices)

## Summary
A Jira-inspired microservices-based issue tracking platform with JWT authentication, role-based access control, project management, issue tracking, comments, and email notifications.

---

# Overview

IssueFlow is a full-stack issue tracking system inspired by Jira and built using a microservices architecture. The platform enables teams to manage projects, track issues, collaborate through comments, and enforce role-based permissions across the system.

The project was developed to demonstrate:
- Real-world microservices architecture
- Secure authentication and authorization
- Service-to-service communication
- Project and issue lifecycle management
- Frontend and backend integration

IssueFlow supports multiple user roles and provides controlled access to projects, issues, comments, and administrative actions.

---

# Problem Statement

Managing software projects requires:
- Organized issue tracking
- Controlled team collaboration
- Secure access management
- Scalable backend architecture
- Automated notifications

Traditional monolithic systems can become difficult to maintain and scale.

IssueFlow addresses these challenges through:
- Microservices architecture
- Role-based access control
- JWT authentication
- Project-based issue management
- Automated email notifications

to provide a scalable and secure issue tracking solution.

---

# Tools and Tech

## Backend
- Java 17
- Spring Boot
- Spring Security
- Spring Data JPA
- JWT
- MySQL
- REST APIs

## Microservices & Cloud
- Spring Cloud
- Eureka Service Discovery
- OpenFeign
- RestTemplate
- API Gateway

## Frontend
- React.js
- React Router
- Axios
- Context API
- Tailwind CSS

## Development Tools
- Maven
- Postman
- Git & GitHub

---

# Methods

## Authentication & Authorization

- JWT-based authentication
- Secure registration and login
- Stateless authentication
- Role-Based Access Control (RBAC)

### Supported Roles

- OWNER
- MANAGER
- DEVELOPER
- TESTER

---

## Project Management

- Create projects
- Unique project keys
- Manage project members
- Add members by email
- Remove project members
- Project settings management
- Owner-only project deletion

### Permission Rules

- Owner and Manager can manage members
- Owner and Manager can update project settings
- Owner can delete projects

---

## Issue Management

- Create issues within projects
- Assign issues to project members
- Update issue descriptions
- Change assignees
- Update issue status

### Supported Statuses

- OPEN
- IN_PROGRESS
- DONE

### Access Control

- Only project members can access project issues

---

## Comments System

- Add comments to issues
- Retrieve issue comments
- Permission-controlled access
- Member-only visibility

---

## Email Notifications

- Notification on issue creation
- Notification on reassignment
- Centralized notification service
- SMTP integration
- Failure-safe implementation

### Notification Features

- No duplicate emails
- Email failures do not break business logic

---

## Permission-Based UI

Frontend actions dynamically change based on user roles.

### Examples

- Owners and Managers can manage members
- Owners and Managers can modify project settings
- Non-privileged users have restricted access
- Role-specific actions enabled/disabled automatically

---

## Microservices Architecture

```plaintext
API-GATEWAY
|
|-- USER-SERVICE
|     - Authentication
|     - JWT Handling
|     - User Management
|
|-- PROJECT-SERVICE
|     - Projects
|     - Members
|     - Roles
|
|-- ISSUE-SERVICE
|     - Issues
|     - Comments
|     - Assignment
|
|-- NOTIFICATION-SERVICE
|     - Email Notifications
|
|-- SERVICE-DISCOVERY (Eureka)
```

---

## Security Highlights

- Stateless JWT authentication
- Service-to-service communication
- Protected internal APIs
- Backend role validation
- Frontend role validation
- No sensitive data stored on frontend

---


# How to Run Project

## Prerequisites

- Java 17+
- Node.js
- MySQL
- Maven

---

## Backend Setup

### Step 1: Start Eureka Server

Start the Service Discovery Server first.

---

### Step 2: Start Services in Order

```text
1. User Service
2. Project Service
3. Issue Service
4. Notification Service
5. API Gateway
```

---

### Step 3: Configure Application Properties

Update:

```properties
application.properties
```

Configure:

```properties
spring.datasource.url=your_database_url
spring.datasource.username=your_username
spring.datasource.password=your_password

spring.mail.username=your_email
spring.mail.password=your_email_password

eureka.client.service-url.defaultZone=http://localhost:8761/eureka
```

---

### Step 4: Run Services

```bash
mvn spring-boot:run
```

Run each microservice individually.

---

## Frontend Setup

Navigate to frontend directory:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Start frontend:

```bash
npm start
```

---

# Result

Successfully developed a Jira-inspired issue tracking platform featuring:

- JWT Authentication
- Role-Based Access Control
- Project Management
- Issue Tracking
- Comments System
- Email Notifications
- Permission-Based UI
- Microservices Architecture
- Service Discovery
- API Gateway Integration

The project demonstrates strong understanding of modern backend architecture, distributed systems, secure application development, and enterprise-level software design.

---

# Author and Contact

## Author
Shyam Bharaskar
Computer Engineering Student

## Contact
- GitHub: https://github.com/Sham1718
- Portfolio: https://shyambharaskar.vercel.app/
