var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var port = process.env.PORT || 3000;
var router = express.Router();
var mongoose = require('mongoose');
var livroSchema = require('./app/models/livro');

app.use(bodyParser.json());

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    next();
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/api', router);

mongoose.connect('mongodb://localhost:27017/users');

app.listen(port);

console.log('Aplicação iniciada na porta ' + port);

router.get("/",

    function (req, res) {

        res.json({ message: "Bem vindo a API de cadastro de livros" });

    }

);

router.route('/livro')

    .post(function (req, res) {

        if (req.body.autor == null
            || req.body.autor.length < 1) {

            res.status(500).send({ error: 'Autor requerido!' });

        } else if (req.body.titulo == null
            || req.body.titulo.length < 1) {

            res.status(500).send({ error: 'Titulo requerido!' });

        } else if (req.body.editora == null
            || req.body.editora.length < 1) {

            res.status(500).send({ error: 'Editora requerida!' });

        } else if (req.body.genero == null
            || req.body.genero.length < 1) {

            res.status(500).send({ error: 'Genero requerida!' });

        } else {

            var livro = new livroSchema();

            livro.titulo = req.body.titulo;
            livro.autor = req.body.autor;
            livro.genero = req.body.genero;
            livro.editora = req.body.editora;

            livro.save(

                function (error) {

                    if (error) {

                        res.send(error);

                    }

                    res.json({ message: 'Livro cadastrado' });

                }

            );

        }

    });

    router.get("/livro", function (req, res) {

        livroSchema.find(function (err, livro) {

            if (err) {

                res.send(err);
            }

            res.json(livro);

        });

    });

router.get('/livro/busca', function (req, res) {

    //    var valorParametro = req.url;
    //    var nomePropriedade = valorParametro.substring(valorParametro.indexOf('?') + 1, valorParametro.indexOf('='));

    var titulo = req.query.titulo;
    var autor = req.query.autor;
    var genero = req.query.genero;
    var editora = req.query.editora;


    if (titulo != null) {
        console.log('Buscando livro titulo  ' + titulo);

        livroSchema.find({ titulo: { $regex: titulo, $options: 'i' } }, function (err, livro) {

            if (livro == null || livro == undefined) {

                res.json('O livro titulo ' + titulo + ' nao foi encontrado...');
                console.log('Não consta no banco de dados');

            } else {

                res.json(livro);
                console.log('Titulo do livro: ' + titulo);

            }
        })

    } else if (autor != null) {
        console.log('Buscando livro autor ' + autor);

        livroSchema.find({ autor: { $regex: autor, $options: 'i' } }, function (err, livro) {

            if (livro == null || livro == undefined) {

                res.json('O livro autor ' + autor + ' nao foi encontrado...');
                console.log('Não consta no banco de dados');

            } else {

                res.json(livro);
                console.log('Autor do livro: ' + autor);

            }
        })

    } else if (genero != null) {
        console.log('Buscando livro genero  ' + genero);

        livroSchema.find({ genero: { $regex: genero, $options: 'i' } }, function (err, livro) {

            if (livro == null || livro == undefined) {

                res.json('O livro genero ' + genero + ' nao foi encontrado...');
                console.log('Não consta no banco de dados');

            } else {

                res.json(livro);
                console.log('Genero do livro: ' + genero);

            }
        })

    } else if (editora != null) {
        console.log('Buscando livro editora  ' + editora);

        livroSchema.find({ editora: { $regex: editora, $options: 'i' } }, function (err, livro) {

            if (livro == null || livro == undefined) {

                res.json('O livro editora ' + editora + ' nao foi encontrado...');
                console.log('Não consta no banco de dados');

            } else {

                res.json(livro);
                console.log('Editora do livro: ' + editora);

            }
        })

    } else {

        res.json({ "message": "Consulta invalida: informe um parametro valido" })

    }

});

router.route('/livro/:livro_id')

    .get(function (req, res) {

        livroSchema.findById(req.params.livro_id, function (error, livro) {

            if (error) {

                res.send(error);

            } else if (req.params.livro_id == null) {

                res.status(500).send({ error: 'ID inválido, não consta no banco de dados' });

            } else {

                res.json(livro);

            }

        })

    })

    .put(function (req, res) {

        livroSchema.findById(req.params.livro_id, function (error, livro) {

            if (livro == null) {

                console.log('Livro id: ' + req.params.livro_id + ' não existe no banco');

                res.status(500).send({ error: 'Livro id: ' + req.params.livro_id + ' não existe no banco' });

            } else {

                if (req.body.autor == null
                    || req.body.autor.length < 1) {

                    res.status(500).send({ error: 'Autor requerido!' });

                } else if (req.body.titulo == null
                    || req.body.titulo.length < 1) {

                    res.status(500).send({ error: 'Titulo requerido!' });

                } else if (req.body.editora == null
                    || req.body.editora.length < 1) {

                    res.status(500).send({ error: 'Editora requerida!' });

                } else if (req.body.genero == null
                    || req.body.genero.length < 1) {

                    res.status(500).send({ error: 'Genero requerida!' });

                } else {

                    livro.titulo = req.body.titulo;
                    livro.autor = req.body.autor;
                    livro.genero = req.body.genero;
                    livro.editora = req.body.editora;

                    livro.save(function (error) {

                        if (error) {

                            res.send(error);

                        }

                        res.json({ message: "Livro atualizado:" });

                    });

                }

            }

        });

    })

    .delete(function (req, res) {

        livroSchema.findByIdAndRemove(req.params.livro_id, function (error) {

            if (error) {

                res.send(error);

            } else {

                res.json({ message: "Livro excluido da biblioteca" });

            }

        });

    });

router.route('/livro/titulo/:titulo')

    .get(function (req, res) {
        var titulo = req.params.titulo;

        livroSchema.find({ titulo: titulo }, function (error, livro) {

            if (error) {

                res.send(error);

            } else if (req.params.titulo == undefined) {

                res.status(500).send({ error: 'Nome não consta no banco de dados' });
                console.log('Falha - Undefined');

            } else if (req.params.titulo == null) {

                res.status(500).send({ error: 'Nome não consta no banco de dados' });
                console.log('Falha - Null');

            } else {

                console.log('Titulo: ' + titulo);
                res.json(livro);
                console.log('Retornado com sucesso');

            }

        })

    });

router.route('/livro/autor/:autor')

    .get(function (req, res) {
        var autor = req.params.autor;

        livroSchema.find({ autor: autor }, function (error, livro) {

            if (error) {

                res.send(error);

            } else if (req.params.autor == undefined) {

                res.status(500).send({ error: 'Nome não consta no banco de dados' });
                console.log('Falha - Undefined');

            } else if (req.params.autor == null) {

                res.status(500).send({ error: 'Nome não consta no banco de dados' });
                console.log('Falha - Null');

            } else {

                console.log('Autor: ' + autor);
                res.json(livro);
                console.log('Retornado com sucesso');

            }

        })

    });

router.route('/livro/genero/:genero')

    .get(function (req, res) {
        var genero = req.params.genero;

        livroSchema.find({ genero: genero }, function (error, livro) {

            if (error) {

                res.send(error);

            } else if (req.params.genero == undefined) {

                res.status(500).send({ error: 'Nome não consta no banco de dados' });
                console.log('Falha - Undefined');

            } else if (req.params.genero == null) {

                res.status(500).send({ error: 'Nome não consta no banco de dados' });
                console.log('Falha - Null');

            } else {

                console.log('Genero: ' + genero);
                res.json(livro);
                console.log('Retornado com sucesso');

            }

        })

    });

router.route('/livro/editora/:editora')

    .get(function (req, res) {

        var editora = req.params.editora;

        livroSchema.find({ editora: editora }, function (error, livro) {

            if (error) {

                res.send(error);

            } else if (req.params.editora == undefined) {

                res.status(500).send({ error: 'Nome não consta no banco de dados' });
                console.log('Falha - Undefined');

            } else if (req.params.editora == null) {

                res.status(500).send({ error: 'Nome não consta no banco de dados' });
                console.log('Falha - Null');

            } else {

                console.log('Editora: ' + editora);
                res.json(livro);
                console.log('Retornado com sucesso');

            }

        })

    });

