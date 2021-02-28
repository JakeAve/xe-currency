const rotateElement = (element: HTMLElement | null) => {
  if (!element) return;
  element.classList.toggle('rotate');
};

export default rotateElement;
