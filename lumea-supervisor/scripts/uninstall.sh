#!/bin/bash
set -e

# Lumea Dev Server Supervisor - Uninstallation Script

echo "================================"
echo "Lumea Supervisor Uninstallation"
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

# Stop service
echo "Stopping service..."
systemctl stop lumea-agent 2>/dev/null || true
systemctl disable lumea-agent 2>/dev/null || true

# Remove binary
echo "Removing binary..."
rm -f "$INSTALL_DIR/lumea-agent"

# Remove systemd service
echo "Removing systemd service..."
rm -f "$SYSTEMD_DIR/lumea-agent.service"
systemctl daemon-reload

# Ask about data removal
read -p "Remove state and log directories? (y/N) " -n 1 -r
echo ""
if [[ $REPLY =~ ^[Yy]$ ]]; then
    echo "Removing data directories..."
    rm -rf "$STATE_DIR"
    rm -rf "$LOG_DIR"
fi

# Cleanup cgroups
if [ -d "$CGROUP_DIR" ]; then
    echo "Cleaning up cgroups..."
    rmdir "$CGROUP_DIR" 2>/dev/null || true
fi

# Ask about user removal
read -p "Remove lumea user? (y/N) " -n 1 -r
echo ""
if [[ $REPLY =~ ^[Yy]$ ]]; then
    echo "Removing lumea user..."
    userdel lumea 2>/dev/null || true
fi

echo ""
echo "================================"
echo "Uninstallation Complete!"
echo "================================"
