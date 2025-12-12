#!/bin/bash
set -e

# Lumea Dev Server Supervisor - Installation Script

echo "================================"
echo "Lumea Supervisor Installation"
echo "================================"
echo ""

# Check if running as root
if [ "$EUID" -ne 0 ]; then
    echo "Error: This script must be run as root"
    exit 1
fi

# Configuration
INSTALL_DIR="/usr/local/bin"
STATE_DIR="/var/lib/lumea"
LOG_DIR="/var/log/lumea"
SYSTEMD_DIR="/etc/systemd/system"
CGROUP_DIR="/sys/fs/cgroup/lumea"

# Detect architecture
ARCH=$(uname -m)
case $ARCH in
    x86_64)
        BINARY_SUFFIX="linux-amd64"
        ;;
    aarch64)
        BINARY_SUFFIX="linux-arm64"
        ;;
    *)
        echo "Error: Unsupported architecture: $ARCH"
        exit 1
        ;;
esac

# Create directories
echo "Creating directories..."
mkdir -p "$STATE_DIR"
mkdir -p "$LOG_DIR"

# Create lumea user if it doesn't exist
if ! id -u lumea &>/dev/null; then
    echo "Creating lumea user..."
    useradd --system --no-create-home --shell /usr/sbin/nologin lumea
fi

# Set ownership
chown -R lumea:lumea "$STATE_DIR"
chown -R lumea:lumea "$LOG_DIR"

# Check if binary exists in build directory
BINARY_PATH="./build/lumea-agent-$BINARY_SUFFIX"
if [ ! -f "$BINARY_PATH" ]; then
    BINARY_PATH="./build/lumea-agent"
fi

if [ ! -f "$BINARY_PATH" ]; then
    echo "Error: Binary not found. Please run 'make build' first."
    exit 1
fi

# Install binary
echo "Installing binary..."
install -m 755 "$BINARY_PATH" "$INSTALL_DIR/lumea-agent"

# Install systemd service
echo "Installing systemd service..."
install -m 644 configs/lumea-agent.service "$SYSTEMD_DIR/lumea-agent.service"

# Setup cgroups v2 (if available)
if [ -f "/sys/fs/cgroup/cgroup.controllers" ]; then
    echo "Setting up cgroups v2..."
    mkdir -p "$CGROUP_DIR"
    chown lumea:lumea "$CGROUP_DIR"

    # Enable controllers in parent
    echo "+cpu +memory +pids" > /sys/fs/cgroup/cgroup.subtree_control 2>/dev/null || true
fi

# Reload systemd
echo "Reloading systemd..."
systemctl daemon-reload

echo ""
echo "================================"
echo "Installation Complete!"
echo "================================"
echo ""
echo "To start the service:"
echo "  systemctl start lumea-agent"
echo ""
echo "To enable on boot:"
echo "  systemctl enable lumea-agent"
echo ""
echo "To check status:"
echo "  systemctl status lumea-agent"
echo ""
echo "API available at: http://localhost:8080"
echo ""
