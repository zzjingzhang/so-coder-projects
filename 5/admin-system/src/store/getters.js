export default {
  userName: (state) => state.user.userName,
  avatar: (state) => state.user.avatar,
  token: (state) => state.user.token,
  isLoggedIn: (state) => !!state.user.token
}