import PrivateRoute from "./PrivateRoute.jsx";

export const AdminPrivateRoute = () => (
  <PrivateRoute allowedRole="ROLE_RESTAURANT_OWNER" />
);