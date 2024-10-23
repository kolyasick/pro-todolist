export function validateEmail(email: string): null | string {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email) {
    return "Email is required";
  }
  if (!emailPattern.test(email)) {
    return "Invalid email address";
  }
  return null;
}

export function validatePassword(password: string): null | string {
  if (!password || password.length < 6 || password.length > 15) {
    return "Password must be 6-15 characters";
  }
  return null;
}

export function validateName(name: string): null | string {
  const namePattern = /^[a-zA-Z\s-]+$/;
  if (!name || name.length < 3) {
    return "Name must be at least 3 characters";
  }
  if (!namePattern.test(name)) {
    return "Name can only contain latins letters, spaces, and hyphens";
  }
  return null;
}
