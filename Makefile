build:
                docker build -f Dockerfile -t nebrija/frontend:latest .

run:
                docker run -p 8080:80 nebrija/frontend:latest