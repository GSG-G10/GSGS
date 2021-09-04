const connection = require('../config/connection.js')

const checkPostAdd = (username, id_post) =>{
    return connection.query(`select * from ${username}_likes where id_post = '${id_post}';`)
}

const insertNewPostLikes = (username, id_post) =>{
    return connection.query(`insert into ${username}_likes (id_post, onlike, dislike ) values ('${id_post}', '', '');`)
}

const setMyLikesTableLike = (username, id_post, onlike) =>{
    return connection.query(`UPDATE ${username}_likes SET onlike = '${onlike}' WHERE id_post = '${id_post}';`)
}

const setMyLikesTableDislike = (username, id_post, onlike) =>{
    return connection.query(`UPDATE ${username}_likes SET dislike = '${onlike}' WHERE id_post = '${id_post}';`)
}


const countLikes = (username, id_post) =>{
    return connection.query(`select loves from ${username}_posts where id_post = '${id_post}';`)
}

const addLike = (username, id_post, numLike) =>{
    return connection.query(`UPDATE ${username}_posts SET loves = '${numLike}' WHERE id_post = '${id_post}';`)
}

const countDislikes = (username, id_post) =>{
    return connection.query(`select hates from ${username}_posts where id_post = '${id_post}';`)
}

const addDislike = (username, id_post, numLike) =>{
    return connection.query(`UPDATE ${username}_posts SET hates = '${numLike}' WHERE id_post = '${id_post}';`)
}

const setLikes = async (query) =>{
    
        let checkPost = await checkPostAdd(query.username, query.id_post)
        // console.log(checkPost.rows[0]);
    if(checkPost.rows[0] === undefined){
        // console.log('added');
        await insertNewPostLikes(query.username, query.id_post)
    }

    if(query.kind === 'like' && query.state === 'false'){
        let countLikesAll = await countLikes(query.username, query.id_post)
        console.log('old: ' + countLikesAll.rows[0].loves);
        let numLike = Number(countLikesAll.rows[0].loves) + 1
        console.log('new: ' + numLike);
         await addLike(query.username, query.id_post, numLike)
         await setMyLikesTableLike(query.username, query.id_post, true)
        return true
    }

    if(query.kind === 'like' && query.state === 'true'){
        let countLikesAll = await countLikes(query.username, query.id_post)
        // console.log('old: ' + countLikesAll.rows[0].loves);
        let numLike = Number(countLikesAll.rows[0].loves) - 1
        // console.log('new: ' + numLike);
         await addLike(query.username, query.id_post, numLike)
         await setMyLikesTableLike(query.username, query.id_post, false)
        return false
    }


    if(query.kind === 'dislike' && query.state === 'false'){
        let countDIsikesAll = await countDislikes(query.username, query.id_post)
        console.log('old: ' + countDIsikesAll.rows[0].hates);
        let numLike = Number(countDIsikesAll.rows[0].hates) + 1
        console.log('new: ' + numLike);
         await addDislike(query.username, query.id_post, numLike)
         await setMyLikesTableDislike(query.username, query.id_post, true)
        return true
    }

    if(query.kind === 'dislike' && query.state === 'true'){
        let countDIsikesAll = await countDislikes(query.username, query.id_post)
        console.log('old: ' + countDIsikesAll.rows[0].hates);
        let numLike = Number(countDIsikesAll.rows[0].hates) - 1
        console.log('new: ' + numLike);
         await addDislike(query.username, query.id_post, numLike)
         await setMyLikesTableDislike(query.username, query.id_post, false)
        return false
    }

}


module.exports = setLikes;