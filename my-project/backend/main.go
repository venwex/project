package main

import (
	"encoding/json"
	"io"
	"log"
	"net/http"
)

const apiURL = "https://rickandmortyapi.com/api/character"

func main() {
	http.HandleFunc("/api/characters", func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Content-Type", "application/json")
		w.Header().Set("Access-Control-Allow-Origin", "*") // разрешаю запросы с фронта

		resp, err := http.Get(apiURL)
		if err != nil {
			http.Error(w, "failed to fetch characters", http.StatusInternalServerError)
			return
		}
		defer resp.Body.Close()

		body, err := io.ReadAll(resp.Body)
		if err != nil {
			http.Error(w, "failed to read response", http.StatusInternalServerError)
			return
		}

		// тут проверяю, что Rick and Morty API вернул JSON
		var data map[string]any
		if err := json.Unmarshal(body, &data); err != nil {
			http.Error(w, "invalid json from api", http.StatusInternalServerError)
			return
		}

		json.NewEncoder(w).Encode(data)
	})

	log.Fatal(http.ListenAndServe(":8080", nil))
}
