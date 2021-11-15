const puppeteer = require('puppeteer');
const bigQuery = require('./bigquery.js');
const { DateTime } = require("luxon");

/**
 * Gets current date and time

 */
const getDateTime = () => {
	const dateTime = DateTime.now().setZone("America/New_York")
	const date = dateTime.c.year + '-' + dateTime.c.month + '-' + dateTime.c.day
	const time = dateTime.c.hour + ':' + dateTime.c.minute + ':' + dateTime.c.second

	return [date, time]
};

/**
 * Scrapes data from LGA website and imports data into BigQuery
 *
    * @param url[String] - URL for LGA website
    * @param paths[Array] - An array of xpath strings for data
 */

const scrapeData = async (url, paths) => {
    const dateTime = getDateTime()
    const lotData = {
    	date: dateTime[0],
    	time: dateTime[1]
    };
    const terminals = ['terminal_a', 'terminal_b', 'terminal_c_d']; // Terminal parking lots
    const browser = await puppeteer.launch(); // launch headless browser
    const page = await browser.newPage();
    await page.goto(url, { waitUntil: 'networkidle2' });

    // Loop through xpaths array and get terminal lot capacity
    for (var i = 0; i < paths.length; i++) {
        await page.waitForXPath(paths[i]);
        let results = await page.$x(paths[i])
        let res = await page.evaluate(el => el.textContent, results[0]);
        let capacity = parseFloat(res.trim().slice(0,2));


        lotData[terminals[i]] = capacity
    };

    //Insert data into BigQuery table
    await bigQuery.insertRows([lotData], 'laguardia', 'terminal-lot-data')

    // Close browser
    await browser.close();

   	return lotData
}

module.exports = {
    scrapeData
}