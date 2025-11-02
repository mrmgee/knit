document.addEventListener('DOMContentLoaded', (event) => {
    displayNeedles();
});

document.getElementById('needleForm').addEventListener('submit', function(e) {
    e.preventDefault();
    addNeedle();
});

function getNeedles() {
    let needles = localStorage.getItem('knittingNeedles');
    return needles ? JSON.parse(needles) : [];
}

function saveNeedles(needles) {
    localStorage.setItem('knittingNeedles', JSON.stringify(needles));
}

function addNeedle() {
    // Get values from dropdowns and inputs
    const type = document.getElementById('type').value;
    const material = document.getElementById('material').value;
    const sizesel = document.getElementById('sizesel').value;

    const length = document.getElementById('length').value;


    if (!type || !material || !sizesel || !length ) {
        alert("Please select Type, Material, Size and Length.");
        return;
    }




    const newNeedle = {
        id: Date.now(), // Unique ID
        type,
        material,
        sizesel,
        length
    };

    const needles = getNeedles();
    needles.push(newNeedle);
    saveNeedles(needles);
    displayNeedles();
    document.getElementById('needleForm').reset();
    document.getElementById('type').value = ''; // Reset select to default
    document.getElementById('material').value = ''; // Reset select to default
}

function displayNeedles() {
    const needles = getNeedles();
    const sortKey = document.getElementById('sortKey').value;

    // Sort the needles based on the selected key
    needles.sort((a, b) => {
        if (sortKey === 'sizesel') {
            return a.sizesel - b.sizesel; // Numeric sort
        } else {
            return a[sortKey].localeCompare(b[sortKey]); // Alphabetical sort
        }
    });

    const needleList = document.getElementById('needleList');
    needleList.innerHTML = ''; // Clear current list

    needles.forEach(needle => {
        const needleItem = document.createElement('div');
        needleItem.classList.add('needle-item');
        needleItem.innerHTML = `
            <span><strong>Size:</strong> ${needle.sizesel} </span>
            <span><strong>Type:</strong> ${needle.type}</span>
            <span><strong>Material:</strong> ${needle.material}</span>
            <span><strong>Length:</strong> ${needle.length}</span>
            <button class="delete-btn" onclick="deleteNeedle(${needle.id})">Delete</button>
        `;
        needleList.appendChild(needleItem);
    });
}

function deleteNeedle(id) {
    let needles = getNeedles();
    needles = needles.filter(needle => needle.id !== id);
    saveNeedles(needles);
    displayNeedles(); // Re-render the list
}