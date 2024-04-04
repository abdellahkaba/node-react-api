const Post = require('../models/postModel')
const createPost = async (req,res) => {
    try{
        const post = new Post({
            title:req.body.title,
            date:req.body.date,
            image:req.file.filename
        })
            const postData = await post.save()
            res.status(200).send({
                success:true,
                msg:'Post Data',
                data:postData
            })
    }catch (error){
        res.status(400).send({success:false,msg:error.message})
    }
}
const getPost = async (req,res) => {
    try{
      const posts = await Post.find({})
      res.status(200).send({
          success:true,
          msg: 'Liste des Posts',
          data: posts
      })
    }  catch (error) {
        res.status(400).send({
            success:false,
            msg:error.message
        })
    }
}
const deletePost = async (req,res) => {
    try{
        const id = req.params.id
        const deletePost = await Post.deleteOne({_id:id})
        res.status(200).send({
            success: true,
            msg: 'Post supprimer avec success',
            data: deletePost
        })
    }catch (error) {
        res.status(400).send({
            success:false,
            msg:error.message
        })
    }
}

const updatePost = async (req,res) => {
    try{

        if (req.file !== undefined){
            const id = req.body.id;
            const title = req.body.title;
            const date = req.body.date;
            const filename = req.file.filename;

            const updatePost = await Post.findByIdAndUpdate({_id:id}, {
                title:title,date:date,image:filename
            })
            res.status(200).send({
                success: true,
                msg: 'Post Modifier avec success',
                data: updatePost
            })
        }else {
            const id = req.body.id;
            const title = req.body.title;
            const date = req.body.date;

            const updatePost = await Post.findByIdAndUpdate({_id:id}, {
                title:title,date:date
            })
            res.status(200).send({
                success: true,
                msg: 'Post Modifier avec success',
                data: updatePost
            })
        }

    }catch (error){
        res.status(400).send({
            success:false,
            msg:error.message
        })
    }
}
module.exports = {createPost,getPost,deletePost,updatePost}