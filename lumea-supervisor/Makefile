# Lumea Dev Server Supervisor - Makefile

.PHONY: all build clean install uninstall test run fmt lint

# Build configuration
BINARY_NAME=lumea-agent
VERSION?=1.0.0
COMMIT?=$(shell git rev-parse --short HEAD 2>/dev/null || echo "unknown")
BUILD_DIR=./build
LDFLAGS=-ldflags "-X main.version=$(VERSION) -X main.commit=$(COMMIT)"

# Go configuration
GOCMD=go
GOBUILD=$(GOCMD) build
GOTEST=$(GOCMD) test
GOMOD=$(GOCMD) mod
GOFMT=gofmt

# Directories
INSTALL_DIR=/usr/local/bin
SYSTEMD_DIR=/etc/systemd/system
STATE_DIR=/var/lib/lumea
LOG_DIR=/var/log/lumea

all: build

# Build the binary
build:
	@echo "Building $(BINARY_NAME) v$(VERSION)..."
	@mkdir -p $(BUILD_DIR)
	$(GOBUILD) $(LDFLAGS) -o $(BUILD_DIR)/$(BINARY_NAME) ./cmd/lumea-agent

# Build for Linux AMD64
build-linux:
	@echo "Building for Linux AMD64..."
	@mkdir -p $(BUILD_DIR)
	GOOS=linux GOARCH=amd64 $(GOBUILD) $(LDFLAGS) -o $(BUILD_DIR)/$(BINARY_NAME)-linux-amd64 ./cmd/lumea-agent

# Build for Linux ARM64
build-linux-arm64:
	@echo "Building for Linux ARM64..."
	@mkdir -p $(BUILD_DIR)
	GOOS=linux GOARCH=arm64 $(GOBUILD) $(LDFLAGS) -o $(BUILD_DIR)/$(BINARY_NAME)-linux-arm64 ./cmd/lumea-agent

# Clean build artifacts
clean:
	@echo "Cleaning..."
	@rm -rf $(BUILD_DIR)

# Download dependencies
deps:
	@echo "Downloading dependencies..."
	$(GOMOD) download
	$(GOMOD) tidy

# Run tests
test:
	@echo "Running tests..."
	$(GOTEST) -v -race ./...

# Run tests with coverage
test-coverage:
	@echo "Running tests with coverage..."
	$(GOTEST) -v -race -coverprofile=coverage.out ./...
	$(GOCMD) tool cover -html=coverage.out -o coverage.html

# Format code
fmt:
	@echo "Formatting code..."
	$(GOFMT) -s -w .

# Run linter (requires golangci-lint)
lint:
	@echo "Running linter..."
	golangci-lint run

# Run the agent locally
run: build
	@echo "Running $(BINARY_NAME)..."
	$(BUILD_DIR)/$(BINARY_NAME) --listen=:8080 --state=./servers.json --log-dir=./logs

# Install the agent (requires root)
install: build
	@echo "Installing $(BINARY_NAME)..."
	@install -d $(STATE_DIR)
	@install -d $(LOG_DIR)
	@install -m 755 $(BUILD_DIR)/$(BINARY_NAME) $(INSTALL_DIR)/$(BINARY_NAME)
	@install -m 644 configs/lumea-agent.service $(SYSTEMD_DIR)/lumea-agent.service
	@echo "Creating lumea user..."
	@id -u lumea &>/dev/null || useradd --system --no-create-home lumea
	@chown -R lumea:lumea $(STATE_DIR) $(LOG_DIR)
	@echo "Reloading systemd..."
	@systemctl daemon-reload
	@echo "Installation complete. Enable with: systemctl enable --now lumea-agent"

# Uninstall the agent (requires root)
uninstall:
	@echo "Uninstalling $(BINARY_NAME)..."
	@systemctl stop lumea-agent 2>/dev/null || true
	@systemctl disable lumea-agent 2>/dev/null || true
	@rm -f $(INSTALL_DIR)/$(BINARY_NAME)
	@rm -f $(SYSTEMD_DIR)/lumea-agent.service
	@systemctl daemon-reload
	@echo "Uninstallation complete."

# Show help
help:
	@echo "Lumea Dev Server Supervisor"
	@echo ""
	@echo "Usage:"
	@echo "  make build          Build the agent binary"
	@echo "  make build-linux    Build for Linux AMD64"
	@echo "  make clean          Clean build artifacts"
	@echo "  make deps           Download dependencies"
	@echo "  make test           Run tests"
	@echo "  make test-coverage  Run tests with coverage"
	@echo "  make fmt            Format code"
	@echo "  make lint           Run linter"
	@echo "  make run            Build and run locally"
	@echo "  make install        Install systemd service (root required)"
	@echo "  make uninstall      Uninstall systemd service (root required)"
	@echo "  make help           Show this help"
