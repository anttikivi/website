build:
	hugo

dev:
	hugo server -D

fmt:
	npx prettier --write "**/*.{html,js?(on),md,yml}"
	taplo fmt "**/*.toml"

lint:
	npx prettier --check "**/*.{html,js?(on),md,yml}"
	taplo fmt --check "**/*.toml"
	taplo check "**/*.toml"

clean:
	rm -rf public
