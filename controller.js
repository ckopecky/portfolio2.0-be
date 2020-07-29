const router = require('express').Router();
const mongoose = require('mongoose');
const Articles = require('./schema');

const getArticles = (req, res) => {
    Articles.find()
        .then(response => {
            if(response.length === 0) {
                res.status(400).json({Error: 'No Articles Here'})
            }
            res.status(200).json(response);
        })
}

const getArticleId = (req, res) => {
    const { id } = req.params;

    Articles.findById(id)
        .then(response => {
            res.status(200).json(response);
        })
        .catch(err => {
            res.status(500).json(err.message);
        })
}

const postArticles = (req, res) => {
    const { link, name, picture, language, priority } = req.body;
    Articles.create({link, name, picture, language, priority})
        .then(response => {
            res.status(201).json(response);
        })
        .catch(err => {
            res.status(500).json(err.message);
        })
}

const updateArticles = (req, res) => {
    const { id } = req.params;
    const { link, name, picture, language, priority } = req.body;
    Articles.findByIdAndUpdate(id, { link, name, picture, language, priority })
        .then(response => {
            res.status(200).json(response)
        });
}

const deleteArticle = (req, res) => {
    const { id } = req.params;
    Articles.findByIdAndDelete(id)
        .then(response => {
            res.status(204).json(response);
        })
}

router.route('/')
    .get(getArticles)
    .post(postArticles);

router.route('/:id')
    .get(getArticleId)
    .put(updateArticles)
    .delete(deleteArticle);

module.exports = router;