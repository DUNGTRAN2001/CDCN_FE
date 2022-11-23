export const adminMenu = [
  {
    //quản lý người dùng
    name: "menu.admin.manage-user",
    menus: [
      {
        name: "menu.admin.crud",
        link: "/system/user-manage",
      },
      {
        name: "menu.admin.crud-redux",
        link: "/system/user-redux",
      },
      //   {
      //     name: "menu.admin.manage-admin",
      //     link: "/system/user-admin",
      //   },
    ],
  },
  {
    //quản lý sản phẩm
    name: "menu.admin.admin-product",
    menus: [
      {
        name: "menu.admin.manage-product",
        link: "/system/manage-product",
      },
      {
        name: "menu.admin.manage-category",
        link: "/system/manage-category",
      },
    ],
  },
  {
    //quản lý giỏ hàng
    name: "menu.admin.admin-cart",
    menus: [
      {
        name: "menu.admin.manage-cart",
        link: "/system/manage-cart",
      },
    ],
  },
];
