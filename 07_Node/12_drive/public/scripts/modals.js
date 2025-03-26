document.addEventListener('DOMContentLoaded', function() {
    const newFolder = document.getElementById('createFolder');
    const closeFolder = document.getElementById("closeFolderModal");
    const folderModal = document.getElementById("folderModal");

    newFolder.addEventListener("click", () => {
        folderModal.classList.add("active");
    })
    closeFolder.addEventListener("click", () => {
        folderModal.classList.remove("active");
    })
    // Close modals when clicking outside modal content
    folderModal.addEventListener("click", (event) => {
        if (event.target === folderModal) {
            folderModal.classList.remove("active");
        }
    });

    const newFile = document.getElementById('uploadFile');
    const closeFile = document.getElementById("closeFileModal");
    const fileModal = document.getElementById("fileModal");

    newFile.addEventListener("click", () => {
        fileModal.classList.add("active");
    })
    closeFile.addEventListener("click", () => {
        fileModal.classList.remove("active");
    })
    fileModal.addEventListener("click", (event) => {
        if (event.target === fileModal) {
            fileModal.classList.remove("active");
        }
    });

    const deleteItems = document.querySelectorAll('.deleteItem');
    const closeDelete = document.getElementById("closeDeleteModal");
    const deleteModal = document.getElementById("deleteModal");
    const cancelDelete = document.querySelector('.cancelDelete');

    deleteItems.forEach((btn)=>{
        btn.addEventListener('click',()=>{
            const delUrl = btn.dataset.href;
            deleteModal.classList.add("active");
            const delForm = deleteModal.querySelector('.modalForm');
            delForm.action = delUrl;
        })
    })
    cancelDelete.addEventListener("click", (e) => {
        e.preventDefault();
        deleteModal.classList.remove("active");
        const delForm = deleteModal.querySelector('.modalForm');
        delForm.action = "#";
    })
    closeDelete.addEventListener("click", () => {
        deleteModal.classList.remove("active");
        const delForm = deleteModal.querySelector('.modalForm');
        delForm.action = "#";
    })
    deleteModal.addEventListener("click", (event) => {
        if (event.target === deleteModal) {
            deleteModal.classList.remove("active");
            const delForm = deleteModal.querySelector('.modalForm');
            delForm.action = "#";
        }
    });

    const modalForms = document.querySelectorAll('.modalForm');
    modalForms.forEach((subForm)=>{
        subForm.addEventListener('submit',()=>{
            const submitButton = subForm.querySelector("button[type='submit']");
            submitButton.disabled = true;
            submitButton.innerText = "Processing...";
        })
    })
});