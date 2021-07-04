rebuild-and-start-server:
	docker stop flask-app-container || true && docker rm flask-app-container || true
	docker build -t flask-app-container .
	docker run -p 5000:5000 flask-app-container

start-server:
	docker stop flask-app-container || true && docker rm flask-app-container || true
	docker run -p 5000:5000 flask-app-container