📘 README — Backend для Rick and Morty Characters API
📄 Описание проекта

Этот сервер на Go выполняет роль прокси-бэкенда между фронтендом (React) и публичным API — Rick and Morty API
.
Он принимает запросы от фронта, делает обращение к внешнему API, получает данные о персонажах и возвращает их обратно в браузер в формате JSON.

Такой подход решает проблему CORS (ограничения браузера на прямые запросы к сторонним доменам).

Основной функционал

Слушает HTTP-запросы на порту 8080.

Обрабатывает запросы по маршруту:

GET /api/characters


Дальше делает запрос к https://rickandmortyapi.com/api/character.

Полученные данные в формате JSON отправляет обратно фронтенду.

Добавляет CORS-заголовок, чтобы React-приложение могло делать запросы без ошибок.

🧩 Технологии
Технология	Назначение
Go (net/http)	Основной веб-сервер
encoding/json	Работа с JSON
io	Чтение тела ответа
log	Логирование ошибок и запуска
Rick and Morty API	Внешний источник данных

🗂️ Структура проекта
project/
│
├── main.go              # основной файл сервера
└── README.md            # документация (этот файл)

🧠 Как работает код
package main

import (
    "encoding/json"
    "io"
    "log"
    "net/http"
)

const apiURL = "https://rickandmortyapi.com/api/character"

func main() {
    // Регистрируем обработчик для маршрута /api/characters
    http.HandleFunc("/api/characters", func(w http.ResponseWriter, r *http.Request) {
        // Настраиваем заголовки
        w.Header().Set("Content-Type", "application/json")
        w.Header().Set("Access-Control-Allow-Origin", "*") // разрешаем фронтенду делать запросы

        // Делаем запрос к Rick and Morty API
        resp, err := http.Get(apiURL)
        if err != nil {
            http.Error(w, "failed to fetch characters", http.StatusInternalServerError)
            return
        }
        defer resp.Body.Close()

        // Читаем ответ
        body, err := io.ReadAll(resp.Body)
        if err != nil {
            http.Error(w, "failed to read response", http.StatusInternalServerError)
            return
        }

        // Проверяем, что ответ — корректный JSON
        var data map[string]any
        if err := json.Unmarshal(body, &data); err != nil {
            http.Error(w, "invalid json from api", http.StatusInternalServerError)
            return
        }

        // Возвращаем JSON фронтенду
        json.NewEncoder(w).Encode(data)
    })

    // Запускаем сервер на порту 8080
    log.Println("✅ Server running on http://localhost:8080")
    log.Fatal(http.ListenAndServe(":8080", nil))
}

🚀 Как запустить
1. Установи Go

👉 https://go.dev/dl

Проверь установку:

go version

2. Запусти сервер

Из папки с main.go:

go run main.go


В консоли появится сообщение:

✅ Server running on http://localhost:8080

🌐 Как проверить вручную

Открой в браузере:

http://localhost:8080/api/characters


Или через curl:

curl http://localhost:8080/api/characters


Ты должен увидеть JSON вроде:

{
  "info": { "count": 826, "pages": 42, ... },
  "results": [
    {
      "id": 1,
      "name": "Rick Sanchez",
      "status": "Alive",
      "species": "Human",
      "image": "https://rickandmortyapi.com/api/character/avatar/1.jpeg"
    },
    ...
  ]
}

💡 Почему нужен этот бэкенд

Если бы React-фронт делал запрос напрямую на:

https://rickandmortyapi.com/api/character


браузер заблокировал бы его из-за CORS-policy (другой домен).

Бэкенд решает это, так как запрос идёт:

React → localhost:8080 (наш сервер) → Rick and Morty API


и возвращается обратно с правильными заголовками:

Access-Control-Allow-Origin: *

🔒 Возможные улучшения
Идея	Что делает
✅ Обработка query-параметров	Добавить возможность передавать номер страницы (?page=2)
✅ Кэширование	Хранить результаты в памяти, чтобы не перегружать внешний API
✅ Логи	Добавить подробные логи запросов и ответов
✅ Тесты	Написать unit-тесты для обработчика
✅ Middleware	Вынести CORS и логирование в отдельные функции