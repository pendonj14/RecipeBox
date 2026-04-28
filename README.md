# RecipeBox

A simple recipe browsing app built with React, Vite, Tailwind CSS, and shadcn/ui.

## Features

- Browse recipes with search by name or ingredient
- Save recipes to favorites (persisted in localStorage)
- Add your own custom recipes
- Delete custom recipes

---

## Setup & Installation

### 1. Clone the repository

```bash
git clone https://github.com/pendonj14/RecipeBox
cd recipebox
```

### 2. Install dependencies

```bash
npm install
```

### 3. Install shadcn/ui components (if starting fresh)

```bash
npx shadcn@latest init
npx shadcn@latest add button card badge dialog
```

---

## Running the App

```bash
npm run dev
```

Then open localhost

---

## shadcn/ui Components Used

| Component | Usage |
|-----------|-------|
| `Button`  | Actions like "View Recipe", "Add Recipe", form submit |
| `Card`, `CardHeader`, `CardTitle`, `CardDescription`, `CardFooter`, `CardAction` | Recipe cards in the grid |
| `Badge`   | Recipe category label on each card |
| `Dialog`, `DialogContent`, `DialogHeader`, `DialogTitle`, `DialogDescription`, `DialogFooter`, `DialogClose` | Recipe detail modal and Add Recipe form |

---

## Data Source

Recipes are stored in `src/data/recipes.json` as a static array of recipe objects. Each recipe includes:

- `id`, `title`, `category`, `image` (URL)
- `ingredients` (array of strings)
- `instructions` (array of strings)
- `cookingTime`, `servings`

Custom recipes added by the user are stored separately in `localStorage` under the key `customRecipes`. Favorites are stored under `recipeFavorites`.
