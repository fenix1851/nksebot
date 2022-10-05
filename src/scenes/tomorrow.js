const { Scenes: { BaseScene } } = require('telegraf')
const tomorrow = new BaseScene('tomorrow');
const fs = require('fs')

tomorrow.enter((ctx) => {
    ctx.tg.deleteMessage(ctx.chat.id, ctx.update.callback_query.message.message_id)
    const date = new Date()
    const tomorrowNumber = date.getDay() + 1
    switch (tomorrowNumber) {
        case (1): ctx.session.userWeekdayTomorrow = 'pn'
            break
        case (2): ctx.session.userWeekdayTomorrow = 'vt'
            break
        case (3): ctx.session.userWeekdayTomorrow = 'sr'
            break
        case (4): ctx.session.userWeekdayTomorrow = 'ch'
            break
        case (5): ctx.session.userWeekdayTomorrow = 'pt'
            break
        case (6): ctx.session.userWeekdayTomorrow = 'sb'
            break
        case (7): ctx.session.userWeekdayTomorrow = 'vs'
            break
    }
    var shedulePhotoPath = `src/screenshots/${ctx.session.userBuilding}/${ctx.session.userShift}/${ctx.session.userWeekdayTomorrow}.jpeg`
    if (ctx.session.userBuilding && ctx.session.userShift && ctx.session.userWeekday) {
        var shedulePhoto = fs.readFileSync(shedulePhotoPath)
        var building = 1
        var weekday = ''
        switch (ctx.session.userBuilding) {
            case ('A'): building = 1
                break
            case ('B'): building = 2
                break
        }
        switch (ctx.session.userWeekdayTomorrow) {
            case ('pn'): weekday = 'понедельник'
                break
            case ('vt'): weekday = 'вторник'
                break
            case ('sr'): weekday = 'среду'
                break
            case ('ch'): weekday = 'четверг'
                break
            case ('pt'): weekday = 'пятницу'
                break
            case ('sb'): weekday = 'субботу'
                break
            case ('vs'): weekday = 'воскресенье'
                break
        }
        if (ctx.session.notShakal) {
            ctx.tg.sendDocument(ctx.chat.id, { source: shedulePhoto, filename: `${Math.random() * 1000}.jpeg` }, { caption: `Расписание ${building} корпуса , ${ctx.session.userShift} смены на ${weekday}` })
            setTimeout(() => {
                ctx.tg.sendMessage(ctx.chat.id, 'Дополнительно:', {
                    reply_markup: {
                        inline_keyboard: [
                            [
                                { text: `✏️  Обновить ✏️ `, callback_data: 'userWeekdayToday' },
                            ],
                            [
                                { text: `📒 Расписание на завтра 📒`, callback_data: 'userWeekdayTomorrow' },
                            ],
                            [
                                { text: `⚙️ Изменить настройки ⚙️`, callback_data: 'changeSettings' },
                            ],
                            [
                                { text: `📅 Сменить день недели 📅`, callback_data: 'changeWeekday' },
                            ],
                            [
                                { text: `💵 Поддержать разработчика 💵`, callback_data: 'supportAuthor' },
                            ]
                        ]
                    }
                })
            }, 1300)
        }
        else {
            ctx.tg.sendPhoto(ctx.chat.id, { source: shedulePhoto }, { caption: `Расписание ${building} корпуса , ${ctx.session.userShift} смены на ${weekday}` })
            setTimeout(() => {
                ctx.tg.sendMessage(ctx.chat.id, 'Дополнительно:', {
                    reply_markup: {
                        inline_keyboard: [
                            [
                                { text: `✏️  Обновить ✏️ `, callback_data: 'userWeekdayToday' },
                            ],
                            [
                                { text: `📒 Расписание на завтра 📒`, callback_data: 'userWeekdayTomorrow' },
                            ],
                            [
                                { text: `⚙️ Изменить настройки ⚙️`, callback_data: 'changeSettings' },
                            ],
                            [
                                { text: `📅 Сменить день недели 📅`, callback_data: 'changeWeekday' },
                            ],
                            [
                                { text: `💵 Поддержать разработчика 💵`, callback_data: 'supportAuthor' },
                            ]
                        ]
                    }
                })
            }, 1300)
        }
    }
    else {
        ctx.tg.sendMessage(ctx.chat.id, '🔧Обновите настройки🔧', {
            reply_markup: {
                inline_keyboard: [
                    [
                        { text: `⚙️ Обновить ⚙️`, callback_data: 'changeSettings' },
                    ]
                ]
            }
        })
    }
    ctx.scene.leave('tomorrow')
})
module.exports = tomorrow