package main

import (
	"log"

	"github.com/alecthomas/kong"
	"github.com/while1malloc0/x/golink"
	"github.com/while1malloc0/x/golink/cmd/internal/commands"
	"github.com/while1malloc0/x/golink/inmemory"
)

var CLI struct {
	Store string         `kong:"default='inmemory',enum='sqlite,inmemory'"`
	Repl  commands.Repl  `kong:"cmd"`
	Links commands.Links `kong:"cmd"`
	Serve commands.Serve `kong:"cmd"`
}

func main() {
	if err := run(); err != nil {
		log.Fatal(err)
	}
}

func run() error {
	ctx := kong.Parse(&CLI, kong.UsageOnError())
	if ctx.Error != nil {
		return ctx.Error
	}

	var store golink.Store
	switch CLI.Store {
	case "inmemory":
		store = &inmemory.Store{}
	}

	return ctx.Run(store)
}
