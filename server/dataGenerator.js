// const genre = 'fiction';
const allGenres = ['fiction', 'satire', 'mystery', 'drama', 'horror', 'romance']

// const url = `https://www.googleapis.com/books/v1/volumes?q=${genre}`;
const axios = require('axios');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

const books = [];

async function main(){
    for(let i = 0; i < allGenres.length; i++) {
        const genre = allGenres[i];
        const url = `https://www.googleapis.com/books/v1/volumes?q=${genre}`;
        await getBooks(url, genre);
    }
    
    fs.writeFileSync(`${__dirname}/DB.json`, JSON.stringify(books));
}

async function getBooks(url, genre){
    const rawResp = await fetch(url)
    const { items } = await rawResp.json();

    for (let i = 0; i < items.length; i++) {
        const uuid = uuidv4();
        const item = items[i];

        const { volumeInfo } = item
        // const DEFAULT = "https://thumbs.dreamstime.com/z/blank-missing-poster-template-ready-to-print-150091587.jpg";
        
        if(volumeInfo?.imageLinks?.thumbnail) {
            const imagePath = `${__dirname}/src/images/${uuid}.jpg`
            const imageUrl = volumeInfo?.imageLinks?.thumbnail.replace('zoom=1', 'zoom=2')
            await downloadImage(imageUrl, imagePath)
        } else {
            console.log('skipped')
        }
        
        books.push({
            uuid,
            title: volumeInfo.title,
            publicationDate: volumeInfo.publishedDate,
            description: volumeInfo.description,
            authors: (volumeInfo.authors || []).join(', '),
            category: genre,
            imageUrl: volumeInfo?.imageLinks?.thumbnail ? `/images/${uuid}.jpg` : '/images/NOT_FOUND.jpg',
            price: '25.99',
            created_at: Date.now(),
            updated_at: Date.now()
        })
    }
}

async function downloadImage(url, output) {
    try {
        const response = await axios({
            method: 'GET',
            url: url,
            responseType: 'stream',
        });

        response.data.pipe(fs.createWriteStream(output));

        console.log('Image downloaded successfully.');
    } catch (e) {
        console.log({ e })
    }
};

(async ()=> await main())();