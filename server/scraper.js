const axios = require('axios');
const cheerio = require('cheerio');
const Notification = require('./models/Notification');

const scrapeAKTU = async () => {
  try {
    const { data } = await axios.get('https://aktu.ac.in/whatsnew.html');
    const $ = cheerio.load(data);
    
    // This looks for the list items on the AKTU website
    $('.news-item').each(async (i, element) => {
      const title = $(element).find('a').text().trim();
      const link = "https://aktu.ac.in/" + $(element).find('a').attr('href');

      // Check if it already exists so we don't save duplicates
      const exists = await Notification.findOne({ title });
      if (!exists) {
        await Notification.create({ title, link });
      }
    });
    console.log("AKTU Notifications Updated!");
  } catch (error) {
    console.error("Scraping failed:", error);
  }
};

module.exports = scrapeAKTU;