.PHONY: test

dev:
	npm i && npm run watch

build:
	npm i && npm run build

test:
	npm i && npm run lint

release:
	npm i && npm run release

docs:
	npm i && npm run demo:serve

build-docs:
	npm i && npm run demo:build
