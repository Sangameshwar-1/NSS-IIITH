from fastapi import FastAPI, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
import strawberry
from strawberry.fastapi import GraphQLRouter
from qnm_members import queries, mutations
from database import get_database, close_connection
from os import getenv
import time
import psutil
from prometheus_client import Counter, Histogram, generate_latest, CONTENT_TYPE_LATEST
from fastapi.responses import Response
from urllib.parse import quote_plus
from fastapi import Request
from fastapi.responses import RedirectResponse
from cas import CASClient

from strawberry.tools import create_type
Query = create_type("Query", queries)
Mutation = create_type("Mutation", mutations)

app = FastAPI(
    title="NSS IIITH API",
    description="GraphQL API for NSS IIITH Website",
    version="1.0.0",
    docs_url="/docs",
    openapi_url="/openapi.json",
    root_path="/api"
)


SECURE_COOKIES = getenv("SECURE_COOKIES", "False").lower() in ("true", "1", "t")
CAS_SERVER_URL = getenv("CAS_SERVER_URL", "https://login.iiit.ac.in/cas/")
SERVICE_URL = getenv("SERVICE_URL", "http://localhost:8000/login")
cas_client_nss = CASClient(
    version=3,
    server_url=CAS_SERVER_URL,
    service_url=None
)

REDIRECT_URL = getenv("REDIRECT_URL", "/")
JWT_SECRET = getenv("JWT_SECRET", "jwt-secret-very-very-secret")
service_url_formatted = "%s?next=%s"

@app.get("/login")
@app.get("/login/")
async def login_redirect(request: Request, path: str = None):
    next_url = path or REDIRECT_URL
    cas_client_nss.service_url = service_url_formatted % (SERVICE_URL, quote_plus(next_url))
    ticket = request.query_params.get("ticket")
    if not ticket:
        cas_login_url = cas_client_nss.get_login_url()
        return RedirectResponse(url=cas_login_url)
    
    user, attributes, pgtiou = cas_client_nss.verify_ticket(ticket)
    
    # Debug: Log what CAS returns
    print("=" * 50)
    print("CAS LOGIN DATA:")
    print(f"User: {user}")
    print(f"Attributes: {attributes}")
    print(f"PGTIOU: {pgtiou}")
    print("=" * 50)
    
    frontend_url = "http://localhost:3000/"

    response = RedirectResponse(url=frontend_url)
    # Set cookie with uid
    response.set_cookie(
        key="uid",
        value=attributes["uid"],
        httponly=False,  # Prevent JS access if you want
        secure=False,   # Set to True if using HTTPS
        samesite="lax"
    )
    return response

@app.get("/logout")
@app.get("/logout/")
async def logout_redirect(request: Request):
    """
    Logout endpoint that clears the uid cookie and redirects to CAS logout
    """
    # Get the CAS logout URL
    cas_logout_url = f"{CAS_SERVER_URL}logout"
    
    # Redirect to frontend home page after CAS logout
    frontend_url = "http://localhost:3000/"
    cas_logout_with_service = f"{cas_logout_url}?service={quote_plus(frontend_url)}"
    
    # Create response that redirects to CAS logout
    response = RedirectResponse(url=cas_logout_with_service)
    
    # Clear the uid cookie
    response.delete_cookie(
        key="uid",
        path="/",
        domain=None
    )
    
    print(f"[LOGOUT] Redirecting to CAS logout: {cas_logout_with_service}")
    
    return response

# Prometheus metrics
REQUEST_COUNT = Counter('http_requests_total', 'Total HTTP requests', ['method', 'endpoint'])
REQUEST_DURATION = Histogram('http_request_duration_seconds', 'HTTP request duration')

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, specify your frontend domains
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# GraphQL router
schema = strawberry.Schema(query=Query, mutation=Mutation)
gqlr = GraphQLRouter(schema, graphql_ide='graphiql')
app.include_router(gqlr, prefix="/graphql")

@app.on_event("startup")
async def startup_event():
    # Initialize DB at startup
    get_database()

@app.on_event("shutdown")
async def shutdown_event():
    # Clean up DB connection
    close_connection()

# Health check endpoints
@app.get("/health")
async def health_check():
    """Basic health check endpoint"""
    return {"status": "healthy", "timestamp": time.time()}

@app.get("/health/detailed")
async def detailed_health_check():
    """Detailed health check with system metrics"""
    try:
        # Check system metrics
        cpu_percent = psutil.cpu_percent()
        memory = psutil.virtual_memory()
        disk = psutil.disk_usage('/')
        
        # Check database connection (if needed)
        # Add your database health check here
        
        return {
            "status": "healthy",
            "timestamp": time.time(),
            "system": {
                "cpu_percent": cpu_percent,
                "memory_percent": memory.percent,
                "disk_percent": disk.percent,
                "uptime": time.time() - psutil.boot_time()
            },
            "environment": {
                "api_env": os.getenv("API_ENV", "development"),
                "mongodb_url": "configured" if os.getenv("MONGODB_URL") else "missing"
            }
        }
    except Exception as e:
        raise HTTPException(status_code=503, detail=f"Health check failed: {str(e)}")

@app.get("/metrics")
async def metrics():
    """Prometheus metrics endpoint"""
    return Response(generate_latest(), media_type=CONTENT_TYPE_LATEST)

# Root endpoint
@app.get("/")
async def root():
    return {
        "message": "NSS IIITH API",
        "graphql_endpoint": "/graphql",
        "health_check": "/health",
        "docs": "/docs"
    }
