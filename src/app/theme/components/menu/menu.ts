import { Menu } from './menu.model';

export const verticalMenuItems = [
  // new Menu(1, 'Dashboard', '/app/dashboard', null, 'dashboard', null, false, 0),
  // new Menu(2, 'Radar', '/app/clients', null, 'account_circle', null, false, 0),
  // new Menu(2, 'Radar', '/app/radar1', null, 'account_circle', null, false, 0),
  new Menu(3, 'Dashboard', '/app/dashboard', null, 'dashboard', null, true, 0),
  new Menu(1, 'SUB Audits', '/app/subjective-audits', null, 'find_in_page', null, false, 0),
  new Menu(2, 'OBJ Audits', '/app/objective-audits', null, 'find_in_page', null, false, 0),
  new Menu(6, 'PRTS', '/app/prts-part', null, 'request_quote', null, false, 0),
  //new Menu(5, 'Setup', '/app/setup', null, 'business_center', null, false, 0),
  // new Menu(3, 'Audits', '/app/projects', null, 'business_center', null, false, 0),
  // new Menu(5, 'Setup', '/app/purchase', null, 'request_quote', null, false, 0),
  //new Menu(6, 'Assets', '/app/assets', null, 'engineering', null, false, 0),
  //new Menu(7, 'Vendor Mgmt', '/app/vendor-mgmt', null, 'panorama_fish_eye', null, false, 0),
  //new Menu(8, 'Finance', '/app/finance', null, 'settings_applications', null, false, 0),
  new Menu(4, 'Admin', '/app/admin', null, 'supervisor_account', null, true, 0),
  new Menu(401, 'Roles & Users', '/app/admin/manage-users', null, 'group_add', null, false, 4),
  // new Menu(402, 'Master Data', '/app/admin/master-data/model', null, 'swap_horiz', null, false, 4),
  new Menu(403, 'Lookup Options', '/app/admin/lookups', null, 'search', null, false, 4),
  new Menu(404, 'Preferences', '/app/admin/settings', null, 'settings_applications', null, false, 4),
  new Menu(405, 'Event Log', '/app/admin/event-log', null, 'engineering', null, false, 4),
  new Menu(406, 'Escalation Matrix', '/app/admin/escalation', null, 'mail_outline', null, false, 4),
  // new Menu(406, 'Kanban Setup', '/app/admin/kanban-setup', null, 'panorama_fish_eye', null, false, 4),y
  //new Menu(407, 'Event Log', '/app/admin/event-log', null, 'engineering', null, false, 4),
  // new Menu(408, 'Credentials', '/app/admin/credentials',null,'engineering',null,false,4)
]

export const horizontalMenuItems = [
  // new Menu(1, 'Dashboard', '/app/dashboard', null, 'dashboard', null, false, 0),
  //  new Menu(2, 'Radar', '/app/radar1', null, 'account_circle', null, false, 0),
  new Menu(3, 'Dashboard', '/app/dashboard', null, 'dashboard', null, true, 0),
  new Menu(2, 'OBJ Audits', '/app/objective-audits', null, 'find_in_page', null, false, 0),

  new Menu(1, 'SUB Audits', '/app/subjective-audits', null, 'find_in_page', null, false, 0),
  new Menu(6, '7D', '/app/prts-part', null, 'request_quote', null, false, 0),

  new Menu(7, 'R&D', '/app/testing', null, 'engineering', null, false, 0),

  new Menu(9, 'SQA', '/app/sqm', null, 'settings_applications', null, false, 0),

  new Menu(8, 'Complaints', '/app/complaints', null, 'settings', null, false, 0),
//  new Menu(5, 'Setup', '/app/setups', null, 'build', null, true, 0),
//      new Menu(501, 'MasterData', '/app/setups/setup-masterdata', null, 'storage', null, false, 5),
//   new Menu(502, 'Audit Config', '/app/setups/setup-audit', null, 'group_add', null, false, 5),


  // new Menu(5, 'Setup', '/app/setup', null, 'business_center', null, false, 0),
  //  new Menu(5, 'Purchase', '/app/purchase', null, 'request_quote', null, false, 0),
  //  new Menu(6, 'Assets', '/app/assets', null, 'engineering', null, false, 0),
  // new Menu(7, 'Vendor Mgmt', '/app/vendor-mgmt', null, 'panorama_fish_eye', null, false, 0),
  // new Menu(8, 'Finance', '/app/finance', null, 'settings_applications', null, false, 0),
  new Menu(4, 'Admin', '/app/admin', null, 'supervisor_account', null, true, 0),
  new Menu(401, 'Roles & Users', '/app/admin/manage-users', null, 'group_add', null, false, 4),
   // new Menu(407, 'Master Data', '/app/setups/setup-masterdata', null, 'storage', null, false, 4),
  new Menu(408, 'Audit Config', '/app/setups/setup-audit', null, 'group_add', null, false, 4),
  //new Menu(408, 'Master Data', '/app/setups/setup-audit', null, 'group_add', null, false, 4),
   new Menu(402, 'Master Data', '/app/setups/setup-masterdata/status-master', null, 'storage', null, false, 4),
   new Menu(403, 'Departments', '/app/admin/departments', null, 'apartment', null, false, 4),
  new Menu(403, 'Lookup Options', '/app/admin/lookups', null, 'search', null, false, 4),
  new Menu(404, 'Preferences', '/app/admin/settings', null, 'settings_applications', null, false, 4),
  new Menu(405, 'Event Log', '/app/admin/event-log', null, 'engineering', null, false, 4),
  new Menu(406, 'Escalation Matrix', '/app/admin/escalation', null, 'mail_outline', null, false, 4),
  // new Menu(406, 'Kanban Setup', '/app/admin/kanban-setup', null, 'panorama_fish_eye', null, false, 4),
  //new Menu(407, 'Event Log', '/app/admin/event-log', null, 'engineering', null, false, 4),
  //new Menu(408, 'Credentials', '/app/admin/credentials',null,'engineering',null,false,4)

]

export const clientMenuItems = [
  new Menu(1, 'Client', '/app/client-login', null, 'account_circle', null, false, 0),
]





