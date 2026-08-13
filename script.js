/* ===========================
   STUDY PLANNER - JAVASCRIPT
   =========================== */

// Load plans from browser storage when page loads
document.addEventListener('DOMContentLoaded', loadPlans);

/* ===========================
   CREATE PLAN FUNCTION
   Handles form submission and creates new study plan
   =========================== */
function createPlan(event) {
    event.preventDefault(); // Prevent page reload

    // Get form values
    const planName = document.getElementById('plan-name').value;
    const weeksInput = document.getElementById('weeks').value;
    
    // Get selected subjects
    const subjectCheckboxes = document.querySelectorAll('input[name="subjects"]:checked');
    const subjects = Array.from(subjectCheckboxes).map(cb => cb.value);

    // Validate that at least one subject is selected
    if (subjects.length === 0) {
        alert('Please select at least one subject!');
        return;
    }

    // Create plan object
    const plan = {
        id: Date.now(), // Unique ID using timestamp
        name: planName,
        weeks: parseInt(weeksInput),
        subjects: subjects,
        createdDate: new Date().toLocaleDateString(),
        progress: 0 // Progress percentage (0-100)
    };

    // Save plan to browser storage
    savePlan(plan);

    // Clear form
    document.querySelector('.plan-form').reset();

    // Show success message
    alert('✅ Study plan created successfully!');

    // Reload plans display
    loadPlans();

    // Scroll to my plans section
    scrollToSection('my-plans');
}

/* ===========================
   SAVE PLAN TO LOCAL STORAGE
   Stores plan data in browser so it persists
   =========================== */
function savePlan(plan) {
    // Get existing plans from storage
    let plans = localStorage.getItem('studyPlans');
    plans = plans ? JSON.parse(plans) : [];

    // Add new plan
    plans.push(plan);

    // Save back to storage
    localStorage.setItem('studyPlans', JSON.stringify(plans));
}

/* ===========================
   LOAD AND DISPLAY ALL PLANS
   Retrieves plans from storage and shows them
   =========================== */
function loadPlans() {
    // Get plans from storage
    let plans = localStorage.getItem('studyPlans');
    plans = plans ? JSON.parse(plans) : [];

    // Get the container where plans will be displayed
    const plansList = document.getElementById('plans-list');
    plansList.innerHTML = ''; // Clear previous content

    // If no plans exist, show empty message
    if (plans.length === 0) {
        plansList.innerHTML = '<p class="empty-message">No plans yet. Create your first plan above! ⬆️</p>';
        return;
    }

    // Create card for each plan
    plans.forEach(plan => {
        const planCard = createPlanCard(plan);
        plansList.appendChild(planCard);
    });
}

/* ===========================
   CREATE PLAN CARD ELEMENT
   Builds HTML for a single plan card
   =========================== */
function createPlanCard(plan) {
    // Create main card container
    const card = document.createElement('div');
    card.className = 'plan-card';

    // Format subjects as tags
    const subjectTags = plan.subjects
        .map(subject => `<span class="subject-tag">${subject}</span>`)
        .join('');

    // Build card HTML
    card.innerHTML = `
        <h3>${plan.name}</h3>
        <div class="plan-info">
            <strong>📅 Created:</strong> ${plan.createdDate}<br>
            <strong>⏱️ Duration:</strong> ${plan.weeks} weeks
        </div>
        <div class="plan-subjects">
            <strong>📚 Subjects:</strong><br>
            ${subjectTags}
        </div>
        <div>
            <strong>Progress:</strong>
            <div class="progress-bar">
                <div class="progress-fill" style="width: ${plan.progress}%"></div>
            </div>
            <span>${plan.progress}% Complete</span>
        </div>
        <div class="plan-buttons">
            <button class="btn btn-small btn-edit" onclick="editPlan(${plan.id})">✏️ Edit</button>
            <button class="btn btn-small btn-delete" onclick="deletePlan(${plan.id})">🗑️ Delete</button>
        </div>
    `;

    return card;
}

/* ===========================
   EDIT PLAN FUNCTION
   Updates an existing study plan
   =========================== */
function editPlan(planId) {
    // Get all plans from storage
    let plans = JSON.parse(localStorage.getItem('studyPlans'));
    
    // Find the plan to edit
    const plan = plans.find(p => p.id === planId);

    if (!plan) {
        alert('Plan not found!');
        return;
    }

    // Get new progress value from user
    const newProgress = prompt(
        `Update progress for "${plan.name}":\n(Enter a number 0-100)`,
        plan.progress
    );

    // If user cancelled, return
    if (newProgress === null) return;

    // Validate input
    const progressNum = parseInt(newProgress);
    if (isNaN(progressNum) || progressNum < 0 || progressNum > 100) {
        alert('Please enter a number between 0 and 100!');
        return;
    }

    // Update plan
    plan.progress = progressNum;

    // Save updated plans
    localStorage.setItem('studyPlans', JSON.stringify(plans));

    // Reload display
    loadPlans();
    alert('✅ Plan updated!');
}

/* ===========================
   DELETE PLAN FUNCTION
   Removes a study plan from storage
   =========================== */
function deletePlan(planId) {
    // Confirm deletion
    if (!confirm('Are you sure you want to delete this plan?')) {
        return;
    }

    // Get all plans from storage
    let plans = JSON.parse(localStorage.getItem('studyPlans'));

    // Remove the plan with matching ID
    plans = plans.filter(p => p.id !== planId);

    // Save updated plans
    localStorage.setItem('studyPlans', JSON.stringify(plans));

    // Reload display
    loadPlans();
    alert('✅ Plan deleted!');
}

/* ===========================
   SCROLL TO SECTION FUNCTION
   Smoothly scrolls to a specific section
   =========================== */
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
    }
}
