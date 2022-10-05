// импортируем конструктор базовой сцены из библиотеки телеграф
const { Scenes: { BaseScene } } = require('telegraf')
const { DateTime } = require('luxon');
const fs = require('fs')
// создам новую базовую сцену - shedule
const shedule = new BaseScene('shedule');
const ruWeekdays = require('../services/ruWeekdays');
const shortWeekdayName = require('../services/shortWeekdaysNames')
const errorKeyboard = require('../keyboards/error')
const additionalKeyboard = require('../keyboards/additional')



const now = DateTime.now()
// работаю с событием входа в сцену, следующий блок кода будет выполняться при входе в сцену
shedule.enter((ctx) => {
    // Удалим последнее сообщение чтобы не захламлять чат
    // // чат айди уже находил в модуле старт, а месседж айди находится вот так:
    ctx.tg.deleteMessage(ctx.chat.id, ctx.update.callback_query.message.message_id)
    // беру номер дня недели и что именно отправлять(расписание на сегодня, завтра или на выбранный день недели)
    let weekday = ctx.scene.state.weekday
    let option = ctx.scene.state.option
    // выбираю какой будет корпус
    let building = 0
    switch(ctx.session.userBuilding){
        case 'A':
            building = 1 
            break
        case 'B':
            building = 2
            break
    }
    // объявляю переменные для названия дня недели
    let weekdayName;
    // console.log()
    switch(option){
        case 'today':
            weekday = now.weekday-1
            ctx.scene.state.weekday = now.weekday-1
            weekdayName = ruWeekdays.weekdayFromNumber(weekday)
            break
        case 'tomorrow':
            ctx.scene.state.weekday = now.weekday
            weekday = now.weekday
            weekdayName = ruWeekdays.weekdayFromNumber(weekday)
            break
        case 'other_day':
            weekdayName = ruWeekdays.weekdayFromNumber(weekday)
    }
    console.log(weekday + ' in shedule')
    let shortWeekday = shortWeekdayName(weekday)
    console.log(weekday+ ' after shortWeekdayName')
    var shedulePhotoPath = `src/screenshots/${ctx.session.userBuilding}/${ctx.session.userShift}/${shortWeekday}.jpeg`
    // console.log(shedulePhotoPath)
    var shedulePhoto = fs.readFileSync(shedulePhotoPath)
    // console.log(shedulePhoto)
    if(ctx.session.userBuilding && ctx.session.userShift && weekday){
        if (ctx.session.notShakal) {
            ctx.tg.sendDocument(ctx.chat.id, { source: shedulePhoto, filename: `${Math.random() * 1000}.jpeg` }, { 
                caption: `Расписание ${building} корпуса , ${ctx.session.userShift} смены на ${weekdayName}`,
                reply_markup: additionalKeyboard(ctx)
            })
        }
        else {
            ctx.tg.sendPhoto(ctx.chat.id, { source: shedulePhoto }, { 
                caption: `Расписание ${building} корпуса , ${ctx.session.userShift} смены на ${weekdayName}`,
                reply_markup:  additionalKeyboard(ctx) 
         })
        }
    }
    else{
        ctx.tg.sendMessage(ctx.chat.id, '🔧Обновите настройки🔧', {
            reply_markup: errorKeyboard
        })
    }
    

    // После нажатия на клавиатуру надо будет обработать событие, обращаюсь к сцене и делаю обработку
    // // Беру в качестве возможного действия - любое, реализую через регулярное выражение, тоесть любой диапозон от a до z сколько угодно раз
    shedule.action(/[A-z]+$/, (ctx) => {
        // Запишу значение действия в переменную, для этого у ctx обращусь к match и возьму 1 элемент:
        var userAction = ctx.match[0]

        switch (userAction) {
            case 'userWeekdayToday':
                ctx.scene.leave('shedule')
                ctx.scene.enter('shedule', {'option':'today'})
                break
            case 'userWeekdayTomorrow':
                if(now.weekday == 7) weekday == 0
                ctx.scene.leave('shedule')
                ctx.scene.enter('shedule', {'option':'tomorrow'})
                break
            case 'userWeekdayUpdate':
                ctx.scene.leave('shedule')
                console.log(ctx.scene.state.weekday+ ' in update')
                ctx.scene.enter('shedule', {'option':'other_day', 'weekday':ctx.scene.state.weekday})
                break
            case 'changeSettings':
                ctx.scene.leave('shedule')
                ctx.scene.enter('settings')
                break
            case 'changeWeekday':
                ctx.scene.leave('shedule')
                ctx.scene.enter('weekdays')
                break
        }
    })
})

// експортирую сцену

module.exports = shedule