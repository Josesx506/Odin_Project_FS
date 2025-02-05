import { redirect } from "react-router-dom";
import { deleteContact } from "../contacts";

export async function action({ params }) {
  // throw new Error("oh dang!"); // simulate error
  await deleteContact(params.contactId);
  return redirect("/");
}
