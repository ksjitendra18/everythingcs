function slugify(inputString: string) {
  // let urlCompatibleString = inputString
  //   .toLowerCase()
  //   .replace(/ /g, "-")
  //   .replace(/[^\w-]/g, "");

  let urlCompatibleString = inputString
    .toLowerCase()
    .replace(/ /g, "-")
    .replace(/\./g, "")
    .replace(/[^\w-]/g, "");

  urlCompatibleString = encodeURIComponent(urlCompatibleString);

  return urlCompatibleString;
}

export default slugify;
