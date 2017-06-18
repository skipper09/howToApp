//TODO: make it so it only returns results with ratings of 4 or more

$(document).ready(function($) {
    var googleApi = {
      key: '&key=AIzaSyA76jppPMnGusjyw9dKXXRKWUO4IBGoFFw',
      url: 'https://www.googleapis.com/books/v1/volumes?',
      q: 'q=+subject:javascript+programming',
      results: '&maxResults=2',
      bookOne: {
        title: null,
        author: null,
        pages: 0,
        image: null,
        description: null
      },
      bookTwo: {
        title: null,
        author: null,
        pages: 0,
        image: null,
        description: null
      }
    };

    var pageManipulation = {
        addAuthor: function(book, author) {
            $("#"+book+"Author").text(author);
        },
        addTitle: function(book, title) {
            $("#"+book+"Title").text(title);
        },
        addImage: function(book, image) {
            $("#"+book+"Image").find("img").css('height', '95%');
            $("#"+book+"Image").find("img").css('width', '95%');
            $("#"+book+"Image").find("img").attr('src', image);
        },
        addDescription: function(book, description) {
            $("#"+book+"Description").text(description);
        }
    };

    var books = ['bookOne', 'bookTwo'];

    $.ajax({
      url: googleApi.url+googleApi.q+googleApi.results+googleApi.key,
      method: 'GET'
    }).done(function(response){
      console.log(response);
      for (let i = 0; i < response.items.length; i++) {
        var apiInfo = response.items[i].volumeInfo;
        var bookInfo = googleApi[books[i]];
          bookInfo.pages = apiInfo.pageCount;
          bookInfo.title = apiInfo.title;
          bookInfo.author = apiInfo.authors[0];
          bookInfo.description = apiInfo.description;
        var truncatedTitle = truncateString(googleApi[books[i]].title, 35);
        var truncatedDescription = truncateString(googleApi[books[i]].description, 350);
          bookInfo.image = apiInfo.imageLinks.smallThumbnail;
          pageManipulation.addAuthor(books[i], googleApi[books[i]].author);
          pageManipulation.addTitle(books[i], truncatedTitle);
          pageManipulation.addImage(books[i], googleApi[books[i]].image);
          pageManipulation.addDescription(books[i], truncatedDescription);
        }
    });
});

