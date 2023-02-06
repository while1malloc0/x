package golink

// GoLinkStore is anything capable of doing CRUD operations on GoLinks
type GoLinkStore interface {
	ListGoLinks() ([]GoLink, error)
	CreateGoLink(GoLink) error
}

// GoLink represents a GoLink, a short alias to a URL
type GoLink struct {
	Alias  string
	Target string
}
