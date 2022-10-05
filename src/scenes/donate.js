const { Scenes:  {BaseScene} } = require('telegraf')
const donate = new BaseScene('donate');

donate.enter((ctx)=>{
    try{
    ctx.tg.deleteMessage(ctx.chat.id, ctx.update.callback_query.message.message_id)
    ctx.telegram.sendMessage(ctx.chat.id, `
    Тинькофф(работает через СБП с любым банком): https://www.tinkoff.ru/rm/pyatiletov.dmitriy4/SR3Wd96246

    USDT Binance Smart Chain – BEP20:
    0xEe54F4EccAe1f88619625FAD3cFa9306fBF80084
    `,
    {
        reply_markup : {
            inline_keyboard: [
                [
                    {text: `📒Вернуться к расписанию 📒`, callback_data: 'userWeekdayToday'},
                ]
            ]
        }
    }
    )
    // bot.action(/[A-z]+$/, (ctx) => {
    //     var userAction = ctx.match[0]
    //     console.log(userAction)
    //     switch (userAction){
    //         case 'backToToday':
    //             ctx.tg.deleteMessage(ctx.chat.id, ctx.update.callback_query.message.message_id)
    //             ctx.scene.enter('today')
    //             break
    //         case 'backTotomorrow':
    //             ctx.tg.deleteMessage(ctx.chat.id, ctx.update.callback_query.message.message_id)
    //             ctx.scene.enter('tomorrow')
    //             break
    //     }
    ctx.scene.leave('donate')}
    catch(err){
        console.error(err)
    }
    })

module.exports = donate