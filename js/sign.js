<button type="submit" onclick="return validerFormulaire()">Entrer</button>


function validerFormulaire() {
  const email = document.getElementById('email').value;
  const mdp = document.getElementById('mot-de-passe').value;
  
  if(email && mdp) {
    window.location.href = 'articles.html';
    console
    return false; // Empêche l'envoi normal du formulaire
  }
  alert('Veuillez remplir tous les champs');
  return false;
}
