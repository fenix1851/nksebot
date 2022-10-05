const weekdaysKeyboad = {
    inline_keyboard: [
        [{text: 'Сегодня',callback_data: 'today'}],
        [{text: 'Завтра',callback_data: 'tomorrow'}],
        
        [
        {text: 'Пн.', callback_data: 0},
        {text: 'Вт.', callback_data: 1},
        {text: 'Ср.', callback_data: 2},
        {text: 'Чт.', callback_data: 3},
        {text: 'Пт.', callback_data: 4},
        {text: 'Сб.', callback_data: 5},
    ]
]
}

module.exports = weekdaysKeyboad