const ip = 'https://api.forbiger.com/'

const api = {
  getUserOpenId: `${ip}Wx/getUserOpenId`,
  isExistAppUser:`${ip}Programs/isExistAppUser`,
  createUser: `${ip}Programs/createUser`,
  login:`${ip}MasterUser/loginApp`
}

export default api
