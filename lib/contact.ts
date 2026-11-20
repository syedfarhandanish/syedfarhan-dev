/** Contact form schema — shared by the client form and the server route. */

export const projectTypes = ['Website', 'Web application', 'UI implementation', 'Collaboration', 'Something else'] as const;

export interface ContactInput {
  name: string;
  email: string;
  subject: string;
  projectType: string;
  message: string;
}

export type ContactErrors = Partial<Record<keyof ContactInput, string>>;

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function validateContact(input: Partial<Record<keyof ContactInput, unknown>>): {
  data: ContactInput;
  errors: ContactErrors;
} {
  const str = (v: unknown) => (typeof v === 'string' ? v.trim() : '');
  const data: ContactInput = {
    name: str(input.name),
    email: str(input.email),
    subject: str(input.subject),
    projectType: str(input.projectType),
    message: str(input.message),
  };
  const errors: ContactErrors = {};

  if (data.name.length < 2) errors.name = 'Please enter your name.';
  else if (data.name.length > 80) errors.name = 'Name must be under 80 characters.';

  if (!EMAIL.test(data.email)) errors.email = 'Please enter a valid email address.';
  else if (data.email.length > 120) errors.email = 'Email is too long.';

  if (data.subject.length < 3) errors.subject = 'Add a short subject (3+ characters).';
  else if (data.subject.length > 120) errors.subject = 'Subject must be under 120 characters.';

  if (data.projectType && !(projectTypes as readonly string[]).includes(data.projectType))
    errors.projectType = 'Choose one of the listed options.';

  if (data.message.length < 20) errors.message = 'Tell me a bit more — at least 20 characters.';
  else if (data.message.length > 4000) errors.message = 'Message must be under 4000 characters.';

  return { data, errors };
}
