.PHONY: clean
clean:
	rm -rf dist/

.PHONY: build
build: clean
	npm run build

.PHONY: docker
docker: build
	docker build --build-arg MONGODB_URI -t marwanhawari/node-ts-express-mongodb .