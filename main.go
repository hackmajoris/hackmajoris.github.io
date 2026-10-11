package main

import (
	_ "embed"
	"encoding/json"
	"fmt"
	"html/template"
	"log"
	"os"
	"path/filepath"
)

//go:embed index.html.tmpl
var indexTmpl string

type App struct {
	Name        string `json:"name"`
	Description string `json:"description"`
	URL         string `json:"url"`
	Logo        string `json:"logo"`
}

type Site struct {
	Title  string `json:"title"`
	GitHub string `json:"github"`
	Email  string `json:"email"`
	Apps   []App  `json:"apps"`
}

func main() {
	if err := run("site.json", "static", "public"); err != nil {
		log.Fatal(err)
	}
}

func run(configPath, staticDir, outDir string) error {
	site, err := loadSite(configPath)

	if err != nil {
		return err
	}
	
	if err := os.RemoveAll(outDir); err != nil {
		return err
	}
	
	if err := os.CopyFS(outDir, os.DirFS(staticDir)); err != nil {
		return fmt.Errorf("copy static: %w", err)
	}
	f, err := os.Create(filepath.Join(outDir, "index.html"))
	if err != nil {
		return err
	}
	
	defer f.Close()
	tmpl := template.Must(template.New("index").Parse(indexTmpl))
	
	if err := tmpl.Execute(f, site); err != nil {
		return fmt.Errorf("render: %w", err)
	}
	
	log.Printf("built %s/index.html with %d apps", outDir, len(site.Apps))

	return nil
}

func loadSite(path string) (Site, error) {
	var site Site
	data, err := os.ReadFile(path)
	
	if err != nil {
		return site, err
	}
	
	if err := json.Unmarshal(data, &site); err != nil {
		return site, fmt.Errorf("parse %s: %w", path, err)
	}

	for i, a := range site.Apps {
		if a.Name == "" || a.URL == "" {
			return site, fmt.Errorf("app #%d: name and url are required", i+1)
		}
	}

	return site, nil
}
