CURRENT_BRANCH := $(shell git rev-parse --abbrev-ref HEAD)

.PHONY: all build clean dev fmt lint

all: clean build

build:
	@echo "Building the site..."
ifeq ($(CURRENT_BRANCH), main)
	@echo "The environment is set to production."
	hugo --printI18nWarnings --environment production
else
	@echo "The environment is set to staging."
	hugo --printI18nWarnings --environment staging
endif

clean:
	@echo "Cleaning up..."
	rm -f hugo_stats.json
	rm -rf public

dev:
	hugo server --buildDrafts --disableFastRender

fmt:
	npm run prettier -- --write "**/*.{html,js?(on),ts,md,yml}"
	taplo fmt "**/*.toml"

lint:
	npm run prettier -- --check "**/*.{html,js?(on),md,yml}"
	npm run stylelint "assets/**/*.css"
	npm run eslint .
	taplo fmt --check "**/*.toml"
	taplo check "**/*.toml"
