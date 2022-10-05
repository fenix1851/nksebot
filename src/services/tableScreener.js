const puppeteer = require('puppeteer');

module.exports = () => async (ctx)=>{
    const shifts = [1,2];
    const buildings = ['A','B'];
    const weekdays = ['pn', 'vt', 'sr', 'ch', 'pt','sb','vs'];
        console.log('start')
        const browser = await puppeteer.launch({
            executablePath: '/usr/bin/chromium-browser',
            headless : true,
            args: ['--no-sandbox']
        });
        const page = await browser.newPage()

        page.setViewport({width: 1850, height: 1800})

        for (build of buildings){
            for(let shift of shifts){
                for(let weekday of weekdays){
                    await page.goto(`https://www.nkse.ru/html_pages/${build}_${shift}_${weekday}.htm`)
                    await page.screenshot({path: `src/screenshots/${build}/${shift}/${weekday}.jpeg`})
                    console.log(`${build} ${shift} ${weekday}`)
                }
            }
        }
        console.log('Данные обновленны:', new Date())
        ctx.reply('Данные обновленны!')
        await browser.close();

}