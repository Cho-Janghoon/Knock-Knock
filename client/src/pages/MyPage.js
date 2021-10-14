import React, {useState} from 'react'
import { Link } from "react-router-dom";
import axios from 'axios'
import "./MyPage.css"
import UserInfo from "./UserInfo"
import "./UserInfo.css"


axios.defaults.withCredentials = true;

export default function MyPage ({ handleLogout, userinfo, handleWriteInfo,deleteAccount }) {
    
const [myInfo, setMyInfo] = useState(false);


    
    const handleUserInfo = () => {
        // console.log("=================================userinfo: ", userinfo)
       setMyInfo(!myInfo);
    }

   
    return (
        <div className = "mypageBox_1">
            <div className = "mypageBox_2">
              <center className = "centerBox">
                  <h1 className = "h1">My Page</h1>
                  <div className = "seeUserInfo" onClick={handleUserInfo}>
                      <div className = "modalUserInfo">{myInfo === false ? "내 정보 보기" : ""}</div>
                      {myInfo === false ? null : <UserInfo handleUserInfo={handleUserInfo} userinfo={userinfo} />}
                  </div>
                  <div className = "myList" onClick={handleWriteInfo}><Link to='/mylist'>내가 쓴 글 보기</Link></div>
                  <div className = "deleteMyInfo" onClick={deleteAccount} >회원탈퇴</div>
                  <div className = "btn_container">
                  <button className = "btn_logout" onClick={handleLogout}>로그아웃</button>
                  </div>
            </center>
            </div>
        </div>
    )
}
