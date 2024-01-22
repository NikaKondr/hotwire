# HotWire React Application

Данная мини-игра была сделана специально для конкурса от [ragemp.pro](https://ragemp.pro/threads/novogodnij-konkurs-2024-razvivaem-portal-vmeste.9661/)

## Установка зависимостей

1. Убедитесь, что у вас установлен Node.js и npm (Node Package Manager).
2. В корневой папке проекта выполните команду для установки зависимостей:

    ```bash
    npm install
    ```

## Описание мини-игры HotWire

Приложение HotWire представляет собой интерактивную игру на React, где пользователь соединяет провода между контактами разных цветов. Игра включает в себя следующие особенности:

- Взаимодействие с проводами: пользователь может соединять провода между контактами левой и правой стороны игрового поля.
- Выбор цветов: каждый контакт представляет цвета, и пользователь должен соединить провода таким образом, чтобы цвета совпадали.
- Игровое поле: представляет собой область, в которой пользователь производит соединение проводов.
- Визуализация: провода визуализируются на игровом поле в виде кривых линий разных цветов.
- События: приложение реагирует на события, такие как завершение игры и нажатие клавиши Esc.

## Как запустить приложение

1. **Запуск:**
   Запустите приложение с помощью следующей команды:

    ```bash
    npm start
    ```

   После выполнения этой команды приложение будет доступно по адресу `http://localhost:3000` в вашем веб-браузере.

2. **Игровой процесс:**
   - Используйте левую кнопку мыши (ЛКМ), чтобы соединять провода между контактами разных цветов.
   - Нажмите клавишу Esc для выхода из игры.

3. **Завершение игры:**
   При успешном соединении всех контактов цвета, игра завершится. Если вы хотите начать заново, нажмите на кнопку "Начать заново" после завершения игры.

## Работа с ивентами

В данной работе был использован [rage-rpc](https://github.com/micaww/rage-rpc)

### Отображение интерфейса мини-игры HotWire от сервера к клиенту
``'router:setComponent', 'hotWire'``

Вы так же можете проверить работоспособность ивента вызва его в консоли браузера
	``callHandler('router:setComponent', 'hotWire')``

### Ивент о закрытие мини-игры от клиента к серверу
``(hotWire:exit)``

### Ивент о завершение мини-игры от клиента к серверу
``(hotWire:gameFinished)``
