const rotateElement = (element: HTMLElement | null): void => {
  if (!element) return;
  element.classList.toggle('rotate');
};

export default rotateElement;
