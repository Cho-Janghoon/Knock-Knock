//import logo from './logo.svg';
import axios from "axios"
import './App.css';
import Tabmodal from './component/TabModal'
import Tabmodal2 from './component/TabModal2'
import SignUp from './pages/SignUp'
import LogIn from './pages/LogIn'
import MyPage from './pages/MyPage'
import MyList from './pages/MyList'
import Location from './component/location'
import AddToilet from './pages/addToilet'
import {BrowserRouter, Route, Switch, useHistory, Link} from "react-router-dom"
import _ from 'lodash';
// import * as React from 'react';
import React, { useState,useEffect } from 'react';
//import {FaRestroom} from "react-icons/fa"

axios.defaults.withCredentials = true;

function App() {

  const [isLogin, setIsLogin] = useState(false);
  const [userinfo, setUserinfo] = useState(null);
  const [isMyList, setIsMyList] = useState(null);
  const [myList, setMyList] = useState([]);
  const [accessToken, setAccessToken] = useState(null);


  const deleteAccount = ()=> {
  axios.delete("https://localhost:4000/user/userinfo", {
    headers: {
      authorization: `${accessToken}`,
      "Content-Type" : "application/json"
    }
  }).then(res=>{
      if(res.data.message === "회원탈퇴가 완료 되었습니다."){
          //토큰비우고 
          //로그인정보도비우고
          //alert
          //window.push
          setUserinfo(null)
          setAccessToken(null)
          setIsLogin(false)
          setMyList([])
          window.location.replace('/') 
          alert("회원탈퇴되었습니다")
      }
      else{
        alert("잘못된 접근입니다")
      }
  })
  }

  const handleUserinfo = (accessP) =>{
    setUserinfo(accessP)
    setIsLogin(true)
  }


  const handleAccessToken = (accessT) => {
  
    setAccessToken(accessT) // 로그인하면서 받은 엑세스 토큰
  }
  //console.log("==============================isMyList(latest)", isMyList)
  
  const handleWriteInfo = () => {
    
      axios.get("https://localhost:4000/user/mylist", {
        headers: {
          authorization: `${accessToken}`,
          "Content-Type" : "application/json"
        }
      }) // myComment, myToilet 데이터 요청
      //[{.....},{......}]
      .then((res) => {
        console.log("===================mylist: ", _.cloneDeep(res.data.myToilet))
      
        setMyList(myList=>[...myList,...res.data.myToilet])
        console.log("===================mylist: ", myList)
      })
      console.log("===================mylist: ", myList)
    }
    
  const isAuthenticated = () => {
    axios.get("https://localhost:4000/user/userinfo", {
      headers: {
        authorization: `${accessToken}`,
        "Content-Type" : "application/json"   
      },
      withCredentials: true
    })
    .then((res) => {
      history.push('/')
      console.log("========================useinfostates: ", userinfo)

    })
  }

  const handleLogout = () => {
    axios.post("https://localhost:4000/signout")
    .then((res) => {
      console.log("===================mylist: ", myList)
      setIsLogin(false);
      setUserinfo(null);
      window.location.replace('/') 
      alert("로그아웃을 완료했습니다")
      
    })
  }

  const handleResponseSuccess = () => {
    isAuthenticated();
  }

  //템메뉴
  //jwt를 이용한 분기를 걸어줌 jwt? tab(로그잇,회원가임) : tab2(마이페이지,로그아웃)

  //라우팅 분기
  // 로그인 버튼 누를시 리엑트 깜박임으로 넘기기
  // 회원가입 버튼누를시
  const history = useHistory();

  React.useEffect(() => {
      history.push('/'); // 마운트 될 때 
  }, [])

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpen2, setIsModalOpen2] = useState(false);
  const [isModalOpen3, setIsModalOpen3] = useState(false);

  const openModalFunc = () => {
    setIsModalOpen(!isModalOpen);
  }
  const openModalFunc2 = () => {
    setIsModalOpen2(!isModalOpen2);
  }
  const openModalFunc3 = () => {
    setIsModalOpen3(!isModalOpen3);
  }

  return (
  <BrowserRouter>
  <div className="App" > 
    <div className="headerdiv">
      <header className="header" >
      <Link to="/">
        <h1 className="App-name" ><img className="Knock_logo1" src="https://i.ibb.co/PW20S0t/Knock-Knock-logo-removebg-preview.png" alt="My Image"/></h1>
        </Link>
      
        {isLogin ===false ? 
        <Tabmodal openModalFunc={openModalFunc} openModalFunc2={openModalFunc2}/> :
         <Tabmodal2 handleLogout={handleLogout}/>}
         {/* <Tabmodal openModalFunc={openModalFunc} openModalFunc2={openModalFunc2}/> */}

       </header>
       {isModalOpen === false ? null :
     <LogIn handleResponseSuccess={handleResponseSuccess} openModalFunc={openModalFunc} handleAccessToken={handleAccessToken} isAuthenticated={isAuthenticated} handleUserinfo={handleUserinfo}/>
     }
       {isModalOpen2 === false ? null :
     <SignUp openModalFunc2={openModalFunc2}  />
     } 
        {isModalOpen3 === false ? null :
     <AddToilet openModalFunc3={openModalFunc3} accessToken={accessToken} />
     } 
    </div>
    
    <Switch>
    <div className='map'>
     <Location openModalFunc3={openModalFunc3}/>
     {/* <SignUp/>  */}
     {/* {<Location/>} */}
     <Route exact path='/'  >
       <Location openModalFunc3={openModalFunc3}/>
     </Route> 
     <Route exact path='/mypage'  >
       <MyPage handleLogout={handleLogout} userinfo={userinfo} handleWriteInfo={handleWriteInfo} accessToken={accessToken} handleWriteInfo={handleWriteInfo} deleteAccount={deleteAccount} />
     </Route>
     <Route exact path='/mylist' >
       <MyList accessToken={accessToken} handleWriteInfo={handleWriteInfo} myList={myList}/>
     </Route>
     {/* <Route path='/mylist'>
       <MyList isMyList={isMyList} />
     </Route> */}
    </div>
    </Switch>
  </div>  
  </BrowserRouter>
  
  );
}

export default App;