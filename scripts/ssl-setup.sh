#!/usr/bin/env bash

set -e

# SSL certificate setup script for NSS IIITH Website

SSL_DIR="./nginx/ssl"
DOMAIN="${1:-localhost}"
DAYS="${2:-365}"

# Create SSL directory
mkdir -p "$SSL_DIR"

function generate_self_signed() {
  echo "Generating self-signed SSL certificate for $DOMAIN..."
  
  # Generate private key
  openssl genrsa -out "$SSL_DIR/key.pem" 2048
  
  # Generate certificate signing request
  openssl req -new -key "$SSL_DIR/key.pem" -out "$SSL_DIR/csr.pem" -subj "/C=IN/ST=Telangana/L=Hyderabad/O=NSS IIITH/OU=IT Department/CN=$DOMAIN"
  
  # Generate self-signed certificate
  openssl x509 -req -in "$SSL_DIR/csr.pem" -signkey "$SSL_DIR/key.pem" -out "$SSL_DIR/cert.pem" -days "$DAYS"
  
  # Clean up CSR
  rm "$SSL_DIR/csr.pem"
  
  # Set proper permissions
  chmod 600 "$SSL_DIR/key.pem"
  chmod 644 "$SSL_DIR/cert.pem"
  
  echo "SSL certificate generated successfully!"
  echo "Certificate: $SSL_DIR/cert.pem"
  echo "Private Key: $SSL_DIR/key.pem"
  echo "Valid for: $DAYS days"
}

function generate_lets_encrypt() {
  echo "Setting up Let's Encrypt certificate for $DOMAIN..."
  
  # Check if certbot is installed
  if ! command -v certbot &> /dev/null; then
    echo "Error: certbot is not installed. Please install certbot first."
    echo "On Ubuntu/Debian: sudo apt-get install certbot"
    echo "On CentOS/RHEL: sudo yum install certbot"
    exit 1
  fi
  
  # Generate certificate
  certbot certonly --standalone --preferred-challenges http -d "$DOMAIN"
  
  # Copy certificates to nginx directory
  cp "/etc/letsencrypt/live/$DOMAIN/fullchain.pem" "$SSL_DIR/cert.pem"
  cp "/etc/letsencrypt/live/$DOMAIN/privkey.pem" "$SSL_DIR/key.pem"
  
  echo "Let's Encrypt certificate generated successfully!"
}

function renew_lets_encrypt() {
  echo "Renewing Let's Encrypt certificates..."
  
  # Renew certificates
  certbot renew
  
  # Copy renewed certificates
  cp "/etc/letsencrypt/live/$DOMAIN/fullchain.pem" "$SSL_DIR/cert.pem"
  cp "/etc/letsencrypt/live/$DOMAIN/privkey.pem" "$SSL_DIR/key.pem"
  
  # Restart nginx to load new certificates
  docker-compose restart nginx
  
  echo "Certificates renewed successfully!"
}

function info() {
  echo "SSL Certificate Information:"
  echo "=========================="
  
  if [ -f "$SSL_DIR/cert.pem" ]; then
    openssl x509 -in "$SSL_DIR/cert.pem" -text -noout | grep -E "(Subject:|Issuer:|Not Before:|Not After:)"
  else
    echo "No certificate found at $SSL_DIR/cert.pem"
  fi
}

case "$1" in
  "self-signed")
    generate_self_signed
    ;;
  "letsencrypt")
    generate_lets_encrypt
    ;;
  "renew")
    renew_lets_encrypt
    ;;
  "info")
    info
    ;;
  *)
    echo "Usage: $0 {self-signed|letsencrypt|renew|info} [domain] [days]"
    echo "  self-signed  - Generate self-signed certificate"
    echo "  letsencrypt  - Generate Let's Encrypt certificate"
    echo "  renew        - Renew Let's Encrypt certificate"
    echo "  info         - Show certificate information"
    echo ""
    echo "Examples:"
    echo "  $0 self-signed localhost 365"
    echo "  $0 letsencrypt nss.iiith.ac.in"
    echo "  $0 renew"
    echo "  $0 info"
    ;;
esac
