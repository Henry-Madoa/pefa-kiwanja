import { PERMISSION_GROUPS, WILDCARD } from "./permissions";

const VIEW_ONLY = PERMISSION_GROUPS.flatMap((g) =>
  g.permissions.map((p) => p.key).filter((k) => k.endsWith(".View"))
);

const CONTENT = [
  "Report.View",
  "Sermon.View",
  "Sermon.Create",
  "Sermon.Edit",
  "Sermon.Delete",
  "Blog.View",
  "Blog.Create",
  "Blog.Edit",
  "Blog.Delete",
  "Media.View",
  "Media.Manage",
  "Review.View",
  "Review.Moderate",
];

const ADMINISTRATOR = [
  "Report.View",
  ...PERMISSION_GROUPS.filter((g) =>
    [
      "Sermons",
      "Events",
      "Blog & News",
      "Ministries",
      "Leadership",
      "Church Board",
      "Media Gallery",
      "Prayer Requests",
      "Contact Messages",
      "Newsletter",
      "Event RSVPs",
      "Comments & Ratings",
    ].includes(g.domain)
  ).flatMap((g) => g.permissions.map((p) => p.key)),
];

// The default system roles seeded into the database. Marked isSystem so they
// cannot be deleted. Finance Officer and Ministry Leader from the spec are
// intentionally omitted until their modules (finance, ministries) exist.
export const DEFAULT_ROLES: {
  name: string;
  description: string;
  permissions: string[];
  isSystem: boolean;
}[] = [
  {
    name: "Super Administrator",
    description: "Unrestricted access to the entire system.",
    permissions: [WILDCARD],
    isSystem: true,
  },
  {
    name: "Super Viewer",
    description: "Read-only access across every module.",
    permissions: VIEW_ONLY,
    isSystem: true,
  },
  {
    name: "Administrator",
    description: "Day-to-day management of church content and submissions.",
    permissions: ADMINISTRATOR,
    isSystem: true,
  },
  {
    name: "Content Manager",
    description: "Manages sermons, blog posts and comment moderation.",
    permissions: CONTENT,
    isSystem: true,
  },
];

export const SUPER_ADMIN_ROLE = "Super Administrator";
