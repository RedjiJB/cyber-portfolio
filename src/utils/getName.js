import Resume from "../settings/resume.json";

const names = Resume.basics.name.split(" ");

export const FirstName = names[0];

// Get all parts of the name except the first one and join them
export const LastName = names.slice(1).join(" ");

// Use first letter of first name and first letter of last name (Baptiste)
export const Initials = FirstName.charAt(0)
    .toUpperCase()
    .concat(names[names.length - 1].charAt(0).toUpperCase());
