const { Category } = require('../models');

class CategoryController {
    static add (req, res, next){
        const newCategory = {
            name: req.body.name
        }

        Category.create(newCategory)
                .then(data => {
                    res.status(201).json({msg: `${data.name} added!`})
                })
                .catch(err => {
                    next(err)
                })
    }

    static read (req, res, next){
        Category.findAll({
                    order: [
                        ['id', 'ASC']
                    ]
                })
                .then(data => {
                    res.status(200).json(data)
                })
                .catch(err => {
                    next(err)
                })
    }
}

module.exports = CategoryController;