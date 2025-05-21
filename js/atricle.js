document.addEventListener('DOMContentLoaded', function() {
    // Var glob
        let panier = JSON.parse(localStorage.getItem('panier')) || [];
    let likes = JSON.parse(localStorage.getItem('likes')) || {};

    // Initial
    initLikes();
  
    updateCartCount();
    setupEventListeners();

    function setupEventListeners() {
        // Boutons jaime
        document.querySelectorAll('.jaime').forEach((button, index) => {
            button.addEventListener('click', function() {
                toggleLike(index, this);
            });
        });

        // ajout
        document.querySelectorAll('.add').forEach((button, index) => {
            button.addEventListener('click', function() {
                addToCart(index, this.closest('.box-p'));
            });
        });
    }

    
    function toggleLike(productId, button) {
        if (likes[productId]) {
            // Retirer 
            delete likes[productId];
              button.innerHTML = '<i class="far fa-heart"></i>';
              
            button.classList.remove('liked');
        } else {
            // Ajt like
          
          
          
            likes[productId] = true;
            button.innerHTML = '<i class="fas fa-heart"></i>';
            button.classList.add('liked');
        }
        localStorage.setItem('likes', JSON.stringify(likes));
    }

    // Initialisation
    function initLikes() {
        document.querySelectorAll('.jaime').forEach((button, index) => {
            if (likes[index]) {
                button.innerHTML = '<i class="fas fa-heart"></i>';
                button.classList.add('liked');
            }
        });
    }

    // ajout p
    function addToCart(productId, productBox) {
        // Rec les infos du produit
        const productInfo = {
            id: productId,
            title: productBox.querySelector('.product-title').textContent,
                 price: parseFloat(productBox.querySelector('.product-price').textContent.replace(/[^\d]/g, '')),
               image: productBox.querySelector('.product-image').src,
            size: productBox.querySelector('select').value,
           
            color: productBox.querySelector('input[type="color"]').value,
            quantity: parseInt(productBox.querySelector('input[type="number"]').value) || 1
         };

        // Vérifier 
        const existingIndex = panier.findIndex(item => 
            item.id === productInfo.id && 
                item.size === productInfo.size && 
            item.color === productInfo.color
        );

        if (existingIndex >= 0) {
            panier[existingIndex].quantity += productInfo.quantity;
        } else {
            panier.push(productInfo);
        }

        // Mettre à jour le stockage 
        localStorage.setItem('panier', JSON.stringify(panier));
        updateCartCount();
        showAddFeedback(productBox.querySelector('.add'));
        console.log('Panier actuel:', panier);
        console.log('Nombre total d\'articles:', panier.reduce((total, item) => total + item.quantity, 0));
    }

   
    function showAddFeedback(button) {
        const originalText = button.textContent;
        button.textContent = 'Ajouté !';
           button.classList.add('added');

        setTimeout(() => {
            button.textContent = originalText;
            button.classList.remove('added');
        }, 2000);
    }

    // compteur  p
    function updateCartCount() {
        const totalItems = panier.reduce((total, item) => total + item.quantity, 0);
        const cartCount = document.querySelector('.cart-count');
        if (cartCount) {
            cartCount.textContent = totalItems;
        }
    }
}); /**/
// Lightbox
function createProductLightbox() {
    // lightbox
    const lightbox = document.createElement('div');
    lightbox.className = 'thaq-lightbox';
    lightbox.id = 'thaq-product-lightbox';
    
    lightbox.innerHTML = `
        <span class="thaq-close-lightbox">&times;</span>
        <div class="thaq-lightbox-content">
            <div class="thaq-lightbox-img-container">
                <img class="thaq-lightbox-img" src="" alt="Image agrandie">
            </div>
            <div class="thaq-lightbox-info"></div>
        </div>
    `;
    
    document.body.appendChild(lightbox);
    
  
    const lightboxImg = lightbox.querySelector('.thaq-lightbox-img');
      const lightboxInfo = lightbox.querySelector('.thaq-lightbox-info');
    const closeBtn = lightbox.querySelector('.thaq-close-lightbox');
    
   
    function openLightbox(productBox) {
             lightbox.style.display = 'flex';
       
             lightboxImg.src = productBox.querySelector('.product-image').src;
        lightboxInfo.innerHTML = productBox.querySelector('.product-info').innerHTML;
        document.body.style.overflow = 'hidden';
        
     
        lightboxInfo.querySelector('.product-price').style.fontSize = '1.8rem';
      
        lightboxInfo.querySelector('.add').style.width = '100%';
    }
    
    // Fonction de fermeture
    function closeLightbox() {
        lightbox.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
    
   
    closeBtn.addEventListener('click', closeLightbox);
   
   
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) closeLightbox();
    });
    
    return { openLightbox };
}

// Initialisation
document.addEventListener('DOMContentLoaded', function() {
  
               const { openLightbox } = createProductLightbox();
    
    // Ajt ev
    document.querySelectorAll('.product-image').forEach(img => {
    
    
    
        img.addEventListener('click', function() {
                 const productBox = this.closest('.box-p');
            openLightbox(productBox);
        });
    });
    
    
});
   