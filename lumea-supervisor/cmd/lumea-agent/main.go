// Lumea Dev Server Supervisor Agent
//
// A resilient, efficient, and observable system for managing
// multiple Next.js development servers.
package main

import (
	"flag"
	"fmt"
	"log"
	"os"
	"time"

	"github.com/shoplixsrl/lumea-supervisor/internal/agent"
	"github.com/shoplixsrl/lumea-supervisor/internal/types"
)

var (
	version = "1.0.0"
	commit  = "unknown"
)

func main() {
	// Parse command line flags
	var (
		listenAddr    = flag.String("listen", ":8080", "HTTP server listen address")
		statePath     = flag.String("state", "/var/lib/lumea/servers.json", "Path to persist server state")
		logDir        = flag.String("log-dir", "/var/log/lumea", "Base directory for server logs")
		maxMemPct     = flag.Float64("max-mem", 85.0, "Maximum total memory percentage before eviction")
		maxCPUPct     = flag.Float64("max-cpu", 90.0, "Maximum total CPU percentage before eviction")
		maxServers    = flag.Int("max-servers", 10, "Maximum number of running servers")
		sampleInterval = flag.Duration("sample-interval", time.Second, "Metrics sampling interval")
		showVersion   = flag.Bool("version", false, "Show version and exit")
	)

	flag.Parse()

	if *showVersion {
		fmt.Printf("lumea-agent version %s (commit %s)\n", version, commit)
		os.Exit(0)
	}

	// Configure agent
	config := agent.Config{
		ListenAddr: *listenAddr,
		StatePath:  *statePath,
		LogDir:     *logDir,
		NodePolicy: types.NodePolicy{
			MaxTotalMemPct:    *maxMemPct,
			MaxTotalCPUPct:    *maxCPUPct,
			MaxRunningServers: *maxServers,
		},
		MetricsSampleInterval: *sampleInterval,
	}

	// Create and run agent
	a := agent.New(config)

	log.Printf("Starting Lumea agent v%s", version)
	log.Printf("  Listen address: %s", config.ListenAddr)
	log.Printf("  State path: %s", config.StatePath)
	log.Printf("  Log directory: %s", config.LogDir)
	log.Printf("  Max memory: %.1f%%", config.NodePolicy.MaxTotalMemPct)
	log.Printf("  Max CPU: %.1f%%", config.NodePolicy.MaxTotalCPUPct)
	log.Printf("  Max servers: %d", config.NodePolicy.MaxRunningServers)

	if err := a.Run(); err != nil {
		log.Fatalf("Agent error: %v", err)
	}
}
