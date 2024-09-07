import PrivateRoute from "./PrivateRoute.jsx";

export const CustomerPrivateRoute = () => (
  <PrivateRoute allowedRole="ROLE_CUSTOMER" />
);