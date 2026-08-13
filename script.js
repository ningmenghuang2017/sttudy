/* ===========================
   STUDY PLANNER - JAVASCRIPT
   =========================== */

// Load plans from browser storage when page loads
document.addEventListener('DOMContentLoaded', loadPlans);

// Global variable to store the plan being edited
let currentEditPlan = null;
let currentEditSubject = null;

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

    // Create schedule object with empty topics for each week and subject
    const schedule = {};
    subjects.forEach(subject => {
        schedule[subject] = {};
        for (let week = 1; week <= parseInt(weeksInput); week++) {
            schedule[subject][`Week ${week}`] = {
                topic: '',
                status: 'Not Started' // Not Started, In Progress, Completed
            };
        }
    });

    // Create plan object
    const plan = {
        id: Date.now(), // Unique ID using timestamp
        name: planName,
        weeks: parseInt(weeksInput),
        subjects: subjects,
        createdDate: new Date().toLocaleDateString(),
        progress: 0, // Progress percentage (0-100)
        schedule: schedule // Add schedule data
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
            <button class="btn btn-small btn-edit" onclick="editPlanSchedule(${plan.id})">📊 Schedule</button>
            <button class="btn btn-small btn-delete" onclick="deletePlan(${plan.id})">🗑️ Delete</button>
        </div>
    `;

    return card;
}

/* ===========================
   OPEN SCHEDULE EDITOR
   Opens modal with Excel-like spreadsheet
   =========================== */
function editPlanSchedule(planId) {
    // Get all plans from storage
    let plans = JSON.parse(localStorage.getItem('studyPlans'));
    
    // Find the plan to edit
    const plan = plans.find(p => p.id === planId);

    if (!plan) {
        alert('Plan not found!');
        return;
    }

    // Initialize schedule if it doesn't exist (for old plans)
    if (!plan.schedule) {
        plan.schedule = {};
        plan.subjects.forEach(subject => {
            plan.schedule[subject] = {};
            for (let week = 1; week <= plan.weeks; week++) {
                plan.schedule[subject][`Week ${week}`] = {
                    topic: '',
                    status: 'Not Started'
                };
            }
        });
        localStorage.setItem('studyPlans', JSON.stringify(plans));
    }

    // Store current plan being edited
    currentEditPlan = plan;
    currentEditSubject = plan.subjects[0]; // Start with first subject

    // Update modal title
    document.getElementById('schedule-title').textContent = `Edit Schedule: ${plan.name}`;

    // Create subject tabs
    createSubjectTabs(plan.subjects);

    // Show spreadsheet for first subject
    showExcelSpreadsheet(plan.subjects[0]);

    // Show modal
    document.getElementById('schedule-modal').style.display = 'block';
}

/* ===========================
   CREATE SUBJECT TABS
   Creates tab buttons for each subject
   =========================== */
function createSubjectTabs(subjects) {
    const tabsContainer = document.getElementById('subject-tabs');
    tabsContainer.innerHTML = '';

    subjects.forEach((subject, index) => {
        const tab = document.createElement('button');
        tab.type = 'button';
        tab.className = 'subject-tab' + (index === 0 ? ' active' : '');
        tab.textContent = subject;
        tab.onclick = () => switchTab(subject);
        tabsContainer.appendChild(tab);
    });
}

/* ===========================
   SWITCH TAB
   Switches between subject tabs and displays that spreadsheet
   =========================== */
function switchTab(subject) {
    currentEditSubject = subject;

    // Update active tab styling
    const tabs = document.querySelectorAll('.subject-tab');
    tabs.forEach(tab => {
        if (tab.textContent === subject) {
            tab.classList.add('active');
        } else {
            tab.classList.remove('active');
        }
    });

    // Show spreadsheet for selected subject
    showExcelSpreadsheet(subject);
}

/* ===========================
   SHOW EXCEL SPREADSHEET
   Creates Excel-style spreadsheet grid
   =========================== */
function showExcelSpreadsheet(subject) {
    const schedule = currentEditPlan.schedule[subject];
    const container = document.getElementById('schedule-container');
    
    // Create wrapper with scroll container
    container.innerHTML = '<div class="excel-wrapper"></div>';
    const wrapper = container.querySelector('.excel-wrapper');
    
    // Create table
    const table = document.createElement('table');
    table.className = 'excel-spreadsheet';
    
    // Create header row
    const headerRow = document.createElement('tr');
    headerRow.className = 'header-row';
    
    // Header cells
    const headers = ['Week', 'Topic/Activity', 'Status'];
    headers.forEach((header, index) => {
        const th = document.createElement('th');
        th.textContent = header;
        th.className = 'excel-header';
        if (index === 0) th.style.width = '15%';
        else if (index === 1) th.style.width = '55%';
        else th.style.width = '30%';
        headerRow.appendChild(th);
    });
    table.appendChild(headerRow);
    
    // Create data rows
    const tbody = document.createElement('tbody');
    for (let week = 1; week <= currentEditPlan.weeks; week++) {
        const weekKey = `Week ${week}`;
        const weekData = schedule[weekKey];
        
        const row = document.createElement('tr');
        row.className = 'excel-row';
        
        // Week cell
        const weekCell = document.createElement('td');
        weekCell.className = 'excel-cell week-header';
        weekCell.textContent = weekKey;
        row.appendChild(weekCell);
        
        // Topic cell
        const topicCell = document.createElement('td');
        topicCell.className = 'excel-cell';
        const topicInput = document.createElement('input');
        topicInput.type = 'text';
        topicInput.className = 'excel-input';
        topicInput.value = weekData.topic;
        topicInput.placeholder = 'Enter topic or activity';
        topicInput.dataset.subject = subject;
        topicInput.dataset.week = weekKey;
        topicInput.addEventListener('change', updateScheduleData);
        topicCell.appendChild(topicInput);
        row.appendChild(topicCell);
        
        // Status cell
        const statusCell = document.createElement('td');
        statusCell.className = 'excel-cell';
        const statusSelect = document.createElement('select');
        statusSelect.className = 'excel-select';
        statusSelect.dataset.subject = subject;
        statusSelect.dataset.week = weekKey;
        
        const options = [
            { value: 'Not Started', text: 'Not Started' },
            { value: 'In Progress', text: 'In Progress' },
            { value: 'Completed', text: 'Completed ✓' }
        ];
        
        options.forEach(opt => {
            const option = document.createElement('option');
            option.value = opt.value;
            option.textContent = opt.text;
            if (opt.value === weekData.status) option.selected = true;
            statusSelect.appendChild(option);
        });
        
        statusSelect.addEventListener('change', updateScheduleData);
        statusCell.appendChild(statusSelect);
        row.appendChild(statusCell);
        
        tbody.appendChild(row);
    }
    table.appendChild(tbody);
    
    wrapper.appendChild(table);
}

/* ===========================
   UPDATE SCHEDULE DATA
   Updates schedule when user edits cells
   =========================== */
function updateScheduleData(event) {
    const target = event.target;
    const subject = target.getAttribute('data-subject');
    const week = target.getAttribute('data-week');

    if (target.classList.contains('excel-input')) {
        currentEditPlan.schedule[subject][week].topic = target.value;
    } else if (target.classList.contains('excel-select')) {
        currentEditPlan.schedule[subject][week].status = target.value;
    }
}

/* ===========================
   SAVE SCHEDULE
   Saves the edited schedule back to storage
   =========================== */
function saveSchedule() {
    // Get all plans from storage
    let plans = JSON.parse(localStorage.getItem('studyPlans'));
    
    // Find and update the plan
    const planIndex = plans.findIndex(p => p.id === currentEditPlan.id);
    if (planIndex !== -1) {
        plans[planIndex] = currentEditPlan;
        localStorage.setItem('studyPlans', JSON.stringify(plans));
    }

    // Close modal and reload
    closeScheduleModal();
    loadPlans();
    alert('✅ Schedule saved successfully!');
}

/* ===========================
   CLOSE SCHEDULE MODAL
   Closes the schedule editor modal
   =========================== */
function closeScheduleModal() {
    document.getElementById('schedule-modal').style.display = 'none';
    currentEditPlan = null;
    currentEditSubject = null;
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

/* ===========================
   CLOSE MODAL ON OUTSIDE CLICK
   Closes modal if user clicks outside of it
   =========================== */
window.onclick = function(event) {
    const modal = document.getElementById('schedule-modal');
    if (event.target === modal) {
        closeScheduleModal();
    }
}
