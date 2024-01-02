const fetchEmailRes: EmailRes = await fetchEmail.json();

const userEmail = () => {
  let primaryVerified = fetchEmailRes.find(
    (email) => email.verified && email.primary
  );
  let verified = fetchEmailRes.find((email) => email.verified);
  let primary = fetchEmailRes.find((email) => email.primary);

  if (primaryVerified) {
    return primaryVerified.email;
  } else if (verified) {
    return verified.email;
  } else if (primary) {
    return primary.email;
  } else {
    return fetchEmailRes[0].email;
  }
};
