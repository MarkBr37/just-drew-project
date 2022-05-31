import React, { Component } from 'react';
import { NavLink } from "react-router-dom";
import { Link } from "react-router-dom";

import Post from './post';

import { getUser } from '../services/userCheckService';
import http from "../services/httpService";
import { apiUrl } from '../config.json';

class Home extends Component {
   state = {
      posts: [],
   }


   async componentDidMount() {
      if (getUser()) {
         const res = await http.get(apiUrl + '/get/get_all_posts.php');
         const posts = res.data;
         this.setState({ posts })
      }
   }

   render() {
      const user = getUser();
      const { posts } = this.state;

      return (
         <div className="jumbotron bg-none">
            <div className="container mb-5">
               {user &&
                  <React.Fragment>
                  <Link className='btn btn-primary btn-lg mt-4 mb-4' to='/add-new-post'>Add new post</Link>
                     {posts && posts.map(post => <Post key={post.id} postInfo={post} currentUser={user} />)}
                     {!posts && <h5><i>No posts found...</i></h5>}
                  </React.Fragment>
               }
               {!user &&
                  <React.Fragment>
                     <h1 className="display-4">Welcome to Just Drew</h1>
                     <p className="lead">This is a simple hero unit, a  simple jumbotron-style component for calling extra  attention to featured content or information.</p>
                     <NavLink className="btn btn-primary btn-lg mt-3" to="signin" role="button">Signin</NavLink>
                     <NavLink className="btn btn-primary btn-lg ml-2 mt-3" to="signup" role="button">Signup</NavLink>
                  </React.Fragment>
               }
            </div>
         </div>
      );
   }
}

export default Home;