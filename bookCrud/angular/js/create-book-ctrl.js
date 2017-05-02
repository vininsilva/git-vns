app.controller('CreateBookCtrl', function ($scope, BookService, $routeParams) {


    if ($routeParams.bookId != undefined) {

        var bookId = $routeParams.bookId;

        BookService.getBookId(bookId)
            .then(
            function (book) {

                $scope.book = book.data;

            });

    }

    $scope.saveBook = function (savingBook) {

        if (savingBook == null
            || savingBook == undefined) {

            console.log('Todos os campos devem ser preenchidos ');
            $scope.response = false;

        } else if (savingBook.titulo.length < 3
            || savingBook.autor.length < 3
            || savingBook.genero.length < 3
            || savingBook.editora.length < 3) {

            console.log('Campo não apresenta tamanho aceitavel pelo sistema');
            $scope.response = false;

        } else {

            if ($routeParams.bookId != undefined) {

                BookService.updateBook(savingBook)
                    .then(
                    function () {

                        $scope.message = "Livro atualizado com sucesso";
                        console.log("Book updated successfully");
                        $scope.response = true;
                        $location.path("/list");

                    }, function (error) {

                        $scope.message = "Erro ao atualizar o livro";
                        console.log("Book update failed");
                        $scope.response = false;

                    });

            } else {

                BookService.createNewBook(savingBook)
                    .then(
                    function () {

                        $scope.message = "Livro salvo com sucesso";
                        console.log("Book saved successfully");
                        $scope.response = true;

                    }, function (error) {

                        $scope.message = "Erro ao salvar o livro";
                        console.log("Book saved successfully");
                        $scope.response = false;

                    });

            }

        }

    }

});