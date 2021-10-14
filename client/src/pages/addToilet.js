import axios from "axios";
import React, { useState } from 'react';
import { Link } from "react-router-dom";
import "./LogIn.css";
import {useHistory} from "react-router-dom"


export default function AddToilet({ openModalFunc3,accessToken }) {
  const history = useHistory();
    const [toiletinfo, settoiletinfo] = useState({
        name: '',
        address: '',
        image: '',
        
      });
      const handleInputValue = (key) => (e) => {
        settoiletinfo({ ...toiletinfo, [key]: e.target.value });
        console.log('#####',toiletinfo)
      };
      const handleSignup = () => {
      if(toiletinfo.name ==='' || toiletinfo.address ==='' ){
       // setErrorMessage('모든 항목은 필수입니다')
          }
          
          
         else{
            axios
            .post(
              'https://localhost:4000/toilet',{
                name:toiletinfo.name, address:toiletinfo.address,
              },
              {
                headers: {
                    authorization: `${accessToken}`
            }
            }).then((res)=>{
                   console.log(res)
             // settoiletinfo(toiletinfo)
               if(res.data.message==='화장실 등록이 완료되었습니다'){
                alert(" 화장실 등록이 완료되었습니다")
                window.location.replace('/')
               }
               else{
                alert("없는주소입니다.")
               }
              
               })
               console.log(accessToken) 
            console.log(toiletinfo)
          }
    

        }



    return (
      
          <div className="modal" >
            <div >
              <div className="loginModal">
                <span className="close" onClick={openModalFunc3}>
                  &times;
                </span>
                <div className="modalContents" >
                  {/* <img className="logo" src="/Images/Signin/Knock-Knock logo.png" /> */}
                  <input
                    name="email"
                    className="loginId"
                    type="text"
                    placeholder="화장실명"
                    // onChange={this.loginHandler}
                    onChange={handleInputValue('name')}
                  />
                  <input
                    name="email"
                    className="loginPw"
                    type="text"
                    placeholder="주소"
                    // onChange={this.loginHandler}
                    onChange={handleInputValue('address')}
                  />
                  <input
                    name="password"
                    className="loginPw"
                    type="password"
                    placeholder="이미지"
                    // onChange={this.loginHandler}
                    onChange={handleInputValue('image')}
                  />
                  <div className="loginMid">
                    
                    <div className="autoLogin">지도로 주소가져오기</div>
                  </div>
                  <button className="loginBtn" onClick={handleSignup}>
                    {" "}
                    화장실등록{" "}
                  </button>
                  <div className="socialBox">
                  
                  </div>
                  <div className="loginEnd">
                    
                    
                  </div>
                </div>
              </div>
            </div>
          </div>
    );
  }