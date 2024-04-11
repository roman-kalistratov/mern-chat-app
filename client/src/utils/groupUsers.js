export const sortUsersByName = (contacts) => {
  return contacts.sort((a, b) => a.nickname.localeCompare(b.nickname));
};

export const groupUsersByFirstLetter = (contacts) => {
  return contacts.reduce((acc, contact) => {
    const firstLetter = contact.nickname[0].toUpperCase();
    if (!acc[firstLetter]) {
      acc[firstLetter] = [];
    }
    acc[firstLetter].push(contact);
    return acc;
  }, {});
};
