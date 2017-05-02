app.service('BookService', function ($http) {

    this.createNewBook = function (newbook) {

        return $http.post('http://localhost:3000/api/livro/', newbook);
    };

    this.getBook = function (book) {

        return $http.get('http://localhost:3000/api/livro/', book);

    };

    this.deleteBook = function (book) {

        return $http.delete('http://localhost:3000/api/livro/' + book, book);
    }

    this.getBookId = function (bookId) {

        return $http.get('http://localhost:3000/api/livro/' +bookId, bookId);
    }

    this.updateBook = function (updatedBook) {

        return $http.put('http://localhost:3000/api/livro/' +updatedBook._id, updatedBook)
    }

});