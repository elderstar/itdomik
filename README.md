Это мой первый [Next.js](https://nextjs.org) проект, начал я его для ознокомления с [React](https://react.dev/) и фреймворком Next.js. 

Нашел [Next.js](https://nextjs-ru.vercel.app/) на русском, полистал документацию, понял что нужно подготовить окружение.

1. Системные Требования

    - Node.js 10.13 или новее
    - Поддерживаются MacOS, Windows (включая WSL) и Linux.

### Окружение: 
- У меня установлена OS Windows 10, пошел смотреть как устанавливать [NodeJS](https://nodejs.org) на Windows;
- Редактор у меня [Visual Studio Code](https://code.visualstudio.com/);
- Терминал PowerShell

... и так, после установки проверяю версии

```powershell
PS D:\Study\itdom\itdom-app> node -v
v22.14.0
PS D:\Study\itdom\itdom-app> npm -v
10.9.2
```
... а да, название я выбрал *itdom*, мы с единомышленниками давно обдумывали совместный проект,
почему бы и не не взять его в учебныйх целях, подумал я.

Далее я вооружился [Deepseek](https://chat.deepseek.com/) и составил промт, если в кратце, то объяснил что я 
хочу изучать NextJS и давай создадим в учебных целях новый проект, описал ему каким я вижу проект и чат выдал мне
структуру с примерами как это все может выглядеть и какие еще мне нужно к проекту установить зависимости это библиотеки, от которых зависит функциональность проекта.

Я полез все перепроверять с документацией, проверять зачем нужны эти зависимости, чтобы разобраться что к чему.
Оказалось что ИИ выдал мне пример устаревшей структуры с (Pages Router), а в новой версии (App Router)
я это ему указал, он поправился, переделал примеры, показал новую структуру проекта.

Сразу что нужно отметить, что архитектура приложения Контейнерные компоненты (Container components)
сильно отличается от привычной мне MVC архитектуры, к которой я привык, но оно и к лучшему... 

_примерно так выглядит история моих команд в терминале_

```powershell
PS D:\Study\itdom\itdom-app> npx create-next-app@latest itdom-app --typescript --app --src-dir --eslint
PS D:\Study\itdom\itdom-app> cd .\itdom-app\
PS D:\Study\itdom\itdom-app> npm install next-auth prisma @prisma/client mysql2 ioredis mongodb bcrypt react-hook-form axios
PS D:\Study\itdom\itdom-app> npx prisma init
PS D:\Study\itdom\itdom-app> npx prisma migrate dev --name init
PS D:\Study\itdom\itdom-app> npx prisma generate
PS D:\Study\itdom\itdom-app> npm i @next-auth/prisma-adapter
PS D:\Study\itdom\itdom-app> npm i @next-auth/upstash-redis-adapter
PS D:\Study\itdom\itdom-app> npm install next-auth @next-auth/prisma-adapter @next-auth/upstash-redis-adapter
PS D:\Study\itdom\itdom-app> npm install tailwindcss @tailwindcss/postcss postcss
```

## Стартуем 

запускаем и смотрим что получилось:

```powershell
PS D:\Study\itdom\itdom-app> npm run dev
```

Открываем [http://localhost:3000](http://localhost:3000) в браузере и смотрим результат.
