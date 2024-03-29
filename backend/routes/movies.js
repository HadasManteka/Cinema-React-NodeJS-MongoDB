var express = require('express');
const MovieController = require('../controllers/movies')
var router = express.Router();

 
router.get('/getMovies', (req, res) => {
    MovieController.getMovies().then(movies => {
        res.send(movies);
    }).catch(error => {
        res.status(500).send({error: error.message});
    });
});

router.get('/getTopRatedMovies', (req, res) => {
    MovieController.getTopRatedMovies().then(movies => {
        res.send(movies);
    }).catch(error => {
        res.status(500).send({error: error.message});
    });
});
    
router.get('/getMoviesGroupedByYear', (req, res) => {
    MovieController.getMoviesGroupedByYear().then(movies => {
        res.send(movies);
    }).catch(error => {
        res.status(500).send({error: error.message});
    });
});

router.get('/getMovieById/:id', (req, res) => {
    const id = req.params.id;
    MovieController.getMovieById(id).then(movie => {
        res.send(movie);
    }).catch(error => {
        res.status(500).send({error: error.message});
    });
});
    
router.put('/updateMovie/:id', (req, res) => {
    const id = req.params.id;
    const movie = req.body;
    movie._id = id;
    MovieController.updateMovie(movie).then(updatedMovie => {
        res.send(updatedMovie);
    }).catch(error => {
        res.status(500).send({error: error.message});
    });
});

router.post('/createMovie', (req, res) => {
    const movie = req.body;
    
    MovieController.createMovie(movie).then(newMovie => {
        res.send(newMovie);
    }).catch(error => {
        res.status(500).send({error: error.message});
    });
});

router.get('/getMoviesWithFilter/:rating', (req, res) => {
    let rating = parseFloat(req.params.rating);
    const searchString = req.query.searchString || '';
    const sort = req.query.sort === 'true';

    if (isNaN(rating)) {
        rating = 0;
    }

    MovieController.getMoviesWithFilter(rating, searchString, sort)
        .then(movies => {
            res.send(movies);
        })
        .catch(error => {
            res.status(500).send({ error: error.message });
        });
});
    
module.exports = router;
