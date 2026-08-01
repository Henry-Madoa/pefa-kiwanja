"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { dbConnect } from "@/lib/mongodb";
import { slugify } from "@/lib/slugify";
import EventModel from "@/models/Event";
import { requirePermission } from "@/lib/rbac/access";

function readEvent(formData: FormData) {
  const title = String(formData.get("title") || "");
  return {
    slug: slugify(String(formData.get("slug") || title)),
    title,
    description: String(formData.get("description") || ""),
    venue: String(formData.get("venue") || ""),
    date: String(formData.get("date") || ""),
    time: String(formData.get("time") || ""),
    organizer: String(formData.get("organizer") || ""),
    category: String(formData.get("category") || ""),
    capacity: Number(formData.get("capacity") || 0),
    registered: Number(formData.get("registered") || 0),
  };
}

export async function createEvent(formData: FormData) {
  await requirePermission("Event.Create");
  await dbConnect();
  await EventModel.create(readEvent(formData));
  revalidatePath("/admin/events");
  revalidatePath("/events");
  redirect("/admin/events");
}

export async function updateEvent(id: string, formData: FormData) {
  await requirePermission("Event.Edit");
  await dbConnect();
  await EventModel.findByIdAndUpdate(id, readEvent(formData));
  revalidatePath("/admin/events");
  revalidatePath("/events");
  redirect("/admin/events");
}

export async function deleteEvent(id: string) {
  await requirePermission("Event.Delete");
  await dbConnect();
  await EventModel.findByIdAndDelete(id);
  revalidatePath("/admin/events");
  revalidatePath("/events");
}
