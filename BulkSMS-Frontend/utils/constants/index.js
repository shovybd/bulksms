export const URLS = {
  MASTERDASHBOARD: "/masterDashboard",
  SENDSMS: "/masterDashboard/sendSMS",
  COMPANYLIST: "/masterDashboard/companyList",
  SMSHISTORY: "/masterDashboard/smsHistory",
  BALANCE: "/masterDashboard/balance",
  PAYMENT: "/masterDashboard/payment",
  CREATECOMPANY: "/masterDashboard/createCompany",
  CREATEBRANCH: "/masterDashboard/createBranch",
  CREATEUSER: "/masterDashboard/createUser",
  CREATEROUTE: "/masterDashboard/createRoute",
  USERPROFILE: "/masterDashboard/userProfile",
  USERLIST: "/masterDashboard/userList",
  BRANCHLIST: "/masterDashboard/branchList",
  SETROLEEDIT: "/masterDashboard/setRoleEdit",
  SETUSERROLE: "/masterDashboard/setUserRole",
  CREATECAMPAIGN: "/masterDashboard/createCampaign",
};

export const NAVIGATION = [
  {
    href: URLS.MASTERDASHBOARD,
    icons: "/images/admin/dashboard.svg",
    width: "24px",
    height: "19px",
    pageName: "Dashboard",
  },
  {
    href: URLS.SENDSMS,
    icons: "/images/admin/campaign.svg",
    width: "24px",
    height: "22px",
    pageName: "Send SMS",
  },
  {
    href: URLS.COMPANYLIST,
    icons: "/images/admin/company-ist.svg",
    width: "24px",
    height: "24px",
    pageName: "Company List",
  },
  {
    href: URLS.SMSHISTORY,
    icons: "/images/admin/sms-and-history.svg",
    width: "24px",
    height: "19px",
    pageName: "SMS History",
  },
  {
    href: URLS.BALANCE,
    icons: "/images/admin/balance.svg",
    width: "24px",
    height: "22px",
    pageName: "Balance",
  },
  {
    href: URLS.PAYMENT,
    icons: "/images/admin/payment.svg",
    width: "24px",
    height: "17px",
    pageName: "Payment",
  },
  {
    href: URLS,
    icons: "/images/admin/security.svg",
    class: "security-div",
    className: "d-block d-md-none",
    width: "21px",
    height: "24px",
    pageName: "Security",
  },
];

export const NAVBARBRAND = [
  { href: URLS.MASTERDASHBOARD, pageName: "Dashboard" },
  { href: URLS.SENDSMS, pageName: "Send SMS" },
  { href: URLS.CREATECOMPANY, pageName: "Create Company" },
  { href: URLS.CREATEBRANCH, pageName: "Create Branch" },
  { href: URLS.COMPANYLIST, pageName: "Company List" },
  { href: URLS.CREATEUSER, pageName: "Create New User" },
  { href: URLS.CREATEROUTE, pageName: "Create Route" },
  { href: URLS.PAYMENT, pageName: "Payment" },
  { href: URLS.USERPROFILE, pageName: "User Profile" },
  { href: URLS.USERLIST, pageName: "User List" },
  { href: URLS.BRANCHLIST, pageName: "Branch List" },
  { href: URLS.SETROLEEDIT, pageName: "Set User Role Edit View" },
  { href: URLS.BALANCE, pageName: "Balance" },
  { href: URLS.SETUSERROLE, pageName: "Set User Role" },
  { href: URLS.CREATECAMPAIGN, pageName: "Create Campaign" },
  { href: URLS.SMSHISTORY, pageName: "SMS History" },
];

export const BREADCRUMB = [
  {
    href: URLS.USERPROFILE,
    text: "Account Information",
  },
  {
    href: URLS.MASTERDASHBOARD,
    text: "Dashboard",
  },
  {
    href: URLS.PAYMENT,
    text: "Payment",
  },
  {
    href: URLS.USERLIST,
    text: "User List",
  },
  {
    href: URLS.BRANCHLIST,
    text: "Branch List",
  },
  {
    href: URLS.SETROLEEDIT,
    text: "Set User Role / Edit View",
  },
  {
    href: URLS.BALANCE,
    text: "Balance / Account code 122344455 / Account Type:Master Account / SMS Credit: 19519",
  },
  {
    href: URLS.SETUSERROLE,
    text: "Set User Role ",
  },
  {
    href: URLS.SMSHISTORY,
    text: "SMS History / Account code 122344455 / Account Type:Master Account / SMS Credit: 19519  ",
  },
];

export const DROPDOWNITEMS = [
  {
    href: URLS.CREATECAMPAIGN,
    icon: "/images/admin/campaign.svg",
    height: "15px",
    width: "16px",
    pageName: "Create Campaign",
  },
  {
    href: URLS.CREATECOMPANY,
    icon: "/images/admin/company.svg",
    height: "16px",
    width: "14px",
    pageName: "Create Company",
  },
  {
    href: URLS.CREATEBRANCH,
    icon: "/images/admin/branch.svg",
    height: "16px",
    width: "16px",
    pageName: "Create Branch",
  },
  {
    href: URLS.CREATEUSER,
    icon: "/images/admin/user.svg",
    height: "16px",
    width: "16px",
    pageName: "Create User",
  },
  {
    href: URLS.CREATEROUTE,
    icon: "/images/admin/route-icon.svg",
    height: "16px",
    width: "16px",
    pageName: "Create Route",
  },
];

export const USERPROFILEDROPDOWNITEMS = [
  {
    href: URLS.SETUSERROLE,
    icon: "/images/role.svg",
    height: "18px",
    width: "16px",
    pageName: "Set Role",
  },
  {
    href: URLS.USERPROFILE,
    icon: "/images/profile.svg",
    height: "17px",
    width: "16px",
    pageName: "User Profile",
  },
];

export const USERLISTTABLEDATA = [
  {
    className: "table-data_1",
    width: "208px",
    header: "Full name",
  },
  {
    className: "table-data_2",
    width: "157px",
    header: "User name",
  },
  {
    className: "table-data_3",
    width: "145px",
    header: "User role",
  },
  {
    className: "table-data_4",
    width: "145px",
    header: "Contact no",
  },
  {
    className: "table-data_5",
    width: "287px",
    header: "Email",
  },
  {
    className: "table-data_6",
    width: "119px",
    header: "Joining date",
  },
  {
    className: "table-data_7",
    width: "98px",
    header: "Status",
  },
  {
    className: "options-data",
    width: "172px",
    header: "Actions",
  },
];

export const BRANCHLISTTABLEDATA = [
  {
    className: "table-data_1",
    width: "124px",
    header: "Branch id",
  },
  {
    className: "table-data_1",
    width: "167px",
    header: "Branch name",
  },
  {
    className: "table-data_1",
    width: "121px",
    header: "Date",
  },
  {
    className: "table-data_1",
    width: "176px",
    header: "Options",
  },
];

export const SETROLETABLEDATA = [
  {
    className: "table-data_1",
    width: "210px",
    header: "Name",
  },
  {
    className: "table-data_2",
    width: "288px",
    header: "Email",
  },
  {
    className: "table-data_3",
    width: "169px",
    header: "Position",
  },
  {
    className: "table-data_4",
    width: "157px",
    header: "Role",
  },
  {
    className: "table-data_5",
    width: "207px",
    header: "Actions",
  },
];
