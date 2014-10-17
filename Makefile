DIST_DIR = dist
SRC_DIR = src

$(DIST_DIR):
	mkdir -p dist

node_modules:
	npm install

build: node_modules $(DIST_DIR)
	node_modules/.bin/jsx $(SRC_DIR) $(DIST_DIR) --extension jsx

watch: node_modules $(DIST_DIR)
	node_modules/.bin/jsx $(SRC_DIR) $(DIST_DIR) --watch --extension jsx &
	node_modules/.bin/http-server

clean:
	rm -rf dist

all: build
