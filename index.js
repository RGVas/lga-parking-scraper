//Import modules
const scraper = require('./scraper.py')

/**
 * Responds to HTTP request.
 *
    * @param {!express:Request} req HTTP request context.
    * @param {!express:Response} res HTTP response context.
 */

exports.getData = (req, res) => {
    const url = 'https://www.laguardiaairport.com/to-from-airport/parking';
    const xpaths = [
        '//*[@id="parkingContent"]/div[1]/div[1]/div[1]/div/div[3]/div/div/span', // Terminal A
        '//*[@id="parkingContent"]/div[1]/div[2]/div[1]/div/div[3]/div/div/span', // Terminal B
        '//*[@id="parkingContent"]/div[1]/div[3]/div[1]/div/div[3]/div/div/span' // Terminal C / D
    ];

    const scrapedData = new Promise ((resolve, reject) => {
        scraper.getData(url, xpaths).then((data) => {
            resolve(data)
        }).catch((error) => {
            reject('Error occurred')
        })
    })

    Promise.all([scrapedData]).then((data) => {
        console.log('Success')
        res.sendStatus(200)
    }).catch((error) => {
        console.log('Error')
        res.sendStatus(500)
    })
};
