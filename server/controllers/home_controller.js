const Post = require('../models/post');
const User = require('../models/user');
const Friendship = require('../models/friendship');
// import { Notyf } from 'notyf';
// const Notyf = require('Notyf');
const redis = require('redis');
const REDDIS_PORT=6379;
const client=redis.createClient(REDDIS_PORT);

/*
function cache(req,res,next)
{
    const username=req.user.username;
    let curr_user;
    client.get(username, (err, data)=>{
        if(err) throw err;

        if(data!=null)
        {
            curr_user=JSON.parse(data);
        }
        else next();
    })

    Post.find({}).populate('user')
    .populate({
        path:'comments', //comment arr of post schema
        populate:{
            path:'user'
        }
    })
    .exec((err,wholePostList)=>{
        if (err) {
            console.log("Error in fetching posts from DB :", err);
            return;
        }
        // console.log('Posts are',wholePostList);

        User.find({},(err,wholeUsersList)=>{
            return res.render('home', {
                title:'Home Page',
                user:curr_user,
                post_list: wholePostList,
                all_users:wholeUsersList
            })
        })
    });

}
*/
module.exports.home_fn = async (req, res) => {
    // return res.end('<h1>Home Page</h1>');

    // without populating
    // Post.find({},(err,wholePostList)=>{
    //     if (err) {
    //         console.log("Error in fetching posts from DB :", err);
    //         return;
    //     }
    //     console.log('Posts are',wholePostList);
    //     return res.render('home', {
    //         title:'Home Page',
    //         user:req.user,
    //         post_list: wholePostList
    //     })
    // });

    // Async
    
    // populating user of each post
    // Post.find({}).populate('user')
    // .populate({
    //     path:'comments', //comment arr of post schema
    //     populate:{
    //         path:'user'
    //     }
    // })
    // .exec((err,wholePostList)=>{
    //     if (err) {
    //         console.log("Error in fetching posts from DB :", err);
    //         return;
    //     }
    //     // console.log('Posts are',wholePostList);

    //     User.find({},(err,wholeUsersList)=>{
    //         return res.render('home', {
    //             title:'Home Page',
    //             user:req.user,
    //             post_list: wholePostList,
    //             all_users:wholeUsersList
    //         })
    //     })
    // });
    
    // populate() function is used to automatically replace specified paths in a document with document(s) from other collection(s). This is particularly useful when you have references between documents in different collections (like foreign keys in relational databases).


        // {
        // _id: "post_id",
        // user: { /* User document */ },
        // comments: [
        //     {
        //     _id: "comment_id",
        //     user: { /* User document */ }
        //     },
        //     ...
        // ]
        // }



    // Converting to Async Await
    try {
        
        let wholePostList = await Post.find({})
        .populate('user') // populating the user field in the Post model with data from the User model.
        .populate({ // populating the comments field in the Post model. 
            path: 'comments',
            populate: {
                path: 'user'
            }
        });

        let wholeUsersList= await User.find({});  
        
        let friendships_list=await Friendship.find({})
        .populate({
            path:'from_user'
        })
        .populate({
            path:'to_user'
        });
        
        // console.log('friendships_list',friendships_list);
        let flag=0;
        if(req.user!==undefined) flag=1;
        // let userName=req.user.username;
        console.log(req.user)
        if(flag) client.SETEX(req.user.username, 3600,JSON.stringify(req.user));
        // console.log('name of user - ',req.user.username)
        return res.render('home', {
            title: 'Home Page',
            user: req.user,
            post_list: wholePostList,
            all_users: wholeUsersList,
            friendships_list
            // notyf
        })
                    
    } catch (error) {
        console.log('Error is',error);
        return;
    }


    // console.log(req.cookies);
    // // res.cookie('Id','20BCE2355');

    // return res.render('home',{
    //     title:'Home Page',
    //     user:req.user
    // });
}