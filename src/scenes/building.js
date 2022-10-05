const { Scenes:  {BaseScene}, Telegraf } = require('telegraf')
const building = new BaseScene('building');

building.enter((ctx)=>{
    try{
    ctx.tg.deleteMessage(ctx.chat.id, ctx.update.callback_query.message.message_id)
    ctx.telegram.sendMessage(ctx.chat.id, `
            ➡️ Выбери корпус ⬅️`,
    {
        reply_markup : {
            inline_keyboard: [
                [
                    {text: `1️⃣  Первый`, callback_data: 'UserBuildingA'},
                ],
                [
                    {text: `2️⃣  Второй`, callback_data:  'UserBuildingB'},
                ]
            ]
        }
    }
    )
    building.action(/[A-z]+$/, (ctx) => {
        var userAction = ctx.match[0]
        // console.log(userAction)
        switch (userAction){
            case 'UserBuildingA':
                ctx.session.userBuilding = 'A'
                ctx.scene.leave()
                ctx.scene.enter('shift')
                break
            case 'UserBuildingB':
                ctx.session.userBuilding = 'B'  
                ctx.scene.leave()
                ctx.scene.enter('shift')
                break
        } 
    })
    }
    catch(err){
        console.error(err)
    }
})

module.exports = building