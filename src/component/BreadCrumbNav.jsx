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

  return (
    <Breadcrumb className="p-5">
      {/* Slice breadcrumbs from the 3rd item onwards and map over each breadcrumb */}
      {breadcrumbs.slice(2).map(({ breadcrumb, match }, index) => (
        <Breadcrumb.Item key={index}>
          <NavLink to={match.pathname}>{breadcrumb}</NavLink>
        </Breadcrumb.Item>
      ))}
    </Breadcrumb>
  );
}
