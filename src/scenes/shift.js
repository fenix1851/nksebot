const { Scenes:  {BaseScene} } = require('telegraf')
const shift = new BaseScene('shift');

try {
    shift.enter((ctx)=>{
        ctx.tg.deleteMessage(ctx.chat.id, ctx.update.callback_query.message.message_id)
        try{
        ctx.telegram.sendMessage(ctx.chat.id, '🕞 Выбери смену:',
        {
            reply_markup : {
                inline_keyboard: [
                    [
                        {text: '1️⃣ Первая', callback_data: 'userShift1'},
                    ],
                    [
                        {text: '2️⃣ Вторая', callback_data: 'userShift2'},
                    ]
                ]
            }
        }
        )
        shift.action(['userShift1','userShift2'], (ctx)=>{
            var userAction = ctx.match[0]
            switch(userAction){
                case 'userShift1':
                    ctx.session.userShift = 1
                    break
                case 'userShift2':
                    ctx.session.userShift = 2
                    break
            }
            ctx.scene.leave('shift')
            ctx.scene.enter('weekdays')
        })
        }
        catch(err){
            console.log(err)
        }
    })
} catch (error) {
    console.log(error)
}


module.exports = shift