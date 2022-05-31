import React from 'react';

const Fotter = () => {
   return ( 
      <div className="p-1 bg-dark">
         <p className='pt-2 text-center text-light'>Just Drew &copy;{new Date().getFullYear()}</p>
      </div>
    );
}
 
export default Fotter;