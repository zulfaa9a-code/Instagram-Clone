
import {usePost}  from "../hook/usePost"
import "../pages/feed.scss"
const Post = ({user , post}) => {
  return (
    <div className="post">
        <div className="top">
            <img src={user.profileImg}/>
            {user.username}
            <button>Follow</button>
        </div>
        <div className="middle">
            <img src={post.imgUrl}/>
        </div>
        <div className="bottom">
            {post.caption}
            <div className="icons">
                <div className="right">
                    <button><img src="/heart.svg" alt="Heart" />  890</button>
                    <button><img src="/comment.svg" alt="Comment" />  50</button>
                    <button><img src="/share.svg" alt="Share" /></button>
                </div>
                <div className="left">
                    <button><img src="/save.svg" alt="Save" /></button>
                </div>
            </div>
        </div>
    </div>
 )
}

export default Post