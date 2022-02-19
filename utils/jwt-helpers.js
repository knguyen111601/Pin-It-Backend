const jwt = require("jsonwebtoken")

const jwtTokens = ({id, username, email, pfp}) => {
    const user = {id, username, email, pfp}
    const accessToken = jwt.sign(user,process.env.ACCESS_TOKEN_SECRET, {expiresIn: '20s'})
    const refreshToken = jwt.sign(user,process.env.REFRESH_TOKEN_SECRET, {expiresIn: '20160m'})
    return ({accessToken, refreshToken})
}

module.exports = jwtTokens