package commands

import (
	"fmt"
	"os"

	"github.com/while1malloc0/x/golink"
)

type Links struct {
	List   ListLinks   `kong:"cmd"`
	Create CreateLinks `kong:"cmd"`
}

type ListLinks struct{}

func (command *ListLinks) Run(store golink.Store) error {
	links, err := store.ListGoLinks()
	if err != nil {
		return err
	}
	for _, l := range links {
		fmt.Fprintf(os.Stderr, "%s\t\t%s\n", l.Alias, l.Target)
	}
	return nil
}

type CreateLinks struct {
	Alias  string `kong:"arg"`
	Target string `kong:"arg"`
}

func (command *CreateLinks) Run(store golink.Store) error {
	fmt.Fprintf(os.Stderr, "creating link %v...", command.Alias)
	return nil
}
