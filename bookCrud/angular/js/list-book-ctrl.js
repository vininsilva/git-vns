app.controller('ListBookCtrl', function ($scope, $routeParams, BookService) {

    $scope.listBook = function (returnedBook) {

        BookService.getBook(returnedBook)
            .then(
            function (book) {

                $scope.registeredBooks = book.data;
                console.log("Livros exibidos com sucesso")

            }, function (error) {

                console.log("Falha ao exibir os livros");

            });

    };

    $scope.deleteBook = function (returnedBook) {

        if (confirm("Deseja realmente deletar este livro?")) {

            BookService.deleteBook(returnedBook._id)
                .then(
                function () {

                    console.log("Deletado");
                    $scope.message = "Livro deletado!"
                    $scope.deleted = true;

                    BookService.getBook(returnedBook)
                        .then(
                        function (book) {

                            $scope.registeredBooks = book.data;
                            console.log("Livros atualizados com sucesso")

                        }, function (error) {

                            console.log("Falha ao atualizar os livros");

                        });

                }, function (error) {

                    console.log("Falha ao deletar livro");

                });

        };

    };


});