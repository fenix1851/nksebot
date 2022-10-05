const  shortWeekdayName = (number)=>{
    number = number.toString()
    let shortWeekdayName = 'pn'
    if(number){
    switch(number){
        case '0':
            shortWeekdayName = 'pn'
            break
        case '1':
            shortWeekdayName = 'vt'
            break
        case '2':
            shortWeekdayName = 'sr'
            break
        case '3':
            shortWeekdayName = 'ch'
            break
        case '4':
            shortWeekdayName = 'pt'
            break
        case '5':
            shortWeekdayName = 'sb'
            break
        case '6':
            shortWeekdayName = 'vs'
            break
    } 
    return shortWeekdayName
    }
    else{ 
        console.error('Something goes wrong');
        return 'ERROR'
    }
}

module.exports = shortWeekdayName
