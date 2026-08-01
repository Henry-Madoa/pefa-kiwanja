// Single source of truth for RBAC permissions. Each permission maps 1:1 to a
// real capability in the admin portal. Grouped for the role editor UI.
//
// Naming convention: Domain.Action. The wildcard "*" grants everything and is
// held only by the Super Administrator role.

export const PERMISSION_GROUPS = [
  {
    domain: "Dashboard",
    permissions: [{ key: "Report.View", label: "View dashboard & reports" }],
  },
  {
    domain: "Sermons",
    permissions: [
      { key: "Sermon.View", label: "View" },
      { key: "Sermon.Create", label: "Create" },
      { key: "Sermon.Edit", label: "Edit" },
      { key: "Sermon.Delete", label: "Delete" },
    ],
  },
  {
    domain: "Events",
    permissions: [
      { key: "Event.View", label: "View" },
      { key: "Event.Create", label: "Create" },
      { key: "Event.Edit", label: "Edit" },
      { key: "Event.Delete", label: "Delete" },
    ],
  },
  {
    domain: "Blog & News",
    permissions: [
      { key: "Blog.View", label: "View" },
      { key: "Blog.Create", label: "Create" },
      { key: "Blog.Edit", label: "Edit" },
      { key: "Blog.Delete", label: "Delete" },
    ],
  },
  {
    domain: "Ministries",
    permissions: [
      { key: "Ministry.View", label: "View" },
      { key: "Ministry.Manage", label: "Create / edit / delete" },
    ],
  },
  {
    domain: "Leadership",
    permissions: [
      { key: "Leadership.View", label: "View" },
      { key: "Leadership.Manage", label: "Create / edit / delete" },
    ],
  },
  {
    domain: "Church Board",
    permissions: [
      { key: "Board.View", label: "View" },
      { key: "Board.Manage", label: "Create / edit / delete" },
    ],
  },
  {
    domain: "Media Gallery",
    permissions: [
      { key: "Media.View", label: "View" },
      { key: "Media.Manage", label: "Upload / edit / delete" },
    ],
  },
  {
    domain: "Prayer Requests",
    permissions: [
      { key: "Prayer.View", label: "View" },
      { key: "Prayer.Manage", label: "Mark prayed / delete" },
    ],
  },
  {
    domain: "Contact Messages",
    permissions: [
      { key: "Message.View", label: "View" },
      { key: "Message.Manage", label: "Mark read / delete" },
    ],
  },
  {
    domain: "Newsletter",
    permissions: [
      { key: "Subscriber.View", label: "View subscribers" },
      { key: "Subscriber.Manage", label: "Remove subscribers" },
    ],
  },
  {
    domain: "Event RSVPs",
    permissions: [
      { key: "Rsvp.View", label: "View RSVPs" },
      { key: "Rsvp.Manage", label: "Remove RSVPs" },
    ],
  },
  {
    domain: "Comments & Ratings",
    permissions: [
      { key: "Review.View", label: "View" },
      { key: "Review.Moderate", label: "Approve / delete" },
    ],
  },
  {
    domain: "User Management",
    permissions: [
      { key: "User.View", label: "View" },
      { key: "User.Create", label: "Create" },
      { key: "User.Edit", label: "Edit / activate / deactivate" },
      { key: "User.Delete", label: "Delete" },
      { key: "User.ResetPassword", label: "Reset password" },
      { key: "User.AssignRole", label: "Assign roles" },
    ],
  },
  {
    domain: "Role Management",
    permissions: [
      { key: "Role.View", label: "View" },
      { key: "Role.Create", label: "Create" },
      { key: "Role.Edit", label: "Edit / assign permissions" },
      { key: "Role.Delete", label: "Delete" },
    ],
  },
  {
    domain: "Audit Log",
    permissions: [{ key: "Audit.View", label: "View audit log" }],
  },
] as const;

export const ALL_PERMISSIONS: string[] = PERMISSION_GROUPS.flatMap((g) =>
  g.permissions.map((p) => p.key)
);

export const WILDCARD = "*";

export type Permission = (typeof ALL_PERMISSIONS)[number] | typeof WILDCARD;

/** True if the given permission set satisfies `required` (wildcard grants all). */
export function hasPermission(granted: string[], required: string): boolean {
  return granted.includes(WILDCARD) || granted.includes(required);
}
