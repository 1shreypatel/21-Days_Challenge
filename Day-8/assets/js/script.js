const KEY = "notes_app_simple";

function getNotes() {
    try {
        return JSON.parse(localStorage.getItem(KEY)) || [];
    } catch {
        return [];
    }
}

function saveNotes(notes) {
    localStorage.setItem(KEY, JSON.stringify(notes));
}

function addNote() {
    let title = document.getElementById("title").value;
    let content = document.getElementById("content").value;

    if (!title && !content) return;

    let notes = getNotes();

    notes.push({
        id: Date.now(),
        title,
        content
    });

    saveNotes(notes);

    document.getElementById("title").value = "";
    document.getElementById("content").value = "";

    renderNotes();
}

function deleteNote(id) {
    let notes = getNotes().filter(n => n.id !== id);
    saveNotes(notes);
    renderNotes();
}

function clearAll() {
    if (confirm("Delete all notes?")) {
        localStorage.removeItem(KEY);
        renderNotes();
    }
}

function renderNotes() {
    let notes = getNotes();
    let search = document.getElementById("search").value.toLowerCase();

    let html = "";

    notes
        .filter(n => (n.title + n.content).toLowerCase().includes(search))
        .forEach(n => {
            html += `
        <div class="note">
          <button onclick="deleteNote(${n.id})">X</button>
          <h3>${n.title || "Untitled"}</h3>
          <p>${n.content}</p>
        </div>
      `;
        });

    document.getElementById("notes").innerHTML = html;
}

renderNotes();