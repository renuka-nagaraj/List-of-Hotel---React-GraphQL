import React from 'react';
import Headers from './Headers';

export default ({children}) => {
    return <div className="container">
    <Headers></Headers>
     {children}
     </div>;
};