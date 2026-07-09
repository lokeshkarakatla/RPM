import { Menu } from "./menu.model";

export const verticalMenuItems = [
  new Menu(3, "Dashboard", "/app/dashboard", null, "dashboard", null, true, 0),
  new Menu(
    1,
    "SUB Audits",
    "/app/subjective-audits",
    null,
    "find_in_page",
    null,
    false,
    0,
  ),
  new Menu(
    2,
    "OBJ Audits",
    "/app/objective-audits",
    null,
    "find_in_page",
    null,
    false,
    0,
  ),
  new Menu(6, "PRTS", "/app/prts-part", null, "request_quote", null, false, 0),
  new Menu(4, "Admin", "/app/admin", null, "supervisor_account", null, true, 0),
  new Menu(
    401,
    "Roles & Users",
    "/app/admin/manage-users",
    null,
    "group_add",
    null,
    false,
    4,
  ),
  new Menu(
    403,
    "Dashboard",
    "/app/admin/lookups",
    null,
    "search",
    null,
    false,
    4,
  ),
  new Menu(
    404,
    "Preferences",
    "/app/admin/settings",
    null,
    "settings_applications",
    null,
    false,
    4,
  ),
  new Menu(
    405,
    "Event Log",
    "/app/admin/event-log",
    null,
    "engineering",
    null,
    false,
    4,
  ),
  new Menu(
    406,
    "Escalation Matrix",
    "/app/admin/escalation",
    null,
    "mail_outline",
    null,
    false,
    4,
  ),
  new Menu(
    2,
    "OBJ Audits",
    "/app/objective-audits",
    null,
    "find_in_page",
    null,
    false,
    0,
    ["/app/setup/subjective/check"],
  ),
];

export const horizontalMenuItems = [
  // 1. Dashboard
  new Menu(
    1,
    "Dashboard",
    "/app/test-dashboard",
    null,
    "dashboard",
    null,
    false,
    0,
  ),

  // 2. Projects
  new Menu(
    2,
    "Projects",
    "/app/testing/projects",
    null,
    "business_center",
    null,
    false,
    0,
  ),

      new Menu(14, "Stages",   "/app/testing/stages", null, "layers", null, false, 0),



        new Menu(5, "Gates", "/app/testing/gates", null, "door_front", null, false, 0),



         new Menu(5, "Master Data", "/app/testing/testing-masterData", null, "storage", null, false, 0),

  // 3. Setup (Now ONLY contains Stages, Gates, and Master Data)
  // new Menu(3, "Setup", "/app/testing/stages", null, "build", null, true, 0),
  new Menu(
    4,
    "Stages",
    "/app/testing/stages",
    null,
    "layers",
    null,
    false,
    3,
  ),
  new Menu(
    302,
    "Gates",
    "/app/testing/gates",
    null,
    "door_front",
    null,
    false,
    3,
  ),
  new Menu(
    306,
    "Master Data",
    "/app/testing/testing-masterData",
    null,
    "storage",
    null,
    false,
    3,
  ),

  // ✅ ADDED: 5. Tasks as Top-Level
  new Menu(5, "Tasks", "/app/testing/tasks", null, "task", null, false, 0),



  // ✅ ADDED: 6. Issues as Top-Level
  new Menu(
    6,
    "Issues",
    "/app/testing/issues",
    null,
    "bug_report",
    null,
    false,
    0,
  ),

  // ✅ ADDED: 7. To Do as Top-Level
  new Menu(7, "To Do", "/app/testing/todo", null, "checklist", null, false, 0),

  // 4. Admin
  new Menu(4, "Admin", "/app/admin", null, "supervisor_account", null, true, 0),
  new Menu(
    401,
    "Roles & Users",
    "/app/admin/manage-users",
    null,
    "group_add",
    null,
    false,
    4,
  ),
  new Menu(
    402,
    "Availability",
    "/app/admin/availability",
    null,
    "group_add",
    null,
    false,
    4,
  ),
  // new Menu(402, 'Master Data', '/app/setups/setup-masterdata/status-master', null, 'storage', null, false, 4),
  new Menu(
    403,
    "Departments",
    "/app/admin/departments",
    null,
    "apartment",
    null,
    false,
    4,
  ),
  new Menu(
    404,
    "Lookup Options",
    "/app/admin/lookups",
    null,
    "search",
    null,
    false,
    4,
  ),
  new Menu(
    405,
    "Preferences",
    "/app/admin/settings",
    null,
    "settings_applications",
    null,
    false,
    4,
  ),
  new Menu(
    406,
    "Event Log",
    "/app/admin/event-log",
    null,
    "engineering",
    null,
    false,
    4,
  ),
  new Menu(
    407,
    "Escalation Matrix",
    "/app/admin/escalation",
    null,
    "mail_outline",
    null,
    false,
    4,
  ),
  // new Menu(408, 'Audit Config', '/app/setups/setup-audit', null, 'group_add', null, false, 4)
];

export const clientMenuItems = [
  new Menu(
    1,
    "Client",
    "/app/client-login",
    null,
    "account_circle",
    null,
    false,
    0,
  ),
];

export const supplierMenuItems = [
  new Menu(
    404,
    "Lookup Options",
    "/app/admin/lookups",
    null,
    "search",
    null,
    false,
    0,
  ),

  new Menu(
    404,
    "Dashboard",
    "/app/admin/lookups",
    null,
    "search",
    null,
    false,
    0,
  ),
];
