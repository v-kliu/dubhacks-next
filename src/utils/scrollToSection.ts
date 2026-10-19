// Scroll the home page to a section by id. `html` has `scroll-behavior: smooth`, so an
// instant jump (used for deep links like /#apply) has to override it for the one call.
export const scrollToSection = (id: string, behavior: 'smooth' | 'instant' = 'smooth'): boolean => {
  const element = document.getElementById(id);
  if (!element) return false;

  if (behavior === 'instant') {
    const root = document.documentElement;
    const previous = root.style.scrollBehavior;
    root.style.scrollBehavior = 'auto';
    element.scrollIntoView({ block: 'start' });
    root.style.scrollBehavior = previous;
  } else {
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
  return true;
};
