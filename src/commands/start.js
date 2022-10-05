module.exports = () => async (ctx)=>{
    ctx.session.userId = ctx.update.message.from.id
    ctx.telegram.sendMessage(ctx.chat.id, `
    Чтобы начать пользоваться ботом:

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
}