dev:
	@printf "\nRunning development server...\n\n"
	hugo server -D

fmt:
	@printf "\nFormatting...\n\n"
	prettier --write "**/*.{html,js?(on),md,yml}"
	taplo fmt "**/*.toml"
