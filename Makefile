# Default command to display help
help:
	@echo "Available commands:"
	@echo "  make install          - Install dependencies"
	@echo "  make clean-install    - Clean install dependencies"
	@echo "  make uninstall        - Remove node_modules"
	@echo "  make format           - Format code with Prettier"
	@echo "  make format-check     - Check code formatting with Prettier"
	@echo "  make build            - Build the application"
	@echo "  make start            - Start the application"
	@echo "  make dev              - Start the application in development mode"

# Commands
install:
	pnpm i

clean-install:
	pnpm ci

uninstall:
	rm -rf ./node_modules

format:
	pnpm run prettier

format-check:
	pnpm run prettier_check

build:
	pnpm run build

start:
	pnpm run start

dev:
	pnpm run dev