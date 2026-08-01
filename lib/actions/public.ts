"use server";

import { dbConnect } from "@/lib/mongodb";
import PrayerRequestModel from "@/models/PrayerRequest";
import ContactMessageModel from "@/models/ContactMessage";
import NewsletterSubscriberModel from "@/models/NewsletterSubscriber";
import RsvpEntryModel from "@/models/RsvpEntry";
import EventModel from "@/models/Event";
import ReviewModel from "@/models/Review";
import { revalidatePath } from "next/cache";

type ActionResult = { ok: true } | { ok: false; error: string };

const genericError = "Something went wrong. Please try again in a moment.";

export async function submitPrayerRequest(formData: FormData): Promise<ActionResult> {
  try {
    await dbConnect();
    const anonymous = formData.get("anonymous") === "on";
    await PrayerRequestModel.create({
      name: anonymous ? undefined : String(formData.get("name") || ""),
      email: String(formData.get("email") || ""),
      phone: String(formData.get("phone") || "") || undefined,
      category: String(formData.get("category") || "Other"),
      request: String(formData.get("request") || ""),
      anonymous,
    });
    return { ok: true };
  } catch {
    return { ok: false, error: genericError };
  }
}

export async function submitContactMessage(formData: FormData): Promise<ActionResult> {
  try {
    await dbConnect();
    await ContactMessageModel.create({
      name: String(formData.get("name") || ""),
      email: String(formData.get("email") || ""),
      subject: String(formData.get("subject") || "") || undefined,
      message: String(formData.get("message") || ""),
    });
    return { ok: true };
  } catch {
    return { ok: false, error: genericError };
  }
}

export async function subscribeNewsletter(formData: FormData): Promise<ActionResult> {
  try {
    await dbConnect();
    await NewsletterSubscriberModel.findOneAndUpdate(
      { email: String(formData.get("email") || "").toLowerCase().trim() },
      { name: String(formData.get("name") || "") || undefined },
      { upsert: true }
    );
    return { ok: true };
  } catch {
    return { ok: false, error: genericError };
  }
}

export async function submitRsvp(
  eventSlug: string,
  eventTitle: string,
  formData: FormData
): Promise<ActionResult> {
  try {
    await dbConnect();
    await RsvpEntryModel.create({
      eventSlug,
      eventTitle,
      name: String(formData.get("name") || ""),
      email: String(formData.get("email") || ""),
      phone: String(formData.get("phone") || "") || undefined,
      guests: Number(formData.get("guests") || 1),
    });
    await EventModel.findOneAndUpdate(
      { slug: eventSlug },
      { $inc: { registered: Number(formData.get("guests") || 1) } }
    );
    revalidatePath(`/events/${eventSlug}`);
    return { ok: true };
  } catch {
    return { ok: false, error: genericError };
  }
}

export async function submitReview(
  refType: "blog" | "sermon",
  refSlug: string,
  refTitle: string,
  formData: FormData
): Promise<ActionResult> {
  try {
    const rating = Number(formData.get("rating") || 0);
    const name = String(formData.get("name") || "").trim();
    if (!name) {
      return { ok: false, error: "Please enter your name." };
    }
    if (!Number.isInteger(rating) || rating < 1 || rating > 5) {
      return { ok: false, error: "Please select a rating between 1 and 5 stars." };
    }
    await dbConnect();
    await ReviewModel.create({
      refType,
      refSlug,
      refTitle,
      name,
      email: String(formData.get("email") || "").trim() || undefined,
      rating,
      comment: String(formData.get("comment") || "").trim() || undefined,
    });
    revalidatePath(`/${refType}/${refSlug}`);
    return { ok: true };
  } catch {
    return { ok: false, error: genericError };
  }
}
