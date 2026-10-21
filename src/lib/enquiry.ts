export interface Enquiry {
  name: string;
  phone: string;
  pickup: string;
  destination: string;
  travelDate: string;
  returnDate?: string;
  passengers: string;
  vehicle?: string;
  ac?: string;
  notes?: string;
}

export type EnquiryErrors = Partial<Record<keyof Enquiry, string>>;

const MAX = { name: 80, phone: 20, pickup: 140, destination: 140, notes: 500, vehicle: 60, ac: 20 };

const clean = (v: unknown, max: number): string =>
  typeof v === "string" ? v.replace(/\s+/g, " ").trim().slice(0, max) : "";

/** Normalises an Indian mobile number to 10 digits, or returns "" if invalid. */
export function normaliseIndianMobile(raw: string): string {
  let d = raw.replace(/\D/g, "");
  if (d.length === 12 && d.startsWith("91")) d = d.slice(2);
  if (d.length === 11 && d.startsWith("0")) d = d.slice(1);
  return /^[6-9]\d{9}$/.test(d) ? d : "";
}

export function parseEnquiry(input: Record<string, unknown>): { data: Enquiry; errors: EnquiryErrors } {
  const data: Enquiry = {
    name: clean(input.name, MAX.name),
    phone: clean(input.phone, MAX.phone),
    pickup: clean(input.pickup, MAX.pickup),
    destination: clean(input.destination, MAX.destination),
    travelDate: clean(input.travelDate, 10),
    returnDate: clean(input.returnDate, 10),
    passengers: clean(input.passengers, 3),
    vehicle: clean(input.vehicle, MAX.vehicle),
    ac: clean(input.ac, MAX.ac),
    notes: clean(input.notes, MAX.notes),
  };
  const errors: EnquiryErrors = {};
  if (!data.name) errors.name = "Please enter your name.";
  if (!data.phone) errors.phone = "Please enter your mobile number.";
  else if (!normaliseIndianMobile(data.phone)) errors.phone = "Please enter a 10-digit Indian mobile number.";
  if (!data.pickup) errors.pickup = "Please enter a pickup point.";
  if (!data.destination) errors.destination = "Please enter a destination.";
  if (!/^\d{4}-\d{2}-\d{2}$/.test(data.travelDate)) errors.travelDate = "Please choose a travel date.";
  if (data.returnDate && !/^\d{4}-\d{2}-\d{2}$/.test(data.returnDate)) errors.returnDate = "Please choose a valid return date.";
  if (data.returnDate && data.travelDate && data.returnDate < data.travelDate) errors.returnDate = "Return date can’t be before the travel date.";
  const pax = Number(data.passengers);
  if (!Number.isInteger(pax) || pax < 1 || pax > 200) errors.passengers = "Please enter the number of passengers.";
  return { data, errors };
}

/** Plain-text summary used for the customer's WhatsApp fallback message. */
export function enquiryText(e: Partial<Enquiry>): string {
  const lines = ["Hello Ajit, I’d like a quote."];
  const add = (label: string, v?: string) => v && lines.push(`${label}: ${v}`);
  add("Name", e.name);
  add("Phone", e.phone);
  add("Pickup", e.pickup);
  add("Destination", e.destination);
  add("Travel date", e.travelDate);
  add("Return date", e.returnDate);
  add("Passengers", e.passengers);
  add("Vehicle", e.vehicle);
  add("AC", e.ac);
  add("Notes", e.notes);
  return lines.join("\n");
}
