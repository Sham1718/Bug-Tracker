# IssueFlow – Jira-like Issue Tracking System (Microservices)

IssueFlow is a Jira-inspired issue tracking system built using a microservices architecture.
It supports project management, role-based access control, issue tracking, comments,
and email notifications.

This project was developed as a Final Year Project (FYP) to demonstrate real-world
backend architecture, security, and frontend integration.

--------------------------------------------------------------------

FEATURES

AUTHENTICATION & AUTHORIZATION
- JWT-based authentication
- Secure login and registration
- Stateless authentication
- Role-based access control (OWNER, MANAGER, DEVELOPER, TESTER)

PROJECT MANAGEMENT
- Create and manage projects
- Unique project keys
- Project membership system
- Add members by email
- Remove members
- Role-based permissions
- Project settings (Owner / Manager only)
- Delete project (Owner only)

ISSUE MANAGEMENT
- Create issues under projects
- Assign issues to project members
- Update issue status (OPEN, IN_PROGRESS, DONE)
- Update issue description and assignee
- Issue visibility restricted to project members

COMMENTS
- Add comments to issues
- Fetch comments per issue
- Access limited to project members

EMAIL NOTIFICATIONS
- Email sent on issue creation (when assigned)
- Email sent on issue reassignment
- No duplicate emails
- Email failure does NOT break issue create/update flow
- Central notification service using SMTP

PERMISSION BASED UI
- UI actions enabled/disabled based on user role
- Owners / Managers can add or remove members
- Owners / Managers can update project settings
- Restricted access for non-privileged members

--------------------------------------------------------------------

MICROSERVICES ARCHITECTURE

API-GATEWAY
|
|-- USER-SERVICE
|     - Authentication
|     - JWT handling
|     - User management
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
|     - Email notifications
|
|-- SERVICE-DISCOVERY (Eureka)

--------------------------------------------------------------------

TECH STACK

BACKEND
- Java 17
- Spring Boot
- Spring Security
- Spring Data JPA
- Spring Cloud (Eureka, OpenFeign)
- JWT
- MySQL
- REST APIs

FRONTEND
- React.js
- React Router
- Axios
- Context API
- Tailwind CSS

DEV TOOLS
- Eureka Service Discovery
- OpenFeign / RestTemplate
- Postman
- Git & GitHub

--------------------------------------------------------------------

SECURITY HIGHLIGHTS
- Stateless JWT authentication
- Internal service-to-service communication
- Secured internal endpoints
- Role validation at backend and frontend
- No sensitive data stored on frontend

--------------------------------------------------------------------

INSTALLATION & SETUP

PREREQUISITES
- Java 17 or higher
- Node.js
- MySQL
- Maven

BACKEND SETUP
1. Start Eureka Server
2. Start services in the following order:
   - User Service
   - Project Service
   - Issue Service
   - Notification Service
   - API Gateway
3. Configure application.properties:
   - Database connection
   - SMTP email credentials
   - Eureka server URL

FRONTEND SETUP
1. Navigate to frontend directory
2. Run:
   npm install
   npm start

--------------------------------------------------------------------

DEMO FLOW (RECOMMENDED)
1. Register and Login
2. Create a Project
3. Add Member by Email
4. Create Issue
5. Assign Issue (Email sent)
6. Add Comment
7. Update Issue Status
8. Delete Project (Owner only)

--------------------------------------------------------------------

PROJECT STATUS
- Core features completed
- Permission-based UI implemented
- Email notifications stable
- Submission-ready (FYP)

--------------------------------------------------------------------

LICENSE
This project is developed for academic purposes as a Final Year Project.

--------------------------------------------------------------------

AUTHOR
Shyam
Computer Engineering Student
