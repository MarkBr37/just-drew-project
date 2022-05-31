import React, { Component } from 'react';
import PageTitle from './common/page_title';
import Post from './post';

import http from "../services/httpService";
import { apiUrl } from '../config.json';
import { getUser } from '../services/userCheckService'; 

class Favorites extends Component {
   state = { 
      posts: null
   }
   
   async componentDidMount(){
     const user = getUser();

      if( user ){
         const form = new FormData();
         form.append('user_id', user.id);
         form.append('user_date', user.date)

         const res = await http.post(apiUrl+'/get/get_all_my_favorites_post.php',form);
         const posts = res.data;

         
         
         this.setState({posts})
      } 
   }

   render() { 
      const { posts } = this.state;
      const user = getUser();

      return ( 
         <div className="container mb-5">
            <PageTitle title="My Favorites Posts" />

               { posts && 
                  <React.Fragment>
                     {posts.map(post => <Post key={post.id} postInfo={post} currentUser={user} />)}            
                  </React.Fragment>
               }
               <br />
               {!posts && <h2><i>No posts</i></h2> }
            
         </div>
      );
   }
}
 
export default Favorites;