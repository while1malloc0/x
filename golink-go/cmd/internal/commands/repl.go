package commands

import (
	"fmt"
	"io"
	"log"
	"os"
	"strconv"
	"strings"

	"github.com/chzyer/readline"
	"github.com/while1malloc0/x/golink"
)

type Repl struct{}

var completer = readline.NewPrefixCompleter(
	readline.PcItem("links", readline.PcItem("list"), readline.PcItem("create")),
)

func (command *Repl) Run(store golink.Store) error {
	rl, err := readline.NewEx(&readline.Config{
		Prompt:          ">>> ",
		EOFPrompt:       "exit",
		InterruptPrompt: "^C",
		AutoComplete:    completer,
	})
	if err != nil {
		return err
	}

	defer rl.Close()
	rl.CaptureExitSignal()
	log.SetOutput(rl.Stderr())

	for {
		line, err := rl.Readline()
		if err == io.EOF || err == readline.ErrInterrupt {
			return nil
		}
		if err != nil {
			return err
		}
		line = strings.TrimSpace(line)

		switch {
		case line == "exit":
			return nil
		case line == "ping":
			log.Println("pong")
		case line == "links list":
			cmd := ListLinks{}
			cmd.Run(store)
		case strings.HasPrefix(line, "links create"):
			parts := strings.Split(line, " ")
			// trim 'links create'
			parts = parts[2:]
			if len(parts) != 2 {
				fmt.Fprint(os.Stderr, "Invalid. Usage: links create <alias> <target>")
				continue
			}
			cmd := CreateLinks{Alias: parts[3], Target: parts[4]}
			cmd.Run(store)
		default:
			log.Println("unknown command: %v", strconv.Quote(line))
		}
	}
}
