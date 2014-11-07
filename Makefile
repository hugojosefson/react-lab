node_modules:
	npm install

build: node_modules
	node_modules/.bin/jsx src dist --extension jsx

watch:
	node_modules/.bin/jsx src dist --watch --extension jsx

all: build
