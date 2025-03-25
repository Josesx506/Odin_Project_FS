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
    // Close modals when clicking outside modal content
    fileModal.addEventListener("click", (event) => {
        if (event.target === fileModal) {
            fileModal.classList.remove("active");
        }
    });
});