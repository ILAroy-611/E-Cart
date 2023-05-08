export const getInitialValues = (address) => {
  const initialValues = {
    name: address?.name ?? "",
    sonOf: address?.sonOf ?? "",
    mobNumber: address?.mobNumber ?? "",
    address1: address?.address1 ?? "",
    address2: address?.address2 ?? "",
    area: address?.area ?? "",
    district: address?.district ?? "",
    state: address?.state ?? "",
    pinCode: address?.pinCode ?? "",
  };
  return initialValues;
};

export const addressOption = [
  {
    label: "Full Name: ",
    type: "text",
    name: "name",
    id: "cart-address-name",
    placeholder: "Enter full name",
  },
  {
    label: "S/o: ",
    type: "text",
    name: "sonOf",
    id: "cart-address-sonOf",
    placeholder: "Son/Daughter of",
  },
  {
    label: "Contact No.: ",
    type: "text",
    name: "mobNumber",
    id: "cart-address-contact",
    placeholder: "Provide contact number",
  },
  {
    label: "Flat, House no., Building, Company, Apartment: ",
    type: "text",
    name: "address1",
    id: "cart-address-address1",
    placeholder: "Provide address",
  },
  {
    label: "Area, Street, Sector, Village: ",
    type: "text",
    name: "address2",
    id: "cart-address-address2",
    placeholder: "Provide address",
  },
  {
    label: "Landmark: ",
    type: "text",
    name: "area",
    id: "cart-address-area",
    placeholder: "Any Landmark?",
  },
  {
    label: "District: ",
    type: "text",
    name: "district",
    id: "cart-address-district",
    placeholder: "Enter district's name",
  },
  {
    label: "State: ",
    type: "text",
    name: "state",
    id: "cart-address-state",
    placeholder: "Enter your state",
  },
  {
    label: "Pincode: ",
    type: "text",
    name: "pinCode",
    id: "cart-address-pincode",
    placeholder: "Enter your pincode",
  },
];
