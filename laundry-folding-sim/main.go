package main

import (
	"fmt"
	"math/rand"
	"time"
)

const (
	foldingTime = 7
	storageTime = 5
)

func init() {
	rand.Seed(time.Now().Unix())
}

func main() {
	const (
		totalSize     = 100
		householdSize = 3
	)
	// Strategy 1: single person, no sorting
	s1 := singlePersonNoSorting(totalSize, householdSize)
	fmt.Printf("Single person, no sorting: %v minutes\n", s1/60)

	// Strategy 2: single person, sort by owner before folding and hanging
	s2 := singlePersonSortByOwner(totalSize, householdSize)
	fmt.Printf("Single person, sorting by owner: %v minutes\n", s2/60)
}

type storageMethod int

const (
	StorageMethodFolded storageMethod = iota
	StorageMethodHung
)

// Clothing simulates an article of clothing
type Clothing struct {
	// The person who owns this piece of clothing
	Owner int
	// How the clothing is stored, either hung or folded
	StorageMethod storageMethod

	elapsed int
}

func (c *Clothing) Fold() {
	c.elapsed += 5
}

func (c *Clothing) ElapsedSeconds() int {
	return c.elapsed
}

// Hamper represents a full hamper of washed laundry
type Hamper struct {
	// the washed laundry
	Load []Clothing
}

// NewHamper returns a Hamper with a washed load of totalSize pieces of clothing
// and householdSize number of owners.
func NewHamper(totalSize int, householdSize int) *Hamper {
	h := Hamper{
		Load: []Clothing{},
	}
	for i := 0; i < totalSize; i++ {
		owner := rand.Intn(householdSize)
		storageSeed := rand.Intn(100)
		storageMethod := StorageMethodHung
		if storageSeed <= 70 {
			storageMethod = StorageMethodFolded
		}
		c := Clothing{Owner: owner, StorageMethod: storageMethod}
		h.Load = append(h.Load, c)
	}
	return &h
}

func singlePersonNoSorting(totalSize, householdSize int) int {
	elapsedSeconds := 0
	h := NewHamper(totalSize, householdSize)

	// step 1: fold clothing, anything that's hangable gets set aside, and each
	// piece of clothing takes 7 seconds to fold
	hangables := []Clothing{}
	foldables := []Clothing{}
	for _, c := range h.Load {
		if c.StorageMethod == StorageMethodFolded {
			hangables = append(hangables, c)
		} else {
			elapsedSeconds += 7
			foldables = append(foldables, c)
		}
	}

	// step 2: hang up clothing. each owner has a separate closet, and
	// hanging clothes is a blanket 5 seconds per owner
	owners := map[int]struct{}{}
	for _, c := range hangables {
		owners[c.Owner] = struct{}{}
	}
	for range owners {
		elapsedSeconds += 5
	}

	// step 3: store folded clothing. each owner has a separate drawer, and
	// storing is a blanket 5 seconds per owner.
	owners = map[int]struct{}{}
	for _, c := range foldables {
		owners[c.Owner] = struct{}{}
	}
	for range owners {
		elapsedSeconds += 5
	}

	return elapsedSeconds
}

func singlePersonSortByOwner(totalSize, householdSize int) int {
	elapsedSeconds := 0
	h := NewHamper(totalSize, householdSize)

	// step 1: sort by owner. each choice takes 2 seconds to throw into the appropriate pile
	owners := map[int][]Clothing{}
	for _, c := range h.Load {
		elapsedSeconds += 2
		owners[c.Owner] = append(owners[c.Owner], c)
	}

	// step 2: for each owner, fold their clothes and store them. Storage takes
	// a blanket 5 seconds per owner.
	for _, pile := range owners {
		for _, c := range pile {
			if c.StorageMethod == StorageMethodFolded {
				elapsedSeconds += foldingTime
			}
		}
		// 5 for hanging...
		elapsedSeconds += storageTime
		// and another 5 for storing folded clothing
		elapsedSeconds += storageTime
	}

	return elapsedSeconds
}
