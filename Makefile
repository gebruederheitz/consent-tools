.PHONY: test
# USED FOR CONTINUOUS INTEGRATION & DEPLOYMENT
# DEVELOPER SCRIPTS ARE FOUND IN Taskfile.yaml

test:
	npm i
	npm run lint

build:
	rm -rf ./dist/ || echo "Nothing to delete"
	npm i
	npm run build


build-docs: build
	cd demo && npm ci --foreground-scripts && npm run build
