import { categories } from './categories';

// Fonction pour déterminer les catégories en fonction de l'input utilisateur
export const getCategoriesFromInput = input => {
  const matchedCategories = [];

  // Convertir l'input utilisateur en minuscules pour la recherche
  const lowerInput = input.toLowerCase();

  // Parcourir chaque catégorie et vérifier si un mot-clé est présent dans l'input
  Object.keys(categories).forEach(category => {
    const keywords = categories[category];
    const match = keywords.some(keyword => lowerInput.includes(keyword));
    if (match) {
      matchedCategories.push(category);
    }
  });

  return matchedCategories;
};
