function categoriesController() {
  const btnsSetCategory: NodeListOf<HTMLButtonElement> =
    document.querySelectorAll('.btn-goto-category');

  for (const btn of btnsSetCategory) {
    const category: Category = btn.dataset.category as Category;
    btn.addEventListener('click', () => {
      localStorage.setItem('category', category);
    });
  }
}
export default categoriesController;
