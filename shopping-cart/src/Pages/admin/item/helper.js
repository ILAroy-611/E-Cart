
export const inputOption = [
  {
    type: "text",
    name: "name",
    id: "cart-add-item-name",
    placeholder: "Name of item",
  },
  {
    type: "text",
    name: "discription",
    id: "cart-add-item-discription",
    placeholder: "Discription of item",
  },
  {
    type: "text",
    name: "category",
    id: "cart-add-item-category",
    placeholder: "Category of item",
  },
  {
    type: "text",
    name: "subCatogery",
    id: "cart-add-item-subCatogery",
    placeholder: "Sub-category of item",
  },
  {
    type: "text",
    name: "brand",
    id: "cart-add-item-brand",
    placeholder: "Brand of item",
  },
  {
    type: "number",
    name: "price",
    id: "cart-add-item-price",
    placeholder: "Price of item",
  },
  {
    type: "number",
    name: "discount",
    id: "cart-add-item-discount",
    placeholder: "Discount on price",
  },
  {
    type: "number",
    name: "quantity",
    id: "cart-add-item-quantity",
    placeholder: "Quantity of item",
  },
  {
    type: "text",
    name: "seller",
    id: "cart-add-item-seller",
    placeholder: "Seller of item",
  },
  {
    type: "text",
    name: "image",
    id: "cart-add-item-imageURL",
    placeholder: "Image URL of item",
  },
  {
    type: "text",
    name: "stars",
    id: "cart-add-item-stars",
    placeholder: "Stars of item",
  },
  {
    type: "text",
    name: "size",
    id: "cart-add-item-size",
    placeholder: "Size of item",
  },
  
];

export const varientOptions=[{
    type: "text",
    name: "genere",
    id: "cart-add-item-genere",
    placeholder: "Genere of item",
  },
  {
    type: "text",
    name: "ageGroup",
    id: "cart-add-item-ageGroup",
    placeholder: "Item is suitable for which age group?",
  },
  {
    type: "text",
    name: "weight",
    id: "cart-add-item-weight",
    placeholder: "Weight of item",
  },
  {
    type: "text",
    name: "color",
    id: "cart-add-item-color",
    placeholder: "Color of item",
  },
]

export const genderOptions=["Male", "Female", "All"]

export const getInitialValues=(item)=>{
  // console.log("item", item)
  const initialValues = {
    category: item?.category ?? "" ,
    subCatogery: item?.subCatogery ?? "" ,
    name: item?.name ?? "" ,
    discription:item?.discription ?? "",
    image: item?.image ?? "" ,
    price: item?.price ?? "" ,
    brand: item?.brand ?? "" ,
    stars: item?.stars ?? "" ,
    seller: item?.seller ?? "" ,
    quantity: item?.quantity ?? "" ,
    soldCount: item?.soldCount ?? "" ,
    discount: item?.discount ?? "" ,
    size: item?.size ?? "" ,
    gender: item?.varient?.gender ?? "" ,
    ageGroup: item?.varient?.ageGroup ?? "" ,
    genere: item?.varient?.genere ?? "" ,
    weight: item?.varient?.weight ?? 0,
    color: item?.varient?.color ?? "" ,
  };
  return initialValues
}
