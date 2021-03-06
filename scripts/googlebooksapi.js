//TODO: make it so it only returns results with ratings of 4 or more
var bookMath = new function() {
  this.wordsPerPage = 500;
  this.wordsPerMin = 220; //TODO: replace with userWPM(divided by 1.5 since technical?)
  this.pagesPerHour = (this.wordsPerMin / this.wordsPerPage) * 60;
  this.pagesPerDay = Math.ceil(this.pagesPerHour * 3); //TODO: replace three with the amount of hours user wants to spend each day studying
  this.getDaysToRead = function(pages, hoursEachDay) {
    return Math.ceil(pages / (hoursEachDay * bookMath.pagesPerHour));
  };
  this.getHoursToReadPages = function(pages) {
    return Math.ceil(pages/bookMath.pagesPerHour);
  }
};

var bookOneApi = null;

$(document).ready(function($) {
    var googleApi = {

      key: '&key=AIzaSyA76jppPMnGusjyw9dKXXRKWUO4IBGoFFw',
      url: 'https://www.googleapis.com/books/v1/volumes?',
      q: 'q=how to ' + localStorage.getItem("keyword"),
      results: '&maxResults=1',
      bookOne: {
        title: null,
        author: null,
        pages: 0,
        image: null,
        description: null,
        isbn: null
      }

    };

    var pageManipulation = {
        addAuthor: function(book, author) {
            $("#" + book + "Author").text(author);
        },
        addTitle: function(book, title) {
            $("#" + book + "Title").text(title);
        },
        addImage: function(book, image) {
            $("#" + book + "Image").find("img").attr('src', image);
        },
        addDescription: function(book, description) {
            $("#" + book + "Description").text(description);
        },
        addPages: function(book, pages) {
            $("#" + book + "Pages").text(pages + " pages");
        }

    };

    var books = ['bookOne'];


    $.ajax({

        url: googleApi.url + googleApi.q + googleApi.results + googleApi.key,
        method: 'GET'
    }).done(function(response) {
        console.log(response);
        for (let i = 0; i < response.items.length; i++) {
            var apiInfo = response.items[i].volumeInfo;
            var bookInfo = googleApi[books[i]];
            bookInfo.pages = apiInfo.pageCount;
            bookInfo.title = apiInfo.title;
            bookInfo.author = apiInfo.authors[0];
            bookInfo.description = apiInfo.description;
            var truncatedTitle = truncateString(googleApi[books[i]].title, 35);
            if (googleApi[books[i]].description) {
                var truncatedDescription = truncateString(googleApi[books[i]].description, 300)
            }

            bookInfo.image = apiInfo.imageLinks.smallThumbnail;
            pageManipulation.addAuthor(books[i], googleApi[books[i]].author);
            pageManipulation.addTitle(books[i], truncatedTitle);
            pageManipulation.addImage(books[i], googleApi[books[i]].image);
            pageManipulation.addDescription(books[i], truncatedDescription);
            pageManipulation.addPages(books[i], googleApi[books[i]].pages);

        }
    });

    bookOneApi = googleApi.bookOne;
});
