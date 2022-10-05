const {Scenes: {BaseScene}} = require('telegraf')

const weekdays = new BaseScene('weekdays')
const weekdaysKeyboad = require('../keyboards/weekdays')
weekdays.enter((ctx)=>{
    ctx.tg.deleteMessage(ctx.chat.id, ctx.update.callback_query.message.message_id)
    ctx.tg.sendMessage(ctx.chat.id, 'Выберите день недели:', {reply_markup: weekdaysKeyboad})

    weekdays.action(/.+$/, (ctx)=>{
        var userAction = ctx.match[0]
        switch(userAction){
            case('today'):
                ctx.scene.leave('weekdays')
                ctx.scene.enter('shedule', {'option':'today'})
                break
            case('tomorrow'):
                ctx.scene.leave('weekdays')
                ctx.scene.enter('shedule', {'option':'tomorrow'})
                break
            default:
                ctx.scene.leave('weekdays')
                ctx.scene.enter('shedule',{'option':'other_day', 'weekday':userAction})
        }
    })
})

module.exports = weekdays