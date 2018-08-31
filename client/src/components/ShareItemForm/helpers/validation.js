export default function validate(values) {
  const errors = {}
  if (!values.description) {
    errors.description = 'Required'
  }
  if (!values.title) {
    errors.title = 'Required'
  }
  if (!values.tags || values.tags.length === 0) {
    errors.tags = 'Select at least one tag'
  }
  return errors
}
