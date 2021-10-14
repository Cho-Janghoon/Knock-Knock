require("dotenv").config();
const db = require('../../../models');
const jwt = require('jsonwebtoken');

module.exports = async (req, res) => {
  
  const authorization = req.headers['authorization'];

  jwt.verify(authorization,process.env.ACCESS_SECRET , async function(err,decoded){
    if(err) {
      res.send("만료됬거나 유효하지 않은 토큰 입니다")
    } else {
      
      const tokenData = { 
        id: decoded.id,
        email:decoded.email,
        name:decoded.name,
        password:decoded.password
      }

      const userData = await db.user.findOne({
        where: tokenData
      })

      if(!userData) {
        res.send("잘못된 정보 토큰 입니다")
      } else {
        
        db.user.destroy({
          where : { id: tokenData.id }
        })

        res.json({
          message: "회원탈퇴가 완료 되었습니다."
        })
      }
    }
  }) 
}