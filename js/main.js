const quotesItem = document.querySelectorAll('.qoute-item');
let quotes = [
    {
        text: '"You only lose, when you stop."',
        author: 'Melvin Agustin',
    },
    {
        text: '"Focus on your goal, and let others appreciate you."',
        author: 'Melvin Agustin',
    },
    {
        text: '"Learning something, is better than nothing."',
        author: 'Melvin Agustin',
    },
    {
        text: '"Trust the process."',
        author: 'Melvin Agustin',
    },
    {
        text: '"Learning takes time."',
        author: 'Melvin Agustin',
    },
];

if (localStorage.getItem('quotes')) {
    quotes = JSON.parse(localStorage.getItem('quotes'));
}

// output quotes to DOM
const showQuotes = quoArr => {
    quotesItem.forEach((quo, ind) => {
        const textOutput = quo.querySelector('.quote');
        const authorOutput = quo.querySelector('.author');

        textOutput.textContent = quoArr[ind].text;
        authorOutput.textContent = quoArr[ind].author;
    });
};

// Fetch Quotes From Api
const fetchQuotes = async () => {
    const quoteApiLink = 'https://quotes-inspirational-quotes-motivational-quotes.p.rapidapi.com/quote?token=ipworld.info';
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': 'e7b4402e3fmshfdb4aa7589ea9fdp1c03cbjsna3ba8d1903cd',
            'X-RapidAPI-Host': 'quotes-inspirational-quotes-motivational-quotes.p.rapidapi.com',
        },
    };

    // Try Catch For Quote Fetching
    try {
        const res = await fetch(quoteApiLink, options);
        const data = await res.json();
        const text = quotes.map(t => t.text);

        // Update Quotes Array if there's new quote
        if (!text.includes(data.text)) {
            quotes = [data, ...quotes];
            quotes = quotes.filter((quo, ind) => ind !== quotes.length - 1);
            localStorage.setItem('quotes', JSON.stringify(quotes));
        }

        // Trigger howQuote Func.
        showQuotes(quotes);
    } catch (err) {
        console.log(err);
    }
};

// Fetch Post Right before the page loads
fetchQuotes();

// Stop Skeleton Loading effect
const finishLoad = ele => {
    ele.className = 'qoute-item';
};

// Assinged Random Image
quotesItem.forEach((quote, ind) => {
    let ratio = ind === 1 ? '200/300' : ind === 2 ? '400/200' : ind === 3 ? '300/100' : ind === 4 ? '200/300' : '400/200';
    let randomImgId = Math.floor(Math.random() * 250);

    const image = quote.querySelector('.img-bg');

    // Radom img link
    image.src = `https://picsum.photos/id/${randomImgId}/${ratio}`;

    image.addEventListener('load', tar => {
        finishLoad(quote);
    });
});

// Animation Effect in mobile size
window.addEventListener('scroll', () => {
    const currentScroll = window.scrollY + 500;

    quotesItem.forEach(item => {
        const imgBg = item.querySelector('img');
        if (currentScroll > item.offsetTop) {
            imgBg.classList.add('on-screen');
        } else {
            imgBg.classList.remove('on-screen');
        }
    });
});

// Home Btn
const homeBtn = document.querySelector('#home-btn');

homeBtn.addEventListener('click', () => {
    location.href = 'https://mlvnworkshome-production.up.railway.app/';
});

// Theme
const darkIconBtn = document.querySelector('#dark-icon');
const lightIconBtn = document.querySelector('#light-icon');
let theme = 'dark';

if (localStorage.getItem('theme')) {
    theme = localStorage.getItem('theme');
}

const updateTheme = themeTo => {
    localStorage.setItem('theme', themeTo);

    const bodyDoc = document.querySelector('body');
    const mainHeading = document.querySelector('#main-heading');
    const root = document.documentElement;

    if (themeTo === 'dark') {
        lightIconBtn.style.display = 'inline';
        darkIconBtn.style.display = 'none';
        bodyDoc.style.backgroundColor = 'var(--primary-dark-theme)';
        root.style.setProperty('--svg-color', '#fff');
    } else if (themeTo === 'light') {
        lightIconBtn.style.display = 'none';
        darkIconBtn.style.display = 'inline';
        mainHeading.style.textShadow = '3px 3px 7px #222';
        bodyDoc.style.backgroundColor = 'var(--primary-light-theme)';
        root.style.setProperty('--svg-color', '#222');
    }
};

updateTheme(theme);

darkIconBtn.addEventListener('click', () => updateTheme('dark'));
lightIconBtn.addEventListener('click', () => updateTheme('light'));

// Flowers Effect
const flowers = document.querySelectorAll('.flower');

flowers.forEach(flower => {
    flower.style.setProperty('animation', `dropFlower ${Math.floor(Math.random() * 12) + 3}s infinite linear`);
    flower.style.left = `${Math.floor(Math.random() * 100)}vw`;
});
