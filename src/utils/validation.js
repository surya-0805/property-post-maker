// Validates the four required property fields.
// Returns { errors, isValid } where `errors` maps field key -> message.
export function validateFields(fields) {
  const errors = {};

  if (!fields.title || !fields.title.trim()) {
    errors.title = "Enter the property name and type.";
  }
  if (!fields.location || !fields.location.trim()) {
    errors.location = "Enter the property location.";
  }
  if (!fields.price || !fields.price.trim()) {
    errors.price = "Enter the price.";
  }
  if (!fields.highlights || !fields.highlights.trim()) {
    errors.highlights = "Enter at least one highlight.";
  }

  return { errors, isValid: Object.keys(errors).length === 0 };
}
