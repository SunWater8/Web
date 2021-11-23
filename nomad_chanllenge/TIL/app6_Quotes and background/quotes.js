/* 6.0 Quotes */
//새로고침 할 때마다 다른 quote 보여주기

const quotes = [
    {
        quote: "Done is better than perfect",
        author: "Sheryl Sandberg"
    },
    {
        quote: "Even the darkest night will end and the sun will rise ",
        author: "Les Misérables"
    },
    {
        quote: "I MAY NOT HAVE GONE WHERE I INTENDED TO GO, BUT I THINK I HAVE ENDED UP WHERE I INTENDED TO BE.",
        author: "DOUGLAS ADAMS"
    },
    {
        quote: "I TRAVEL NOT TO GO ANYWHERE BUT TO GO. I TRAVEL FOR TRAVEL’S SAKE. THE GREAT AFFAIR IS TO MOVE.",
        author: " – ROBERT LOUIS STEVENSON"
    },
    {
        quote: "DIFFICULT ROADS OFTEN LEAD TO BEAUTIFUL DESTINATIONS",
        author: ""
    },
    {
        quote: "SOME BEAUTIFUL PATHS CAN’T BE DISCOVERED WITHOUT GETTING LOST.",
        author: "EROL OZAN"
    },
    {
        quote: "Grown-ups never understand anything by themselves, and it is tiresome for children to be always and forever explaining things to them.",
        author: "Antoine de Saint-Exupéry, The Little Prince"
    },
    {
        quote: "It is only with the heart that one can see rightly; what is essential is invisible to the eye.",
        author: "Antoine de Saint-Exupéry, The Little Prince"
    },
    {
        quote: "Live as if you were to die tomorrow. Learn as if you were to live forever.",
        author: "Mahatma Gandhi"
    },
    {
        quote: "I have not failed. I've just found 10,000 ways that won't work.",
        author: "Thomas A. Edison"
    },

];


//const quote = document.querySelector('#quote');
const quoteText = document.querySelector('#quote span:first-child');
const quoteAuthor = document.querySelector('#quote span:nth-child(2)');
const randomIndex = Math.floor(Math.random()*quotes.length);

quoteText.innerText = `${quotes[randomIndex].quote}`;
quoteAuthor.innerText = `${quotes[randomIndex].author}`;