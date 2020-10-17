import { deleteToken } from "./tokenLocalStorage";
import { deleteUser } from "./userLocalStorage";

const logout = () => {
  deleteToken();
  deleteUser();
  window.location = "/login";

}
export default  logout