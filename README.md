Учебный проект в рамках React-интенсива компании Aston

### Запуск проекта

- npm i
- npm run start

### Реализованы следующие требования к функциональности:

### 1 уровень (необходимый минимум)

### React

- Функциональные компоненты c хуками в приоритете над классовыми,
- Есть рендеринг списков ([BanksList](./src/widgets/BanksList/BanksList.tsx)),
- Реализована хотя бы одна форма ([SignUp](./src/features/auth/signUp/ui/SignUpForm/SignUpForm.tsx), [SignIn](./src/features/auth/signIn/ui/SignInForm/SignInForm.tsx), [SearchForm](./src/features/search/ui/SearchForm/SearchForm.tsx)),
- Есть применение Контекст API ([BackgroundContext](./src/app/index.tsx)),
- Есть применение предохранителя ([withErrorBoundary](./src/index.tsx)),
- Есть хотя бы один кастомный хук ([useFavorites](./src/shared/hooks/useFavorites.ts), [useThrottle](./src/shared/hooks/useThrottle.ts), [useHistory](./src/shared/hooks/useHistory.ts), [useCurrentUser](./src/shared/hooks/useCurrentUser.ts), [useLocalStorageUsers](./src/shared/hooks/useLocalStorageUsers.ts)),
- Хотя бы несколько компонентов используют PropTypes ([BanksList](./src/widgets/BanksList/BanksList.tsx), [BankCard](./src/entities/bank/ui/bank-card/index.tsx)),
- Поиск не триггерит много запросов к серверу ([useThrottle](./src/shared/hooks/useThrottle.ts)),
- Есть применение lazy + Suspense ([lazy+Suspense](./src/app/index.tsx))

### Redux

- Используется Modern Redux with Redux Toolkit ([configureStore](./src/app/redux/store.ts)),
- Используются слайсы ([banksSlice](./src/app/redux/banksSlice.ts)),
- Есть хотя бы одна кастомная мидлвара ([saveHistoryMiddleware](./src/app/redux/middlewares/saveHistoryMiddleware.ts), [saveFavoriteMiddleware](./src/app/redux/middlewares/saveFavoriteMiddleware.ts)),
- Используется RTK Query ([apiSlice](./src/app/redux/apiSlice.ts)),
- Используется Transforming Responses ([apiSlice](./src/app/redux/apiSlice.ts))
