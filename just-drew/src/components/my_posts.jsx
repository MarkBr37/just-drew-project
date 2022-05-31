import React, { Component } from 'react';
import PageTitle from './common/page_title';
import Post from './post';
import { Link } from "react-router-dom";

import http from "../services/httpService";
import { apiUrl } from '../config.json';
import { getUser } from '../services/userCheckService'; 

class MyPost extends Component {
   state = { 
      posts: []
   }
   
   async componentDidMount(){
     const user = getUser();

      if( user ){
         const form = new FormData();
         form.append('user_id', user.id);
         form.append('user_date', user.date)

         const res = await http.post(apiUrl+'get/get_all_my_posts.php',form);
         const posts = res.data;
         this.setState({posts}) 
      } 
   }

   render() { 
      const { posts } = this.state;
      const user = getUser();

      return ( 
         <div className="container mb-5">
            <PageTitle title="My Posts" />
            <Link className='btn btn-primary btn-lg mt-4 mb-4' to='/add-new-post'>Add new post</Link>

               { posts && 
                  <React.Fragment>
                     {posts && posts.map(post => <Post key={post.id} postInfo={post} currentUser={user} />)}
                  </React.Fragment>
               }
               {!posts && <h2><i>No posts</i></h2> }
            
         </div>
      );
   }
}
 
export default MyPost;