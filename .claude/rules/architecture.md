# Claude Code Rules — Feature-Sliced Design (FSD)

## Общие принципы

- Используй архитектуру Feature-Sliced Design (FSD)
- Код должен быть модульным, масштабируемым и предсказуемым
- Избегай:
    - глобальных зависимостей
    - пересечения слоёв
    - больших "god-файлов"

---

## Структура проекта

src/
app/          # инициализация приложения (providers, router, store)
processes/    # устаревший слой (использовать редко)
pages/        # страницы (роуты)
widgets/      # крупные UI блоки
features/     # бизнес-фичи (действия пользователя)
entities/     # бизнес-сущности
shared/       # переиспользуемый код

---

## Слои и ответственность

app/
- Инициализация приложения
- Глобальные провайдеры
- Глобальные стили

pages/
- Страницы
- Композиция widgets и features
- Без бизнес-логики

widgets/
- Крупные UI блоки
- Комбинируют features и entities

features/
- Бизнес-логика
- Действия пользователя (login, createStudio)
- Содержат ui, model, api

entities/
- Бизнес-сущности (studio, device, zone)
- Содержат model, api, базовый ui

shared/
- Переиспользуемый код
- Не содержит бизнес-логики

shared/
ui/        # кнопки, инпуты
lib/       # утилиты
config/    # конфиги
api/       # базовый API клиент
styles/    # глобальные стили

---

## Правило зависимостей (ВАЖНО)

Импорт разрешён только вниз:

app → pages → widgets → features → entities → shared

Запрещено:
- entities → features
- shared → любой слой выше
- циклические зависимости

---

## Структура слайса

slice-name/
ui/        # UI компоненты
model/     # состояние и логика
api/       # запросы
lib/       # утилиты
config/    # настройки
index.ts   # публичный API

---

## Public API

Всегда экспортируй через index.ts

Плохо:
import { createStudio } from '@/features/studio/model/createStudio'

Хорошо:
import { createStudio } from '@/features/studio'

---

## Правила для Claude Code

1. Соблюдай FSD структуру
- Не создавай файлы вне слоёв
- Не смешивай ответственность

2. Используй Public API
- Импорт только через index.ts
- Не импортируй внутренности слайса

3. Разделяй UI и логику
- UI → ui/
- Логика → model/

4. Не дублируй код
- Если используется в нескольких местах → shared/

5. Нейминг
- features → глаголы (createStudio, loginUser)
- entities → существительные (studio, device)
- widgets → UI блоки (Header, Sidebar)

6. API
- Все запросы в api/
- Не писать fetch в UI

7. Глобальные стили
- Только в shared/styles/
- Подключаются в app/

8. Антипаттерны (запрещено)
- Большие компоненты
- Логика в JSX
- Нарушение слоёв
- Файлы на 1000+ строк

---

## Пример структуры

entities/
studio/
zone/
device/

features/
create-studio/
delete-device/
monitor-devices/

widgets/
studio-dashboard/
zone-grid/

---

## Главный принцип

Каждый слой знает только о слоях ниже и не знает о слоях выше
