export default function CartModal({ cartItems, isOpen, setIsOpen }) {
    return (
      <>
        {isOpen && (
          <div className="modal-overlay" onClick={() => setIsOpen(false)}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <button className="close-button" onClick={() => setIsOpen(false)}>✖</button>
              <h2>Votre panier</h2>
  
              {cartItems.length > 0 ? (
                <ul>
                  {cartItems.map((item, index) => (
                    <li key={index}>
                      <span>{item.name}</span> - <strong>{item.price} €</strong>
                    </li>
                  ))}
                </ul>
              ) : (
                <p>Votre panier est vide.</p>
              )}
  
              <button className="checkout-button">Valider la commande</button>
            </div>
          </div>
        )}
      </>
    );
  }