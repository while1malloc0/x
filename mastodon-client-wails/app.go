package main

import (
	"context"
	"os"

	"github.com/mattn/go-mastodon"
	"github.com/wailsapp/wails/v2/pkg/logger"
)

// App struct
type App struct {
	ctx    context.Context
	logger logger.Logger
}

// NewApp creates a new App application struct
func NewApp(logger logger.Logger) *App {
	return &App{
		logger: logger,
	}
}

// startup is called when the app starts. The context is saved
// so we can call the runtime methods
func (a *App) startup(ctx context.Context) {
	a.ctx = ctx
}

func (a *App) FetchPosts() []*mastodon.Status {
	// === Mastodon stuff ===
	c := mastodon.NewClient(&mastodon.Config{
		Server:      "https://hachyderm.io",
		AccessToken: os.Getenv("MASTODON_ACCESS_TOKEN"),
	})
	timeline, err := c.GetTimelineHome(context.Background(), nil)
	if err != nil {
		panic(err)
	}

	return timeline
}
