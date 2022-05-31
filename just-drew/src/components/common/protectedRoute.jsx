import React from 'react';

import { Route } from 'react-router-dom';

import { getUser }  from '../../services/userCheckService';
import { inArray }  from '../../services/utils';

const ProtectedRoute = ({ path, component: PropComponent }) => {

   const user = getUser();
   const signsPage = ['/signup','/signin'];
   let otg = true; // otg = ok to go
   

   if( inArray(signsPage, path) && !user ){
      
      otg = false;
      return (
         <Route
          render={props => {
             return (<PropComponent {...props} />)
          }}
         />
      );
   }


   if( user && !inArray(signsPage, path) && otg ){
      return (
         <Route 
            render={props => {  
            
               return (<PropComponent {...props} />)
            }}
          />
      )

   }

   return (
      
      <Route 
         render={props => {  
            props.history.replace('/');   
         }}
     
      />
   )

}

export default ProtectedRoute;