const TaskModel = require('../models/tasks');
module.exports = {
    createTask: function(req,res,next) {
        if(req.body.task && req.body.userid) {
            TaskModel.create({
                userid: req.body.userid,
                task: req.body.task,
                completed:false
            },function (err, result) {
                if (err) {
                    console.log(err)
                    next(err);
                }
                else
                    res.json({ status: "success", message: "Task added successfully!!!"});
            })
        } else {
            res.status(400).json({ status: "error", message: "Required fields are not present"});
        }
    },
    getTaskByUserId: function(req,res,next) {
        if(req.params.userId) {
          TaskModel.find({userid:req.params.userId}, function (err,tasks) {
              if(err || tasks.length < 1) {
                    next(err);
              } else  {
                  res.json({ status: "success", message: "Tasks found", data: tasks})
              }
          })
        } else {
            res.status(400).json({ status: "error", message: "Required fields are not present"});
        }
    },
    updateById: function(req,res,next) {
        if(req.params.taskId) {
            TaskModel.findByIdAndUpdate(req.params.taskId,req.body,function(err,taskInfo) {
                if(err || taskInfo === null ) {
                    next(err);
                } else {
                    console.log(taskInfo);
                    res.json({status:"success", message: "Task updated successfully!!!"})
                }
            })
        } else {
            res.status(400).json({status:"error", message: "Required fields are not present"})
        }
    }
}