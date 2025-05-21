document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Réinitialiser les erreurs
    document.querySelectorAll('.error').forEach(el => el.style.display = 'none');
    
    // Valider les champs
    let isValid = true;


    const name = document.getElementById('name');
       const email = document.getElementById('email');
          const subject = document.getElementById('subject');
    const message = document.getElementById('message');
    
    if (!name.value.trim()) 
        {

        document.getElementById('nameError').style.display = 'block';
        isValid = false;
    }
    
    if (!email.value.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value))
        
        
        {
        document.getElementById('emailError').style.display = 'block';
        isValid = false;
    }
    
    if (!subject.value) {
       
       
        document.getElementById('subjectError').style.display = 'block';
        isValid = false;}
    
    if (!message.value.trim())
         {
            document.getElementById('messageError').style.display = 'block';
        isValid = false;
    }
    
    if (isValid)
         {
        
        // envoi reussi
        
       
        document.getElementById('successMessage').style.display = 'block';
        
        // Reinitialiserf
          this.reset();
        
        // Cacher le message après 5 secondes
             
        setTimeout(() => {
          
            document.getElementById('successMessage').style.display = 'none';
        }, 5000);
    }
});