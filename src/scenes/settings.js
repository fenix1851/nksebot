const { Scenes: { BaseScene }, Telegraf } = require('telegraf')
const settings = new BaseScene('settings');

settings.enter((ctx) => {
    try {
        try{
            ctx.tg.deleteMessage(ctx.chat.id, ctx.update.message.message_id)
            // console.log(ctx.message.message_id)

        }
        catch(err){
            try{
                ctx.tg.deleteMessage(ctx.chat.id, ctx.update.callback_query.message.message_id)
                // console.log(ctx.update.callback_query.message.message_id)

            }
            catch(err){
                console.error(err)
            }
        }
        //console.log(ctx.update.callback_query.message.message_id)
        

        ctx.telegram.sendMessage(ctx.chat.id, `
            ⚙️Что хочешь поменять?⚙️`,
            {
                reply_markup: {
                    inline_keyboard: [
                        [
                            { text: `🏛️Сменить корпус/смену🏛️`, callback_data: 'changeSettings' },
                        ],
                        [
                            { text: `📁Вкл/Выкл расписание без сжатия📁`, callback_data: 'shakalSetting' },
                        ]
                    ]
                }
            }
        )
        settings.action(/[A-z]+$/, (ctx) => {
            var userAction = ctx.match[0]
            // console.log(userAction)
            switch (userAction) {
                case 'changeSettings':
                    ctx.scene.enter('building')
                    break
                case 'shakalSetting':
                    if (ctx.session.notShakal == undefined) {
                        ctx.session.notShakal = true
                    }
                    else {
                        ctx.session.notShakal = !ctx.session.notShakal
                    }
                    ctx.scene.enter('shedule',{'option':'today'})
                    break
            }
        })
    }
    catch (err) {
        console.error(err)
    }
})

module.exports = settings