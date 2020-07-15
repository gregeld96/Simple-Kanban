const { Task } = require('../models');

class TaskController{
    static add(req, res, next){
        const userId = req.userData.id

        const newTask = {
            title: req.body.title,
            categoryId: req.params.id,
            userId
        }

        Task.create(newTask)
            .then(data => {
                res.status(201).json({data})
            })
            .catch(err => {
                next(err)
            })
    }

    static edit(req, res, next){
        const updateTask = {
            title: req.body.title
        }

        Task.findByPk(req.params.id)
            .then(data => {
                if(!data){
                    throw ({status:404, msg: `Data Not Found`})
                } else {
                    return Task.update(updateTask, {
                        where: {
                            id: req.params.id
                        }
                    })
                }
            })
            .then(data => {
                res.status(200).json({task: updateTask})
            })
            .catch(err => {
                next(err);
            })
    }

    static delete(req, res, next){
        Task.findByPk(req.params.id)
            .then(data => {
                if(!data){
                    throw ({status:404, msg: `Data Not Found`})
                } else {
                    return Task.destroy({
                        where: {
                            id: req.params.id
                        }
                    })
                }
            })
            .then(data => {
                res.status(200).json({msg: `Task successful deleted`})
            })
            .catch(err => {
                next(err)
            })
    }
}

module.exports = TaskController;