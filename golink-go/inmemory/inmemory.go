package inmemory

import "github.com/while1malloc0/x/golink"

type Store struct {
	links map[string]golink.GoLink
}

// Store is a golink.GoLinkStore that stores links in memory
func (s *Store) ListGoLinks() ([]golink.GoLink, error) {
	var out []golink.GoLink
	for _, gl := range s.links {
		out = append(out, gl)
	}
	return out, nil
}

func (s *Store) CreateGoLink(gl golink.GoLink) error {
	s.links[gl.Alias] = gl
	return nil
}
