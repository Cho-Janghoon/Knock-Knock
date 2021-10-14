import React, { useState } from 'react';
import './TabModal2.css'
import { Link } from "react-router-dom";
function TabModal2( {handleLogout} ){
 const[showTabModal, setshowTabModal ] = useState(false) 
   const openModal = () => {
       setshowTabModal(!showTabModal)
   }
    return (
       
             showTabModal === false ?
            <div className='ModalContainer1' >
            <div onClick={openModal}>menu</div> 
            </div>
          : <div className='ModalContainer2'onClick={openModal}>
            <Link to="/mypage">
            <div className='tablist'>마이페이지</div>
            </Link>
            <div className='tablist' onClick={handleLogout}>로그아웃</div>
            </div >
         
       
    )
}
export default TabModal2;