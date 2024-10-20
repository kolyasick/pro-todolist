export function validateEmail(
  email: string,
  errors: { email: string | null }
): boolean {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email) {
    errors.email = "Email is required";
    return false;
  }
  if (!emailPattern.test(email)) {
    errors.email = "Invalid email address";
    return false;
  }
  return true;
}

export function validatePassword(
  password: string,
  errors: { password: string | null }
): boolean {
  if (!password || password.length < 6 || password.length > 15) {
    errors.password = "Password must be 6-15 characters";
    return false;
  }
  return true;
}

export function validateName(
  name: string,
  errors: { name: string | null }
): boolean {
  const namePattern = /^[a-zA-Z\s-]+$/;
  if (!name || name.length < 3) {
    errors.name = "Name must be at least 3 characters";
    return false;
  }
  if (!namePattern.test(name)) {
    errors.name = "Name can only contain latins letters, spaces, and hyphens";
    return false;
  }
  return true;
}