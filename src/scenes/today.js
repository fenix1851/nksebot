const { Scenes: { BaseScene } } = require('telegraf')
const today = new BaseScene('today');
const fs = require('fs')
const additionalKeyboard = require('../keyboards/additional')
const errorKeyboard = require('../keyboards/error')
try {
    today.enter((ctx) => {
        ctx.tg.deleteMessage(ctx.chat.id, ctx.update.callback_query.message.message_id)
        var shedulePhotoPath = `src/screenshots/${ctx.session.userBuilding}/${ctx.session.userShift}/${ctx.session.userWeekday}.jpeg`
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
            switch (ctx.session.userWeekday) {
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
                ctx.tg.sendDocument(ctx.chat.id, { source: shedulePhoto, filename: `${Math.random() * 1000}.jpeg` }, { 
                    caption: `Расписание ${building} корпуса , ${ctx.session.userShift} смены на ${weekday}`,
                    reply_markup: additionalKeyboard
                })
            }
            else {
                ctx.tg.sendPhoto(ctx.chat.id, { source: shedulePhoto }, { 
                    caption: `Расписание ${building} корпуса , ${ctx.session.userShift} смены на ${weekday}`,
                    reply_markup: additionalKeyboard(ctx)
             })
            }
        }
        else {
            ctx.tg.sendMessage(ctx.chat.id, '🔧Обновите настройки🔧', {
                reply_markup: errorKeyboard
            }
            )
        }
        ctx.scene.leave('today')
    })
}
catch (err) {
    console.error(err)
}
module.exports = today