package commands

import (
	"fmt"
	"net/http"
	"os"

	"github.com/while1malloc0/x/golink"
)

type Serve struct {
	Port int `kong:"short='p',default='8080'"`
}

func (command *Serve) Run(store golink.Store) error {
	addr := fmt.Sprintf(":%d", command.Port)
	fmt.Fprintf(os.Stderr, "serving on port %d\n", command.Port)
	return http.ListenAndServe(addr, nil)
}
