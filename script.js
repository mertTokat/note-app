const addNote = document.querySelector("#add-note");
const notepad = document.querySelector("#notepad");
let noteContent = [null];

// if there are already existing notes load them to the page
window.addEventListener("load", () => {
    const currentSize = window.localStorage.getItem("notesSize");
    if(currentSize != null) {
        const noteContainer = document.querySelector(".note-container");
        for(let i = 1; i <= currentSize; ++i){
            // create a div element and add a textarea element inside it
            // then append the div onto noteContainer
            
            let note = document.createElement("div");
            let noteText = document.createElement("textarea");
            noteText.value = window.localStorage.getItem("note" + i);
            note.appendChild(noteText);
            document.querySelector(".note-container").appendChild(note);

            // make notes editable
            noteText.id = "note" + i;
            noteText.addEventListener("input", (noteText) => {
                window.localStorage.setItem("note" + i, document.querySelector("#note" + i).value);
            });

            // append a delete button
            const deleteButton = document.createElement("button");
            deleteButton.id = "delete" + i;
            deleteButton.innerHTML = "Delete";
            note.appendChild(deleteButton);

            // add delete event for the button
            deleteButton.addEventListener("click", () => {
                removeEvent(i)
            });            

        }
    }
});

// calculate the note size everytime the mouse is down
addNote.addEventListener("mousedown", () => {
    
    noteContent[0] = notepad.value;
    
    
});


// add an event to create new notes when clicked on addNote
addNote.addEventListener("mouseup", () => {

        // add it on to the notes array
    if(window.localStorage.getItem("notesSize") == null){
        window.localStorage.setItem("notesSize", 1);
        window.localStorage.setItem("note1", noteContent[0]);

        // create the necessary elements and add it onto the array
        const newDiv = document.createElement("div");
        const newText = document.createElement("textarea");
        newDiv.appendChild(newText);
        newText.value = noteContent[0];
        document.querySelector(".note-container").appendChild(newDiv);
        newText.id = "note1";
        // we need a listener for input events so that the content of 
        // textarea elements change accordingly
        newText.addEventListener("input", () => {
            window.localStorage.setItem("note1", document.querySelector("#note1").value);
        });

        // create delete button
        const deleteButton = document.createElement("button");
        deleteButton.id = "delete1";
        deleteButton.innerHTML = "Delete";
        newDiv.appendChild(deleteButton);
        deleteButton.addEventListener("click", () => {
            removeEvent(window.localStorage.getItem("notesSize"))
        });
        
    }
    else {
        const currentSize = parseInt(window.localStorage.getItem("notesSize")) + 1;
        window.localStorage.setItem("notesSize", currentSize);
        window.localStorage.setItem("note" + currentSize, notepad.value);


        const newDiv = document.createElement("div");
        const newText = document.createElement("textarea");
        newDiv.appendChild(newText);
        newText.value = noteContent[0];
        document.querySelector(".note-container").appendChild(newDiv);
        newText.id = "note" + currentSize;

        // the listener is for the textarea element to be editable
        newText.addEventListener("input", () => {
            window.localStorage.setItem(newText.id, newText.value);
        });

        //  add delete button
        const deleteButton = document.createElement("button");
        deleteButton.id = "delete" + currentSize;
        deleteButton.innerHTML = "Delete";
        newDiv.appendChild(deleteButton);
        deleteButton.addEventListener("click", () => {
            removeEvent(window.localStorage.getItem("notesSize"))
        });
    }
    
});

//const noteArray = Array.from(document.querySelectorAll(".note-container textarea"));

/**
 * 
 * @param {number} currentNote Number of current note
 * @param {number} window.localStorage.getItem("notesSize") Count of all notes
 */

function removeEvent(currentNote) {
// do not forget to change the id of the notes and the value properties
    if(parseInt(currentNote) != parseInt(window.localStorage.getItem("notesSize"))){
        
        for(let i = currentNote; i < window.localStorage.getItem("notesSize"); ++i) {
            
            // replace the ith note's with the i+1th note
            const newNote = window.localStorage.getItem("note" + (i + 1));
            window.localStorage.setItem("note" + i, newNote);
            

            // shift the ids downwards
            const ithNote = document.querySelectorAll(".note-container textarea")[i - 1];
            const afterIthNote = document.querySelectorAll(".note-container textarea")[i];
            alert(afterIthNote);
            ithNote.id = afterIthNote.id;
            
            // replace ith note's value with i+1th note's
            ithNote.value = afterIthNote.value;
            
        }
    }
    // delete the last note
    const lastDiv = document.querySelectorAll(".note-container div")[window.localStorage.getItem("notesSize") - 1];
    const noteContainer = document.querySelector(".note-container");
    window.localStorage.removeItem("note" + window.localStorage.getItem("notesSize"))
    noteContainer.removeChild(lastDiv);

    // reduce notesSize by one
    const newSize = window.localStorage.getItem("notesSize") - 1
    window.localStorage.setItem("notesSize", newSize);
    
    
}