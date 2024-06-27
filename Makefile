.PHONY: fmt

fmt:
	npm run prettier -- --write "**/*.{html,js?(on),ts,md,yml}"
	taplo fmt "**/*.toml"
