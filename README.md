# Сайт бургерной Stellar Burgers


*Учебный проект, осознанно переписанный с нуля*

Цели:
- подойти к созданию проекта с точки зрения структуры и функционала (а не последовательности изучения технологий)
- попрактиковаться в написании сайта сразу на TypeScript
- применить недавно изученные технологии (например, RTK Query)

[Stellar Burgers на GitHub Pages](https://alice-rami.github.io/stellar-burger-cool/)

## Стек
React | TypeScript | Redux Toolkit | RTK Query | React Router | React DND | CSS Modules | Websocket | Vite | Classnames

## Что изменилось
- появилось разделение на контейнеры (для получения данных) и компоненты (для отрисовки)
- лента заказов, обновляющаяся в реальном времени через Websocket теперь реализована с помощью RTK Query
  - это дало возможность использовать кэширование, позволило избавиться от громоздкой middleware и лаконично описать запросы к api, а также использовать кэширование
- более четкое разделение на внутренние и внешние стили
- более лаконичное описание стилей в JSX благодаря библиотеке Classnames
- упорядочен роутинг
- упорядочены модальные окна
- в качестве сборщика используется Vite вместо CRA
- deploy на GitHub Pages

## Планы по доработке
- доработать адаптивность с помощью CSS Grid
- доработать эффекты при прокрутке и использовании табов с помощью Framer Motion
- доработать стили и валидацию форм

## Инструкция по использованию
- ```npm i```
- ```npm run dev``` - запуск в режиме разработки
- ```npm run build``` - сборка
- ```npm run preview``` - предварительный просмотр собранной версии
