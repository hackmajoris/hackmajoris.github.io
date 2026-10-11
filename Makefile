PORT ?= 8000

.PHONY: build serve clean

build:
	go run .

serve: build
	python3 -m http.server $(PORT) --directory public

clean:
	rm -rf public
