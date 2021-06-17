import React from 'react';
import './Header.css';

export default ({black}) => {
    return (
        <header className={black ? 'black' : ''}>
           <div className="header--logo">
               <a href="/">
                   <img src="https://upload.wikimedia.org/wikipedia/commons/7/7a/Logonetflix.png" alt="Netflix"/>
               </a>
           </div>
           <div className="header--user">
               <a href="/">
                   <img src="https://pbs.twimg.com/profile_images/1398399796667244549/oZeQQEzC_400x400.png" alt="Usuário" />
               </a>
           </div>
        </header>
    );
}