.PHONY: clean dev fmt

clean:
	@echo "Cleaning up..."
	rm -f hugo_stats.json
	rm -rf public

dev:
	hugo server --buildDrafts --disableFastRender

fmt:
	npm run prettier -- --write "**/*.{html,js?(on),ts,md,yml}"
	taplo fmt "**/*.toml"
