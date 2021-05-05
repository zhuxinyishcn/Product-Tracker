import {
  AppstoreOutlined,
  PieChartOutlined,
  ToolOutlined,
  UserOutlined,
  PropertySafetyOutlined,
  AreaChartOutlined,
  LineChartOutlined,
  HomeOutlined,
  BarChartOutlined,
  BarsOutlined,
} from "@ant-design/icons";
const menuList = [
  {
    title: "Home",
    key: "/home",
    icon: <HomeOutlined />,
    // key is default public
    isPublic: true,
  },
  {
    title: "Products",
    key: "/products",
    icon: <AppstoreOutlined />,
    children: [
      // sub menu
      {
        title: "Category",
        key: "/category",
        icon: <BarsOutlined />,
      },
      {
        title: "Product",
        key: "/product",
        icon: <ToolOutlined />,
      },
    ],
  },
  {
    title: "User Manage",
    key: "/user",
    icon: <UserOutlined />,
  },
  {
    title: "Role",
    key: "/role",
    icon: <PropertySafetyOutlined />,
  },
  {
    title: "Area-chart",
    key: "/charts",
    icon: <AreaChartOutlined />,
    children: [
      {
        title: "Bar-chart",
        key: "/charts/bar",
        icon: <BarChartOutlined />,
      },
      {
        title: "Line-chart",
        key: "/charts/line",
        icon: <LineChartOutlined />,
      },
      {
        title: "Pie-chart",
        key: "/charts/pie",
        icon: <PieChartOutlined />,
      },
    ],
  },
];
export default menuList;
