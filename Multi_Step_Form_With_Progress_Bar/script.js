const progress = document.getElementById('progress');
const prev = document.getElementById('prev');
const next = document.getElementById('next');
const circles = document.querySelectorAll('.circle');
const steps = document.querySelectorAll('.step');

let currentStep = 0;

// Event listener for "Next" button
next.addEventListener('click', () => {
    const currentInputs = steps[currentStep].querySelectorAll('input');
    let valid = true;

    // Check the validity of all inputs in the current step
    currentInputs.forEach((input) => {
        if (!input.checkValidity()) {
            valid = false;
            input.reportValidity(); // Show validation message for the invalid input
        }
    });

    // If all inputs are valid, proceed to the next step
    if (valid) {
        currentStep++;
        if (currentStep >= steps.length) {
            currentStep = steps.length - 1;
        }
        update();
    }
});

// Event listener for "Previous" button
prev.addEventListener('click', () => {
    currentStep--;
    if (currentStep < 0) {
        currentStep = 0;
    }
    update();
});

// Update the form steps and progress bar
function update() {
    // Update the visibility of the steps
    steps.forEach((step, index) => {
        if (index === currentStep) {
            step.classList.add('active');
        } else {
            step.classList.remove('active');
        }
    });

    // Update the progress circles
    circles.forEach((circle, index) => {
        if (index <= currentStep) {
            circle.classList.add('active');
        } else {
            circle.classList.remove('active');
        }
    });

    // Update the progress bar width
    progress.style.width = (currentStep / (circles.length - 1)) * 100 + '%';

    // Enable/disable the Previous and Next buttons
    prev.disabled = currentStep === 0;
    next.disabled = currentStep === circles.length - 1;
}
