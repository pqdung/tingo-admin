import { Navigate } from "react-router-dom";
import { userRole, viewPermission } from "../utils/utils";

interface Props {
  route: any;
}

const RolePermissionPage = ({ route }: Props) => {
  let canAccess = true;
  if (route.checkRole) {
    canAccess = !userRole();
  } else if (route.checkPermission) {
    canAccess = viewPermission();
  }
  if (canAccess) {
    const Page = route.component;
    return (
      <Page/>
    );
  } else {
    return (<Navigate to={'/'} replace={true}/>);
  }
}

export default RolePermissionPage;