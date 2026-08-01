export type NavLink = { href: string; label: string; permission: string };
export type NavGroup = { label: string; links: NavLink[] };

export const navGroups: NavGroup[] = [
  {
    label: "Overview",
    links: [{ href: "/admin", label: "Dashboard", permission: "Report.View" }],
  },
  {
    label: "Content",
    links: [
      { href: "/admin/sermons", label: "Sermons", permission: "Sermon.View" },
      { href: "/admin/events", label: "Events", permission: "Event.View" },
      { href: "/admin/blog", label: "Blog & News", permission: "Blog.View" },
      { href: "/admin/ministries", label: "Ministries", permission: "Ministry.View" },
      { href: "/admin/leadership", label: "Leadership", permission: "Leadership.View" },
      { href: "/admin/board", label: "Church Board", permission: "Board.View" },
      { href: "/admin/gallery", label: "Gallery", permission: "Media.View" },
    ],
  },
  {
    label: "Submissions",
    links: [
      { href: "/admin/prayer-requests", label: "Prayer Requests", permission: "Prayer.View" },
      { href: "/admin/messages", label: "Contact Messages", permission: "Message.View" },
      { href: "/admin/subscribers", label: "Newsletter", permission: "Subscriber.View" },
      { href: "/admin/rsvps", label: "Event RSVPs", permission: "Rsvp.View" },
      { href: "/admin/reviews", label: "Comments & Ratings", permission: "Review.View" },
    ],
  },
  {
    label: "Administration",
    links: [
      { href: "/admin/users", label: "Users", permission: "User.View" },
      { href: "/admin/roles", label: "Roles", permission: "Role.View" },
      { href: "/admin/audit", label: "Audit Log", permission: "Audit.View" },
    ],
  },
];

// Whether a nav link is the active one for the current pathname.
export function isNavLinkActive(href: string, pathname: string | null): boolean {
  return href === "/admin" ? pathname === "/admin" : Boolean(pathname?.startsWith(href));
}

// Drops links (and then empty groups) the user has no permission to see.
export function visibleNavGroups(groups: NavGroup[], permissions: string[]): NavGroup[] {
  const has = (p: string) => permissions.includes("*") || permissions.includes(p);
  return groups
    .map((g) => ({ ...g, links: g.links.filter((l) => has(l.permission)) }))
    .filter((g) => g.links.length > 0);
}
