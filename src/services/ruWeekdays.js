const weekdayFromNumber = (number) => {
    let weekday = ''
    number = number.toString()
    // console.log(number)
    switch (number) {
        case '0':
            weekday = 'Понедельник'
            break
        case '1':
            weekday = 'Вторник'
            break
        case '2':
            weekday = 'Среду'
            break
        case '3':
            weekday = 'Четверг'
            break
        case '4':
            weekday = 'Пятницу'
            break
        case '5':
            weekday = 'Субботу'
            break
        case '6':
            weekday = 'Воскресенье'
            break
    }
    if (weekday) {
        return weekday
    }
    else {
        console.log(number)
        console.error('There are no such weekday in week, try another number(0..6)')
        return 'Error, check the console'
    }

}

const numberFromWeekday = (weekday) => {
    //  Availible weekdays names: Понедельник, Вторник, Среда, Четверг, Пятница, Суббота, Воскресенье
    let number
    switch (weekday) {
        case 'Понедельник':
            number = 0
            break
        case 'Вторник':
            number = 1
            break
        case 'Среду':
            number = 2
            break
        case 'Четверг':
            number = 3
            break
        case 'Пятницу':
            number = 4
            break
        case 'Субботу':
            number = 5
            break
        case 'Воскресенье':
            number = 6
            break
    }
    if(number || number == 0){
        return number
    }
    else{
        console.error(number)
        console.error('No such weekday, verify the weekday name is correct')
        return 'Error, check the console'
    }
}


module.exports = { 
    weekdayFromNumber:weekdayFromNumber,
    numberFromWeekday:numberFromWeekday
}