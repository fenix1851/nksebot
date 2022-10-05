const additionalKeyboard = (ctx) =>{ 
    return {
        inline_keyboard: [
            [
                { text: `✏️  Обновить ✏️ `, callback_data: 'userWeekdayUpdate' },
            ],
            [
                { text: `📒 Завтра 📒`, callback_data: 'userWeekdayTomorrow' },
                { text: `📒 Сегодня 📒`, callback_data: 'userWeekdayToday'}
            ],
            [
                { text: `⚙️ Изменить настройки ⚙️`, callback_data: 'changeSettings' },
            ],
            [
                { text: `📅 Сменить день недели 📅`, callback_data: 'changeWeekday' },
            ],
            [
                { text: `💵 Поддержать разработчика 💵`, callback_data: 'supportAuthor' },
            ],
            [
                {text:"Посмотреть расписание на сайте", url: `https://www.nkse.ru/html_pages/${ctx.session.userBuilding}_${ctx.session.userShift}_${ctx.session.shortWeekday}.htm`}
            ]
        ]
    }
}


module.exports = additionalKeyboard