import { Breadcrumb } from "antd";
import { NavLink } from "react-router-dom";
import useBreadcrumbs from "use-react-router-breadcrumbs";

// Define the breadcrumb routes
const routes = [
  {
    path: "/admin/user",
    breadcrumb: "User management",
  },
  {
    path: "/admin/movie",
    breadcrumb: "Movie management",
  },
];

export default function BreadCrumbNav() {
  const breadcrumbs = useBreadcrumbs(routes);

  // Convert breadcrumbs to items array
  const breadcrumbItems = breadcrumbs.slice(2).map(({ breadcrumb, match }) => ({
    title: <NavLink to={match.pathname}>{breadcrumb}</NavLink>,
  }));

  return <Breadcrumb className="p-5" items={breadcrumbItems} />;
}
