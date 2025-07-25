import { useState } from 'react';
import '../components/AddbookForm.css'; 
export default function AddBookForm() {
  const [form, setForm] = useState({
    title: '',
    author: '',
    cover: '',
    status: '',
    pageCount: '',
    lastPageRead: '',
    category: '',
  });
  const [message, setMessage] = useState('');

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch('http://localhost:5000/api/books', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include', 
        body: JSON.stringify(form),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      setMessage('Livre ajouté à la collection !');
      setForm({
        title: '',
        author: '',
        cover: '',
        status: '',
        pageCount: '',
        lastPageRead: '',
        category: '',
      });
    } catch (err) {
      setMessage(err.message || 'Erreur');
    }
  };

  return (
    <div  className="add-book-form">
      <h2>Ajouter un livre à ma collection</h2>
      <form onSubmit={handleSubmit}>
        <input
          name="title"
          placeholder="Titre"
          value={form.title}
          onChange={handleChange}
          required
        />
        <input
          name="author"
          placeholder="Auteur"
          value={form.author}
          onChange={handleChange}
          required
        />
        <input
          name="cover"
          placeholder="URL couverture"
          value={form.cover}
          onChange={handleChange}
        />
      <select
        name="status"
        value={form.status}
        onChange={handleChange}
        required
       >
        <option value="">Sélectionnez le statut</option>
        <option value="En cours">En cours</option>
        <option value="Terminé">Terminé</option>
        <option value="À lire">À lire</option>
        </select>

        <input
          name="pageCount"
          type="number"
          placeholder="Nombre de pages"
          value={form.pageCount}
          onChange={handleChange}
        />
        <input
          name="lastPageRead"
          type="number"
          placeholder="Dernière page lue"
          value={form.lastPageRead}
          onChange={handleChange}
        />
        <input
          name="category"
          placeholder="Catégorie"
          value={form.category}
          onChange={handleChange}
        />
        <button type="submit">Ajouter</button>
      </form>
      <p>{message}</p>
    </div>
  );
}
