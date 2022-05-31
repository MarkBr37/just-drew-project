import React, { Component } from 'react';
import { NavLink } from "react-router-dom"

import '../css/posts.css';

import http from "../services/httpService";
import { apiUrl } from '../config.json';


class Post extends Component {
   state = { 
      profileImage: '',
      name: '',
      image: '',
      showComponent: true,
      showFavorites: false,
   }

   // for secure the currend user 
   currentUser = this.props.currentUser;
   
   // for get images and name and delete post
   getIds = () => {
      const { user_id, id:post_id } = this.props.postInfo;
      
      const form = new FormData();
      form.append('user_id', user_id);
      form.append('post_id', post_id);

      return { user_id,form};
   }

   // for addToFavorites and cheackIfFavorite
   getCurrentUserIdAndPost = () => {
      // this.props.postInfo.id = id of the post
      const post_id = this.props.postInfo.id;
      const user_id  = this.currentUser.id
      
      const form = new FormData();
      form.append('user_id', user_id);
      form.append('post_id', post_id);
      return form;
   }

   opps(){
      alert('opps there is a problem please try again later');
      window.location = '/';
   }

   deletePost = async () => {
      const {user_id, form } = this.getIds();

      // if some one will try to change id
      if ( !this.currentUser.id === user_id) return this.opps();
      form.append('user_date',this.currentUser.date)

      try{
         const res = await http.post(apiUrl+'/delete_post.php',form);
         // for stop showing the component
         if(res.data) this.setState({showComponent: false});
         
      }catch{
         this.opps();
      }
 
   }

   
   getImagesAndName = async () => {
      const { form } = this.getIds();
      const res = await http.post(apiUrl+'get/get_post.php',form);
      
      const { name, profile_image:profileImage, post_image } = res.data[0];
      
      this.setState({
         name, 
         profileImage,
         image: post_image ? post_image : '',
      });
   }


   addToFavorites = async () => {
      const form = this.getCurrentUserIdAndPost();
      const {showFavorites} = this.state;

      const res = await http.post(apiUrl+'favo-service/add_to_favorites.php',form);

      
      // change the showFavorites
      if(res.data){
       this.setState({showFavorites: !showFavorites})
      }else{ 
         console.log('not work');
      }

   }

   removeFromFavorite = async () => {
      const form = this.getCurrentUserIdAndPost();
      const {showFavorites} = this.state;

      const res = await http.post(apiUrl+'favo-service/remove_from_favorites.php',form);

      
      // change the showFavorites
      if(res.data){
       this.setState({showFavorites: !showFavorites})
      }else{ 
         console.log('not work');
      }
   }

   
   cheackIfFavorite = async () => {
      const form = this.getCurrentUserIdAndPost();

      const res = await http.post(apiUrl+'favo-service/check_if_favorites.php',form);

      if(res.data){
         this.setState({showFavorites:true})
      }else{
         this.setState({showFavorites:false})
      }
   }


   componentDidMount(){
      this.getImagesAndName();
      this.cheackIfFavorite();

   }


   render() { 
      // for the deletePost function
      if (!this.state.showComponent) return null;

      const {showFavorites} = this.state

      const { user_id, article } = this.props.postInfo;
      let postEdit = false;

      if(user_id === this.currentUser.id) postEdit = true

      return ( 
         <div className="row">
            <div className="col-12">
                  <div className="card mt-3 mb-3">
                     <div className="card-header">
                        <div className='row'>

                           <div className='col-8'>
                              <div className='row'>
                                 <div className='profile-image-box' >
                                    <img src={apiUrl+'/images/profile/'+ this.state.profileImage} className='profile-image' alt='' />
                                 </div>
                                 <h5 className='name'>{this.state.name}</h5>
                                 </div>
                           </div>
                           <div className='col-4'>
                              
                              <div className="dropdown show float-right">
                                <div className="btn btn-secondary dropdown-toggle" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">   
                                </div>
                                    
                                <div className="dropdown-menu" aria-labelledby="dropdownMenuLink">
                                   
                                 <button className="dropdown-item" onClick={showFavorites ? this.removeFromFavorite: this.addToFavorites}>
                                    {showFavorites ? 'Unfavorite' : 'Add to favorites'}
                                 </button>
                                 { postEdit &&
                                    <React.Fragment>
                                       <NavLink className="dropdown-item" 
                                          to={{
                                           pathname:"/edit-post",
                                           post: this.props.postInfo,
                                          }}
                                       >Edit</NavLink>

                                       <button className="dropdown-item" onClick={this.deletePost}>Delete</button>
                                    </React.Fragment>
                                 }
                                </div>
                              </div>
                              
                           </div>
                           
                        </div>

                     </div>
                     <img src={apiUrl+'/images/posts/'+ this.state.image} className="card-img-top" alt=""></img>
                     <div className="card-body">
                        <p className="card-text">{article}</p>
                     </div>
                  </div>
            </div>
         </div>
       );
   }
}
 
export default Post;