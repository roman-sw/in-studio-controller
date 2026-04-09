# Claude Code Rules — Clean Code (FSD Compatible)

## 1. Избегать магических чисел

Все магические числа выносятся в константы внутри слайса.

Плохо:
const isAdult = user.age > 18

Хорошо:
const MIN_ADULT_AGE = 18

const isAdult = user.age > MIN_ADULT_AGE

---

## 2. Нейминг + JSDoc

Имена должны отражать смысл.

Правила:
- camelCase для переменных и функций
- функции → глагол (createStudio, getUser)
- переменные → существительные (user, devicesList)
- без tmp, data, a, b

Каждая публичная функция должна иметь JSDoc.

Пример:

/**
* Создает студию
* @param {string} name
* @returns {Promise<Studio>}
  */
  export function createStudio(name) {
  return api.create(name)
  }

---

## 3. Guard clauses вместо вложенности

Избегать глубоких if/else.

Плохо:
if (user) {
if (user.isActive) {
if (user.age > 18) {
// ...
}
}
}

Хорошо:
if (!user) return
if (!user.isActive) return
if (user.age <= 18) return

---

## 4. Порядок импортов (FSD)

Импорты строго по слоям:

1. внешние библиотеки
2. shared
3. entities
4. features
5. widgets / pages (если допустимо)

Пример:

import React from 'react'

import { formatDate } from '@/shared/lib/date'
import { Button } from '@/shared/ui/button'

import { deviceModel } from '@/entities/device'

import { createStudio } from '@/features/create-studio'

Правила:
- не нарушать слои
- всегда использовать public API (index.ts)
- без глубоких импортов (…/model/…)

---

## 5. Структура React компонента

Порядок:

1. константы
2. hooks
3. state
4. api hooks
5. effects
6. handlers
7. render helpers
8. return

Пример:

function Component() {
const MAX_ITEMS = 10

const router = useRouter()

const [count, setCount] = useState(0)

const { data } = useDevices()

useEffect(() => {
// ...
}, [])

function handleClick() {
setCount(prev => prev + 1)
}

return <div />
}

---

## 6. Форматирование

Код делится на логические блоки.

Правила:
- пустая строка после констант
- пустая строка перед if
- пустая строка перед side-effects

---

## 7. Работа с API (FSD-версия)

❌ НЕЛЬЗЯ:
- писать fetch / gql внутри UI

✅ НУЖНО:
- entities/api → базовые запросы
- features/api → сценарии

Пример:

entities/device/api/getDevices.ts
features/create-studio/api/createStudio.ts

---

## 8. Организация API (GraphQL / REST)

Все запросы лежат внутри слоя:

НЕ ТАК:
src/graphql/

ТАК:
entities/user/api/
features/auth/api/

---

## 9. Не дублировать код

Если код используется:
- ≥2 раз → shared/
- связан с доменом → entities/
- связан с действием → features/

---

## 10. Антипаттерны (запрещено)

- логика в JSX
- fetch внутри компонентов
- импорт вне public API
- нарушение слоёв FSD
- универсальные файлы на 1000 строк

---

## 11. Главный принцип

Каждый слой знает только о слоях ниже
