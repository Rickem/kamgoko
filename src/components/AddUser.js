import { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { AiOutlinePlus } from "react-icons/ai";

function AddUser({ onUserAdded }) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const URL = `https://gorest.co.in/public/v1/users`;
  
  const addUser = async (e) => {
    e.preventDefault();

    const random = Math.floor(Math.random() * 1000);

    const response = await fetch(URL, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer 3ac10207a51d996b72407ca15b6a3ca5081c825687b673519f77153763daaec7`
      },

      // MOVE ACCESS TOKEN TO .env FILE


      body: JSON.stringify({
        "id": random,
        "name": name,
        "email": email,
        'gender': 'male',
        "status": 'active',
      })
    });
    const result = await response.json();
    console.log(result);

    onUserAdded();

    handleClose();
  }

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        <AiOutlinePlus />Ajouter utilisateur
      </Button>


      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Ajouter un utilisateur</Modal.Title>
        </Modal.Header>
        <form onSubmit={addUser}>
          <Modal.Body>
              <div className="form-group">
                <label htmlFor="name">Nom</label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Annuler
            </Button>
            <Button variant="primary" type="submit">
              Ajouter
            </Button>
          </Modal.Footer>
        </form>
      </Modal>
    </>
  );
}

export default AddUser
