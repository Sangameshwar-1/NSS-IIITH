# Website
Pictures:
![Uploading image.png…]()
![Uploading image.png…]()



This project is a comprehensive web application designed for NSS IIITH, utilizing a Microservices architecture with a frontend (Next.js) and backend (FastAPI) setup. The application is deployed using Docker Compose and Nginx for load balancing and reverse proxy.

## Table of Contents
- [Requirements](#requirements)
- [Getting Started](#getting-started)
- [Commands](#commands)
- [Environments](#environments)
- [SSL Certificates](#ssl-certificates)
- [Services Overview](#services-overview)
- [Monitoring](#monitoring)

## Requirements
- Docker
- Docker Compose

## Getting Started
To start the application, follow these steps:

1. **Clone the Repository:**
   ```bash
   git clone <repository-url>
   cd Website
   ```

2. **Configure Environment Variables:**
   - Copy `.env.example` to `.env.production` and `.env.development`
   - Modify values according to your environment

3. **Build and Start Services:**
   
   **For Development (Default):**
   ```bash
   docker-compose -f docker-compose.yml up --build
   OR
   docker compose up --build
   ```
   
   **For Production:**
   ```bash
   docker-compose -f docker-compose.yml up --build
   OR
   docker compose -f docker-compose.yml up --build
   ```

4. **Access the Application:**
   
   **Development Mode:**
   - Frontend: `http://localhost`
   - Backend GraphQL: `http://localhost/api/graphql`
   - Backend Health Check: `http://localhost/api/health`
   
   **Production Mode:**
   - Frontend: `http://localhost`
   - Backend GraphQL: `http://localhost/api/graphql`
   - Backend Health Check: `http://localhost/api/health`

## Commands

### Development Mode (Recommended for local development)
- **Start Services:** `docker-compose up -d`
- **Stop Services:** `docker-compose down`
- **View Logs:** `docker-compose logs -f {service-name}`
- **Check Status:** `docker-compose ps || docker ps`

### Production Mode (For production deployment)
- **Start Services:** `docker-compose up -d`
- **Stop Services:** `docker-compose down`
- **View Logs:** `docker-compose logs -f {service-name}`
- **Check Status:** `docker-compose ps`

## Environments
- **Development:** Uses `.env.development` for configuration. Suitable for local development with detailed logs and debugging features.
- **Production:** Uses `.env.production` for live environments. It includes optimizations and strict logging for reliability.

## SSL Certificates
Manage SSL certificates using the `ssl-setup.sh` script.
- **Generate Self-Signed:**
  ```bash
  ./scripts/ssl-setup.sh self-signed
  ```
- **Setup Let's Encrypt:**
  ```bash
  ./scripts/ssl-setup.sh letsencrypt
  ```
- **Renew Let's Encrypt:**
  ```bash
  ./scripts/ssl-setup.sh renew
  ```

## Services Overview
- **Frontend:** Next.js application serving the UI.
- **Backend:** FastAPI with GraphQL for data interaction.
- **Database:** MongoDB for data storage.
- **Cache:** Redis for caching and session management.
- **Proxy:** Nginx for load balancing.
- **Monitoring:** Prometheus and Grafana for metrics visualization.

## Monitoring
- Access Prometheus at `http://localhost:9090` for metrics.
- Access Grafana at `http://localhost:3001` for visual dashboards.
