const fileInput = document.querySelector("#file-input");
const selectFilesButton = document.querySelector("#select-files");
const dropZone = document.querySelector("#drop-zone");
const previewGrid = document.querySelector("#preview-grid");
const fileCount = document.querySelector("#file-count");
const clearFilesButton = document.querySelector("#clear-files");
const convertButton = document.querySelector("#convert-button");
const statusMessage = document.querySelector("#status-message");

let selectedImages = [];

const formatBytes = (bytes) => {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
};

const readImage = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve({
      id: crypto.randomUUID(),
      file,
      name: file.name,
      size: file.size,
      dataUrl: reader.result,
    });
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });

const loadElement = (src) =>
  new Promise((resolve, reject) => {
    const image = new Image();
    image.onload = () => resolve(image);
    image.onerror = reject;
    image.src = src;
  });

const updateState = () => {
  const count = selectedImages.length;
  fileCount.textContent = count === 0 ? "No images selected" : `${count} image${count === 1 ? "" : "s"} ready`;
  convertButton.disabled = count === 0;
  clearFilesButton.disabled = count === 0;
};

const moveImage = (index, direction) => {
  const nextIndex = index + direction;
  if (nextIndex < 0 || nextIndex >= selectedImages.length) return;
  const [image] = selectedImages.splice(index, 1);
  selectedImages.splice(nextIndex, 0, image);
  renderPreviews();
};

const removeImage = (id) => {
  selectedImages = selectedImages.filter((image) => image.id !== id);
  renderPreviews();
};

const renderPreviews = () => {
  previewGrid.innerHTML = "";

  selectedImages.forEach((image, index) => {
    const card = document.createElement("article");
    card.className = "preview-card";

    const thumbnail = document.createElement("img");
    thumbnail.src = image.dataUrl;
    thumbnail.alt = `${image.name} preview`;

    const details = document.createElement("div");
    const name = document.createElement("span");
    name.className = "file-name";
    name.textContent = image.name;
    const size = document.createElement("span");
    size.className = "file-size";
    size.textContent = `Page ${index + 1} · ${formatBytes(image.size)}`;
    details.append(name, size);

    const actions = document.createElement("div");
    actions.className = "card-actions";

    const upButton = document.createElement("button");
    upButton.className = "icon-button";
    upButton.type = "button";
    upButton.textContent = "↑";
    upButton.title = "Move image up";
    upButton.disabled = index === 0;
    upButton.addEventListener("click", () => moveImage(index, -1));

    const downButton = document.createElement("button");
    downButton.className = "icon-button";
    downButton.type = "button";
    downButton.textContent = "↓";
    downButton.title = "Move image down";
    downButton.disabled = index === selectedImages.length - 1;
    downButton.addEventListener("click", () => moveImage(index, 1));

    const removeButton = document.createElement("button");
    removeButton.className = "icon-button";
    removeButton.type = "button";
    removeButton.textContent = "×";
    removeButton.title = "Remove image";
    removeButton.addEventListener("click", () => removeImage(image.id));

    actions.append(upButton, downButton, removeButton);
    card.append(thumbnail, details, actions);
    previewGrid.append(card);
  });

  statusMessage.textContent = "";
  statusMessage.className = "";
  updateState();
};

const addFiles = async (files) => {
  const jpgFiles = Array.from(files).filter((file) => /image\/jpe?g/i.test(file.type));

  if (!jpgFiles.length) {
    statusMessage.textContent = "Please choose JPG or JPEG images only.";
    statusMessage.className = "";
    return;
  }

  statusMessage.textContent = "Loading images...";
  const images = await Promise.all(jpgFiles.map(readImage));
  selectedImages = [...selectedImages, ...images];
  renderPreviews();
};

const convertToPdf = async () => {
  if (!selectedImages.length || !window.jspdf) return;

  convertButton.disabled = true;
  statusMessage.textContent = "Creating your PDF...";
  statusMessage.className = "";

  try {
    const { jsPDF } = window.jspdf;
    const pdf = new jsPDF({ unit: "pt", format: "a4", orientation: "portrait" });
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
    const margin = 28;
    const maxWidth = pageWidth - margin * 2;
    const maxHeight = pageHeight - margin * 2;

    for (let index = 0; index < selectedImages.length; index += 1) {
      if (index > 0) pdf.addPage();
      const image = await loadElement(selectedImages[index].dataUrl);
      const ratio = Math.min(maxWidth / image.naturalWidth, maxHeight / image.naturalHeight);
      const width = image.naturalWidth * ratio;
      const height = image.naturalHeight * ratio;
      const x = (pageWidth - width) / 2;
      const y = (pageHeight - height) / 2;
      pdf.addImage(selectedImages[index].dataUrl, "JPEG", x, y, width, height);
    }

    pdf.save("jpg-to-pdf-converter.pdf");
    statusMessage.textContent = "PDF downloaded successfully.";
    statusMessage.className = "success";
  } catch (error) {
    statusMessage.textContent = "Something went wrong while creating the PDF. Please try again.";
    statusMessage.className = "";
  } finally {
    updateState();
  }
};

selectFilesButton.addEventListener("click", () => fileInput.click());
fileInput.addEventListener("change", (event) => addFiles(event.target.files));
clearFilesButton.addEventListener("click", () => {
  selectedImages = [];
  fileInput.value = "";
  renderPreviews();
});
convertButton.addEventListener("click", convertToPdf);

["dragenter", "dragover"].forEach((eventName) => {
  dropZone.addEventListener(eventName, (event) => {
    event.preventDefault();
    dropZone.classList.add("drag-over");
  });
});

["dragleave", "drop"].forEach((eventName) => {
  dropZone.addEventListener(eventName, (event) => {
    event.preventDefault();
    dropZone.classList.remove("drag-over");
  });
});

dropZone.addEventListener("drop", (event) => addFiles(event.dataTransfer.files));
updateState();
