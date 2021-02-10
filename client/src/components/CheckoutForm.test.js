import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import CheckoutForm from "./CheckoutForm";

// Write up the two tests here and make sure they are testing what the title shows

test("form header renders", async () => {
  render(<CheckoutForm />);

  const header = await screen.findByText(/Checkout Form/i);
  expect(header).toBeTruthy();
});

test("form shows success message on submit with form details", async () => {
  const firstNameInput = screen.getByLabelText(/First Name:/i);
  const lastNameInput = screen.getByLabelText(/Last Name/i);
  const addressInput = screen.getByLabelText(/Address/i);
  const cityInput = screen.getByLabelText(/City/i);
  const stateInput = screen.getByLabelText(/State/i);
  const zipInput = screen.getByLabelText(/Zip/i);

  fireEvent.handleChanges(firstNameInput, {
    target: { value: "Afton", name: "firstName" },
  });
  fireEvent.handleChanges(lastNameInput, {
    target: { value: "Slone", name: "lastName" },
  });
  fireEvent.handleChanges(addressInput, {
    target: { value: `24 Left Beaver Creek RD`, name: "address" },
  });
  fireEvent.handleChanges(cityInput, {
    target: { value: "Minnie", name: "city" },
  });
  fireEvent.handleChanges(stateInput, {
    target: { value: "KY", name: "state" },
  });
  fireEvent.handleChanges(zipInput, {
    target: { value: "41651", name: "zip" },
  });

  const button = screen.getByRole("button");
  fireEvent.click(button);

  const successMessage = await screen.findByText(
    /`You have ordered some plants! Woo-hoo!`/i
  );
  expect(successMessage).toBeTruthy();
});
